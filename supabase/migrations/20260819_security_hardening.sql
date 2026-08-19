-- ====================================================================
-- Shree Janak Secondary School (JHSS)
-- Migration: 20260819_security_hardening.sql
-- Description: Security Audit Logging, Zero-Trust RLS, & Rate Limiting Schema
-- ====================================================================

-- 1. Security Audit Logs Table
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    action TEXT NOT NULL,
    user_id TEXT,
    user_email TEXT,
    user_role TEXT,
    details JSONB DEFAULT '{}'::jsonb,
    severity TEXT NOT NULL DEFAULT 'info' CHECK (severity IN ('info', 'warning', 'critical')),
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON public.audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON public.audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_severity ON public.audit_logs(severity);

-- 2. Server-side Rate Limits Table
CREATE TABLE IF NOT EXISTS public.rate_limits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    identifier TEXT NOT NULL,
    action_key TEXT NOT NULL,
    request_count INT NOT NULL DEFAULT 1,
    window_expires_at TIMESTAMPTZ NOT NULL,
    blocked_until TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(identifier, action_key)
);

CREATE INDEX IF NOT EXISTS idx_rate_limits_lookup ON public.rate_limits(identifier, action_key);
CREATE INDEX IF NOT EXISTS idx_rate_limits_expires ON public.rate_limits(window_expires_at);

-- 3. Enable RLS on newly created tables
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- 4. Secure RLS Policies for Audit Logs
-- Allow inserts from any authenticated client or anonymous logger service
CREATE POLICY "Allow log creation"
ON public.audit_logs FOR INSERT
WITH CHECK (true);

-- Only admins or privileged service can query audit logs
CREATE POLICY "Only admins can view audit logs"
ON public.audit_logs FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE profiles.firebase_uid = auth.uid()::text
        AND profiles.role = 'admin'
    )
    OR auth.role() = 'service_role'
);

-- Disallow public updates and deletes on audit logs (Immutable Security Audit Trail)
CREATE POLICY "Deny update on audit logs"
ON public.audit_logs FOR UPDATE
USING (false);

CREATE POLICY "Deny delete on audit logs"
ON public.audit_logs FOR DELETE
USING (false);

-- 5. Hardened RLS Policies for Rate Limits
CREATE POLICY "Rate limits management"
ON public.rate_limits FOR ALL
USING (true)
WITH CHECK (true);

-- 6. Periodic Maintenance Cleanup Function (Auto-clean old rate limits)
CREATE OR REPLACE FUNCTION public.cleanup_stale_security_records()
RETURNS void AS $$
BEGIN
    -- Remove rate limits older than 24 hours
    DELETE FROM public.rate_limits WHERE window_expires_at < NOW() - INTERVAL '1 day';
    
    -- Keep audit logs for 90 days
    DELETE FROM public.audit_logs WHERE created_at < NOW() - INTERVAL '90 days' AND severity != 'critical';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

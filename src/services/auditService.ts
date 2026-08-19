import { supabase } from "@/lib/supabase";

export type AuditActionType =
  | "LOGIN_SUCCESS"
  | "LOGIN_FAILED"
  | "REGISTER_SUCCESS"
  | "LOGOUT"
  | "PASSWORD_RESET_REQUESTED"
  | "EMAIL_VERIFICATION_SENT"
  | "PROFILE_UPDATED"
  | "ROLE_MODIFIED"
  | "RESULT_VIEWED"
  | "RESULT_MODIFIED"
  | "NOTICE_CREATED"
  | "EVENT_CREATED"
  | "UNAUTHORIZED_ACCESS_ATTEMPT"
  | "RATE_LIMIT_EXCEEDED"
  | "MALICIOUS_INPUT_BLOCKED"
  | "FILE_UPLOADED";

export type AuditSeverity = "info" | "warning" | "critical";

export interface AuditEventPayload {
  action: AuditActionType;
  userId?: string | null;
  userEmail?: string | null;
  userRole?: string | null;
  details?: Record<string, any>;
  severity?: AuditSeverity;
  ipAddress?: string;
  userAgent?: string;
}

/**
 * Scrub sensitive keys (passwords, tokens, credentials) from event data before logging
 */
function sanitizeAuditPayload(data: Record<string, any>): Record<string, any> {
  const sensitiveKeys = ["password", "token", "secret", "credential", "pin", "auth", "apiKey"];
  const sanitized: Record<string, any> = {};

  for (const [key, value] of Object.entries(data)) {
    const isSensitive = sensitiveKeys.some((s) => key.toLowerCase().includes(s));
    if (isSensitive) {
      sanitized[key] = "[REDACTED]";
    } else if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      sanitized[key] = sanitizeAuditPayload(value);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

export const auditService = {
  /**
   * Record a security audit event
   */
  async logEvent(event: AuditEventPayload): Promise<void> {
    try {
      const sanitizedDetails = event.details ? sanitizeAuditPayload(event.details) : {};
      const userAgent = typeof window !== "undefined" ? window.navigator.userAgent : "server";

      const record = {
        action: event.action,
        user_id: event.userId || null,
        user_email: event.userEmail || null,
        user_role: event.userRole || null,
        details: sanitizedDetails,
        severity: event.severity || "info",
        user_agent: event.userAgent || userAgent,
        created_at: new Date().toISOString(),
      };

      // 1. Attempt Supabase audit_logs write
      const { error } = await supabase.from("audit_logs").insert([record]);
      
      if (error) {
        // Fallback: Silent console record in development
        if (process.env.NODE_ENV !== "production") {
          console.debug("[Security Audit Log Fallback]", record);
        }
      }
    } catch (err) {
      // Non-blocking catch to ensure app flow is never interrupted by telemetry/audit failures
      if (process.env.NODE_ENV !== "production") {
        console.debug("[Security Audit Service Non-blocking Error]", err);
      }
    }
  },

  /**
   * Helper for recording failed logins with rate limiting context
   */
  async logFailedLogin(email: string, reason: string): Promise<void> {
    await this.logEvent({
      action: "LOGIN_FAILED",
      userEmail: email,
      severity: "warning",
      details: { reason },
    });
  },

  /**
   * Helper for unauthorized access attempts
   */
  async logUnauthorizedAccess(path: string, attemptedRole?: string, actualRole?: string): Promise<void> {
    await this.logEvent({
      action: "UNAUTHORIZED_ACCESS_ATTEMPT",
      severity: "critical",
      userRole: actualRole,
      details: {
        path,
        requiredRole: attemptedRole,
        actualRole,
      },
    });
  },
};

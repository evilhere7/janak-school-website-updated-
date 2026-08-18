"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { ShieldAlert, ArrowLeft, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import type { UserRole } from "@/types/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  allowedRoles,
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      const redirectUrl = `${redirectTo}?redirect=${encodeURIComponent(pathname)}`;
      router.push(redirectUrl);
    }
  }, [user, loading, router, pathname, redirectTo]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-off-white">
        <div className="relative w-16 h-16 mb-4">
          <div className="absolute inset-0 rounded-full border-4 border-navy/20 animate-ping opacity-25" />
          <div className="w-16 h-16 rounded-full border-4 border-navy border-t-gold animate-spin" />
        </div>
        <p className="text-navy font-semibold text-sm tracking-wide">
          Verifying security credentials...
        </p>
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return null;
  }

  // Role authorization check
  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = userProfile?.role || "student";
    const hasRole = allowedRoles.includes(userRole);

    if (!hasRole) {
      return (
        <div className="min-h-[70vh] flex items-center justify-center p-6 bg-off-white">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-red-100 shadow-2xl max-w-lg text-center">
            <div className="w-16 h-16 rounded-2xl bg-red-50 text-crimson flex items-center justify-center mx-auto mb-5 border border-red-100">
              <ShieldAlert size={32} />
            </div>
            <h2 className="font-display font-bold text-navy text-2xl mb-2">
              Access Restricted
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              You are signed in as a <span className="font-bold uppercase text-navy">[{userRole}]</span>,
              which does not have authorization to view this section.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/dashboard"
                className="px-6 py-3 rounded-full bg-navy text-white text-xs font-bold hover:bg-gold transition-colors"
              >
                Return to My Dashboard
              </Link>
              <Link
                href="/"
                className="px-6 py-3 rounded-full bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200 transition-colors"
              >
                Homepage
              </Link>
            </div>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
}

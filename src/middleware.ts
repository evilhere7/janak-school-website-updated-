import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // 1. Block Path Traversal and Null Byte Injection in URL
  if (
    pathname.includes("..") ||
    pathname.includes("//") ||
    pathname.includes("%00") ||
    pathname.includes("\0") ||
    search.includes("%00") ||
    search.includes("\0")
  ) {
    return new NextResponse("Bad Request - Malicious URL pattern detected", {
      status: 400,
    });
  }

  // 2. Refresh Supabase Session / Auth cookies
  const response = createClient(request);

  // 3. Inject Edge Security Headers
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), browsing-topics=()"
  );

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets (assets/...)
     */
    "/((?!_next/static|_next/image|favicon.ico|assets/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

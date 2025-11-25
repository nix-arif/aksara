import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 1. Define the PUBLIC/ALLOWED paths
// Add all paths a user can access without being logged in.
const PUBLIC_PATHS = [
  "/auth",
  "/signup",
  "/forgot-password",
  "/public-page",
  "/api/public/.*", // Example: any API route under /api/public/ is public
  "/",
];

// The function is now named 'proxy'
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Function to check if the current path matches any public path (using regex)
  const isPublicPath = PUBLIC_PATHS.some((pathPattern) => {
    // For simple string paths, check startsWith
    if (pathPattern.includes("*")) {
      // Simple wildcards ('*') are not natively supported by startsWith.
      // For production, you'd use a more robust regex library or the matcher in config.
      // For this example, we'll keep the logic simple for string matching:
      return (
        pathname === pathPattern ||
        pathname.startsWith(pathPattern.replace("*", ""))
      );
    }
    return pathname === pathPattern || pathname.startsWith(`${pathPattern}/`);
  });

  // 3. Authentication Check (MUST be replaced with your actual logic)
  const isLoggedIn = request.cookies.has("session-token");

  // --- CORE LOGIC ---

  // A. Logged in and trying to access a public/auth path: Redirect to dashboard.
  if (isLoggedIn && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // B. NOT Logged in and trying to access a PRIVATE path: Redirect to login.
  if (!isLoggedIn && !isPublicPath) {
    const loginUrl = new URL("/auth/login", request.url);
    // Pass the original URL so the user can be redirected back after login
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // C. Otherwise, allow the request to proceed.
  return NextResponse.next();
}

// 4. Configure the proxy to run on almost all paths
export const config = {
  // Match everything *except* Next.js internal paths, static assets, and API routes
  // (if you want your API routes to handle their own auth checks).
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

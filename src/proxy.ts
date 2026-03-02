import { NextResponse, type NextRequest } from "next/server";

// Routes that don't require authentication
const publicRoutes = [
    "/",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/verify-email",
    "/pricing",
    "/features",
    "/about",
    "/contact",
    "/legal",
];

// Routes that should redirect to dashboard if authenticated
const authRoutes = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
];

function isPublicRoute(pathname: string): boolean {
    return publicRoutes.some(
        (route) => pathname === route || pathname.startsWith(`${route}/`)
    );
}

function isAuthRoute(pathname: string): boolean {
    return authRoutes.some(
        (route) => pathname === route || pathname.startsWith(`${route}/`)
    );
}

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const session = request.cookies.get("nexo-session");

    // Skip for static files and API routes
    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        pathname.includes(".")
    ) {
        return NextResponse.next();
    }

    // If user is authenticated and tries to visit auth pages, redirect to dashboard
    if (session && isAuthRoute(pathname)) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // If user is NOT authenticated and tries to visit protected route
    if (!session && !isPublicRoute(pathname)) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

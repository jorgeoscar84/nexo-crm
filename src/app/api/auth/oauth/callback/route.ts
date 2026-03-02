import { NextRequest, NextResponse } from "next/server";
import { handleOAuthCallback } from "@/features/auth/lib/auth-service";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    const secret = searchParams.get("secret");

    if (!userId || !secret) {
        return NextResponse.redirect(
            new URL("/login?error=oauth_failed", request.url)
        );
    }

    try {
        await handleOAuthCallback(userId, secret);
        return NextResponse.redirect(new URL("/dashboard", request.url));
    } catch {
        return NextResponse.redirect(
            new URL("/login?error=oauth_failed", request.url)
        );
    }
}

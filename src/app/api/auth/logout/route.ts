import { NextResponse } from "next/server";
import { logout } from "@/features/auth/lib/auth-service";

export async function POST() {
    try {
        await logout();
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: "Logout failed" }, { status: 500 });
    }
}

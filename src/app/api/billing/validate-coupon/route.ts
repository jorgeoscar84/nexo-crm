import { NextRequest, NextResponse } from "next/server";
import { validateCoupon } from "@/features/billing/lib/billing-service";

export async function GET(request: NextRequest) {
    const code = request.nextUrl.searchParams.get("code");

    if (!code) {
        return NextResponse.json(
            { valid: false, error: "Código requerido" },
            { status: 400 }
        );
    }

    const result = await validateCoupon(code);
    return NextResponse.json(result);
}

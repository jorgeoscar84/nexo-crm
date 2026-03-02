import { NextRequest, NextResponse } from "next/server";
import {
    getMercadoPagoPayment,
    verifyMercadoPagoWebhook,
} from "@/lib/payments/mercadopago";
import {
    createSubscription,
    recordPayment,
} from "@/features/billing/lib/billing-service";

export async function POST(request: NextRequest) {
    try {
        const xSignature = request.headers.get("x-signature");
        const xRequestId = request.headers.get("x-request-id");
        const body = await request.json();

        // Verify webhook
        const dataId = body.data?.id || "";
        const isValid = verifyMercadoPagoWebhook(xSignature, xRequestId, dataId);
        if (!isValid) {
            return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
        }

        if (body.type === "payment") {
            const paymentId = body.data.id;
            const payment = await getMercadoPagoPayment(paymentId.toString());

            if (payment.status === "approved") {
                const externalReference = payment.external_reference;
                if (externalReference) {
                    const [userId, planId, period] = externalReference.split(":");

                    const subscription = await createSubscription({
                        userId,
                        planId,
                        paymentMethod: "mercadopago",
                        period: period as "monthly" | "yearly",
                    });

                    await recordPayment({
                        userId,
                        subscriptionId: subscription.$id,
                        amount: payment.transaction_amount,
                        currency: payment.currency_id,
                        method: "mercadopago",
                        status: "completed",
                        externalId: paymentId.toString(),
                    });
                }
            }
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error("MercadoPago webhook error:", error);
        return NextResponse.json(
            { error: "Webhook processing failed" },
            { status: 500 }
        );
    }
}

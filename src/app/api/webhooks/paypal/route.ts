import { NextRequest, NextResponse } from "next/server";
import { verifyPayPalWebhook, capturePayPalOrder } from "@/lib/payments/paypal";
import {
    createSubscription,
    recordPayment,
} from "@/features/billing/lib/billing-service";

export async function POST(request: NextRequest) {
    try {
        const body = await request.text();
        const headers: Record<string, string> = {};
        request.headers.forEach((value, key) => {
            headers[key] = value;
        });

        // Verify webhook signature
        const isValid = await verifyPayPalWebhook(headers, body);
        if (!isValid) {
            return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
        }

        const event = JSON.parse(body);

        switch (event.event_type) {
            case "CHECKOUT.ORDER.APPROVED": {
                const orderId = event.resource.id;
                const captureResult = await capturePayPalOrder(orderId);

                if (captureResult.status === "COMPLETED") {
                    const customId = captureResult.purchase_units?.[0]?.payments?.captures?.[0]?.custom_id;
                    const amount = parseFloat(
                        captureResult.purchase_units?.[0]?.payments?.captures?.[0]?.amount?.value || "0"
                    );

                    if (customId) {
                        const [userId, planId, period] = customId.split(":");

                        const subscription = await createSubscription({
                            userId,
                            planId,
                            paymentMethod: "paypal",
                            period: period as "monthly" | "yearly",
                        });

                        await recordPayment({
                            userId,
                            subscriptionId: subscription.$id,
                            amount,
                            currency: "USD",
                            method: "paypal",
                            status: "completed",
                            externalId: orderId,
                        });
                    }
                }
                break;
            }

            case "PAYMENT.CAPTURE.REFUNDED": {
                // Handle refunds
                console.log("PayPal refund received:", event.resource.id);
                break;
            }

            default:
                console.log("Unhandled PayPal event:", event.event_type);
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error("PayPal webhook error:", error);
        return NextResponse.json(
            { error: "Webhook processing failed" },
            { status: 500 }
        );
    }
}

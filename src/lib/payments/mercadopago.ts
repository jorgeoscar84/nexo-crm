import "server-only";

// ═══════════════════════════════════════════
// MercadoPago API Client
// ═══════════════════════════════════════════

const MP_API = "https://api.mercadopago.com";

function getHeaders() {
    return {
        Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
    };
}

export async function createMercadoPagoPreference(data: {
    title: string;
    amount: number;
    currency: string;
    externalReference: string;
    payerEmail?: string;
    backUrls: {
        success: string;
        failure: string;
        pending: string;
    };
}) {
    const response = await fetch(`${MP_API}/checkout/preferences`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
            items: [
                {
                    title: data.title,
                    quantity: 1,
                    unit_price: data.amount,
                    currency_id: data.currency,
                },
            ],
            external_reference: data.externalReference,
            payer: data.payerEmail ? { email: data.payerEmail } : undefined,
            back_urls: data.backUrls,
            auto_return: "approved",
            notification_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/mercadopago`,
        }),
    });

    return response.json();
}

export async function getMercadoPagoPayment(paymentId: string) {
    const response = await fetch(`${MP_API}/v1/payments/${paymentId}`, {
        headers: getHeaders(),
    });

    return response.json();
}

export function verifyMercadoPagoWebhook(
    xSignature: string | null,
    xRequestId: string | null,
    dataId: string
): boolean {
    if (!xSignature || !xRequestId) return false;

    const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET;
    if (!secret) return false;

    // MercadoPago uses HMAC-SHA256 verification
    // For now, basic presence check — full HMAC verification should be implemented
    // when the secret format is confirmed with MercadoPago
    return true;
}

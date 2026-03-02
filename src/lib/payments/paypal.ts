import "server-only";

// ═══════════════════════════════════════════
// PayPal REST API Client
// ═══════════════════════════════════════════

const PAYPAL_API =
    process.env.PAYPAL_MODE === "sandbox"
        ? "https://api-m.sandbox.paypal.com"
        : "https://api-m.paypal.com";

async function getAccessToken(): Promise<string> {
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET!;

    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

    const response = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
        method: "POST",
        headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
    });

    const data = await response.json();
    return data.access_token;
}

export async function createPayPalOrder(amount: number, currency = "USD") {
    const accessToken = await getAccessToken();

    const response = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: currency,
                        value: amount.toFixed(2),
                    },
                    description: "Nexo CRM Subscription",
                },
            ],
        }),
    });

    return response.json();
}

export async function capturePayPalOrder(orderId: string) {
    const accessToken = await getAccessToken();

    const response = await fetch(
        `${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        }
    );

    return response.json();
}

export async function verifyPayPalWebhook(
    headers: Record<string, string>,
    body: string
): Promise<boolean> {
    const accessToken = await getAccessToken();
    const webhookId = process.env.PAYPAL_WEBHOOK_ID!;

    const response = await fetch(
        `${PAYPAL_API}/v1/notifications/verify-webhook-signature`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                auth_algo: headers["paypal-auth-algo"],
                cert_url: headers["paypal-cert-url"],
                transmission_id: headers["paypal-transmission-id"],
                transmission_sig: headers["paypal-transmission-sig"],
                transmission_time: headers["paypal-transmission-time"],
                webhook_id: webhookId,
                webhook_event: JSON.parse(body),
            }),
        }
    );

    const result = await response.json();
    return result.verification_status === "SUCCESS";
}

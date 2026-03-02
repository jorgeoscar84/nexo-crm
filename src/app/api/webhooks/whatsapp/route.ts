import { NextResponse } from "next/server";
import { appwriteConfig } from "@/lib/appwrite/config";
import { createAdminClient } from "@/lib/appwrite/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Verify webhook signature here based on your chosen provider (e.g., Evolution API)
        // const signature = req.headers.get("x-webhook-signature");

        if (!body || !body.event) {
            return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
        }

        // Process incoming message
        if (body.event === "messages.upsert") {
            const message = body.data?.message;
            const remoteJid = body.data?.key?.remoteJid;

            const { databases } = createAdminClient();

            // Log in Appwrite (mock implementation for v1.0)
            console.log(`[WhatsApp Webhook] Received message from ${remoteJid}: ${message}`);

            // We would normally upsert the conversation and insert the message into the database
            // e.g. databases.createDocument(appwriteConfig.databaseId, appwriteConfig.tables.whatsappMessages, ...)
        }

        return NextResponse.json({ success: true, received: true });
    } catch (error) {
        console.error("[WhatsApp Webhook Error]", error);
        return NextResponse.json(
            { error: "Webhook processing failed" },
            { status: 500 }
        );
    }
}

import { NextResponse } from "next/server";
import { ID } from "node-appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { createAdminClient } from "@/lib/appwrite/server";

export async function POST(req: Request) {
    try {
        const { event, date, description, userId } = await req.json();

        if (!event || !date || !userId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const { databases } = createAdminClient();

        // 1. Save locally to Appwrite
        const crmEvent = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.tables.calendarEvents,
            ID.unique(),
            {
                title: event,
                date: date,
                description: description || "",
                userId: userId,
            }
        );

        // 2. Mock Google Calendar API Push
        // In a real app, you would use googleapis package and the user's OAuth tokens
        console.log(`[Google Calendar Sync Mock] Synced event: ${event} for user ${userId}`);

        return NextResponse.json({ success: true, event: crmEvent });
    } catch (error) {
        console.error("[Calendar Sync Error]", error);
        return NextResponse.json({ error: "Sync failed" }, { status: 500 });
    }
}

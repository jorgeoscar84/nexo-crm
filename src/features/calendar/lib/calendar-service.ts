import { ID, Query } from "appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { databases } from "@/lib/appwrite/client";

export interface CalendarEvent {
    $id: string;
    title: string;
    description?: string;
    startDate: string;
    endDate: string;
    type: "meeting" | "call" | "visit" | "task";
    attendees?: string[];
    ownerId: string;
    relatedLeadId?: string;
    status: "scheduled" | "completed" | "cancelled";
    location?: string;
    $createdAt: string;
}

export type CalendarEventInput = Omit<CalendarEvent, "$id" | "$createdAt">;

export const listEvents = async (queries: string[] = []) => {
    try {
        const response = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.tables.calendarEvents,
            queries
        );
        return {
            events: response.documents as unknown as CalendarEvent[],
            total: response.total
        };
    } catch (error) {
        console.error("Error listing calendar events:", error);
        throw error;
    }
};

export const createEvent = async (data: CalendarEventInput) => {
    try {
        const response = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.tables.calendarEvents,
            ID.unique(),
            data
        );
        return response as unknown as CalendarEvent;
    } catch (error) {
        console.error("Error creating calendar event:", error);
        throw error;
    }
};

export const updateEvent = async (eventId: string, data: Partial<CalendarEventInput>) => {
    try {
        const response = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.tables.calendarEvents,
            eventId,
            data
        );
        return response as unknown as CalendarEvent;
    } catch (error) {
        console.error("Error updating calendar event:", error);
        throw error;
    }
};

export const deleteEvent = async (eventId: string) => {
    try {
        await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.tables.calendarEvents,
            eventId
        );
        return true;
    } catch (error) {
        console.error("Error deleting calendar event:", error);
        throw error;
    }
};

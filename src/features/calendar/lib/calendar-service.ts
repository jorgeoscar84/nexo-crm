import { insforge } from "@/lib/insforge/client";

export interface CalendarEvent {
    $id: string;
    title: string;
    description?: string;
    startDate: string;
    endDate?: string;
    type: "meeting" | "call" | "visit" | "task";
    attendees?: string[];
    ownerId: string;
    relatedLeadId?: string;
    status: "scheduled" | "completed" | "cancelled";
    location?: string;
    $createdAt: string;
}

export type CalendarEventInput = Omit<CalendarEvent, "$id" | "$createdAt">;

export const listEvents = async () => {
    try {
        const { data, error } = await insforge.database
            .from('calendar_events')
            .select('*');

        if (error) throw error;

        const events = (data || []).map(event => ({
            ...event,
            $id: event.id,
            $createdAt: event.created_at,
            startDate: event.start_date,
            endDate: event.end_date
        }));

        return { events, total: events.length };
    } catch (error) {
        console.error("Error listing calendar events:", error);
        throw error;
    }
};

export const createEvent = async (data: CalendarEventInput) => {
    try {
        const { data: event, error } = await insforge.database
            .from('calendar_events')
            .insert({
                title: data.title,
                type: data.type,
                start_date: data.startDate,
                end_date: data.endDate,
            })
            .select()
            .single();

        if (error) throw error;
        return {
            ...event,
            $id: event.id,
            $createdAt: event.created_at,
            startDate: event.start_date,
            endDate: event.end_date
        } as CalendarEvent;
    } catch (error) {
        console.error("Error creating calendar event:", error);
        throw error;
    }
};

export const updateEvent = async (eventId: string, data: Partial<CalendarEventInput>) => {
    try {
        const updateData: any = { ...data };
        if (data.startDate) { updateData.start_date = data.startDate; delete updateData.startDate; }
        if (data.endDate) { updateData.end_date = data.endDate; delete updateData.endDate; }

        const { data: event, error } = await insforge.database
            .from('calendar_events')
            .update(updateData)
            .eq('id', eventId)
            .select()
            .single();

        if (error) throw error;
        return {
            ...event,
            $id: event.id,
            $createdAt: event.created_at,
            startDate: event.start_date,
            endDate: event.end_date
        } as CalendarEvent;
    } catch (error) {
        console.error("Error updating calendar event:", error);
        throw error;
    }
};

export const deleteEvent = async (eventId: string) => {
    try {
        const { error } = await insforge.database
            .from('calendar_events')
            .delete()
            .eq('id', eventId);

        if (error) throw error;
        return true;
    } catch (error) {
        console.error("Error deleting calendar event:", error);
        throw error;
    }
};

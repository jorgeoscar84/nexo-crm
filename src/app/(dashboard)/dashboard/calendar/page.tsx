"use client";

import { useState } from "react";
import { Plus, ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCrmStore } from "@/store/useCrmStore";
import { listEvents, type CalendarEvent } from "@/features/calendar/lib/calendar-service";
import { useEffect } from "react";
import { toast } from "sonner";

const days = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; // Monday = 0
}

export default function CalendarPage() {
    const { setNewEventModalOpen } = useCrmStore();
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadEvents = async () => {
        try {
            setIsLoading(true);
            const data = await listEvents();
            setEvents(data.events);
        } catch (error) {
            console.error(error);
            toast.error("Error al cargar eventos");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadEvents();
    }, []);

    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

    const prevMonth = () => {
        if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); }
        else setCurrentMonth(currentMonth - 1);
    };
    const nextMonth = () => {
        if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); }
        else setCurrentMonth(currentMonth + 1);
    };

    const cells: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);

    const isToday = (day: number) =>
        day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Calendario</h1>
                    <p className="text-sm text-muted-foreground">Eventos, reuniones y seguimientos</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={loadEvents} disabled={isLoading}>
                        <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                    </Button>
                    <Button onClick={() => setNewEventModalOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />Nuevo evento
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <Button variant="ghost" size="icon" onClick={prevMonth}>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <h3 className="text-sm font-semibold">
                        {months[currentMonth]} {currentYear}
                    </h3>
                    <Button variant="ghost" size="icon" onClick={nextMonth}>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </CardHeader>
                <CardContent>
                    {/* Day headers */}
                    <div className="grid grid-cols-7 mb-1">
                        {days.map((d) => (
                            <div key={d} className="py-2 text-center text-xs font-semibold text-muted-foreground">
                                {d}
                            </div>
                        ))}
                    </div>
                    {/* Day cells */}
                    <div className="grid grid-cols-7 gap-px">
                        {cells.map((day, i) => (
                            <div
                                key={i}
                                className={`min-h-[80px] border rounded-lg p-1.5 text-sm transition-colors ${day ? "hover:bg-muted/50 cursor-pointer" : ""
                                    } ${day && isToday(day) ? "bg-primary/5 border-primary" : ""}`}
                            >
                                {day && (
                                    <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs ${isToday(day) ? "bg-primary text-primary-foreground font-bold" : "text-muted-foreground"
                                        }`}>
                                        {day}
                                    </span>
                                )}
                                {day && (
                                    <div className="mt-1 space-y-1 overflow-y-auto max-h-[50px]">
                                        {events
                                            .filter(event => {
                                                const d = new Date(event.startDate);
                                                return d.getDate() === day &&
                                                    d.getMonth() === currentMonth &&
                                                    d.getFullYear() === currentYear;
                                            })
                                            .map(event => (
                                                <div
                                                    key={event.$id}
                                                    className="px-1 py-0.5 text-[10px] rounded truncate bg-primary/10 text-primary border-l-2 border-primary"
                                                    title={event.title}
                                                >
                                                    {event.title}
                                                </div>
                                            ))
                                        }
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCrmStore } from "@/store/useCrmStore";
import { createEvent, type CalendarEventInput } from "@/features/calendar/lib/calendar-service";
import { toast } from "sonner";

export function NewEventModal() {
    const { isNewEventModalOpen, setNewEventModalOpen } = useCrmStore();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        startDate: new Date().toISOString().slice(0, 16), // Format for datetime-local
        endDate: new Date(Date.now() + 3600000).toISOString().slice(0, 16),
        type: "meeting" as const,
        location: "",
        status: "scheduled" as const,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            toast.error("El título es obligatorio");
            return;
        }

        setIsLoading(true);
        try {
            const eventData: CalendarEventInput = {
                ...formData,
                ownerId: "default_owner",
            };

            await createEvent(eventData);
            toast.success("Evento creado exitosamente");
            setNewEventModalOpen(false);
            setFormData({
                title: "",
                description: "",
                startDate: new Date().toISOString().slice(0, 16),
                endDate: new Date(Date.now() + 3600000).toISOString().slice(0, 16),
                type: "meeting",
                location: "",
                status: "scheduled",
            });
        } catch (error) {
            console.error("Error creating event:", error);
            toast.error("Hubo un error al crear el evento");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isNewEventModalOpen} onOpenChange={setNewEventModalOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={onSubmit}>
                    <DialogHeader>
                        <DialogTitle>Añadir nuevo evento</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Título del evento *</Label>
                            <Input
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Ej: Reunión de ventas"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="startDate">Inicio</Label>
                                <Input
                                    id="startDate"
                                    type="datetime-local"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="endDate">Fin</Label>
                                <Input
                                    id="endDate"
                                    type="datetime-local"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="type">Tipo de evento</Label>
                            <Select
                                value={formData.type}
                                onValueChange={(val) => handleSelectChange("type", val)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecciona..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="meeting">Reunión</SelectItem>
                                    <SelectItem value="call">Llamada</SelectItem>
                                    <SelectItem value="visit">Visita</SelectItem>
                                    <SelectItem value="task">Tarea</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="location">Ubicación / Link</Label>
                            <Input
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Oficina o Google Meet"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Descripción</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Detalles sobre el evento..."
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setNewEventModalOpen(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Guardando..." : "Guardar evento"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

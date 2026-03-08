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
import { createTask, type TaskInput } from "@/features/tasks/lib/tasks-service";
import { toast } from "sonner";

export function NewTaskModal() {
    const { isNewTaskModalOpen, setNewTaskModalOpen } = useCrmStore();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "todo" as const,
        priority: "medium" as const,
        dueDate: "",
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
            const taskData: TaskInput = {
                ...formData,
                ownerId: "default_owner",
            };

            await createTask(taskData);
            toast.success("Tarea creada exitosamente");
            setNewTaskModalOpen(false);
            setFormData({
                title: "",
                description: "",
                status: "todo",
                priority: "medium",
                dueDate: "",
            });
        } catch (error) {
            console.error("Error creating task:", error);
            toast.error("Hubo un error al crear la tarea");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isNewTaskModalOpen} onOpenChange={setNewTaskModalOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={onSubmit}>
                    <DialogHeader>
                        <DialogTitle>Añadir nueva tarea</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Título de la tarea *</Label>
                            <Input
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Ej: Llamar a cliente X"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="dueDate">Fecha de vencimiento</Label>
                            <Input
                                id="dueDate"
                                type="date"
                                name="dueDate"
                                value={formData.dueDate}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="status">Estado</Label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(val) => handleSelectChange("status", val)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="todo">Por hacer</SelectItem>
                                        <SelectItem value="in_progress">En curso</SelectItem>
                                        <SelectItem value="completed">Completada</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="priority">Prioridad</Label>
                                <Select
                                    value={formData.priority}
                                    onValueChange={(val) => handleSelectChange("priority", val)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="low">Baja</SelectItem>
                                        <SelectItem value="medium">Media</SelectItem>
                                        <SelectItem value="high">Alta</SelectItem>
                                        <SelectItem value="urgent">Urgente</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Descripción</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Detalles de la tarea..."
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setNewTaskModalOpen(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Guardando..." : "Guardar tarea"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

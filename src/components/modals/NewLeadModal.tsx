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
import { createLead, type LeadInput } from "@/features/leads/lib/leads-service";
import { toast } from "sonner";

export function NewLeadModal() {
    const { isNewLeadModalOpen, setNewLeadModalOpen } = useCrmStore();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        company: "",
        email: "",
        phone: "",
        source: "website",
        stageId: "new",
        notes: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            toast.error("El nombre es obligatorio");
            return;
        }

        setIsLoading(true);
        try {
            // Mock ownerId for now since auth might not be fully linked. In a real app, use currentUser.id
            const leadData: LeadInput = {
                ...formData,
                ownerId: "default_owner",
            };

            await createLead(leadData);
            toast.success("Lead creado exitosamente");
            setNewLeadModalOpen(false);
            setFormData({
                name: "",
                company: "",
                email: "",
                phone: "",
                source: "website",
                stageId: "new",
                notes: "",
            });
            // Let the page know to refresh data if needed, or rely on window focus/SWR
        } catch (error) {
            console.error("Error creating lead:", error);
            toast.error("Hubo un error al crear el lead");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isNewLeadModalOpen} onOpenChange={setNewLeadModalOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={onSubmit}>
                    <DialogHeader>
                        <DialogTitle>Añadir nuevo lead</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nombre completo *</Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Ej: Juan Pérez"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="company">Empresa</Label>
                                <Input
                                    id="company"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    placeholder="TechCorp"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="stageId">Etapa inicial</Label>
                                <Select
                                    value={formData.stageId}
                                    onValueChange={(val) => handleSelectChange("stageId", val)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="new">Nuevo</SelectItem>
                                        <SelectItem value="contacted">Contactado</SelectItem>
                                        <SelectItem value="proposal">Propuesta</SelectItem>
                                        <SelectItem value="negotiating">Negociando</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="juan@ejemplo.com"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="phone">Teléfono</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+123456789"
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="source">Origen</Label>
                            <Select
                                value={formData.source}
                                onValueChange={(val) => handleSelectChange("source", val)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecciona..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="website">Sitio web</SelectItem>
                                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                                    <SelectItem value="referral">Referido</SelectItem>
                                    <SelectItem value="import">Importación</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="notes">Notas adicionales</Label>
                            <Textarea
                                id="notes"
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                placeholder="Detalles sobre el lead..."
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setNewLeadModalOpen(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Guardando..." : "Guardar lead"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

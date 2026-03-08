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
import { useCrmStore } from "@/store/useCrmStore";
import { createPartner, type PartnerInput } from "@/features/partners/lib/partners-service";
import { toast } from "sonner";

export function NewPartnerModal() {
    const { isNewPartnerModalOpen, setNewPartnerModalOpen } = useCrmStore();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        status: "active" as const,
        level: 1,
        commissionRate: 5,
        salesCount: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) : value
        }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name.trim() || !formData.email.trim()) {
            toast.error("El nombre y el email son obligatorios");
            return;
        }

        setIsLoading(true);
        try {
            await createPartner(formData);
            toast.success("Socio creado exitosamente");
            setNewPartnerModalOpen(false);
            setFormData({
                name: "",
                email: "",
                phone: "",
                status: "active",
                level: 1,
                commissionRate: 5,
                salesCount: 0,
            });
        } catch (error) {
            console.error("Error creating partner:", error);
            toast.error("Hubo un error al crear el socio");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isNewPartnerModalOpen} onOpenChange={setNewPartnerModalOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={onSubmit}>
                    <DialogHeader>
                        <DialogTitle>Añadir nuevo socio (MLM)</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nombre completo *</Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Ej: Maria Lopez"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="maria@ejemplo.com"
                                required
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
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="level">Nivel</Label>
                                <Input
                                    id="level"
                                    type="number"
                                    name="level"
                                    min="1"
                                    value={formData.level}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="commissionRate">% Comisión</Label>
                                <Input
                                    id="commissionRate"
                                    type="number"
                                    name="commissionRate"
                                    step="0.1"
                                    value={formData.commissionRate}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
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
                                    <SelectItem value="active">Activo</SelectItem>
                                    <SelectItem value="inactive">Inactivo</SelectItem>
                                    <SelectItem value="pending">Pendiente</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setNewPartnerModalOpen(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Guardando..." : "Guardar socio"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

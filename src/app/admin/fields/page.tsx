"use client";

import { Plus, GripVertical, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type FieldDef = {
    name: string;
    label: string;
    type: string;
    required: boolean;
};

const defaultLeadFields: FieldDef[] = [
    { name: "phone", label: "Teléfono", type: "phone", required: true },
    { name: "company", label: "Empresa", type: "text", required: false },
    { name: "source", label: "Origen del lead", type: "select", required: true },
    { name: "score", label: "Lead Score", type: "number", required: false },
    { name: "notes", label: "Notas", type: "text", required: false },
];

const defaultPartnerFields: FieldDef[] = [
    { name: "rank", label: "Nivel / Rango", type: "select", required: true },
    { name: "joinDate", label: "Fecha de ingreso", type: "date", required: true },
    { name: "recruits", label: "Socios reclutados", type: "number", required: false },
    { name: "closedDeals", label: "Cierres de venta", type: "number", required: false },
    { name: "followups", label: "Seguimientos realizados", type: "number", required: false },
];

function FieldList({ fields }: { fields: FieldDef[] }) {
    const typeLabels: Record<string, string> = {
        text: "Texto",
        number: "Número",
        date: "Fecha",
        select: "Selección",
        checkbox: "Check",
        phone: "Teléfono",
        email: "Email",
        url: "URL",
    };

    return (
        <div className="space-y-2">
            {fields.map((field, i) => (
                <div
                    key={i}
                    className="flex items-center gap-3 rounded-lg border p-3 bg-card group"
                >
                    <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                    <div className="flex-1">
                        <span className="text-sm font-medium">{field.label}</span>
                        <span className="ml-2 text-xs text-muted-foreground">
                            ({field.name})
                        </span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                        {typeLabels[field.type] || field.type}
                    </Badge>
                    {field.required && (
                        <Badge variant="outline" className="text-xs text-primary">
                            Requerido
                        </Badge>
                    )}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Pencil className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive">
                            <Trash2 className="h-3 w-3" />
                        </Button>
                    </div>
                </div>
            ))}
            <Button variant="outline" size="sm" className="w-full mt-3">
                <Plus className="mr-2 h-3 w-3" />
                Agregar campo
            </Button>
        </div>
    );
}

export default function FieldsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Campos personalizados</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Configura los campos de las fichas de lead, cliente y socio
                </p>
            </div>

            <Tabs defaultValue="lead">
                <TabsList>
                    <TabsTrigger value="lead">Lead</TabsTrigger>
                    <TabsTrigger value="contact">Cliente</TabsTrigger>
                    <TabsTrigger value="partner">Socio MLM</TabsTrigger>
                </TabsList>

                <TabsContent value="lead" className="mt-4">
                    <Card>
                        <CardHeader>
                            <h3 className="text-sm font-semibold">Campos de Lead</h3>
                            <p className="text-xs text-muted-foreground">
                                Campos adicionales además de nombre y email (siempre presentes).
                            </p>
                        </CardHeader>
                        <CardContent>
                            <FieldList fields={defaultLeadFields} />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="contact" className="mt-4">
                    <Card>
                        <CardHeader>
                            <h3 className="text-sm font-semibold">Campos de Cliente</h3>
                        </CardHeader>
                        <CardContent>
                            <FieldList fields={defaultLeadFields} />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="partner" className="mt-4">
                    <Card>
                        <CardHeader>
                            <h3 className="text-sm font-semibold">Campos de Socio MLM</h3>
                            <p className="text-xs text-muted-foreground">
                                KPIs específicos para socios de red.
                            </p>
                        </CardHeader>
                        <CardContent>
                            <FieldList fields={defaultPartnerFields} />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

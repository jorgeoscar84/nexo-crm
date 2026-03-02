"use client";

import { useState } from "react";
import { Plus, GripVertical, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const defaultSalesStages = [
    { name: "Nuevo", color: "#6366f1" },
    { name: "Contactado", color: "#f59e0b" },
    { name: "Propuesta", color: "#3b82f6" },
    { name: "Negociando", color: "#8b5cf6" },
    { name: "Cerrado ganado", color: "#22c55e" },
    { name: "Cerrado perdido", color: "#ef4444" },
];

const defaultPostsaleStages = [
    { name: "Onboarding", color: "#6366f1" },
    { name: "Activo", color: "#22c55e" },
    { name: "En riesgo", color: "#f59e0b" },
    { name: "Soporte", color: "#3b82f6" },
    { name: "Churned", color: "#ef4444" },
];

function StageList({ stages }: { stages: { name: string; color: string }[] }) {
    return (
        <div className="space-y-2">
            {stages.map((stage, i) => (
                <div
                    key={i}
                    className="flex items-center gap-3 rounded-lg border p-3 bg-card group"
                >
                    <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                    <div
                        className="h-4 w-4 rounded-full shrink-0"
                        style={{ backgroundColor: stage.color }}
                    />
                    <span className="flex-1 text-sm font-medium">{stage.name}</span>
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
                Agregar etapa
            </Button>
        </div>
    );
}

export default function PipelinePage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Configurar Pipeline</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Personaliza las etapas del pipeline de ventas y postventa
                </p>
            </div>

            <Tabs defaultValue="sales">
                <TabsList>
                    <TabsTrigger value="sales">Pipeline de Ventas</TabsTrigger>
                    <TabsTrigger value="postsale">Pipeline de Postventa</TabsTrigger>
                </TabsList>

                <TabsContent value="sales" className="mt-4">
                    <Card>
                        <CardHeader>
                            <h3 className="text-sm font-semibold">Etapas de venta</h3>
                            <p className="text-xs text-muted-foreground">
                                Arrastra para reordenar. Los leads se moverán entre estas etapas.
                            </p>
                        </CardHeader>
                        <CardContent>
                            <StageList stages={defaultSalesStages} />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="postsale" className="mt-4">
                    <Card>
                        <CardHeader>
                            <h3 className="text-sm font-semibold">Etapas de postventa</h3>
                            <p className="text-xs text-muted-foreground">
                                Etapas para el seguimiento de clientes después del cierre.
                            </p>
                        </CardHeader>
                        <CardContent>
                            <StageList stages={defaultPostsaleStages} />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

"use client";

import { Plus, Pencil, Copy, Trash2, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const placeholderTemplates = [
    {
        name: "Bienvenida nuevo lead",
        channel: "whatsapp",
        preview: "¡Hola {nombre}! Gracias por tu interés en...",
    },
    {
        name: "Seguimiento 3 días",
        channel: "whatsapp",
        preview: "Hola {nombre}, quería saber si tuviste oportunidad de...",
    },
    {
        name: "Propuesta comercial",
        channel: "whatsapp",
        preview: "Hola {nombre}, te envío la propuesta que conversamos...",
    },
];

function TemplateCard({ template }: { template: typeof placeholderTemplates[0] }) {
    return (
        <Card className="group">
            <CardContent className="p-4">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <h4 className="text-sm font-medium">{template.name}</h4>
                            <Badge variant="secondary" className="text-xs">
                                {template.channel === "whatsapp" ? (
                                    <>
                                        <MessageCircle className="mr-1 h-3 w-3" />
                                        WhatsApp
                                    </>
                                ) : (
                                    <>
                                        <Mail className="mr-1 h-3 w-3" />
                                        Email
                                    </>
                                )}
                            </Badge>
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                            {template.preview}
                        </p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Copy className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Pencil className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive">
                            <Trash2 className="h-3 w-3" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default function TemplatesPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Templates de mensajes</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Gestiona las plantillas de WhatsApp y email
                    </p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Nuevo template
                </Button>
            </div>

            <Tabs defaultValue="whatsapp">
                <TabsList>
                    <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
                    <TabsTrigger value="email">Email (v1.1)</TabsTrigger>
                </TabsList>

                <TabsContent value="whatsapp" className="mt-4 space-y-3">
                    {placeholderTemplates.map((t, i) => (
                        <TemplateCard key={i} template={t} />
                    ))}
                </TabsContent>

                <TabsContent value="email" className="mt-4">
                    <Card>
                        <CardContent className="p-8 text-center text-muted-foreground">
                            <Mail className="mx-auto h-8 w-8 mb-3" />
                            <p className="text-sm">
                                Templates de email estarán disponibles en la versión 1.1
                            </p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

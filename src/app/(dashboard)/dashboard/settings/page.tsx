"use client";

import { Save, QrCode, MonitorSmartphone, KeySquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Configuración y Conexiones</h1>
                <p className="text-sm text-muted-foreground">Administra tus integraciones y preferencias del CRM</p>
            </div>

            <Tabs defaultValue="integrations">
                <TabsList>
                    <TabsTrigger value="integrations">Integraciones</TabsTrigger>
                    <TabsTrigger value="preferences">Preferencias</TabsTrigger>
                    <TabsTrigger value="api">API & Webhooks</TabsTrigger>
                </TabsList>

                <TabsContent value="integrations" className="mt-4 space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MonitorSmartphone className="h-5 w-5 text-emerald-500" />
                                Conexión WhatsApp (Evolution API / Baileys)
                            </CardTitle>
                            <CardDescription>
                                Conecta tu número para enviar y recibir mensajes desde el CRM.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start bg-muted/30 p-6 rounded-lg border border-dashed">
                                <div className="flex-1 space-y-4 text-center md:text-left">
                                    <div>
                                        <h4 className="font-semibold text-sm">Estado: Desconectado</h4>
                                        <p className="text-xs text-muted-foreground mt-1">Escanea el código QR desde tu WhatsApp para vincular la sesión "Nexo_Default".</p>
                                    </div>
                                    <Button variant="outline"><QrCode className="mr-2 h-4 w-4" /> Generar nuevo QR</Button>
                                </div>
                                <div className="h-40 w-40 bg-white rounded-lg border flex items-center justify-center p-2">
                                    <div className="text-center text-xs text-muted-foreground">
                                        <QrCode className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                        El QR aparecerá aquí
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <KeySquare className="h-5 w-5 text-blue-500" />
                                Google Calendar Sync
                            </CardTitle>
                            <CardDescription>Sincroniza tus tareas y eventos del CRM con Google Calendar.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium">Sincronización bidireccional</p>
                                    <p className="text-xs text-muted-foreground">Requiere autenticación con Google.</p>
                                </div>
                                <Button variant="outline">Conectar Google</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="preferences" className="mt-4 space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Preferencias de notificaciones</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Nuevos leads</Label>
                                    <p className="text-xs text-muted-foreground">Recibir notificación cuando ingrese un lead.</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Recordatorios de tareas</Label>
                                    <p className="text-xs text-muted-foreground">Notificar 15 mins antes de una tarea vencida.</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex justify-end pt-4">
                                <Button><Save className="mr-2 h-4 w-4" /> Guardar cambios</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

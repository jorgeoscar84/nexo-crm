"use client";

import { Shield, Users, Eye, Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const permissionGroups = [
    {
        title: "Leads y Pipeline",
        permissions: [
            { key: "leads.view", label: "Ver leads", admin: true, user: true },
            { key: "leads.create", label: "Crear leads", admin: true, user: true },
            { key: "leads.edit", label: "Editar leads", admin: true, user: true },
            { key: "leads.delete", label: "Eliminar leads", admin: true, user: false },
            { key: "leads.export", label: "Exportar leads", admin: true, user: false },
            { key: "leads.viewAll", label: "Ver leads de otros", admin: true, user: false },
        ],
    },
    {
        title: "Contactos",
        permissions: [
            { key: "contacts.view", label: "Ver contactos", admin: true, user: true },
            { key: "contacts.create", label: "Crear contactos", admin: true, user: true },
            { key: "contacts.edit", label: "Editar contactos", admin: true, user: true },
            { key: "contacts.delete", label: "Eliminar contactos", admin: true, user: false },
        ],
    },
    {
        title: "Socios MLM",
        permissions: [
            { key: "partners.view", label: "Ver socios", admin: true, user: true },
            { key: "partners.create", label: "Crear socios", admin: true, user: true },
            { key: "partners.editKPI", label: "Editar KPIs", admin: true, user: true },
            { key: "partners.viewAll", label: "Ver socios de otros", admin: true, user: false },
        ],
    },
    {
        title: "Reportes",
        permissions: [
            { key: "reports.view", label: "Ver reportes propios", admin: true, user: true },
            { key: "reports.viewGlobal", label: "Ver reportes globales", admin: true, user: false },
            { key: "reports.export", label: "Exportar reportes", admin: true, user: false },
        ],
    },
];

export default function PermissionsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Permisos por rol</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Configura qué puede hacer cada rol en la plataforma
                </p>
            </div>

            <div className="grid gap-6">
                {permissionGroups.map((group) => (
                    <Card key={group.title}>
                        <CardHeader>
                            <h3 className="text-sm font-semibold">{group.title}</h3>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {/* Header */}
                                <div className="grid grid-cols-[1fr,80px,80px] gap-4 text-xs font-semibold text-muted-foreground">
                                    <span>Permiso</span>
                                    <span className="text-center">Admin</span>
                                    <span className="text-center">Usuario</span>
                                </div>
                                <Separator />
                                {/* Permissions */}
                                {group.permissions.map((perm) => (
                                    <div
                                        key={perm.key}
                                        className="grid grid-cols-[1fr,80px,80px] items-center gap-4"
                                    >
                                        <span className="text-sm">{perm.label}</span>
                                        <div className="flex justify-center">
                                            <Switch defaultChecked={perm.admin} />
                                        </div>
                                        <div className="flex justify-center">
                                            <Switch defaultChecked={perm.user} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="flex justify-end">
                <Button>Guardar permisos</Button>
            </div>
        </div>
    );
}

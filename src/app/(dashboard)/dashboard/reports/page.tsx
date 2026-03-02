"use client";

import { Download, BarChart3, Users, Target, HandshakeIcon, ClipboardList, CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const reportTypes = [
    {
        title: "Leads / Pipeline",
        description: "Etapa, origen, seguimientos, conversión, velocidad de cierre",
        icon: Target,
        color: "text-[oklch(0.457_0.24_277)]",
        bg: "bg-[oklch(0.457_0.24_277)]/10",
    },
    {
        title: "Actividad del equipo",
        description: "Tareas completadas, leads gestionados, cierres por usuario",
        icon: Users,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
    },
    {
        title: "KPIs de socios MLM",
        description: "Rango, leads contactados, cierres, reclutamiento, metas",
        icon: HandshakeIcon,
        color: "text-[oklch(0.702_0.191_41)]",
        bg: "bg-[oklch(0.702_0.191_41)]/10",
    },
    {
        title: "Postventa",
        description: "Onboarding, retención, churn rate, satisfacción",
        icon: ClipboardList,
        color: "text-[oklch(0.541_0.213_283)]",
        bg: "bg-[oklch(0.541_0.213_283)]/10",
    },
];

export default function ReportsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Reportes</h1>
                    <p className="text-sm text-muted-foreground">Genera y descarga reportes en Excel</p>
                </div>
                <div className="flex gap-2 items-center">
                    <Select defaultValue="this_month">
                        <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="today">Hoy</SelectItem>
                            <SelectItem value="this_week">Esta semana</SelectItem>
                            <SelectItem value="this_month">Este mes</SelectItem>
                            <SelectItem value="last_month">Mes anterior</SelectItem>
                            <SelectItem value="this_quarter">Este trimestre</SelectItem>
                            <SelectItem value="this_year">Este año</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Report type cards */}
            <div className="grid gap-4 sm:grid-cols-2">
                {reportTypes.map((report) => (
                    <Card key={report.title} className="group hover:shadow-md transition-shadow">
                        <CardContent className="p-5">
                            <div className="flex items-start gap-4">
                                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${report.bg}`}>
                                    <report.icon className={`h-6 w-6 ${report.color}`} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm font-semibold">{report.title}</h3>
                                    <p className="mt-1 text-xs text-muted-foreground">{report.description}</p>
                                    <Button variant="outline" size="sm" className="mt-3">
                                        <Download className="mr-2 h-3 w-3" />
                                        Exportar a Excel
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Scheduled reports */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <h3 className="text-sm font-semibold">Reportes programados</h3>
                    <Badge variant="secondary" className="text-xs">
                        <CalendarClock className="mr-1 h-3 w-3" />
                        Automáticos
                    </Badge>
                </CardHeader>
                <CardContent>
                    <div className="flex h-24 items-center justify-center text-muted-foreground text-sm text-center">
                        Configura reportes automáticos (diario / semanal / mensual) desde aquí
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

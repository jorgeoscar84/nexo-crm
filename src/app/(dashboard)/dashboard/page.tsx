"use client";

import { motion } from "framer-motion";
import {
    Target,
    Users,
    DollarSign,
    CheckCircle2,
    TrendingUp,
    ArrowUpRight,
    CalendarDays,
    ClipboardList,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const kpis = [
    { label: "Leads activos", value: "—", change: "+0", icon: Target, color: "text-[oklch(0.457_0.24_277)]", bg: "bg-[oklch(0.457_0.24_277)]/10" },
    { label: "Contactos", value: "—", change: "+0", icon: Users, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Cierres este mes", value: "—", change: "+0", icon: CheckCircle2, color: "text-[oklch(0.702_0.191_41)]", bg: "bg-[oklch(0.702_0.191_41)]/10" },
    { label: "Valor pipeline", value: "—", change: "+0%", icon: DollarSign, color: "text-[oklch(0.541_0.213_283)]", bg: "bg-[oklch(0.541_0.213_283)]/10" },
];

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            {/* Welcome */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Buen día 👋</h1>
                    <p className="text-sm text-muted-foreground">
                        Aquí está el resumen de tu actividad
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/dashboard/tasks">
                            <ClipboardList className="mr-2 h-4 w-4" />
                            Tareas
                        </Link>
                    </Button>
                    <Button size="sm" asChild>
                        <Link href="/dashboard/pipeline">
                            <TrendingUp className="mr-2 h-4 w-4" />
                            Pipeline
                        </Link>
                    </Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {kpis.map((kpi, i) => (
                    <motion.div
                        key={kpi.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.08 }}
                    >
                        <Card className="group hover:shadow-md transition-shadow">
                            <CardContent className="p-5">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                            {kpi.label}
                                        </p>
                                        <p className="mt-2 text-3xl font-bold">{kpi.value}</p>
                                        <p className="mt-1 text-xs text-emerald-500 flex items-center gap-1">
                                            <ArrowUpRight className="h-3 w-3" />
                                            {kpi.change} vs mes anterior
                                        </p>
                                    </div>
                                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${kpi.bg} transition-transform group-hover:scale-110`}>
                                        <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Main content grid */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Pipeline summary */}
                <Card className="lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <h3 className="text-sm font-semibold">Pipeline de ventas</h3>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/dashboard/pipeline">Ver todo</Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="flex h-48 items-center justify-center text-muted-foreground text-sm">
                            Gráfico de embudo del pipeline — Se conectará con datos de Appwrite
                        </div>
                    </CardContent>
                </Card>

                {/* Upcoming tasks */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <h3 className="text-sm font-semibold">Próximas tareas</h3>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/dashboard/tasks">Ver todas</Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="flex h-48 items-center justify-center text-muted-foreground text-sm text-center">
                            Tus tareas pendientes aparecerán aquí
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Bottom row */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Recent activity */}
                <Card>
                    <CardHeader>
                        <h3 className="text-sm font-semibold">Actividad reciente</h3>
                    </CardHeader>
                    <CardContent>
                        <div className="flex h-40 items-center justify-center text-muted-foreground text-sm">
                            Tu actividad reciente aparecerá aquí
                        </div>
                    </CardContent>
                </Card>

                {/* Calendar preview */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <h3 className="text-sm font-semibold">Próximos eventos</h3>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/dashboard/calendar">
                                <CalendarDays className="mr-1 h-3 w-3" />
                                Calendario
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="flex h-40 items-center justify-center text-muted-foreground text-sm">
                            Tus próximos eventos aparecerán aquí
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

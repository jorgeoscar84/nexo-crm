"use client";

import { motion } from "framer-motion";
import { Users, Target, UserCheck, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const metrics = [
    {
        label: "Usuarios totales",
        value: "—",
        change: "+0%",
        icon: Users,
        color: "text-[oklch(0.457_0.24_277)]",
        bg: "bg-[oklch(0.457_0.24_277)]/10",
    },
    {
        label: "Leads activos",
        value: "—",
        change: "+0%",
        icon: Target,
        color: "text-[oklch(0.702_0.191_41)]",
        bg: "bg-[oklch(0.702_0.191_41)]/10",
    },
    {
        label: "Contactos",
        value: "—",
        change: "+0%",
        icon: UserCheck,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
    },
    {
        label: "Suscripciones activas",
        value: "—",
        change: "+0%",
        icon: CreditCard,
        color: "text-[oklch(0.541_0.213_283)]",
        bg: "bg-[oklch(0.541_0.213_283)]/10",
    },
];

export default function AdminDashboardPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold">Métricas globales</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Vista general de toda la plataforma
                </p>
            </div>

            {/* Metric cards */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {metrics.map((metric, i) => (
                    <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                    >
                        <Card>
                            <CardContent className="p-5">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            {metric.label}
                                        </p>
                                        <p className="mt-1 text-3xl font-bold">{metric.value}</p>
                                    </div>
                                    <div
                                        className={`flex h-12 w-12 items-center justify-center rounded-xl ${metric.bg}`}
                                    >
                                        <metric.icon className={`h-6 w-6 ${metric.color}`} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Placeholder for charts */}
            <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <h3 className="text-sm font-semibold">Registros por mes</h3>
                    </CardHeader>
                    <CardContent>
                        <div className="flex h-64 items-center justify-center text-muted-foreground text-sm">
                            Gráfico de registros — Se conectará con datos reales de Appwrite
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <h3 className="text-sm font-semibold">Ingresos por método de pago</h3>
                    </CardHeader>
                    <CardContent>
                        <div className="flex h-64 items-center justify-center text-muted-foreground text-sm">
                            Gráfico de ingresos — Se conectará con datos reales de Appwrite
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

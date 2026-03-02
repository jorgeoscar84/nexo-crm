"use client";

import { useState } from "react";
import { Plus, Search, Download, Target, Trophy, Users, TrendingUp, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const partnerKpis = [
    { label: "Socios activos", value: "—", icon: Users, color: "text-[oklch(0.457_0.24_277)]", bg: "bg-[oklch(0.457_0.24_277)]/10" },
    { label: "Leads contactados", value: "—", icon: Target, color: "text-[oklch(0.702_0.191_41)]", bg: "bg-[oklch(0.702_0.191_41)]/10" },
    { label: "Cierres totales", value: "—", icon: Trophy, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Nuevos reclutas", value: "—", icon: TrendingUp, color: "text-[oklch(0.541_0.213_283)]", bg: "bg-[oklch(0.541_0.213_283)]/10" },
];

export default function PartnersPage() {
    const [search, setSearch] = useState("");

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Socios MLM</h1>
                    <p className="text-sm text-muted-foreground">Gestión de tu red de socios</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" />Exportar KPIs</Button>
                    <Button size="sm"><Plus className="mr-2 h-4 w-4" />Nuevo socio</Button>
                </div>
            </div>

            {/* Partner KPI cards */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {partnerKpis.map((kpi) => (
                    <Card key={kpi.label}>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-muted-foreground">{kpi.label}</p>
                                    <p className="mt-1 text-2xl font-bold">{kpi.value}</p>
                                </div>
                                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${kpi.bg}`}>
                                    <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardContent className="p-4">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input placeholder="Buscar socios..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Rango</TableHead>
                                <TableHead>Leads contactados</TableHead>
                                <TableHead>Cierres</TableHead>
                                <TableHead>Reclutas</TableHead>
                                <TableHead>Metas vs logros</TableHead>
                                <TableHead>Ingreso</TableHead>
                                <TableHead className="w-10"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={8} className="h-32 text-center text-muted-foreground">
                                    Los socios aparecerán aquí una vez conectado con Appwrite
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

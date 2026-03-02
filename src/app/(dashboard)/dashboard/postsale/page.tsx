"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

type Stage = { id: string; name: string; color: string };

const stages: Stage[] = [
    { id: "onboarding", name: "Onboarding", color: "#6366f1" },
    { id: "active", name: "Activo", color: "#22c55e" },
    { id: "atrisk", name: "En riesgo", color: "#f59e0b" },
    { id: "support", name: "Soporte", color: "#3b82f6" },
    { id: "churned", name: "Churned", color: "#ef4444" },
];

function Column({ stage }: { stage: Stage }) {
    return (
        <div className="flex w-64 shrink-0 flex-col rounded-xl bg-muted/50">
            <div className="flex items-center gap-2 p-3 pb-2">
                <div className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: stage.color }} />
                <h3 className="text-sm font-semibold">{stage.name}</h3>
                <Badge variant="secondary" className="ml-auto text-[10px]">0</Badge>
            </div>
            <div className="flex-1 min-h-[180px] px-3 pb-3">
                <div className="flex h-24 items-center justify-center rounded-lg border-2 border-dashed text-xs text-muted-foreground">
                    Arrastra clientes aquí
                </div>
            </div>
            <div className="p-2 pt-0">
                <Button variant="ghost" size="sm" className="w-full text-xs text-muted-foreground">
                    <Plus className="mr-1 h-3 w-3" />Agregar caso
                </Button>
            </div>
        </div>
    );
}

export default function PostsalePage() {
    const [search, setSearch] = useState("");

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Pipeline de postventa</h1>
                    <p className="text-sm text-muted-foreground">Seguimiento de clientes después del cierre</p>
                </div>
                <Button><Plus className="mr-2 h-4 w-4" />Nuevo caso</Button>
            </div>
            <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Buscar casos..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
            </div>
            <div className="overflow-x-auto pb-4">
                <div className="flex gap-4 min-w-max">
                    {stages.map((s) => <Column key={s.id} stage={s} />)}
                </div>
            </div>
        </div>
    );
}

"use client";

import { useState } from "react";
import { Plus, Search, Filter, CheckCircle2, Circle, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const statusIcons = {
    pending: <Circle className="h-4 w-4 text-muted-foreground" />,
    in_progress: <Clock className="h-4 w-4 text-blue-500" />,
    overdue: <AlertCircle className="h-4 w-4 text-destructive" />,
    done: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
};

export default function TasksPage() {
    const [search, setSearch] = useState("");

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Tareas</h1>
                    <p className="text-sm text-muted-foreground">Gestiona tus tareas y subtareas</p>
                </div>
                <Button><Plus className="mr-2 h-4 w-4" />Nueva tarea</Button>
            </div>

            <Tabs defaultValue="all">
                <TabsList>
                    <TabsTrigger value="all">Todas</TabsTrigger>
                    <TabsTrigger value="assigned">Asignadas a mí</TabsTrigger>
                    <TabsTrigger value="overdue">Vencidas</TabsTrigger>
                    <TabsTrigger value="done">Completadas</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-4 space-y-4">
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input placeholder="Buscar tareas..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
                                </div>
                                <Select defaultValue="all">
                                    <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Prioridad</SelectItem>
                                        <SelectItem value="urgent">Urgente</SelectItem>
                                        <SelectItem value="high">Alta</SelectItem>
                                        <SelectItem value="medium">Media</SelectItem>
                                        <SelectItem value="low">Baja</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6 text-center text-muted-foreground">
                            <ClipboardIcon className="mx-auto h-10 w-10 mb-3 text-muted-foreground/50" />
                            <p className="text-sm font-medium">No hay tareas todavía</p>
                            <p className="text-xs mt-1">Crea tu primera tarea con el botón superior</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

function ClipboardIcon({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="M12 11h4" /><path d="M12 16h4" /><path d="M8 11h.01" /><path d="M8 16h.01" /></svg>;
}

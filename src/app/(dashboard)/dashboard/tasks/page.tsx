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
import { useCrmStore } from "@/store/useCrmStore";
import { listTasks, type Task } from "@/features/tasks/lib/tasks-service";
import { useEffect } from "react";
import { toast } from "sonner";
import { RefreshCw, ClipboardList } from "lucide-react";

const statusIcons = {
    pending: <Circle className="h-4 w-4 text-muted-foreground" />,
    in_progress: <Clock className="h-4 w-4 text-blue-500" />,
    overdue: <AlertCircle className="h-4 w-4 text-destructive" />,
    done: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
};

export default function TasksPage() {
    const { setNewTaskModalOpen } = useCrmStore();
    const [search, setSearch] = useState("");
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadTasks = async () => {
        try {
            setIsLoading(true);
            const data = await listTasks();
            setTasks(data.tasks);
        } catch (error) {
            console.error(error);
            toast.error("Error al cargar tareas");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadTasks();
    }, []);

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

                    <div className="space-y-3">
                        {isLoading ? (
                            <Card>
                                <CardContent className="p-6 text-center text-muted-foreground">
                                    Cargando tareas...
                                </CardContent>
                            </Card>
                        ) : tasks.length === 0 ? (
                            <Card>
                                <CardContent className="p-6 text-center text-muted-foreground">
                                    <ClipboardList className="mx-auto h-10 w-10 mb-3 text-muted-foreground/50" />
                                    <p className="text-sm font-medium">No hay tareas todavía</p>
                                    <p className="text-xs mt-1">Crea tu primera tarea con el botón superior</p>
                                </CardContent>
                            </Card>
                        ) : (
                            tasks.map((task) => (
                                <Card key={task.$id} className="hover:bg-muted/30 transition-colors">
                                    <CardContent className="p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            {task.status === 'completed' ? (
                                                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                            ) : (
                                                <Circle className="h-5 w-5 text-muted-foreground" />
                                            )}
                                            <div>
                                                <p className={`font-medium ${task.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>
                                                    {task.title}
                                                </p>
                                                <p className="text-xs text-muted-foreground">{task.description}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant={
                                                task.priority === 'urgent' ? 'destructive' :
                                                    task.priority === 'high' ? 'secondary' :
                                                        'outline'
                                            }>
                                                {task.priority}
                                            </Badge>
                                            {task.dueDate && (
                                                <div className="flex items-center text-xs text-muted-foreground">
                                                    <Clock className="mr-1 h-3 w-3" />
                                                    {new Date(task.dueDate).toLocaleDateString()}
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

function ClipboardIcon({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="M12 11h4" /><path d="M12 16h4" /><path d="M8 11h.01" /><path d="M8 16h.01" /></svg>;
}

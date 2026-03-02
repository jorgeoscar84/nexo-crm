"use client";

import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function LogsPage() {
    const [search, setSearch] = useState("");
    const [actionFilter, setActionFilter] = useState("all");

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Logs de actividad</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Registro de todas las acciones de los usuarios en la plataforma
                </p>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Buscar por usuario o acción..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Select value={actionFilter} onValueChange={setActionFilter}>
                            <SelectTrigger className="w-44">
                                <SelectValue placeholder="Acción" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todas las acciones</SelectItem>
                                <SelectItem value="login">Login</SelectItem>
                                <SelectItem value="create">Crear</SelectItem>
                                <SelectItem value="update">Actualizar</SelectItem>
                                <SelectItem value="delete">Eliminar</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Logs table */}
            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Fecha</TableHead>
                                <TableHead>Usuario</TableHead>
                                <TableHead>Acción</TableHead>
                                <TableHead>Entidad</TableHead>
                                <TableHead>Detalles</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                                    Los logs aparecerán aquí una vez conectado con Appwrite.
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

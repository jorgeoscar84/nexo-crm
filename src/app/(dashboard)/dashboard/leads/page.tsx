"use client";

import { useState } from "react";
import { Plus, Search, Upload, Download, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function LeadsPage() {
    const [search, setSearch] = useState("");

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Leads</h1>
                    <p className="text-sm text-muted-foreground">Lista completa de todos tus prospectos</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <Upload className="mr-2 h-4 w-4" />Importar
                    </Button>
                    <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />Exportar
                    </Button>
                    <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" />Nuevo lead
                    </Button>
                </div>
            </div>

            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input placeholder="Buscar por nombre, email, empresa..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
                        </div>
                        <Select defaultValue="all">
                            <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todas las etapas</SelectItem>
                                <SelectItem value="new">Nuevo</SelectItem>
                                <SelectItem value="contacted">Contactado</SelectItem>
                                <SelectItem value="proposal">Propuesta</SelectItem>
                                <SelectItem value="negotiating">Negociando</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select defaultValue="all">
                            <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos los orígenes</SelectItem>
                                <SelectItem value="whatsapp">WhatsApp</SelectItem>
                                <SelectItem value="referral">Referido</SelectItem>
                                <SelectItem value="website">Sitio web</SelectItem>
                                <SelectItem value="import">Importación</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Empresa</TableHead>
                                <TableHead>Etapa</TableHead>
                                <TableHead>Origen</TableHead>
                                <TableHead>Score</TableHead>
                                <TableHead>Creado</TableHead>
                                <TableHead className="w-10"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                                    Los leads aparecerán aquí una vez conectado con Appwrite
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

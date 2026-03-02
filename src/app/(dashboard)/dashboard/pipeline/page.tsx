"use client";

import { useState, useCallback } from "react";
import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragStartEvent,
    type DragEndEvent,
    type DragOverEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDroppable } from "@dnd-kit/core";
import {
    Plus,
    Search,
    Filter,
    MoreHorizontal,
    Building2,
    GripVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// ─── Types ──────────────────────────────
type Stage = { id: string; name: string; color: string };
type Lead = { id: string; name: string; company?: string; source: string; score?: number };

const defaultStages: Stage[] = [
    { id: "new", name: "Nuevo", color: "#6366f1" },
    { id: "contacted", name: "Contactado", color: "#f59e0b" },
    { id: "proposal", name: "Propuesta", color: "#3b82f6" },
    { id: "negotiating", name: "Negociando", color: "#8b5cf6" },
    { id: "won", name: "Cerrado ✓", color: "#22c55e" },
    { id: "lost", name: "Perdido ✗", color: "#ef4444" },
];

// Demo leads for testing drag & drop
const demoLeads: Record<string, Lead[]> = {
    new: [
        { id: "l1", name: "María García", company: "TechCorp", source: "WhatsApp", score: 85 },
        { id: "l2", name: "Carlos López", company: "DataPro", source: "Referido", score: 70 },
        { id: "l3", name: "Ana Martínez", source: "Sitio web", score: 60 },
    ],
    contacted: [
        { id: "l4", name: "Pedro Sánchez", company: "CloudInc", source: "WhatsApp", score: 75 },
        { id: "l5", name: "Laura Díaz", source: "Import", score: 55 },
    ],
    proposal: [
        { id: "l6", name: "Roberto Ruiz", company: "SoftMax", source: "Referido", score: 90 },
    ],
    negotiating: [
        { id: "l7", name: "Diana Flores", company: "NetGroup", source: "WhatsApp", score: 95 },
    ],
    won: [],
    lost: [],
};

// ─── Sortable Lead Card ─────────────────
function SortableLeadCard({ lead }: { lead: Lead }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: lead.id, data: { type: "lead", lead } });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={cn(
                "group rounded-lg border bg-card p-3 shadow-sm hover:shadow-md transition-shadow",
                isDragging && "opacity-50 shadow-lg ring-2 ring-primary/30"
            )}
        >
            <div className="flex items-start gap-2">
                <button
                    {...attributes}
                    {...listeners}
                    className="mt-0.5 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground touch-none"
                >
                    <GripVertical className="h-4 w-4" />
                </button>
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                        <div className="min-w-0">
                            <p className="text-sm font-medium truncate">{lead.name}</p>
                            {lead.company && (
                                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                    <Building2 className="h-3 w-3" />
                                    {lead.company}
                                </p>
                            )}
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 opacity-0 group-hover:opacity-100 shrink-0"
                                >
                                    <MoreHorizontal className="h-3 w-3" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>Ver ficha</DropdownMenuItem>
                                <DropdownMenuItem>Editar</DropdownMenuItem>
                                <DropdownMenuItem>Convertir a contacto</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">Eliminar</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                        <Badge variant="secondary" className="text-[10px] px-1.5">
                            {lead.source}
                        </Badge>
                        {lead.score !== undefined && (
                            <span className="text-[10px] text-muted-foreground">
                                Score: {lead.score}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Lead Card Overlay (while dragging) ─
function LeadCardOverlay({ lead }: { lead: Lead }) {
    return (
        <div className="rounded-lg border bg-card p-3 shadow-xl ring-2 ring-primary/40 w-[260px] rotate-2">
            <div className="flex items-start gap-2">
                <GripVertical className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div>
                    <p className="text-sm font-medium">{lead.name}</p>
                    {lead.company && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                            <Building2 className="h-3 w-3" />
                            {lead.company}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

// ─── Droppable Kanban Column ────────────
function KanbanColumn({
    stage,
    leads,
}: {
    stage: Stage;
    leads: Lead[];
}) {
    const { setNodeRef, isOver } = useDroppable({ id: stage.id });

    return (
        <div className="flex w-72 shrink-0 flex-col rounded-xl bg-muted/50">
            {/* Column header */}
            <div className="flex items-center gap-2 p-3 pb-2">
                <div className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: stage.color }} />
                <h3 className="text-sm font-semibold truncate">{stage.name}</h3>
                <Badge variant="secondary" className="ml-auto text-[10px]">
                    {leads.length}
                </Badge>
            </div>

            {/* Droppable area */}
            <div
                ref={setNodeRef}
                className={cn(
                    "flex-1 space-y-2 overflow-y-auto px-3 pb-3 min-h-[200px] rounded-b-xl transition-colors",
                    isOver && "bg-primary/5 ring-2 ring-inset ring-primary/20"
                )}
            >
                <SortableContext items={leads.map((l) => l.id)} strategy={verticalListSortingStrategy}>
                    {leads.length > 0 ? (
                        leads.map((lead) => <SortableLeadCard key={lead.id} lead={lead} />)
                    ) : (
                        <div className={cn(
                            "flex h-24 items-center justify-center rounded-lg border-2 border-dashed text-xs text-muted-foreground transition-colors",
                            isOver && "border-primary/40 bg-primary/5 text-primary"
                        )}>
                            {isOver ? "Soltar aquí" : "Arrastra leads aquí"}
                        </div>
                    )}
                </SortableContext>
            </div>

            {/* Add lead */}
            <div className="p-2 pt-0">
                <Button variant="ghost" size="sm" className="w-full text-xs text-muted-foreground">
                    <Plus className="mr-1 h-3 w-3" />
                    Agregar lead
                </Button>
            </div>
        </div>
    );
}

// ─── Pipeline Page ──────────────────────
export default function PipelinePage() {
    const [search, setSearch] = useState("");
    const [columns, setColumns] = useState<Record<string, Lead[]>>(demoLeads);
    const [activeLead, setActiveLead] = useState<Lead | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    // Find which column a lead belongs to
    const findColumn = useCallback(
        (id: string): string | undefined => {
            // Check if the id itself is a column
            if (id in columns) return id;
            // Otherwise find which column contains the lead
            return Object.keys(columns).find((key) =>
                columns[key].some((lead) => lead.id === id)
            );
        },
        [columns]
    );

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        const lead = active.data.current?.lead as Lead | undefined;
        if (lead) setActiveLead(lead);
    };

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;
        if (!over) return;

        const activeCol = findColumn(active.id as string);
        const overCol = findColumn(over.id as string) || (over.id as string);

        if (!activeCol || !overCol || activeCol === overCol) return;

        setColumns((prev) => {
            const activeItems = [...prev[activeCol]];
            const overItems = [...prev[overCol]];
            const activeIndex = activeItems.findIndex((l) => l.id === active.id);
            const [movedLead] = activeItems.splice(activeIndex, 1);

            // Find insert position
            const overIndex = overItems.findIndex((l) => l.id === over.id);
            const insertIndex = overIndex >= 0 ? overIndex : overItems.length;

            overItems.splice(insertIndex, 0, movedLead);

            return { ...prev, [activeCol]: activeItems, [overCol]: overItems };
        });
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveLead(null);

        if (!over) return;

        const activeCol = findColumn(active.id as string);
        const overCol = findColumn(over.id as string) || (over.id as string);

        if (!activeCol || !overCol) return;

        if (activeCol === overCol) {
            // Reorder within same column
            const items = [...columns[activeCol]];
            const oldIndex = items.findIndex((l) => l.id === active.id);
            const newIndex = items.findIndex((l) => l.id === over.id);
            if (oldIndex !== newIndex && newIndex >= 0) {
                setColumns((prev) => ({
                    ...prev,
                    [activeCol]: arrayMove(items, oldIndex, newIndex),
                }));
            }
        }

        // Show toast on cross-column move
        if (activeCol !== overCol) {
            const stageName = defaultStages.find((s) => s.id === overCol)?.name || overCol;
            toast.success(`Lead movido a "${stageName}"`);
        }
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Pipeline de ventas</h1>
                    <p className="text-sm text-muted-foreground">
                        Arrastra leads entre etapas para actualizar su estado
                    </p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Nuevo lead
                </Button>
            </div>

            {/* Search bar */}
            <div className="flex gap-3">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Buscar leads..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                </Button>
            </div>

            {/* Kanban board with DnD */}
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
            >
                <div className="overflow-x-auto pb-4">
                    <div className="flex gap-4 min-w-max">
                        {defaultStages.map((stage) => (
                            <KanbanColumn
                                key={stage.id}
                                stage={stage}
                                leads={columns[stage.id] || []}
                            />
                        ))}
                    </div>
                </div>

                {/* Drag Overlay — follows cursor */}
                <DragOverlay>
                    {activeLead ? <LeadCardOverlay lead={activeLead} /> : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
}

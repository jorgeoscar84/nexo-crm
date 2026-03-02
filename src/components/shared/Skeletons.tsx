"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

// ─── KPI Cards Skeleton ─────────────────
export function KpiCardsSkeleton({ count = 4 }: { count?: number }) {
    return (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: count }).map((_, i) => (
                <Card key={i}>
                    <CardContent className="p-5">
                        <div className="flex items-center justify-between">
                            <div className="space-y-2">
                                <Skeleton className="h-3 w-24" />
                                <Skeleton className="h-8 w-16" />
                                <Skeleton className="h-3 w-20" />
                            </div>
                            <Skeleton className="h-12 w-12 rounded-xl" />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

// ─── Table Skeleton ─────────────────────
export function TableSkeleton({ rows = 5, cols = 5 }: { rows?: number; cols?: number }) {
    return (
        <Card>
            <CardContent className="p-0">
                <div className="border-b p-4">
                    <div className="flex gap-4">
                        {Array.from({ length: cols }).map((_, i) => (
                            <Skeleton key={i} className="h-4 w-24" />
                        ))}
                    </div>
                </div>
                <div className="divide-y">
                    {Array.from({ length: rows }).map((_, r) => (
                        <div key={r} className="flex gap-4 p-4">
                            {Array.from({ length: cols }).map((_, c) => (
                                <Skeleton
                                    key={c}
                                    className={`h-4 ${c === 0 ? "w-32" : "w-20"}`}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

// ─── Kanban Skeleton ────────────────────
export function KanbanSkeleton({ columns = 6 }: { columns?: number }) {
    return (
        <div className="flex gap-4 overflow-x-auto pb-4">
            {Array.from({ length: columns }).map((_, i) => (
                <div key={i} className="w-72 shrink-0 rounded-xl bg-muted/50 p-3 space-y-3">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-3 w-3 rounded-full" />
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="ml-auto h-5 w-6 rounded-full" />
                    </div>
                    {Array.from({ length: 2 + Math.floor(Math.random() * 2) }).map(
                        (_, j) => (
                            <div key={j} className="rounded-lg border bg-card p-3 space-y-2">
                                <Skeleton className="h-4 w-28" />
                                <Skeleton className="h-3 w-20" />
                                <div className="flex gap-2">
                                    <Skeleton className="h-5 w-14 rounded-full" />
                                    <Skeleton className="h-5 w-10 rounded-full" />
                                </div>
                            </div>
                        )
                    )}
                </div>
            ))}
        </div>
    );
}

// ─── Chat Skeleton ──────────────────────
export function ChatSkeleton() {
    return (
        <div className="flex h-[calc(100vh-7rem)] rounded-xl border bg-card overflow-hidden">
            {/* Sidebar */}
            <div className="w-80 border-r p-3 space-y-3">
                <Skeleton className="h-8 w-full rounded-lg" />
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                        <div className="flex-1 space-y-1">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-3 w-32" />
                        </div>
                    </div>
                ))}
            </div>
            {/* Chat area */}
            <div className="flex-1 flex flex-col">
                <div className="border-b p-3 flex items-center gap-3">
                    <Skeleton className="h-9 w-9 rounded-full" />
                    <Skeleton className="h-4 w-28" />
                </div>
                <div className="flex-1 p-4 space-y-4">
                    <div className="flex justify-start">
                        <Skeleton className="h-12 w-48 rounded-2xl" />
                    </div>
                    <div className="flex justify-end">
                        <Skeleton className="h-10 w-36 rounded-2xl" />
                    </div>
                    <div className="flex justify-start">
                        <Skeleton className="h-16 w-56 rounded-2xl" />
                    </div>
                </div>
                <div className="border-t p-3">
                    <Skeleton className="h-10 w-full rounded-lg" />
                </div>
            </div>
        </div>
    );
}

// ─── Calendar Skeleton ──────────────────
export function CalendarSkeleton() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <Skeleton className="h-8 w-8 rounded" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-8 w-8 rounded" />
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-7 gap-1 mb-2">
                    {Array.from({ length: 7 }).map((_, i) => (
                        <Skeleton key={i} className="h-4 w-full" />
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-px">
                    {Array.from({ length: 35 }).map((_, i) => (
                        <Skeleton key={i} className="h-20 rounded-lg" />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

// ─── Dashboard Page Skeleton ────────────
export function DashboardSkeleton() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-7 w-40" />
                    <Skeleton className="h-4 w-56" />
                </div>
                <div className="flex gap-2">
                    <Skeleton className="h-9 w-24 rounded-lg" />
                    <Skeleton className="h-9 w-24 rounded-lg" />
                </div>
            </div>
            <KpiCardsSkeleton />
            <div className="grid gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <Skeleton className="h-4 w-36" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-48 w-full rounded-lg" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <Skeleton className="h-4 w-28" />
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Skeleton key={i} className="h-10 w-full rounded-lg" />
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Users,
    BarChart3,
    Settings,
    Columns3,
    FileText,
    Activity,
    Tag,
    Shield,
    ChevronLeft,
    Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const navItems = [
    {
        title: "General",
        items: [
            { label: "Métricas", href: "/admin", icon: BarChart3 },
            { label: "Usuarios", href: "/admin/users", icon: Users },
            { label: "Logs de actividad", href: "/admin/logs", icon: Activity },
        ],
    },
    {
        title: "Configuración",
        items: [
            { label: "Pipeline", href: "/admin/pipeline", icon: Columns3 },
            { label: "Campos personalizados", href: "/admin/fields", icon: Settings },
            { label: "Templates", href: "/admin/templates", icon: FileText },
        ],
    },
    {
        title: "Negocio",
        items: [
            { label: "Cupones", href: "/admin/coupons", icon: Tag },
            { label: "Permisos", href: "/admin/permissions", icon: Shield },
        ],
    },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="flex w-64 flex-col border-r bg-card">
            {/* Header */}
            <div className="flex h-16 items-center gap-2 border-b px-4">
                <Link href="/dashboard" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg nexo-gradient">
                        <Zap className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-bold text-sm">Nexo Admin</span>
                </Link>
            </div>

            {/* Back to Dashboard */}
            <div className="px-3 pt-3">
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs" asChild>
                    <Link href="/dashboard">
                        <ChevronLeft className="mr-1 h-3 w-3" />
                        Volver al Dashboard
                    </Link>
                </Button>
            </div>

            {/* Nav */}
            <ScrollArea className="flex-1 px-3 py-4">
                <div className="space-y-6">
                    {navItems.map((group) => (
                        <div key={group.title}>
                            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                {group.title}
                            </p>
                            <div className="space-y-1">
                                {group.items.map((item) => {
                                    const isActive =
                                        pathname === item.href ||
                                        (item.href !== "/admin" && pathname.startsWith(item.href));

                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={cn(
                                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                                                isActive
                                                    ? "bg-primary/10 text-primary font-medium"
                                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                            )}
                                        >
                                            <item.icon className="h-4 w-4 shrink-0" />
                                            {item.label}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </aside>
    );
}

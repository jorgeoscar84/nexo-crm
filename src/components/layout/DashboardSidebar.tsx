"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Kanban,
    Users,
    UserCheck,
    HandshakeIcon,
    ClipboardList,
    CalendarDays,
    BarChart3,
    MessageCircle,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Zap,
    FolderKanban,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

const navItems = [
    {
        title: "Principal",
        items: [
            { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
            { label: "Pipeline", href: "/dashboard/pipeline", icon: Kanban },
            { label: "Postventa", href: "/dashboard/postsale", icon: FolderKanban },
        ],
    },
    {
        title: "CRM",
        items: [
            { label: "Leads", href: "/dashboard/leads", icon: Users },
            { label: "Contactos", href: "/dashboard/contacts", icon: UserCheck },
            { label: "Socios MLM", href: "/dashboard/partners", icon: HandshakeIcon },
        ],
    },
    {
        title: "Productividad",
        items: [
            { label: "Tareas", href: "/dashboard/tasks", icon: ClipboardList },
            { label: "Calendario", href: "/dashboard/calendar", icon: CalendarDays },
            { label: "WhatsApp", href: "/dashboard/whatsapp", icon: MessageCircle },
        ],
    },
    {
        title: "Análisis y Config",
        items: [
            { label: "Reportes", href: "/dashboard/reports", icon: BarChart3 },
            { label: "Configuración", href: "/dashboard/settings", icon: Settings },
        ],
    },
];

export function DashboardSidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside
            className={cn(
                "flex flex-col border-r bg-card transition-all duration-300",
                collapsed ? "w-16" : "w-60"
            )}
        >
            {/* Logo */}
            <div className="flex h-16 items-center border-b px-3">
                <Link href="/dashboard" className="flex items-center gap-2 overflow-hidden">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg nexo-gradient">
                        <Zap className="h-5 w-5 text-white" />
                    </div>
                    {!collapsed && (
                        <span className="text-lg font-bold tracking-tight whitespace-nowrap">
                            Nexo <span className="text-primary">CRM</span>
                        </span>
                    )}
                </Link>
            </div>

            {/* Navigation */}
            <ScrollArea className="flex-1 py-3">
                <div className="space-y-5 px-2">
                    {navItems.map((group) => (
                        <div key={group.title}>
                            {!collapsed && (
                                <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                                    {group.title}
                                </p>
                            )}
                            <div className="space-y-0.5">
                                {group.items.map((item) => {
                                    const isActive =
                                        pathname === item.href ||
                                        (item.href !== "/dashboard" &&
                                            pathname.startsWith(item.href));

                                    const linkContent = (
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                                                collapsed && "justify-center px-0",
                                                isActive
                                                    ? "bg-primary/10 text-primary font-medium"
                                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                            )}
                                        >
                                            <item.icon className="h-4 w-4 shrink-0" />
                                            {!collapsed && <span>{item.label}</span>}
                                        </Link>
                                    );

                                    if (collapsed) {
                                        return (
                                            <Tooltip key={item.href} delayDuration={0}>
                                                <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                                                <TooltipContent side="right">
                                                    {item.label}
                                                </TooltipContent>
                                            </Tooltip>
                                        );
                                    }

                                    return <div key={item.href}>{linkContent}</div>;
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>

            {/* Bottom */}
            <div className="border-t p-2">
                <Button
                    variant="ghost"
                    size="icon"
                    className="w-full h-9"
                    onClick={() => setCollapsed(!collapsed)}
                    aria-label={collapsed ? "Expandir sidebar" : "Colapsar sidebar"}
                >
                    {collapsed ? (
                        <ChevronRight className="h-4 w-4" />
                    ) : (
                        <ChevronLeft className="h-4 w-4" />
                    )}
                </Button>
            </div>
        </aside>
    );
}

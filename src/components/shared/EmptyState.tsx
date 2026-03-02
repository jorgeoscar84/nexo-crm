"use client";

import { cn } from "@/lib/utils";
import { Inbox, SearchX, WifiOff, AlertTriangle, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
    icon?: "inbox" | "search" | "offline" | "warning" | "folder";
    title: string;
    description?: string;
    action?: {
        label: string;
        onClick: () => void;
    };
    className?: string;
}

const iconMap = {
    inbox: Inbox,
    search: SearchX,
    offline: WifiOff,
    warning: AlertTriangle,
    folder: FolderOpen,
};

export function EmptyState({
    icon = "inbox",
    title,
    description,
    action,
    className,
}: EmptyStateProps) {
    const Icon = iconMap[icon];

    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center py-12 px-6 text-center",
                className
            )}
        >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted mb-4">
                <Icon className="h-7 w-7 text-muted-foreground" />
            </div>
            <h3 className="text-sm font-semibold">{title}</h3>
            {description && (
                <p className="mt-1 text-xs text-muted-foreground max-w-xs">
                    {description}
                </p>
            )}
            {action && (
                <Button
                    size="sm"
                    variant="outline"
                    className="mt-4"
                    onClick={action.onClick}
                >
                    {action.label}
                </Button>
            )}
        </div>
    );
}

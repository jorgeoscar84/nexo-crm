"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    CheckCircle2,
    AlertCircle,
    Info,
    XCircle,
    X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

type ConfirmDialogProps = {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: "danger" | "warning" | "default";
    loading?: boolean;
};

export function ConfirmDialog({
    open,
    onClose,
    onConfirm,
    title,
    description,
    confirmLabel = "Confirmar",
    cancelLabel = "Cancelar",
    variant = "default",
    loading = false,
}: ConfirmDialogProps) {
    const variantStyles = {
        danger: {
            icon: <XCircle className="h-6 w-6 text-destructive" />,
            bg: "bg-destructive/10",
            btn: "bg-destructive hover:bg-destructive/90 text-white",
        },
        warning: {
            icon: <AlertCircle className="h-6 w-6 text-amber-500" />,
            bg: "bg-amber-500/10",
            btn: "bg-amber-500 hover:bg-amber-600 text-white",
        },
        default: {
            icon: <Info className="h-6 w-6 text-primary" />,
            bg: "bg-primary/10",
            btn: "bg-primary hover:bg-primary/90 text-primary-foreground",
        },
    };

    const style = variantStyles[variant];

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    {/* Dialog */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2"
                    >
                        <div className="rounded-xl border bg-card p-6 shadow-lg">
                            <div className="flex items-start gap-4">
                                <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", style.bg)}>
                                    {style.icon}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm font-semibold">{title}</h3>
                                    {description && (
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            {description}
                                        </p>
                                    )}
                                </div>
                                <button
                                    onClick={onClose}
                                    className="text-muted-foreground hover:text-foreground"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                            <div className="mt-5 flex justify-end gap-2">
                                <button
                                    onClick={onClose}
                                    disabled={loading}
                                    className="rounded-lg border px-4 py-2 text-xs font-medium transition-colors hover:bg-muted disabled:opacity-50"
                                >
                                    {cancelLabel}
                                </button>
                                <button
                                    onClick={onConfirm}
                                    disabled={loading}
                                    className={cn(
                                        "rounded-lg px-4 py-2 text-xs font-medium transition-colors disabled:opacity-50",
                                        style.btn
                                    )}
                                >
                                    {loading ? "Procesando..." : confirmLabel}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

// ─── Status Indicator ───────────────────
type StatusIndicatorProps = {
    status: "success" | "error" | "warning" | "info";
    label: string;
    className?: string;
};

const statusConfig = {
    success: { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    error: { icon: XCircle, color: "text-destructive", bg: "bg-destructive/10" },
    warning: { icon: AlertCircle, color: "text-amber-500", bg: "bg-amber-500/10" },
    info: { icon: Info, color: "text-blue-500", bg: "bg-blue-500/10" },
};

export function StatusIndicator({ status, label, className }: StatusIndicatorProps) {
    const config = statusConfig[status];
    const Icon = config.icon;

    return (
        <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium", config.bg, config.color, className)}>
            <Icon className="h-3 w-3" />
            {label}
        </span>
    );
}

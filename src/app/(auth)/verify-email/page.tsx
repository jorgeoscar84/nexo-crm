"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { verifyEmail } from "@/features/auth/lib/auth-service";

function VerifyEmailContent() {
    const searchParams = useSearchParams();
    const userId = searchParams.get("userId") || "";
    const secret = searchParams.get("secret") || "";

    const [status, setStatus] = useState<"loading" | "success" | "error">(
        "loading"
    );

    useEffect(() => {
        if (!userId || !secret) {
            setStatus("error");
            return;
        }

        verifyEmail(userId, secret)
            .then(() => setStatus("success"))
            .catch(() => setStatus("error"));
    }, [userId, secret]);

    if (status === "loading") {
        return (
            <div className="space-y-4 text-center">
                <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">
                    Verificando tu email...
                </p>
            </div>
        );
    }

    if (status === "success") {
        return (
            <div className="space-y-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
                    <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold">¡Email verificado!</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Tu cuenta está lista. Ya puedes usar todas las funcionalidades de
                        Nexo CRM.
                    </p>
                </div>
                <Button asChild>
                    <Link href="/dashboard">Ir al Dashboard</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                <XCircle className="h-8 w-8 text-destructive" />
            </div>
            <div>
                <h3 className="text-lg font-semibold">Error de verificación</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                    El enlace de verificación es inválido o ha expirado.
                </p>
            </div>
            <Button variant="outline" asChild>
                <Link href="/dashboard">Ir al Dashboard</Link>
            </Button>
        </div>
    );
}

export default function VerifyEmailPage() {
    return (
        <div className="space-y-4">
            <div className="text-center">
                <h2 className="text-2xl font-bold tracking-tight">
                    Verificación de email
                </h2>
            </div>
            <VerifyEmailContent />
        </div>
    );
}

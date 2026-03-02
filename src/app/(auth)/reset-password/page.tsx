import type { Metadata } from "next";
import { Suspense } from "react";
import { ResetPasswordForm } from "@/features/auth/components/ResetPasswordForm";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
    title: "Restablecer contraseña",
    description: "Establece una nueva contraseña para tu cuenta de Nexo CRM",
};

export default function ResetPasswordPage() {
    return (
        <div className="space-y-4">
            <div className="text-center lg:text-left">
                <h2 className="text-2xl font-bold tracking-tight">
                    Nueva contraseña
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    Ingresa tu nueva contraseña.
                </p>
            </div>
            <Suspense
                fallback={
                    <div className="flex justify-center py-8">
                        <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                }
            >
                <ResetPasswordForm />
            </Suspense>
        </div>
    );
}

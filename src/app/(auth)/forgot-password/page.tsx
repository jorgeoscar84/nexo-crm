import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/features/auth/components/ForgotPasswordForm";

export const metadata: Metadata = {
    title: "Recuperar contraseña",
    description: "Recupera el acceso a tu cuenta de Nexo CRM",
};

export default function ForgotPasswordPage() {
    return (
        <div className="space-y-4">
            <div className="text-center lg:text-left">
                <h2 className="text-2xl font-bold tracking-tight">
                    Recuperar contraseña
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    Ingresa tu email y te enviaremos un enlace para restablecer tu
                    contraseña.
                </p>
            </div>
            <ForgotPasswordForm />
        </div>
    );
}

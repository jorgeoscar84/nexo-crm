import type { Metadata } from "next";
import { LoginForm } from "@/features/auth/components/LoginForm";

export const metadata: Metadata = {
    title: "Iniciar sesión",
    description: "Inicia sesión en tu cuenta de Nexo CRM",
};

export default function LoginPage() {
    return (
        <div className="space-y-4">
            <div className="text-center lg:text-left">
                <h2 className="text-2xl font-bold tracking-tight">Iniciar sesión</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    Accede a tu cuenta de Nexo CRM
                </p>
            </div>
            <LoginForm />
        </div>
    );
}

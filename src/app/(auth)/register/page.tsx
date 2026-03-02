import type { Metadata } from "next";
import { RegisterForm } from "@/features/auth/components/RegisterForm";

export const metadata: Metadata = {
    title: "Crear cuenta",
    description: "Crea tu cuenta gratuita en Nexo CRM",
};

export default function RegisterPage() {
    return (
        <div className="space-y-4">
            <div className="text-center lg:text-left">
                <h2 className="text-2xl font-bold tracking-tight">Crear cuenta</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    Comienza gratis — configura en minutos
                </p>
            </div>
            <RegisterForm />
        </div>
    );
}

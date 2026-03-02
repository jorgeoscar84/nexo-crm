"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Loader2, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    forgotPasswordSchema,
    type ForgotPasswordFormData,
} from "@/features/auth/lib/validations";
import { forgotPassword } from "@/features/auth/lib/auth-service";

export function ForgotPasswordForm() {
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = async (data: ForgotPasswordFormData) => {
        setLoading(true);
        try {
            await forgotPassword(data.email);
            setSent(true);
            toast.success("Email de recuperación enviado");
        } catch {
            // Don't reveal if email exists or not
            setSent(true);
        } finally {
            setLoading(false);
        }
    };

    if (sent) {
        return (
            <div className="w-full space-y-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold">¡Email enviado!</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Si existe una cuenta con ese email, recibirás un enlace para
                        restablecer tu contraseña. Revisa tu bandeja de entrada y spam.
                    </p>
                </div>
                <Button variant="outline" asChild>
                    <Link href="/login">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Volver a iniciar sesión
                    </Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="w-full space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            id="email"
                            type="email"
                            placeholder="tu@email.com"
                            className="pl-10"
                            disabled={loading}
                            {...register("email")}
                        />
                    </div>
                    {errors.email && (
                        <p className="text-sm text-destructive">{errors.email.message}</p>
                    )}
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                    {loading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Enviar enlace de recuperación
                </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
                <Link href="/login" className="font-medium text-primary hover:underline">
                    <ArrowLeft className="mr-1 inline h-3 w-3" />
                    Volver a iniciar sesión
                </Link>
            </p>
        </div>
    );
}

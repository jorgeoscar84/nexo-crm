"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2, Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    resetPasswordSchema,
    type ResetPasswordFormData,
} from "@/features/auth/lib/validations";
import { resetPassword } from "@/features/auth/lib/auth-service";

export function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const userId = searchParams.get("userId") || "";
    const secret = searchParams.get("secret") || "";

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
    });

    if (!userId || !secret) {
        return (
            <div className="w-full space-y-4 text-center">
                <p className="text-sm text-destructive">
                    Enlace de recuperación inválido o expirado.
                </p>
                <Button variant="outline" asChild>
                    <Link href="/forgot-password">Solicitar nuevo enlace</Link>
                </Button>
            </div>
        );
    }

    if (success) {
        return (
            <div className="w-full space-y-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold">¡Contraseña actualizada!</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Tu contraseña se cambió correctamente. Ya puedes iniciar sesión.
                    </p>
                </div>
                <Button asChild>
                    <Link href="/login">Iniciar sesión</Link>
                </Button>
            </div>
        );
    }

    const onSubmit = async (data: ResetPasswordFormData) => {
        setLoading(true);
        try {
            await resetPassword(userId, secret, data.password);
            setSuccess(true);
            toast.success("Contraseña actualizada correctamente");
        } catch {
            toast.error("Error al cambiar la contraseña. El enlace puede haber expirado.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="password">Nueva contraseña</Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="pl-10 pr-10"
                            disabled={loading}
                            {...register("password")}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-sm text-destructive">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar nueva contraseña</Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            id="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="pl-10"
                            disabled={loading}
                            {...register("confirmPassword")}
                        />
                    </div>
                    {errors.confirmPassword && (
                        <p className="text-sm text-destructive">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                    {loading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Cambiar contraseña
                </Button>
            </form>
        </div>
    );
}

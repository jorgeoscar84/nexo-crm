"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Check,
    CreditCard,
    Building2,
    ArrowLeft,
    Loader2,
    Tag,
    X,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { plans, type Plan } from "@/config/plans";
import { cn } from "@/lib/utils";

type PaymentMethod = "paypal" | "mercadopago" | "transfer";

export function CheckoutForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const planParam = searchParams.get("plan") || "pro";
    const selectedPlan = plans.find((p) => p.id === planParam) || plans[1];

    const [yearly, setYearly] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("paypal");
    const [couponCode, setCouponCode] = useState("");
    const [couponApplied, setCouponApplied] = useState<{
        code: string;
        discount: number;
        type: string;
    } | null>(null);
    const [loading, setLoading] = useState(false);
    const [validatingCoupon, setValidatingCoupon] = useState(false);

    const basePrice = yearly
        ? Math.round(selectedPlan.priceYearly / 12)
        : selectedPlan.priceMonthly;
    const totalPrice = couponApplied
        ? couponApplied.type === "percentage"
            ? basePrice * (1 - couponApplied.discount / 100)
            : Math.max(0, basePrice - couponApplied.discount)
        : basePrice;

    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) return;
        setValidatingCoupon(true);
        try {
            // Call validate coupon API
            const res = await fetch(
                `/api/billing/validate-coupon?code=${encodeURIComponent(couponCode)}`
            );
            const data = await res.json();
            if (data.valid) {
                setCouponApplied({
                    code: couponCode,
                    discount: data.coupon.value,
                    type: data.coupon.type,
                });
                toast.success("¡Cupón aplicado!");
            } else {
                toast.error(data.error || "Cupón inválido");
            }
        } catch {
            toast.error("Error al validar el cupón");
        } finally {
            setValidatingCoupon(false);
        }
    };

    const handleCheckout = async () => {
        setLoading(true);
        try {
            if (paymentMethod === "paypal") {
                // Create PayPal order and redirect
                toast.info("Redirigiendo a PayPal...");
                // In production: create order via API → redirect to PayPal approval URL
            } else if (paymentMethod === "mercadopago") {
                toast.info("Redirigiendo a MercadoPago...");
                // In production: create preference via API → redirect
            } else if (paymentMethod === "transfer") {
                toast.success(
                    "Solicitud registrada. Te enviaremos los datos bancarios por email."
                );
                router.push("/checkout/success?method=transfer");
            }
        } catch {
            toast.error("Error al procesar el pago");
        } finally {
            setLoading(false);
        }
    };

    const methods: {
        id: PaymentMethod;
        label: string;
        icon: React.ElementType;
        desc: string;
    }[] = [
            { id: "paypal", label: "PayPal", icon: CreditCard, desc: "Pago inmediato con PayPal" },
            { id: "mercadopago", label: "MercadoPago", icon: CreditCard, desc: "Pago con tarjeta o efectivo" },
            { id: "transfer", label: "Transferencia", icon: Building2, desc: "Transferencia bancaria manual" },
        ];

    return (
        <div className="mx-auto max-w-4xl px-4 py-12">
            <Button variant="ghost" size="sm" asChild className="mb-6">
                <Link href="/pricing">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver a planes
                </Link>
            </Button>

            <div className="grid gap-8 lg:grid-cols-5">
                {/* Left: Payment form */}
                <div className="lg:col-span-3 space-y-6">
                    <div>
                        <h1 className="text-2xl font-bold">Completa tu suscripción</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Plan {selectedPlan.name} — {yearly ? "Anual" : "Mensual"}
                        </p>
                    </div>

                    {/* Billing period */}
                    <Card>
                        <CardContent className="p-5">
                            <div className="flex items-center justify-between">
                                <Label className="text-sm font-medium">Facturación anual</Label>
                                <div className="flex items-center gap-2">
                                    {yearly && (
                                        <Badge variant="secondary" className="text-xs">
                                            Ahorras 17%
                                        </Badge>
                                    )}
                                    <Switch checked={yearly} onCheckedChange={setYearly} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Payment method */}
                    <div className="space-y-3">
                        <Label className="text-sm font-medium">Método de pago</Label>
                        {methods.map((method) => (
                            <Card
                                key={method.id}
                                className={cn(
                                    "cursor-pointer transition-all",
                                    paymentMethod === method.id
                                        ? "border-primary ring-1 ring-primary"
                                        : "hover:border-foreground/20"
                                )}
                                onClick={() => setPaymentMethod(method.id)}
                            >
                                <CardContent className="flex items-center gap-4 p-4">
                                    <div
                                        className={cn(
                                            "flex h-10 w-10 items-center justify-center rounded-lg",
                                            paymentMethod === method.id
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-muted"
                                        )}
                                    >
                                        <method.icon className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">{method.label}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {method.desc}
                                        </p>
                                    </div>
                                    {paymentMethod === method.id && (
                                        <Check className="h-5 w-5 text-primary" />
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Coupon */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">
                            <Tag className="mr-1 inline h-3.5 w-3.5" />
                            ¿Tienes un cupón?
                        </Label>
                        {couponApplied ? (
                            <div className="flex items-center gap-2 rounded-lg border bg-primary/5 p-3">
                                <Badge>{couponApplied.code}</Badge>
                                <span className="text-sm text-muted-foreground">
                                    {couponApplied.type === "percentage"
                                        ? `-${couponApplied.discount}%`
                                        : `-$${couponApplied.discount}`}
                                </span>
                                <button
                                    onClick={() => {
                                        setCouponApplied(null);
                                        setCouponCode("");
                                    }}
                                    className="ml-auto text-muted-foreground hover:text-foreground"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                <Input
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                    placeholder="CÓDIGO"
                                    className="uppercase"
                                />
                                <Button
                                    variant="outline"
                                    onClick={handleApplyCoupon}
                                    disabled={validatingCoupon || !couponCode.trim()}
                                >
                                    {validatingCoupon ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        "Aplicar"
                                    )}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Order summary */}
                <div className="lg:col-span-2">
                    <Card className="sticky top-24">
                        <CardHeader>
                            <h3 className="text-lg font-semibold">Resumen</h3>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">
                                    Plan {selectedPlan.name}
                                </span>
                                <span className="font-medium">${basePrice}/mes</span>
                            </div>
                            {couponApplied && (
                                <div className="flex items-center justify-between text-sm text-primary">
                                    <span>Descuento ({couponApplied.code})</span>
                                    <span>
                                        -
                                        {couponApplied.type === "percentage"
                                            ? `${couponApplied.discount}%`
                                            : `$${couponApplied.discount}`}
                                    </span>
                                </div>
                            )}
                            {yearly && (
                                <div className="flex items-center justify-between text-sm text-primary">
                                    <span>Descuento anual</span>
                                    <span>-17%</span>
                                </div>
                            )}
                            <Separator />
                            <div className="flex items-center justify-between">
                                <span className="font-semibold">Total</span>
                                <div className="text-right">
                                    <span className="text-2xl font-bold">
                                        ${totalPrice.toFixed(0)}
                                    </span>
                                    <span className="text-sm text-muted-foreground">/mes</span>
                                </div>
                            </div>

                            <Button
                                className="w-full"
                                size="lg"
                                onClick={handleCheckout}
                                disabled={loading}
                            >
                                {loading ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : null}
                                {paymentMethod === "transfer"
                                    ? "Solicitar datos bancarios"
                                    : `Pagar con ${paymentMethod === "paypal" ? "PayPal" : "MercadoPago"
                                    }`}
                            </Button>

                            <p className="text-center text-xs text-muted-foreground">
                                Cancela en cualquier momento. Sin compromisos.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

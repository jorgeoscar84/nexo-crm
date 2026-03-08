"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { plans } from "@/config/plans";
import { cn } from "@/lib/utils";

export function PricingTable() {
    const [yearly, setYearly] = useState(false);

    return (
        <section id="pricing" className="py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="mx-auto max-w-2xl text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                        Planes y precios
                    </span>
                    <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                        Un plan para cada{" "}
                        <span className="nexo-gradient bg-clip-text text-transparent">
                            etapa de tu negocio
                        </span>
                    </h2>
                    <p className="mt-4 text-balance text-lg text-muted-foreground">
                        Sin costos ocultos. Paga solo por lo que necesitas.
                    </p>

                    {/* Toggle */}
                    <div className="mt-8 flex items-center justify-center gap-3">
                        <Label
                            htmlFor="billing-toggle"
                            className={cn(
                                "text-sm",
                                !yearly ? "font-semibold text-foreground" : "text-muted-foreground"
                            )}
                        >
                            Mensual
                        </Label>
                        <Switch
                            id="billing-toggle"
                            checked={yearly}
                            onCheckedChange={setYearly}
                        />
                        <Label
                            htmlFor="billing-toggle"
                            className={cn(
                                "text-sm",
                                yearly ? "font-semibold text-foreground" : "text-muted-foreground"
                            )}
                        >
                            Anual{" "}
                            <span className="inline-flex rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                                -17%
                            </span>
                        </Label>
                    </div>
                </motion.div>

                {/* Plans */}
                <div className="mt-12 grid gap-6 lg:grid-cols-3">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative group/card"
                        >
                            {plan.popular && (
                                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary via-accent to-primary opacity-30 blur-lg transition-all duration-1000 group-hover/card:opacity-60 animate-pulse" />
                            )}
                            <Card
                                className={cn(
                                    "relative h-full transition-all duration-500 hover:shadow-xl bg-card",
                                    plan.popular &&
                                    "border-primary/50 shadow-2xl shadow-primary/20 scale-[1.03] hover:scale-[1.05]"
                                )}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <span className="inline-flex items-center gap-1 rounded-full nexo-gradient px-4 py-1.5 text-xs font-bold text-white shadow-xl shadow-primary/30 ring-2 ring-white/20">
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                                            </span>
                                            Más popular
                                        </span>
                                    </div>
                                )}

                                <CardHeader className="pb-4 pt-6">
                                    <h3 className="text-lg font-semibold">{plan.name}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {plan.description}
                                    </p>
                                    <div className="mt-4">
                                        <span className="text-4xl font-bold">
                                            ${yearly ? Math.round(plan.priceYearly / 12) : plan.priceMonthly}
                                        </span>
                                        <span className="text-muted-foreground">/usuario/mes</span>
                                        {yearly && (
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                Facturado ${plan.priceYearly}/año
                                            </p>
                                        )}
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    <Button
                                        className={cn(
                                            "w-full transition-all duration-300",
                                            plan.popular
                                                ? "shadow-lg shadow-primary/20 hover:scale-105"
                                                : "hover:bg-muted/50"
                                        )}
                                        variant={plan.popular ? "default" : "outline"}
                                        asChild
                                    >
                                        <Link href="/register">Empieza gratis</Link>
                                    </Button>

                                    <ul className="space-y-2.5">
                                        {plan.features.map((feature) => (
                                            <li
                                                key={feature}
                                                className="flex items-start gap-2 text-sm"
                                            >
                                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                                <span className="text-muted-foreground">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

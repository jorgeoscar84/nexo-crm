"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
    return (
        <section className="relative overflow-hidden py-20 sm:py-32">
            {/* Background decorations */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
                <div className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-accent/10 blur-3xl" />
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-flex items-center gap-1.5 rounded-full border bg-background px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-sm">
                            <Sparkles className="h-3.5 w-3.5 text-primary" />
                            El CRM para líderes de red
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <span className="nexo-gradient bg-clip-text text-transparent">
                            Conecta.
                        </span>{" "}
                        Vende.{" "}
                        <span className="nexo-gradient-coral bg-clip-text text-transparent">
                            Lidera.
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        className="mt-6 text-lg text-muted-foreground sm:text-xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Pipeline de ventas, gestión de socios MLM y WhatsApp integrado
                        en una sola app. El CRM diseñado para emprendedores y líderes
                        de red que quieren resultados, no complejidad.
                    </motion.p>

                    {/* CTA */}
                    <motion.div
                        className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <Button size="lg" className="text-base px-8" asChild>
                            <Link href="/register">
                                Empieza gratis
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="text-base px-8" asChild>
                            <Link href="/features">Ver funcionalidades</Link>
                        </Button>
                    </motion.div>

                    {/* Social proof */}
                    <motion.p
                        className="mt-8 text-sm text-muted-foreground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        Sin tarjeta de crédito · Setup en 2 minutos · Cancela cuando quieras
                    </motion.p>
                </div>

                {/* App preview placeholder */}
                <motion.div
                    className="mx-auto mt-16 max-w-5xl"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                >
                    <div className="relative overflow-hidden rounded-xl border bg-card shadow-2xl shadow-primary/10">
                        <div className="aspect-[16/9] bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center">
                            <div className="text-center space-y-4 p-8">
                                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl nexo-gradient">
                                    <Sparkles className="h-10 w-10 text-white" />
                                </div>
                                <p className="text-lg font-medium text-muted-foreground">
                                    Preview de la app — Pipeline Kanban, Chat WhatsApp, KPIs de socios
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

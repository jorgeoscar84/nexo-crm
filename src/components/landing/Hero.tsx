"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
    return (
        <section className="relative overflow-hidden py-20 sm:py-32">
            {/* Background decorations */}
            <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
                <div className="absolute top-0 right-1/4 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]" />
                <div className="absolute bottom-0 left-1/4 h-[500px] w-[500px] translate-y-1/3 rounded-full bg-accent/15 blur-[100px]" />
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
                        className="mt-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.1]"
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
                        className="mt-6 text-balance text-lg text-muted-foreground sm:text-xl"
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
                        <Button size="lg" className="text-base px-8 shadow-lg shadow-primary/20 transition-all hover:scale-105" asChild>
                            <Link href="/register">
                                Empieza gratis
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="text-base px-8 hover:bg-muted/50 transition-all" asChild>
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
                    className="mx-auto mt-16 max-w-5xl relative"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                >
                    {/* Glowing ring behind the card */}
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary via-accent to-primary opacity-20 blur-xl transition-all duration-1000 group-hover:opacity-40 animate-pulse" />
                    
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-card/50 backdrop-blur-xl shadow-2xl shadow-primary/10 ring-1 ring-border/50">
                        <div className="aspect-[16/9] bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 flex items-center justify-center p-8">
                            <div className="text-center space-y-6">
                                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl nexo-gradient shadow-xl shadow-primary/30 ring-1 ring-white/20">
                                    <Sparkles className="h-10 w-10 text-white" />
                                </div>
                                <p className="text-lg font-medium text-muted-foreground/80 max-w-sm mx-auto">
                                    Preview interactivo de la app — Pipeline Kanban, Chat WhatsApp, KPIs de socios
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

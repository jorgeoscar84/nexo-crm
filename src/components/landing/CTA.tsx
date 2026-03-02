"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA() {
    return (
        <section className="py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="relative overflow-hidden rounded-3xl nexo-gradient p-12 sm:p-16"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Decorative elements */}
                    <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
                    <div className="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-white/5 blur-2xl" />

                    <div className="relative mx-auto max-w-2xl text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                            <Zap className="h-8 w-8 text-white" />
                        </div>
                        <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            ¿Listo para transformar tu negocio?
                        </h2>
                        <p className="mt-4 text-lg text-white/80">
                            Empieza gratis hoy. Sin tarjeta de crédito. Sin complicaciones.
                            Tu pipeline, tus socios y tu WhatsApp en un solo lugar.
                        </p>
                        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                            <Button
                                size="lg"
                                variant="secondary"
                                className="bg-white text-primary hover:bg-white/90 text-base px-8"
                                asChild
                            >
                                <Link href="/register">
                                    Crear cuenta gratis
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-white/30 text-white hover:bg-white/10 text-base px-8"
                                asChild
                            >
                                <Link href="/pricing">Ver planes</Link>
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

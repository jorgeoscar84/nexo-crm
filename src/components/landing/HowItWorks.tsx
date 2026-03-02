"use client";

import { motion } from "framer-motion";
import { UserPlus, Kanban, MessageCircle, Trophy } from "lucide-react";

const steps = [
    {
        number: "01",
        icon: UserPlus,
        title: "Captura tus leads",
        description:
            "Importa desde Excel, captura desde WhatsApp o crea manualmente. Todos tus prospectos en un solo lugar.",
    },
    {
        number: "02",
        icon: Kanban,
        title: "Muévelos por el pipeline",
        description:
            "Arrastra tus leads entre etapas: Nuevo → Contactado → Propuesta → Negociando → Cerrado. Visual y rápido.",
    },
    {
        number: "03",
        icon: MessageCircle,
        title: "Comunícate por WhatsApp",
        description:
            "Escribe mensajes desde la app, usa plantillas y haz seguimiento sin salir del CRM.",
    },
    {
        number: "04",
        icon: Trophy,
        title: "Mide y lidera",
        description:
            "Dashboards con métricas reales. KPIs de tus socios, reportes Excel y seguimiento de metas.",
    },
];

export function HowItWorks() {
    return (
        <section className="py-20 sm:py-28 bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="mx-auto max-w-2xl text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                        Cómo funciona
                    </span>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                        De lead a cliente en{" "}
                        <span className="nexo-gradient bg-clip-text text-transparent">
                            4 pasos
                        </span>
                    </h2>
                </motion.div>

                <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.number}
                            className="relative text-center"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                        >
                            {/* Connector line */}
                            {index < steps.length - 1 && (
                                <div className="absolute left-1/2 top-10 hidden w-full border-t-2 border-dashed border-primary/20 lg:block" />
                            )}

                            <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-2xl nexo-gradient shadow-lg shadow-primary/20">
                                <step.icon className="h-9 w-9 text-white" />
                                <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-background text-xs font-bold text-primary ring-2 ring-primary">
                                    {step.number}
                                </span>
                            </div>
                            <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
                            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

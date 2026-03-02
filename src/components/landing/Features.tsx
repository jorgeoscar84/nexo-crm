"use client";

import { motion } from "framer-motion";
import {
    BarChart3,
    MessageCircle,
    Users,
    CalendarDays,
    ClipboardList,
    ArrowRightLeft,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
    {
        icon: BarChart3,
        title: "Pipeline de ventas visual",
        description:
            "Arrastra y suelta tus leads entre etapas. Visualiza tu embudo completo en un tablero Kanban intuitivo.",
        color: "text-[oklch(0.457_0.24_277)]",
        bg: "bg-[oklch(0.457_0.24_277)]/10",
    },
    {
        icon: MessageCircle,
        title: "WhatsApp integrado",
        description:
            "Envía y recibe mensajes desde la app. Captura leads automáticamente y usa plantillas de mensaje.",
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
    },
    {
        icon: Users,
        title: "Gestión de socios MLM",
        description:
            "Fichas de socios con KPIs específicos: leads contactados, cierres, reclutamiento, metas vs logros.",
        color: "text-[oklch(0.702_0.191_41)]",
        bg: "bg-[oklch(0.702_0.191_41)]/10",
    },
    {
        icon: ArrowRightLeft,
        title: "Pipeline de postventa",
        description:
            "Pipeline separado para onboarding, soporte y retención. Tus clientes no se pierden después del cierre.",
        color: "text-[oklch(0.541_0.213_283)]",
        bg: "bg-[oklch(0.541_0.213_283)]/10",
    },
    {
        icon: ClipboardList,
        title: "Tareas y proyectos",
        description:
            "Tareas con subtareas vinculadas a leads, contactos y proyectos. Asigna, prioriza y haz seguimiento.",
        color: "text-[oklch(0.768_0.165_75)]",
        bg: "bg-[oklch(0.768_0.165_75)]/10",
    },
    {
        icon: CalendarDays,
        title: "Calendario + Google Calendar",
        description:
            "Calendario nativo con vista de día, semana y mes. Sincronización automática con Google Calendar.",
        color: "text-sky-500",
        bg: "bg-sky-500/10",
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Features() {
    return (
        <section id="features" className="py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    className="mx-auto max-w-2xl text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                        Funcionalidades
                    </span>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                        Todo lo que necesitas para{" "}
                        <span className="nexo-gradient bg-clip-text text-transparent">
                            vender y liderar
                        </span>
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Un solo lugar para tu pipeline de ventas, comunicación con clientes
                        y gestión de tu equipo de red.
                    </p>
                </motion.div>

                {/* Feature cards */}
                <motion.div
                    className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {features.map((feature) => (
                        <motion.div key={feature.title} variants={cardVariants}>
                            <Card className="group h-full border transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
                                <CardContent className="p-6">
                                    <div
                                        className={`flex h-12 w-12 items-center justify-center rounded-xl ${feature.bg} transition-transform group-hover:scale-110`}
                                    >
                                        <feature.icon className={`h-6 w-6 ${feature.color}`} />
                                    </div>
                                    <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                                        {feature.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

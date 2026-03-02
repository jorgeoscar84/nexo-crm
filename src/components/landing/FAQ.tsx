"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
    {
        q: "¿Puedo probarlo gratis?",
        a: "Sí, todos los planes tienen un período de prueba gratuito. Sin tarjeta de crédito. Configura tu cuenta en 2 minutos.",
    },
    {
        q: "¿Qué es la gestión de socios MLM?",
        a: "Es una funcionalidad diseñada para líderes de network marketing. Incluye fichas de socios con KPIs específicos (leads contactados, cierres, reclutamiento, metas vs logros), diferentes a las fichas de leads o clientes.",
    },
    {
        q: "¿Cómo funciona la integración con WhatsApp?",
        a: "Conectas tu WhatsApp personal o de empresa escaneando un QR en la app. Desde ahí puedes enviar y recibir mensajes, usar plantillas y vincular conversaciones a tus leads automáticamente.",
    },
    {
        q: "¿Puedo importar mis leads desde Excel?",
        a: "Sí, puedes importar y exportar leads, contactos y socios desde archivos Excel (.xlsx). Te proporcionamos una plantilla para que el proceso sea rápido.",
    },
    {
        q: "¿Es autohospedado o en la nube?",
        a: "Nexo CRM es una solución SaaS. Tú te registras y usas la plataforma. Nosotros nos encargamos de la infraestructura, backups y actualizaciones.",
    },
    {
        q: "¿Puedo cambiar de plan en cualquier momento?",
        a: "Sí, puedes hacer upgrade o downgrade en cualquier momento. El cambio se aplica de inmediato y se ajusta proporcionalmente en tu facturación.",
    },
];

export function FAQ() {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <section className="py-20 sm:py-28 bg-muted/30">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                        FAQ
                    </span>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                        Preguntas frecuentes
                    </h2>
                </motion.div>

                <div className="mt-12 space-y-3">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            className="rounded-xl border bg-card"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                            <button
                                onClick={() => setOpen(open === index ? null : index)}
                                className="flex w-full items-center justify-between px-5 py-4 text-left"
                            >
                                <span className="text-sm font-medium pr-4">{faq.q}</span>
                                <ChevronDown
                                    className={cn(
                                        "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
                                        open === index && "rotate-180"
                                    )}
                                />
                            </button>
                            <AnimatePresence>
                                {open === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
                                            {faq.a}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

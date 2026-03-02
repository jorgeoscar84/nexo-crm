import type { Metadata } from "next";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { PricingTable } from "@/components/landing/PricingTable";
import { FAQ } from "@/components/landing/FAQ";
import { CTA } from "@/components/landing/CTA";

export const metadata: Metadata = {
    title: "Nexo CRM — Conecta. Vende. Lidera.",
    description:
        "CRM comercial y de liderazgo para emprendedores y líderes de red. Pipeline de ventas, gestión de socios MLM y WhatsApp integrado en una sola app.",
};

export default function HomePage() {
    return (
        <>
            <Hero />
            <Features />
            <HowItWorks />
            <PricingTable />
            <FAQ />
            <CTA />
        </>
    );
}

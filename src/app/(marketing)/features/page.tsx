import type { Metadata } from "next";
import { Features } from "@/components/landing/Features";
import { CTA } from "@/components/landing/CTA";

export const metadata: Metadata = {
    title: "Funcionalidades",
    description:
        "Descubre todo lo que Nexo CRM puede hacer: pipeline visual, WhatsApp integrado, gestión MLM, calendario, reportes y más.",
};

export default function FeaturesPage() {
    return (
        <>
            <Features />
            <CTA />
        </>
    );
}

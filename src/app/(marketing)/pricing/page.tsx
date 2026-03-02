import type { Metadata } from "next";
import { PricingTable } from "@/components/landing/PricingTable";
import { FAQ } from "@/components/landing/FAQ";

export const metadata: Metadata = {
    title: "Planes y precios",
    description:
        "Elige el plan ideal para tu negocio. Starter, Pro o Enterprise. Sin costos ocultos.",
};

export default function PricingPage() {
    return (
        <>
            <PricingTable />
            <FAQ />
        </>
    );
}

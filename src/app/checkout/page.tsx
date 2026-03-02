import type { Metadata } from "next";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { CheckoutForm } from "@/features/billing/components/CheckoutForm";
import { MarketingNav } from "@/components/layout/MarketingNav";

export const metadata: Metadata = {
    title: "Checkout",
    description: "Completa tu suscripción a Nexo CRM",
};

export default function CheckoutPage() {
    return (
        <div className="min-h-screen">
            <MarketingNav />
            <Suspense
                fallback={
                    <div className="flex h-[60vh] items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                }
            >
                <CheckoutForm />
            </Suspense>
        </div>
    );
}

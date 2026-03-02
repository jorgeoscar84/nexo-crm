import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MarketingNav } from "@/components/layout/MarketingNav";

export const metadata: Metadata = {
    title: "¡Pago exitoso!",
    description: "Tu suscripción a Nexo CRM está activa",
};

export default function CheckoutSuccessPage() {
    return (
        <div className="min-h-screen">
            <MarketingNav />
            <div className="flex min-h-[80vh] items-center justify-center px-4">
                <Card className="max-w-md w-full">
                    <CardContent className="p-8 text-center space-y-6">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10">
                            <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">¡Pago exitoso!</h1>
                            <p className="mt-2 text-muted-foreground">
                                Tu suscripción está activa. Ya puedes acceder a todas las
                                funcionalidades de tu plan.
                            </p>
                        </div>
                        <Button size="lg" className="w-full" asChild>
                            <Link href="/dashboard">
                                Ir al Dashboard
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

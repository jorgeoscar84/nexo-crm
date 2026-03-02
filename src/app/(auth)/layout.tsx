import Link from "next/link";
import { Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen">
            {/* Left panel — Branding */}
            <div className="hidden lg:flex lg:w-1/2 nexo-gradient flex-col items-center justify-center p-12 text-white">
                <div className="max-w-md space-y-6 text-center">
                    <div className="flex items-center justify-center gap-3">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                            <Zap className="h-7 w-7 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight">Nexo CRM</h1>
                    </div>
                    <p className="text-lg text-white/90">
                        Pipeline de ventas, gestión de socios y WhatsApp, todo en un solo
                        lugar.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3 pt-4">
                        {[
                            "Pipeline Visual",
                            "WhatsApp",
                            "MLM / Network",
                            "Postventa",
                            "Calendario",
                            "Reportes",
                        ].map((feature) => (
                            <span
                                key={feature}
                                className="rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium backdrop-blur-sm"
                            >
                                {feature}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right panel — Auth form */}
            <div className="flex w-full items-center justify-center p-6 lg:w-1/2">
                <Card className="w-full max-w-md border-0 shadow-none lg:border lg:shadow-sm">
                    <CardContent className="p-6 lg:p-8">
                        {/* Mobile logo */}
                        <div className="mb-6 flex items-center justify-center gap-2 lg:hidden">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl nexo-gradient">
                                <Zap className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-bold">Nexo CRM</span>
                        </div>
                        {children}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

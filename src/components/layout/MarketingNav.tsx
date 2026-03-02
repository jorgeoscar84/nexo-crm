import Link from "next/link";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

export function MarketingNav() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg nexo-gradient">
                        <Zap className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">
                        <span className="nexo-gradient bg-clip-text text-transparent">
                            Nexo
                        </span>{" "}
                        CRM
                    </span>
                </Link>

                {/* Nav links */}
                <nav className="hidden items-center gap-8 md:flex">
                    <Link
                        href="/features"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Funcionalidades
                    </Link>
                    <Link
                        href="/pricing"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Planes
                    </Link>
                    <Link
                        href="/about"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Nosotros
                    </Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
                        <Link href="/login">Iniciar sesión</Link>
                    </Button>
                    <Button size="sm" asChild>
                        <Link href="/register">Prueba gratis</Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}

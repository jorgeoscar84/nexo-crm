import Link from "next/link";
import { Zap } from "lucide-react";

const links = {
    Producto: [
        { label: "Funcionalidades", href: "/features" },
        { label: "Planes y precios", href: "/pricing" },
    ],
    Empresa: [
        { label: "Sobre nosotros", href: "/about" },
        { label: "Contacto", href: "/contact" },
    ],
    Legal: [
        { label: "Privacidad", href: "/legal/privacy" },
        { label: "Términos", href: "/legal/terms" },
    ],
};

export function Footer() {
    return (
        <footer className="border-t bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg nexo-gradient">
                                <Zap className="h-4 w-4 text-white" />
                            </div>
                            <span className="text-lg font-bold">Nexo CRM</span>
                        </Link>
                        <p className="mt-3 text-sm text-muted-foreground max-w-xs">
                            CRM comercial y de liderazgo para emprendedores y líderes de red.
                        </p>
                    </div>

                    {/* Link groups */}
                    {Object.entries(links).map(([group, items]) => (
                        <div key={group}>
                            <h4 className="text-sm font-semibold text-foreground">{group}</h4>
                            <ul className="mt-3 space-y-2">
                                {items.map((item) => (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-10 border-t pt-6">
                    <p className="text-center text-xs text-muted-foreground">
                        © {new Date().getFullYear()} Nexo CRM. Todos los derechos
                        reservados. Conecta. Vende. Lidera.
                    </p>
                </div>
            </div>
        </footer>
    );
}

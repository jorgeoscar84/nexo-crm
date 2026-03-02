import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-6 px-4">
            <div className="text-center">
                <h1 className="text-7xl font-bold nexo-gradient bg-clip-text text-transparent">
                    404
                </h1>
                <p className="mt-4 text-xl font-medium text-foreground">
                    Página no encontrada
                </p>
                <p className="mt-2 text-sm text-muted-foreground max-w-md">
                    La página que buscas no existe o fue movida. Verifica la URL o regresa
                    al inicio.
                </p>
            </div>
            <Button asChild>
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver al inicio
                </Link>
            </Button>
        </div>
    );
}

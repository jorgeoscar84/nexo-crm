import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { NewLeadModal } from "@/components/modals/NewLeadModal";
import { NewEventModal } from "@/components/modals/NewEventModal";
import { NewPartnerModal } from "@/components/modals/NewPartnerModal";
import { NewTaskModal } from "@/components/modals/NewTaskModal";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen">
            <DashboardSidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Topbar */}
                <header className="flex h-16 items-center justify-between border-b px-6 bg-card">
                    <div className="relative w-72">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Buscar leads, contactos, tareas..."
                            className="pl-10 bg-muted/50"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-9 w-9 relative">
                            <Bell className="h-4 w-4" />
                            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
                        </Button>
                        <ThemeToggle />
                        <div className="ml-2 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                            U
                        </div>
                    </div>
                </header>
                {/* Content */}
                <NewLeadModal />
                <NewEventModal />
                <NewPartnerModal />
                <NewTaskModal />
                <main className="flex-1 overflow-y-auto bg-muted/20 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}

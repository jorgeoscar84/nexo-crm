import { AdminSidebar } from "@/features/admin/components/AdminSidebar";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen">
            <AdminSidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Admin topbar */}
                <header className="flex h-16 items-center justify-between border-b px-6">
                    <h2 className="text-lg font-semibold">Panel de Administración</h2>
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                    </div>
                </header>
                {/* Content */}
                <main className="flex-1 overflow-y-auto p-6 bg-muted/20">
                    {children}
                </main>
            </div>
        </div>
    );
}

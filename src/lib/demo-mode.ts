// ═══════════════════════════════════════════
// Nexo CRM — Demo Mode Detection
// When Appwrite is NOT configured, use mock data
// ═══════════════════════════════════════════

export function isDemoMode(): boolean {
    return (
        !process.env.NEXT_PUBLIC_APPWRITE_PROJECT ||
        process.env.NEXT_PUBLIC_APPWRITE_PROJECT === "" ||
        process.env.NEXT_PUBLIC_APPWRITE_PROJECT === "your_project_id"
    );
}

export const DEMO_USER = {
    $id: "demo_user_001",
    name: "Oscar Demo",
    email: "demo@nexocrm.com",
    role: "admin" as const,
    emailVerification: true,
    $createdAt: "2026-01-15T10:00:00.000Z",
};

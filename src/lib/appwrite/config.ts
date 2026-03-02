// ═══════════════════════════════════════════
// Nexo CRM — Appwrite Configuration
// IDs for tables, buckets, and functions
// ═══════════════════════════════════════════

export const appwriteConfig = {
    endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "http://localhost/v1",
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT || "",
    apiKey: process.env.APPWRITE_API_KEY || "", // server-side only

    // Database
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE || "nexo_db",

    // Tables (Collections)
    tables: {
        users: "users",
        organizations: "organizations",
        leads: "leads",
        contacts: "contacts",
        partners: "partners",
        partnerKpis: "partner_kpis",
        pipelines: "pipelines",
        pipelineStages: "pipeline_stages",
        postSaleCases: "post_sale_cases",
        tasks: "tasks",
        subtasks: "subtasks",
        projects: "projects",
        calendarEvents: "calendar_events",
        whatsappConversations: "whatsapp_conversations",
        whatsappMessages: "whatsapp_messages",
        whatsappTemplates: "whatsapp_templates",
        notes: "notes",
        activityLog: "activity_log",
        plans: "plans",
        subscriptions: "subscriptions",
        payments: "payments",
        coupons: "coupons",
        permissions: "permissions",
        reportSchedules: "report_schedules",
        customFields: "custom_fields",
        dashboardCache: "dashboard_cache",
    },

    // Storage Buckets
    buckets: {
        avatars: "avatars",
        attachments: "attachments",
        reports: "reports",
        imports: "imports",
        whatsappMedia: "whatsapp_media",
    },

    // Function IDs
    functions: {
        calculateLeadScore: "calculate-lead-score",
        calculatePartnerKpis: "calculate-partner-kpis",
        generateDashboardCache: "generate-dashboard-cache",
        handlePaypalWebhook: "handle-paypal-webhook",
        handleMercadopagoWebhook: "handle-mercadopago-webhook",
        autoConvertToPostsale: "auto-convert-to-postsale",
        whatsappWebhook: "whatsapp-webhook",
        syncGoogleCalendar: "sync-google-calendar",
        generateExcelReport: "generate-excel-report",
        checkSubscriptions: "check-subscriptions",
        sendReminders: "send-reminders",
    },
} as const;

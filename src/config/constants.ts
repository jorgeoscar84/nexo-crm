// ═══════════════════════════════════════════
// Nexo CRM — Global Constants
// ═══════════════════════════════════════════

export const ROLES = {
    SUPER_ADMIN: "super_admin",
    ADMIN: "admin",
    LEADER: "leader",
    SELLER: "seller",
    PARTNER: "partner",
} as const;

export type UserRole = (typeof ROLES)[keyof typeof ROLES];

export const ROLE_LABELS: Record<UserRole, string> = {
    super_admin: "Super Admin",
    admin: "Administrador",
    leader: "Líder / Manager",
    seller: "Vendedor",
    partner: "Socio / Afiliado",
};

export const LEAD_SOURCES = [
    "whatsapp",
    "excel",
    "manual",
    "web",
    "referral",
] as const;

export type LeadSource = (typeof LEAD_SOURCES)[number];

export const LEAD_SOURCE_LABELS: Record<LeadSource, string> = {
    whatsapp: "WhatsApp",
    excel: "Excel Import",
    manual: "Manual",
    web: "Formulario Web",
    referral: "Referido",
};

export const PRIORITIES = ["low", "medium", "high", "urgent"] as const;
export type Priority = (typeof PRIORITIES)[number];

export const PRIORITY_LABELS: Record<Priority, string> = {
    low: "Baja",
    medium: "Media",
    high: "Alta",
    urgent: "Urgente",
};

export const PRIORITY_COLORS: Record<Priority, string> = {
    low: "#10B981",
    medium: "#F59E0B",
    high: "#F97316",
    urgent: "#EF4444",
};

export const LEAD_STATUSES = [
    "active",
    "won",
    "lost",
    "archived",
] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const TASK_STATUSES = [
    "todo",
    "in_progress",
    "done",
    "cancelled",
] as const;
export type TaskStatus = (typeof TASK_STATUSES)[number];

export const SUBSCRIPTION_STATUSES = [
    "active",
    "trial",
    "suspended",
    "cancelled",
    "courtesy",
] as const;
export type SubscriptionStatus = (typeof SUBSCRIPTION_STATUSES)[number];

export const CONTACT_TYPES = ["prospect", "client", "partner"] as const;
export type ContactType = (typeof CONTACT_TYPES)[number];

export const PARTNER_STATUSES = [
    "active",
    "inactive",
    "suspended",
] as const;
export type PartnerStatus = (typeof PARTNER_STATUSES)[number];

export const PIPELINE_TYPES = ["sales", "post_sale"] as const;
export type PipelineType = (typeof PIPELINE_TYPES)[number];

export const WHATSAPP_MESSAGE_TYPES = [
    "text",
    "image",
    "document",
    "audio",
    "video",
] as const;

export const WHATSAPP_MESSAGE_STATUSES = [
    "sent",
    "delivered",
    "read",
    "failed",
] as const;

// Score thresholds
export const SCORE_THRESHOLDS = {
    HOT: 75,
    WARM: 50,
    COLD: 25,
} as const;

export const SCORE_COLORS = {
    hot: "#10B981",    // Green
    warm: "#F59E0B",   // Amber
    cold: "#EF4444",   // Red
} as const;

// Pagination
export const DEFAULT_PAGE_SIZE = 25;
export const MAX_PAGE_SIZE = 100;

// Date formats
export const DATE_FORMAT = "dd/MM/yyyy";
export const DATETIME_FORMAT = "dd/MM/yyyy HH:mm";
export const TIME_FORMAT = "HH:mm";

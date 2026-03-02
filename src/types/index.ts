// ═══════════════════════════════════════════
// Nexo CRM — TypeScript Types
// ═══════════════════════════════════════════

import type {
    UserRole,
    LeadSource,
    Priority,
    LeadStatus,
    TaskStatus,
    SubscriptionStatus,
    ContactType,
    PartnerStatus,
    PipelineType,
} from "@/config/constants";

// ─── Base ───────────────────────────────
export interface BaseDocument {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
}

// ─── Auth / Users ───────────────────────
export interface User extends BaseDocument {
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
    role: UserRole;
    planId?: string;
    subscriptionStatus: SubscriptionStatus;
    subscriptionExpires?: string;
    courtesyGrantedBy?: string;
    organizationId?: string;
    teamId?: string;
    leaderId?: string;
    lastLogin?: string;
}

// ─── Organization ───────────────────────
export interface Organization extends BaseDocument {
    name: string;
    ownerId: string;
    logo?: string;
    settings?: Record<string, unknown>;
}

// ─── Leads ──────────────────────────────
export interface Lead extends BaseDocument {
    ownerId: string;
    organizationId: string;
    contactId?: string;
    pipelineId: string;
    stageId: string;
    title: string;
    value?: number;
    currency?: string;
    source: LeadSource;
    priority: Priority;
    score: number;
    status: LeadStatus;
    lostReason?: string;
    expectedClose?: string;
    tags: string[];
    customFields?: Record<string, unknown>;
}

// ─── Contacts ───────────────────────────
export interface Contact extends BaseDocument {
    ownerId: string;
    organizationId: string;
    type: ContactType;
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    company?: string;
    position?: string;
    address?: string;
    city?: string;
    country?: string;
    avatar?: string;
    tags: string[];
    category?: string;
    notes?: string;
    customFields?: Record<string, unknown>;
}

// ─── Partners (MLM) ────────────────────
export interface Partner extends BaseDocument {
    userId: string;
    leaderId: string;
    organizationId: string;
    joinDate: string;
    rank: string;
    status: PartnerStatus;
    goalsMonthly?: Record<string, number>;
    leaderNotes?: string;
    customFields?: Record<string, unknown>;
}

export interface PartnerKPI extends BaseDocument {
    partnerId: string;
    period: string;
    periodType: "daily" | "weekly" | "monthly";
    leadsContacted: number;
    followUps: number;
    dealsClosed: number;
    dealsValue: number;
    partnersRecruited: number;
    score: number;
    goalsMet?: Record<string, unknown>;
    calculatedAt: string;
}

// ─── Pipeline ───────────────────────────
export interface Pipeline extends BaseDocument {
    organizationId: string;
    name: string;
    type: PipelineType;
    order: number;
    isDefault: boolean;
}

export interface PipelineStage extends BaseDocument {
    pipelineId: string;
    name: string;
    color: string;
    order: number;
    isWon: boolean;
    isLost: boolean;
    autoConvertTo?: string;
}

// ─── PostSale ───────────────────────────
export interface PostSaleCase extends BaseDocument {
    leadId: string;
    contactId: string;
    ownerId: string;
    pipelineId: string;
    stageId: string;
    title: string;
    customFields?: Record<string, unknown>;
}

// ─── Tasks ──────────────────────────────
export interface Task extends BaseDocument {
    ownerId: string;
    assignedTo?: string;
    organizationId: string;
    leadId?: string;
    contactId?: string;
    postSaleId?: string;
    projectId?: string;
    title: string;
    description?: string;
    priority: Priority;
    status: TaskStatus;
    dueDate?: string;
    completedAt?: string;
    category?: string;
    order: number;
}

export interface Subtask extends BaseDocument {
    taskId: string;
    title: string;
    isCompleted: boolean;
    order: number;
}

// ─── Projects ───────────────────────────
export interface Project extends BaseDocument {
    ownerId: string;
    organizationId: string;
    name: string;
    description?: string;
    status: "active" | "completed" | "archived";
    members: string[];
    contactId?: string;
}

// ─── Calendar ───────────────────────────
export interface CalendarEvent extends BaseDocument {
    ownerId: string;
    title: string;
    description?: string;
    start: string;
    end: string;
    allDay: boolean;
    type: "manual" | "task" | "follow_up";
    linkedId?: string;
    linkedType?: string;
    googleEventId?: string;
    reminderMinutes?: number;
}

// ─── WhatsApp ───────────────────────────
export interface WhatsAppConversation extends BaseDocument {
    ownerId: string;
    contactId?: string;
    leadId?: string;
    phone: string;
    category?: string;
    priority: Priority;
    status: "open" | "closed" | "archived";
    lastMessageAt: string;
    unreadCount: number;
}

export interface WhatsAppMessage extends BaseDocument {
    conversationId: string;
    direction: "inbound" | "outbound";
    type: "text" | "image" | "document" | "audio" | "video";
    content: string;
    mediaUrl?: string;
    status: "sent" | "delivered" | "read" | "failed";
    timestamp: string;
}

// ─── Notes ──────────────────────────────
export interface Note extends BaseDocument {
    ownerId: string;
    entityId: string;
    entityType: "lead" | "contact" | "partner" | "post_sale" | "project";
    content: string;
}

// ─── Billing ────────────────────────────
export interface Subscription extends BaseDocument {
    userId: string;
    planId: string;
    status: SubscriptionStatus;
    paymentMethod: "paypal" | "mercadopago" | "transfer" | "courtesy";
    startDate: string;
    endDate: string;
    autoRenew: boolean;
    couponId?: string;
}

export interface Payment extends BaseDocument {
    userId: string;
    subscriptionId: string;
    amount: number;
    currency: string;
    method: "paypal" | "mercadopago" | "transfer";
    status: "pending" | "completed" | "failed" | "refunded";
    externalId?: string;
    metadata?: Record<string, unknown>;
}

export interface Coupon extends BaseDocument {
    code: string;
    type: "percentage" | "fixed" | "free_trial";
    value: number;
    maxUses?: number;
    currentUses: number;
    validFrom: string;
    validUntil: string;
    isActive: boolean;
    createdBy: string;
}

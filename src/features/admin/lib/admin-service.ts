"use server";

import { appwriteConfig } from "@/lib/appwrite/config";
import { createAdminClient } from "@/lib/appwrite/server";
import { ID, Query } from "node-appwrite";

// ─── List Users ─────────────────────────
export async function listUsers(params?: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    status?: string;
}) {
    const { databases } = createAdminClient();
    const page = params?.page || 1;
    const limit = params?.limit || 25;
    const offset = (page - 1) * limit;

    const queries = [
        Query.limit(limit),
        Query.offset(offset),
        Query.orderDesc("$createdAt"),
    ];

    if (params?.search) {
        queries.push(Query.search("name", params.search));
    }
    if (params?.role) {
        queries.push(Query.equal("role", params.role));
    }
    if (params?.status) {
        queries.push(Query.equal("status", params.status));
    }

    const result = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.tables.users,
        queries
    );

    return { users: result.documents, total: result.total };
}

// ─── Get User by ID ─────────────────────
export async function getUser(userId: string) {
    const { databases } = createAdminClient();
    return databases.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.tables.users,
        userId
    );
}

// ─── Update User ────────────────────────
export async function updateUser(
    userId: string,
    data: Record<string, unknown>
) {
    const { databases } = createAdminClient();
    return databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.tables.users,
        userId,
        data
    );
}

// ─── Suspend User ───────────────────────
export async function suspendUser(userId: string) {
    return updateUser(userId, { status: "suspended" });
}

// ─── Activate User ──────────────────────
export async function activateUser(userId: string) {
    return updateUser(userId, { status: "active" });
}

// ─── Delete User ────────────────────────
export async function deleteUser(userId: string) {
    const { databases } = createAdminClient();
    return databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.tables.users,
        userId
    );
}

// ─── Get Global Metrics ─────────────────
export async function getGlobalMetrics() {
    const { databases } = createAdminClient();

    const [users, leads, contacts, subscriptions] = await Promise.all([
        databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.tables.users, [
            Query.limit(1),
        ]),
        databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.tables.leads, [
            Query.limit(1),
        ]),
        databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.tables.contacts, [
            Query.limit(1),
        ]),
        databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.tables.subscriptions, [
            Query.equal("status", "active"),
            Query.limit(1),
        ]),
    ]);

    return {
        totalUsers: users.total,
        totalLeads: leads.total,
        totalContacts: contacts.total,
        activeSubscriptions: subscriptions.total,
    };
}

// ─── Get Activity Logs ──────────────────
export async function getActivityLogs(params?: {
    page?: number;
    limit?: number;
    userId?: string;
    action?: string;
}) {
    const { databases } = createAdminClient();
    const page = params?.page || 1;
    const limit = params?.limit || 50;

    const queries = [
        Query.limit(limit),
        Query.offset((page - 1) * limit),
        Query.orderDesc("$createdAt"),
    ];

    if (params?.userId) queries.push(Query.equal("userId", params.userId));
    if (params?.action) queries.push(Query.equal("action", params.action));

    const result = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.tables.activityLog,
        queries
    );

    return { logs: result.documents, total: result.total };
}

// ─── Log Activity ───────────────────────
export async function logActivity(data: {
    userId: string;
    action: string;
    entity: string;
    entityId?: string;
    details?: string;
    ip?: string;
}) {
    const { databases } = createAdminClient();
    return databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.tables.activityLog,
        ID.unique(),
        { ...data, timestamp: new Date().toISOString() }
    );
}

// ─── Manage Pipeline Stages ─────────────
export async function getPipelineStages(type: "sales" | "postsale" = "sales") {
    const { databases } = createAdminClient();
    const result = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.tables.pipelineStages,
        [
            Query.equal("type", type),
            Query.orderAsc("order"),
        ]
    );
    return result.documents;
}

export async function createPipelineStage(data: {
    name: string;
    type: "sales" | "postsale";
    color: string;
    order: number;
}) {
    const { databases } = createAdminClient();
    return databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.tables.pipelineStages,
        ID.unique(),
        data
    );
}

export async function updatePipelineStage(
    stageId: string,
    data: Record<string, unknown>
) {
    const { databases } = createAdminClient();
    return databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.tables.pipelineStages,
        stageId,
        data
    );
}

export async function deletePipelineStage(stageId: string) {
    const { databases } = createAdminClient();
    return databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.tables.pipelineStages,
        stageId
    );
}

// ─── Manage Custom Fields ───────────────
export async function getCustomFields(entity: "lead" | "contact" | "partner") {
    const { databases } = createAdminClient();
    const result = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.tables.customFields,
        [
            Query.equal("entity", entity),
            Query.orderAsc("order"),
        ]
    );
    return result.documents;
}

export async function createCustomField(data: {
    entity: "lead" | "contact" | "partner";
    name: string;
    label: string;
    type: "text" | "number" | "date" | "select" | "checkbox" | "url" | "email" | "phone";
    required: boolean;
    options?: string[];
    order: number;
}) {
    const { databases } = createAdminClient();
    return databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.tables.customFields,
        ID.unique(),
        data
    );
}

export async function updateCustomField(
    fieldId: string,
    data: Record<string, unknown>
) {
    const { databases } = createAdminClient();
    return databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.tables.customFields,
        fieldId,
        data
    );
}

export async function deleteCustomField(fieldId: string) {
    const { databases } = createAdminClient();
    return databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.tables.customFields,
        fieldId
    );
}

// ─── Manage Coupons ─────────────────────
export async function listCoupons() {
    const { databases } = createAdminClient();
    const result = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.tables.coupons,
        [Query.orderDesc("$createdAt")]
    );
    return result.documents;
}

export async function createCoupon(data: {
    code: string;
    type: "percentage" | "fixed" | "free_trial";
    value: number;
    validFrom: string;
    validUntil: string;
    maxUses?: number;
    isActive: boolean;
}) {
    const { databases } = createAdminClient();
    return databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.tables.coupons,
        ID.unique(),
        { ...data, currentUses: 0 }
    );
}

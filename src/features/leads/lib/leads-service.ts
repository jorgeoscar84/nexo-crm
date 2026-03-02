"use server";

import { appwriteConfig } from "@/lib/appwrite/config";
import { createAdminClient } from "@/lib/appwrite/server";
import { ID, Query } from "node-appwrite";

// ─── Lead Types ─────────────────────────
export type LeadInput = {
    name: string;
    email?: string;
    phone?: string;
    company?: string;
    source: string;
    stageId: string;
    score?: number;
    notes?: string;
    ownerId: string;
    customFields?: Record<string, unknown>;
};

// ─── List Leads ─────────────────────────
export async function listLeads(params?: {
    page?: number;
    limit?: number;
    search?: string;
    stageId?: string;
    ownerId?: string;
    source?: string;
}) {
    const { databases } = createAdminClient();
    const limit = params?.limit || 50;
    const queries = [
        Query.limit(limit),
        Query.offset(((params?.page || 1) - 1) * limit),
        Query.orderDesc("$createdAt"),
    ];

    if (params?.search) queries.push(Query.search("name", params.search));
    if (params?.stageId) queries.push(Query.equal("stageId", params.stageId));
    if (params?.ownerId) queries.push(Query.equal("ownerId", params.ownerId));
    if (params?.source) queries.push(Query.equal("source", params.source));

    const result = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.tables.leads,
        queries
    );
    return { leads: result.documents, total: result.total };
}

// ─── Get Lead ───────────────────────────
export async function getLead(leadId: string) {
    const { databases } = createAdminClient();
    return databases.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.tables.leads,
        leadId
    );
}

// ─── Create Lead ────────────────────────
export async function createLead(data: LeadInput) {
    const { databases } = createAdminClient();
    return databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.tables.leads,
        ID.unique(),
        data
    );
}

// ─── Update Lead ────────────────────────
export async function updateLead(leadId: string, data: Record<string, unknown>) {
    const { databases } = createAdminClient();
    return databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.tables.leads,
        leadId,
        data
    );
}

// ─── Move Lead Stage ────────────────────
export async function moveLeadStage(leadId: string, stageId: string) {
    return updateLead(leadId, { stageId });
}

// ─── Delete Lead ────────────────────────
export async function deleteLead(leadId: string) {
    const { databases } = createAdminClient();
    return databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.tables.leads,
        leadId
    );
}

// ─── Convert Lead to Contact ────────────
export async function convertLeadToContact(leadId: string) {
    const { databases } = createAdminClient();

    const lead = await databases.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.tables.leads,
        leadId
    );

    // Create contact from lead data
    const contact = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.tables.contacts,
        ID.unique(),
        {
            name: lead.name,
            email: lead.email,
            phone: lead.phone,
            company: lead.company,
            source: lead.source,
            notes: lead.notes,
            ownerId: lead.ownerId,
            convertedFromLead: leadId,
        }
    );

    // Mark lead as converted
    await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.tables.leads,
        leadId,
        { status: "converted", convertedToContactId: contact.$id }
    );

    return contact;
}

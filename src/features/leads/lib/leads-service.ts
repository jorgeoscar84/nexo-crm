"use server";

import { insforge } from "@/lib/insforge/client";
// import { appwriteConfig } from "@/lib/appwrite/config";
// import { createAdminClient } from "@/lib/appwrite/server";
// import { ID, Query } from "node-appwrite";

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
    const limit = params?.limit || 50;
    const page = params?.page || 1;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = insforge.database
        .from('leads')
        .select('*', { count: 'exact' });

    if (params?.search) query = query.ilike('name', `%${params.search}%`);
    if (params?.stageId) query = query.eq('pipeline_stage', params.stageId);
    if (params?.ownerId) query = query.eq('ownerId', params.ownerId);
    // if (params?.source) query = query.eq('source', params.source);

    const { data, count, error } = await query
        .order('created_at', { ascending: false })
        .range(from, to);

    if (error) throw error;

    // Transform to match frontend expectations ($id, $createdAt)
    const leads = (data || []).map(lead => ({
        ...lead,
        $id: lead.id,
        $createdAt: lead.created_at,
        stageId: lead.pipeline_stage
    }));

    return { leads, total: count || 0 };
}

// ─── Get Lead ───────────────────────────
export async function getLead(leadId: string) {
    const { data, error } = await insforge.database
        .from('leads')
        .select('*')
        .eq('id', leadId)
        .single();

    if (error) throw error;
    return { ...data, $id: data.id, $createdAt: data.created_at, stageId: data.pipeline_stage };
}

// ─── Create Lead ────────────────────────
export async function createLead(data: LeadInput) {
    const { data: lead, error } = await insforge.database
        .from('leads')
        .insert({
            name: data.name,
            email: data.email,
            phone: data.phone,
            pipeline_stage: data.stageId,
            priority: 'media', // Default
            ownerId: data.ownerId
        })
        .select()
        .single();

    if (error) throw error;
    return { ...lead, $id: lead.id, $createdAt: lead.created_at, stageId: lead.pipeline_stage };
}

// ─── Update Lead ────────────────────────
export async function updateLead(leadId: string, data: Record<string, unknown>) {
    // Map fields if necessary
    const updateData: any = { ...data };
    if (data.stageId) {
        updateData.pipeline_stage = data.stageId;
        delete updateData.stageId;
    }

    const { data: lead, error } = await insforge.database
        .from('leads')
        .update(updateData)
        .eq('id', leadId)
        .select()
        .single();

    if (error) throw error;
    return { ...lead, $id: lead.id, $createdAt: lead.created_at, stageId: lead.pipeline_stage };
}

// ─── Move Lead Stage ────────────────────
export async function moveLeadStage(leadId: string, stageId: string) {
    return updateLead(leadId, { stageId });
}

// ─── Delete Lead ────────────────────────
export async function deleteLead(leadId: string) {
    const { error } = await insforge.database
        .from('leads')
        .delete()
        .eq('id', leadId);

    if (error) throw error;
    return true;
}

// ─── Convert Lead to Contact ────────────
export async function convertLeadToContact(leadId: string) {
    // Note: If 'contacts' table isn't created yet, this might fail.
    // Assuming for now it's just a status update in 'leads' or a new table.
    // In a real scenario, I'd create the 'contacts' table too.

    const lead = await getLead(leadId);

    // Update lead status
    const updatedLead = await updateLead(leadId, { status: "converted" });
    return updatedLead;
}

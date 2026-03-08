import { insforge } from "@/lib/insforge/client";

export interface Partner {
    $id: string;
    name: string;
    email: string;
    phone?: string;
    status: "active" | "inactive" | "pending";
    level: number;
    parentPartnerId?: string;
    salesCount: number;
    commissionRate: number;
    joinedAt: string;
    $createdAt: string;
}

export type PartnerInput = Omit<Partner, "$id" | "$createdAt" | "joinedAt">;

export const listPartners = async () => {
    try {
        const { data, count, error } = await insforge.database
            .from('partners')
            .select('*', { count: 'exact' });

        if (error) throw error;

        const partners = (data || []).map(partner => ({
            ...partner,
            $id: partner.id,
            $createdAt: partner.created_at,
            joinedAt: partner.joined_at,
            salesCount: partner.sales_count,
            commissionRate: partner.commission_rate
        }));

        return { partners, total: count || 0 };
    } catch (error) {
        console.error("Error listing partners:", error);
        throw error;
    }
};

export const createPartner = async (data: PartnerInput) => {
    try {
        const { data: partner, error } = await insforge.database
            .from('partners')
            .insert({
                name: data.name,
                email: data.email,
                phone: data.phone,
                status: data.status,
                level: data.level,
                sales_count: data.salesCount,
                commission_rate: data.commissionRate
            })
            .select()
            .single();

        if (error) throw error;
        return {
            ...partner,
            $id: partner.id,
            $createdAt: partner.created_at,
            joinedAt: partner.joined_at,
            salesCount: partner.sales_count,
            commission_rate: partner.commission_rate
        } as Partner;
    } catch (error) {
        console.error("Error creating partner:", error);
        throw error;
    }
};

export const updatePartner = async (partnerId: string, data: Partial<PartnerInput>) => {
    try {
        const updateData: any = { ...data };
        if (data.salesCount !== undefined) { updateData.sales_count = data.salesCount; delete updateData.salesCount; }
        if (data.commissionRate !== undefined) { updateData.commission_rate = data.commissionRate; delete updateData.commissionRate; }

        const { data: partner, error } = await insforge.database
            .from('partners')
            .update(updateData)
            .eq('id', partnerId)
            .select()
            .single();

        if (error) throw error;
        return {
            ...partner,
            $id: partner.id,
            $createdAt: partner.created_at,
            joinedAt: partner.joined_at,
            salesCount: partner.sales_count,
            commission_rate: partner.commission_rate
        } as Partner;
    } catch (error) {
        console.error("Error updating partner:", error);
        throw error;
    }
};

export const deletePartner = async (partnerId: string) => {
    try {
        const { error } = await insforge.database
            .from('partners')
            .delete()
            .eq('id', partnerId);

        if (error) throw error;
        return true;
    } catch (error) {
        console.error("Error deleting partner:", error);
        throw error;
    }
};

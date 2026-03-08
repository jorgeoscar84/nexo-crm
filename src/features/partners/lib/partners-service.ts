import { ID, Query } from "appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { databases } from "@/lib/appwrite/client";

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

export const listPartners = async (queries: string[] = []) => {
    try {
        const response = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.tables.partners,
            queries
        );
        return {
            partners: response.documents as unknown as Partner[],
            total: response.total
        };
    } catch (error) {
        console.error("Error listing partners:", error);
        throw error;
    }
};

export const createPartner = async (data: PartnerInput) => {
    try {
        const response = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.tables.partners,
            ID.unique(),
            {
                ...data,
                joinedAt: new Date().toISOString(),
            }
        );
        return response as unknown as Partner;
    } catch (error) {
        console.error("Error creating partner:", error);
        throw error;
    }
};

export const updatePartner = async (partnerId: string, data: Partial<PartnerInput>) => {
    try {
        const response = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.tables.partners,
            partnerId,
            data
        );
        return response as unknown as Partner;
    } catch (error) {
        console.error("Error updating partner:", error);
        throw error;
    }
};

export const deletePartner = async (partnerId: string) => {
    try {
        await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.tables.partners,
            partnerId
        );
        return true;
    } catch (error) {
        console.error("Error deleting partner:", error);
        throw error;
    }
};

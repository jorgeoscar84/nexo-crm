"use server";

import { appwriteConfig } from "@/lib/appwrite/config";
import { createAdminClient } from "@/lib/appwrite/server";
import { ID, Query } from "node-appwrite";

// ─── Subscription Types ─────────────────
export type SubscriptionData = {
    userId: string;
    planId: string;
    paymentMethod: "paypal" | "mercadopago" | "transfer" | "courtesy";
    period: "monthly" | "yearly";
    couponId?: string;
};

// ─── Create Subscription ────────────────
export async function createSubscription(data: SubscriptionData) {
    const { databases } = createAdminClient();

    const now = new Date();
    const endDate = new Date(now);
    if (data.period === "monthly") {
        endDate.setMonth(endDate.getMonth() + 1);
    } else {
        endDate.setFullYear(endDate.getFullYear() + 1);
    }

    const subscription = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.tables.subscriptions,
        ID.unique(),
        {
            userId: data.userId,
            planId: data.planId,
            status: data.paymentMethod === "transfer" ? "pending" : "active",
            paymentMethod: data.paymentMethod,
            startDate: now.toISOString(),
            endDate: endDate.toISOString(),
            autoRenew: data.paymentMethod !== "transfer",
            couponId: data.couponId || null,
        }
    );

    // Update user subscription status
    await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.tables.users,
        data.userId,
        {
            planId: data.planId,
            subscriptionStatus: data.paymentMethod === "transfer" ? "trial" : "active",
            subscriptionExpires: endDate.toISOString(),
        }
    );

    return subscription;
}

// ─── Record Payment ─────────────────────
export async function recordPayment(data: {
    userId: string;
    subscriptionId: string;
    amount: number;
    currency: string;
    method: "paypal" | "mercadopago" | "transfer";
    status: "pending" | "completed" | "failed" | "refunded";
    externalId?: string;
    metadata?: Record<string, unknown>;
}) {
    const { databases } = createAdminClient();

    return databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.tables.payments,
        ID.unique(),
        data
    );
}

// ─── Get User Subscription ──────────────
export async function getUserSubscription(userId: string) {
    const { databases } = createAdminClient();

    try {
        const subscriptions = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.tables.subscriptions,
            [
                Query.equal("userId", userId),
                Query.orderDesc("$createdAt"),
                Query.limit(1),
            ]
        );
        return subscriptions.documents[0] || null;
    } catch {
        return null;
    }
}

// ─── Grant Courtesy Subscription ────────
export async function grantCourtesySubscription(
    userId: string,
    planId: string,
    durationDays: number,
    grantedBy: string
) {
    const { databases } = createAdminClient();

    const now = new Date();
    const endDate = new Date(now);
    endDate.setDate(endDate.getDate() + durationDays);

    const subscription = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.tables.subscriptions,
        ID.unique(),
        {
            userId,
            planId,
            status: "active",
            paymentMethod: "courtesy",
            startDate: now.toISOString(),
            endDate: endDate.toISOString(),
            autoRenew: false,
        }
    );

    await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.tables.users,
        userId,
        {
            planId,
            subscriptionStatus: "courtesy",
            subscriptionExpires: endDate.toISOString(),
            courtesyGrantedBy: grantedBy,
        }
    );

    return subscription;
}

// ─── Validate Coupon ────────────────────
export async function validateCoupon(code: string) {
    const { databases } = createAdminClient();

    try {
        const coupons = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.tables.coupons,
            [
                Query.equal("code", code),
                Query.equal("isActive", true),
            ]
        );

        const coupon = coupons.documents[0];
        if (!coupon) return { valid: false, error: "Cupón no encontrado" };

        const now = new Date();
        if (new Date(coupon.validFrom) > now) return { valid: false, error: "Cupón aún no vigente" };
        if (new Date(coupon.validUntil) < now) return { valid: false, error: "Cupón expirado" };
        if (coupon.maxUses && coupon.currentUses >= coupon.maxUses)
            return { valid: false, error: "Cupón agotado" };

        return { valid: true, coupon };
    } catch {
        return { valid: false, error: "Error al validar cupón" };
    }
}




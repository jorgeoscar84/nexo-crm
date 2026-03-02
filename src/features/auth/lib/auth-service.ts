"use server";

import { ID, OAuthProvider } from "node-appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isDemoMode, DEMO_USER } from "@/lib/demo-mode";

const SESSION_COOKIE = "nexo-session";

// Only import Appwrite when NOT in demo mode (lazy)
async function getAppwriteClients() {
    const { createAdminClient, createSessionClient } = await import(
        "@/lib/appwrite/server"
    );
    const { appwriteConfig } = await import("@/lib/appwrite/config");
    return { createAdminClient, createSessionClient, appwriteConfig };
}

// ─── Get current session ────────────────
export async function getSession() {
    const cookieStore = await cookies();
    const session = cookieStore.get(SESSION_COOKIE);
    return session?.value || null;
}

// ─── Get current user ───────────────────
export async function getCurrentUser() {
    try {
        const session = await getSession();

        // Demo mode: if session cookie exists, return demo user
        if (isDemoMode()) {
            return session ? DEMO_USER : null;
        }

        if (!session) return null;

        const { createSessionClient, appwriteConfig } =
            await getAppwriteClients();
        const { account, databases } = createSessionClient(session);
        const user = await account.get();

        try {
            const profile = await databases.getDocument(
                appwriteConfig.databaseId,
                appwriteConfig.tables.users,
                user.$id
            );
            return { ...user, ...profile };
        } catch {
            return user;
        }
    } catch {
        return null;
    }
}

// ─── Register with email + password ─────
export async function registerWithEmail(formData: {
    name: string;
    email: string;
    password: string;
}) {
    // Demo mode: simulate registration
    if (isDemoMode()) {
        const cookieStore = await cookies();
        cookieStore.set(SESSION_COOKIE, "demo_session_token", {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        });
        return;
    }

    const { name, email, password } = formData;
    const { createAdminClient, createSessionClient } =
        await getAppwriteClients();

    const { account } = createAdminClient();
    await account.create(ID.unique(), email, password, name);
    const session = await account.createEmailPasswordSession(email, password);

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        expires: new Date(session.expire),
    });

    const { account: userAccount } = createSessionClient(session.secret);
    await userAccount.createVerification(
        `${process.env.NEXT_PUBLIC_APP_URL}/verify-email`
    );
}

// ─── Login with email + password ────────
export async function loginWithEmail(formData: {
    email: string;
    password: string;
}) {
    // Demo mode: simulate login
    if (isDemoMode()) {
        const cookieStore = await cookies();
        cookieStore.set(SESSION_COOKIE, "demo_session_token", {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });
        return;
    }

    const { email, password } = formData;
    const { createAdminClient } = await getAppwriteClients();

    const { account } = createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        expires: new Date(session.expire),
    });
}

// ─── Login with Google OAuth ────────────
export async function loginWithGoogle() {
    if (isDemoMode()) {
        // In demo mode, just redirect to dashboard
        redirect("/dashboard");
    }

    const { createAdminClient } = await getAppwriteClients();
    const { account } = createAdminClient();

    const redirectUrl = await account.createOAuth2Token(
        OAuthProvider.Google,
        `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/oauth/callback`,
        `${process.env.NEXT_PUBLIC_APP_URL}/login?error=oauth_cancelled`
    );

    redirect(redirectUrl);
}

// ─── Handle OAuth callback ──────────────
export async function handleOAuthCallback(userId: string, secret: string) {
    if (isDemoMode()) return;

    const { createAdminClient } = await getAppwriteClients();
    const { account } = createAdminClient();
    const session = await account.createSession(userId, secret);

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        expires: new Date(session.expire),
    });
}

// ─── Logout ─────────────────────────────
export async function logout() {
    const session = await getSession();

    if (!isDemoMode() && session) {
        try {
            const { createSessionClient } = await getAppwriteClients();
            const { account } = createSessionClient(session);
            await account.deleteSession("current");
        } catch {
            // Session might already be expired
        }
    }

    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE);
}

// ─── Forgot Password ────────────────────
export async function forgotPassword(email: string) {
    if (isDemoMode()) return; // Noop in demo

    const { createAdminClient } = await getAppwriteClients();
    const { account } = createAdminClient();
    await account.createRecovery(
        email,
        `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`
    );
}

// ─── Reset Password ─────────────────────
export async function resetPassword(
    userId: string,
    secret: string,
    newPassword: string
) {
    if (isDemoMode()) return;

    const { createAdminClient } = await getAppwriteClients();
    const { account } = createAdminClient();
    await account.updateRecovery(userId, secret, newPassword);
}

// ─── Verify Email ───────────────────────
export async function verifyEmail(userId: string, secret: string) {
    if (isDemoMode()) return;

    const { createAdminClient } = await getAppwriteClients();
    const { account } = createAdminClient();
    await account.updateVerification(userId, secret);
}

// ─── Resend Verification ────────────────
export async function resendVerification() {
    if (isDemoMode()) return;

    const session = await getSession();
    if (!session) throw new Error("No session");

    const { createSessionClient } = await getAppwriteClients();
    const { account } = createSessionClient(session);
    await account.createVerification(
        `${process.env.NEXT_PUBLIC_APP_URL}/verify-email`
    );
}

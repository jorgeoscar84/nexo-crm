"use server";

import { ID, OAuthProvider } from "node-appwrite";
import { createAdminClient, createSessionClient } from "@/lib/appwrite/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { appwriteConfig } from "@/lib/appwrite/config";

const SESSION_COOKIE = "nexo-session";

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
        if (!session) return null;

        const { account, databases } = createSessionClient(session);
        const user = await account.get();

        // Try to get extended user profile
        try {
            const profile = await databases.getDocument(
                appwriteConfig.databaseId,
                appwriteConfig.tables.users,
                user.$id
            );
            return { ...user, ...profile };
        } catch {
            // Profile doesn't exist yet, return basic user
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
    const { name, email, password } = formData;

    const { account } = createAdminClient();

    // Create user account
    await account.create(ID.unique(), email, password, name);

    // Create session
    const session = await account.createEmailPasswordSession(email, password);

    // Set session cookie
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        expires: new Date(session.expire),
    });

    // Send verification email
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
    const { email, password } = formData;

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
    if (!session) return;

    try {
        const { account } = createSessionClient(session);
        await account.deleteSession("current");
    } catch {
        // Session might already be expired
    }

    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE);
}

// ─── Forgot Password ────────────────────
export async function forgotPassword(email: string) {
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
    const { account } = createAdminClient();
    await account.updateRecovery(userId, secret, newPassword);
}

// ─── Verify Email ───────────────────────
export async function verifyEmail(userId: string, secret: string) {
    const { account } = createAdminClient();
    await account.updateVerification(userId, secret);
}

// ─── Resend Verification ────────────────
export async function resendVerification() {
    const session = await getSession();
    if (!session) throw new Error("No session");

    const { account } = createSessionClient(session);
    await account.createVerification(
        `${process.env.NEXT_PUBLIC_APP_URL}/verify-email`
    );
}

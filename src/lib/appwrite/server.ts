import "server-only";

import { Client, Account, Databases, Storage, Users } from "node-appwrite";
import { appwriteConfig } from "./config";

// Validate that Appwrite is configured before creating clients
function validateConfig() {
    if (!appwriteConfig.projectId) {
        throw new Error(
            "NEXT_PUBLIC_APPWRITE_PROJECT no está configurado. Agrega las variables de entorno de Appwrite."
        );
    }
}

// Server-side Appwrite client (with API key — full access)
export function createAdminClient() {
    validateConfig();

    if (!appwriteConfig.apiKey) {
        throw new Error(
            "APPWRITE_API_KEY no está configurado. Esta variable es obligatoria para operaciones de servidor."
        );
    }

    const client = new Client()
        .setEndpoint(appwriteConfig.endpoint)
        .setProject(appwriteConfig.projectId)
        .setKey(appwriteConfig.apiKey);

    return {
        client,
        account: new Account(client),
        databases: new Databases(client),
        storage: new Storage(client),
        users: new Users(client),
    };
}

// Server-side Appwrite client (with session — user context)
export function createSessionClient(session: string) {
    validateConfig();

    const client = new Client()
        .setEndpoint(appwriteConfig.endpoint)
        .setProject(appwriteConfig.projectId)
        .setSession(session);

    return {
        client,
        account: new Account(client),
        databases: new Databases(client),
        storage: new Storage(client),
    };
}

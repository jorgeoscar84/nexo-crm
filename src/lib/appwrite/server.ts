import "server-only";

import { Client, Account, Databases, Storage, Users } from "node-appwrite";
import { appwriteConfig } from "./config";

// Server-side Appwrite client (with API key — full access)
export function createAdminClient() {
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

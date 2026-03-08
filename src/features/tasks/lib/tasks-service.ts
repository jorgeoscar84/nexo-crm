import { ID, Query } from "appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { databases } from "@/lib/appwrite/client";

export interface Task {
    $id: string;
    title: string;
    description?: string;
    status: "todo" | "in_progress" | "completed" | "archived";
    priority: "low" | "medium" | "high" | "urgent";
    dueDate?: string;
    ownerId: string;
    relatedEntityId?: string; // Lead, Contact, etc.
    relatedEntityType?: string;
    $createdAt: string;
}

export type TaskInput = Omit<Task, "$id" | "$createdAt">;

export const listTasks = async (queries: string[] = []) => {
    try {
        const response = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.tables.tasks,
            queries
        );
        return {
            tasks: response.documents as unknown as Task[],
            total: response.total
        };
    } catch (error) {
        console.error("Error listing tasks:", error);
        throw error;
    }
};

export const createTask = async (data: TaskInput) => {
    try {
        const response = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.tables.tasks,
            ID.unique(),
            data
        );
        return response as unknown as Task;
    } catch (error) {
        console.error("Error creating task:", error);
        throw error;
    }
};

export const updateTask = async (taskId: string, data: Partial<TaskInput>) => {
    try {
        const response = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.tables.tasks,
            taskId,
            data
        );
        return response as unknown as Task;
    } catch (error) {
        console.error("Error updating task:", error);
        throw error;
    }
};

export const deleteTask = async (taskId: string) => {
    try {
        await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.tables.tasks,
            taskId
        );
        return true;
    } catch (error) {
        console.error("Error deleting task:", error);
        throw error;
    }
};

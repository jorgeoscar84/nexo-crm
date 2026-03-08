import { insforge } from "@/lib/insforge/client";

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

export const listTasks = async () => {
    try {
        const { data, count, error } = await insforge.database
            .from('tasks')
            .select('*', { count: 'exact' });

        if (error) throw error;

        const tasks = (data || []).map(task => ({
            ...task,
            $id: task.id,
            $createdAt: task.created_at,
            dueDate: task.due_date
        }));

        return { tasks, total: count || 0 };
    } catch (error) {
        console.error("Error listing tasks:", error);
        throw error;
    }
};

export const createTask = async (data: TaskInput) => {
    try {
        const { data: task, error } = await insforge.database
            .from('tasks')
            .insert({
                title: data.title,
                description: data.description,
                status: data.status,
                priority: data.priority,
                due_date: data.dueDate,
                owner_id: data.ownerId
            })
            .select()
            .single();

        if (error) throw error;
        return {
            ...task,
            $id: task.id,
            $createdAt: task.created_at,
            dueDate: task.due_date
        } as Task;
    } catch (error) {
        console.error("Error creating task:", error);
        throw error;
    }
};

export const updateTask = async (taskId: string, data: Partial<TaskInput>) => {
    try {
        const updateData: any = { ...data };
        if (data.dueDate) { updateData.due_date = data.dueDate; delete updateData.dueDate; }
        if (data.ownerId) { updateData.owner_id = data.ownerId; delete updateData.ownerId; }

        const { data: task, error } = await insforge.database
            .from('tasks')
            .update(updateData)
            .eq('id', taskId)
            .select()
            .single();

        if (error) throw error;
        return {
            ...task,
            $id: task.id,
            $createdAt: task.created_at,
            dueDate: task.due_date
        } as Task;
    } catch (error) {
        console.error("Error updating task:", error);
        throw error;
    }
};

export const deleteTask = async (taskId: string) => {
    try {
        const { error } = await insforge.database
            .from('tasks')
            .delete()
            .eq('id', taskId);

        if (error) throw error;
        return true;
    } catch (error) {
        console.error("Error deleting task:", error);
        throw error;
    }
};

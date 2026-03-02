import { create } from "zustand";

interface UserInfo {
    id: string;
    name: string;
    email: string;
    role: "super_admin" | "admin" | "user";
}

interface CrmState {
    // Configuración global y usuario
    user: UserInfo | null;
    setUser: (user: UserInfo | null) => void;

    // Pipeline Settings Cache
    salesStages: { id: string; name: string; color: string }[];
    setSalesStages: (stages: { id: string; name: string; color: string }[]) => void;

    // Filtros globales (útiles para persistir entre vistas)
    globalSearch: string;
    setGlobalSearch: (search: string) => void;

    // Acciones rápidas (modales)
    isNewLeadModalOpen: boolean;
    setNewLeadModalOpen: (isOpen: boolean) => void;
    isNewTaskModalOpen: boolean;
    setNewTaskModalOpen: (isOpen: boolean) => void;
}

export const useCrmStore = create<CrmState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),

    salesStages: [],
    setSalesStages: (salesStages) => set({ salesStages }),

    globalSearch: "",
    setGlobalSearch: (globalSearch) => set({ globalSearch }),

    isNewLeadModalOpen: false,
    setNewLeadModalOpen: (isOpen) => set({ isNewLeadModalOpen: isOpen }),

    isNewTaskModalOpen: false,
    setNewTaskModalOpen: (isOpen) => set({ isNewTaskModalOpen: isOpen }),
}));

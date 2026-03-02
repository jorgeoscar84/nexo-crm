export type PlanId = "starter" | "pro" | "enterprise";

export interface PlanLimit {
    leads: number;
    contacts: number;
    partners: number;
    pipelines: number;
    projects: number;
    whatsappNumbers: number;
    scheduledReports: boolean;
    customFieldsPerEntity: number;
    storageMB: number;
}

export interface Plan {
    id: PlanId;
    name: string;
    description: string;
    priceMonthly: number;
    priceYearly: number;
    currency: string;
    limits: PlanLimit;
    popular?: boolean;
    features: string[];
}

export const plans: Plan[] = [
    {
        id: "starter",
        name: "Starter",
        description: "Ideal para emprendedores que inician",
        priceMonthly: 12,
        priceYearly: 120,
        currency: "USD",
        limits: {
            leads: 500,
            contacts: 1000,
            partners: 10,
            pipelines: 2,
            projects: 3,
            whatsappNumbers: 1,
            scheduledReports: false,
            customFieldsPerEntity: 5,
            storageMB: 1024,
        },
        features: [
            "Pipeline de ventas visual",
            "Pipeline de postventa",
            "Hasta 500 leads",
            "Hasta 1,000 contactos",
            "WhatsApp integrado (1 número)",
            "Tareas y subtareas",
            "Calendario nativo + Google Calendar",
            "Fichas de socios MLM (hasta 10)",
            "Dashboard personal",
            "Import/Export Excel",
            "Soporte por email",
        ],
    },
    {
        id: "pro",
        name: "Pro",
        description: "Para equipos y líderes en crecimiento",
        priceMonthly: 25,
        priceYearly: 250,
        currency: "USD",
        popular: true,
        limits: {
            leads: 5000,
            contacts: 10000,
            partners: 100,
            pipelines: 6,
            projects: 20,
            whatsappNumbers: 3,
            scheduledReports: true,
            customFieldsPerEntity: 20,
            storageMB: 10240,
        },
        features: [
            "Todo lo de Starter +",
            "Hasta 5,000 leads",
            "Hasta 10,000 contactos",
            "WhatsApp (3 números)",
            "Hasta 100 socios MLM",
            "20 proyectos",
            "Reportes programados semanales",
            "20 campos personalizables por ficha",
            "Dashboard de equipo",
            "10 GB de almacenamiento",
            "Soporte por email + chat",
        ],
    },
    {
        id: "enterprise",
        name: "Enterprise",
        description: "Para organizaciones y redes grandes",
        priceMonthly: 45,
        priceYearly: 450,
        currency: "USD",
        limits: {
            leads: Infinity,
            contacts: Infinity,
            partners: Infinity,
            pipelines: Infinity,
            projects: Infinity,
            whatsappNumbers: Infinity,
            scheduledReports: true,
            customFieldsPerEntity: Infinity,
            storageMB: 51200,
        },
        features: [
            "Todo lo de Pro +",
            "Leads ilimitados",
            "Contactos ilimitados",
            "Socios MLM ilimitados",
            "Pipelines ilimitados",
            "Proyectos ilimitados",
            "WhatsApp ilimitado",
            "Reportes programados (diario/semanal/mensual)",
            "Campos personalizables ilimitados",
            "50 GB de almacenamiento",
            "Soporte prioritario",
        ],
    },
];

export function getPlanById(id: PlanId): Plan | undefined {
    return plans.find((p) => p.id === id);
}

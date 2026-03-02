export const siteConfig = {
  name: "Nexo CRM",
  tagline: "Conecta. Vende. Lidera.",
  description:
    "CRM comercial y de liderazgo para emprendedores y líderes de red: pipeline de ventas, gestión de socios y WhatsApp, todo en un solo lugar.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ogImage: "/og-image.png",
  links: {
    login: "/login",
    register: "/register",
    dashboard: "/dashboard",
    pricing: "/pricing",
  },
  creator: "Nexo CRM",
  keywords: [
    "CRM",
    "WhatsApp",
    "ventas",
    "postventa",
    "network marketing",
    "MLM",
    "pipeline",
    "leads",
    "socios",
  ],
} as const;

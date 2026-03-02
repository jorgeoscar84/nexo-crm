# 🚀 Nexo CRM

> CRM integral con pipeline de ventas, postventa, socios MLM, WhatsApp integrado y reportes Excel. Construido con Next.js 16, Tailwind 4, Appwrite y shadcn/ui.

---

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | Next.js 16.1.6 (App Router, Turbopack) |
| Estilos | Tailwind CSS 4.2.1 + shadcn/ui |
| Backend/DB | Appwrite (self-hosted) |
| State | Zustand |
| Animaciones | Framer Motion |
| Charts/Reportes | Recharts + ExcelJS |
| Drag & Drop | @dnd-kit |
| Hosting | Docker + Dockploy (VPS) |

---

## Requisitos previos

- **Node.js** ≥ 20
- **npm** ≥ 10
- **Appwrite** self-hosted (con proyecto y base de datos creados)
- **Docker** (para deploy)

---

## Instalación local

```bash
# 1. Clonar el repo
git clone <tu-repo-url> nexo-crm
cd nexo-crm

# 2. Instalar dependencias
npm install

# 3. Copiar variables de entorno
cp .env.example .env.local

# 4. Configurar .env.local con tus credenciales de Appwrite

# 5. Iniciar en modo desarrollo
npm run dev
```

La app estará disponible en `http://localhost:3000`.

---

## Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `NEXT_PUBLIC_APPWRITE_ENDPOINT` | URL del endpoint de Appwrite |
| `NEXT_PUBLIC_APPWRITE_PROJECT` | ID del proyecto en Appwrite |
| `NEXT_PUBLIC_APPWRITE_DATABASE` | ID de la base de datos |
| `APPWRITE_API_KEY` | API Key de servidor (no pública) |
| `NEXT_PUBLIC_APP_URL` | URL pública de la app |
| `PAYPAL_CLIENT_ID` / `PAYPAL_CLIENT_SECRET` | Credenciales PayPal |
| `MERCADOPAGO_ACCESS_TOKEN` | Token de MercadoPago |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | OAuth Google |

> Ver `.env.example` para la lista completa.

---

## Estructura del proyecto

```
src/
├── app/
│   ├── (marketing)/     # Landing, pricing, features
│   ├── (auth)/           # Login, register, forgot-password
│   ├── (dashboard)/      # Dashboard, pipeline, leads, etc.
│   ├── admin/            # Panel de administración
│   ├── checkout/         # Flujo de pagos
│   └── api/              # Webhooks, billing, integrations
├── components/
│   ├── landing/          # Componentes de la landing
│   ├── layout/           # DashboardSidebar, etc.
│   ├── shared/           # Skeletons, EmptyState, FeedbackUI
│   └── ui/               # shadcn/ui components
├── features/
│   ├── admin/            # Admin service
│   ├── auth/             # Auth service
│   ├── billing/          # Billing, payment providers
│   └── leads/            # Leads CRUD service
├── lib/
│   ├── appwrite/         # Config, client, server
│   ├── excel.ts          # Exportación Excel
│   └── utils.ts          # Utilidades generales
├── store/                # Zustand stores
└── config/               # Site config, constantes
```

---

## Rutas principales (39 rutas)

### Marketing
| Ruta | Página |
|------|--------|
| `/` | Landing page |
| `/features` | Características |
| `/pricing` | Precios |

### Autenticación
| Ruta | Página |
|------|--------|
| `/login` | Inicio de sesión |
| `/register` | Registro |
| `/forgot-password` | Recuperar contraseña |
| `/reset-password` | Restablecer contraseña |
| `/verify-email` | Verificar email |

### Dashboard
| Ruta | Página |
|------|--------|
| `/dashboard` | Dashboard principal (KPIs) |
| `/dashboard/pipeline` | Kanban de ventas |
| `/dashboard/postsale` | Kanban de postventa |
| `/dashboard/leads` | Lista de leads |
| `/dashboard/contacts` | Contactos |
| `/dashboard/partners` | Socios MLM |
| `/dashboard/tasks` | Tareas |
| `/dashboard/calendar` | Calendario |
| `/dashboard/whatsapp` | Chat WhatsApp |
| `/dashboard/reports` | Reportes Excel |
| `/dashboard/settings` | Configuración |

### Admin
| Ruta | Página |
|------|--------|
| `/admin` | Métricas globales |
| `/admin/users` | Gestión de usuarios |
| `/admin/pipeline` | Config pipeline |
| `/admin/fields` | Campos personalizados |
| `/admin/templates` | Templates WhatsApp |
| `/admin/coupons` | Cupones |
| `/admin/permissions` | Permisos por rol |
| `/admin/logs` | Logs de actividad |

---

## Despliegue con Docker

```bash
# Build y levantar
docker compose up -d --build

# Solo build de la imagen
docker build -t nexo-crm \
  --build-arg NEXT_PUBLIC_APPWRITE_ENDPOINT=https://appwrite.tudominio.com/v1 \
  --build-arg NEXT_PUBLIC_APPWRITE_PROJECT=tu_project_id \
  --build-arg NEXT_PUBLIC_APPWRITE_DATABASE=nexo_db \
  --build-arg NEXT_PUBLIC_APP_URL=https://crm.tudominio.com \
  .
```

### Deploy con Dockploy

1. Push a la rama `main` de GitHub
2. En Dockploy, crea un servicio Docker apuntando al repo
3. Configura las variables de entorno listadas arriba
4. El deploy se ejecutará automáticamente al hacer push

---

## Scripts disponibles

```bash
npm run dev       # Desarrollo con Turbopack
npm run build     # Build de producción
npm run start     # Iniciar servidor de producción
npm run lint      # Linting con ESLint
```

---

## Licencia

Privado — © 2026 Nexo CRM. Todos los derechos reservados.

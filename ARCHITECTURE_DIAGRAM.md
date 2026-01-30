# BlueRoof Realty - Architecture Visual Diagram

## 🏗️ System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                          │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │         FRONTEND: Next.js (App Router)                    │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │  /app - Pages (UI)                                  │  │  │
│  │  │  ├─ (public)/ - Public pages                       │  │  │
│  │  │  │  ├─ page.tsx → Landing Page                     │  │  │
│  │  │  │  ├─ contact/page.tsx → Lead Capture Form        │  │  │
│  │  │  │  ├─ properties/page.tsx → Property Listings     │  │  │
│  │  │  │  └─ about/page.tsx → About Page                 │  │  │
│  │  │  └─ (admin)/ - Admin Panel (CRM)                   │  │  │
│  │  │     ├─ dashboard/page.tsx → Dashboard              │  │  │
│  │  │     ├─ leads/page.tsx → Lead Management (CRM)      │  │  │
│  │  │     ├─ agents/page.tsx → Agent Management          │  │  │
│  │  │     └─ settings/page.tsx → Settings                │  │  │
│  │  ├─ /components - Reusable UI Components              │  │  │
│  │  │  ├─ ui/ → Buttons, Inputs, Cards                   │  │  │
│  │  │  ├─ forms/ → ContactForm, LoginForm                │  │  │
│  │  │  └─ layout/ → Header, Footer, Sidebar              │  │  │
│  │  ├─ /lib - Utilities                                   │  │  │
│  │  │  ├─ api.ts → API Client (HTTP requests)            │  │  │
│  │  │  ├─ auth.ts → JWT Token Management                 │  │  │
│  │  │  └─ constants.ts → App Constants                   │  │  │
│  │  └─ /store - State Management                         │  │  │
│  │     ├─ auth.store.ts → Auth State                     │  │  │
│  │     └─ lead.store.ts → Lead State                     │  │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↕ HTTP (REST API)
┌─────────────────────────────────────────────────────────────────┐
│                   BACKEND: Node.js (Modular Monolith)           │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  main.ts → Application Entry Point                       │  │
│  │  ├─ Express Server Setup                                 │  │
│  │  ├─ Middleware Registration                              │  │
│  │  └─ Route Registration                                   │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  /modules - Feature Modules                              │  │
│  │  ├─ /auth → Authentication                              │  │
│  │  │  ├─ auth.controller.ts → Request Handlers           │  │
│  │  │  ├─ auth.service.ts → Business Logic                │  │
│  │  │  └─ auth.routes.ts → POST /api/auth/login           │  │
│  │  ├─ /users → User Management                            │  │
│  │  │  ├─ user.service.ts → User CRUD                     │  │
│  │  │  └─ user.routes.ts → GET /api/users                 │  │
│  │  ├─ /leads → **MINI CRM CORE**                         │  │
│  │  │  ├─ lead.controller.ts → Lead Handlers              │  │
│  │  │  ├─ lead.service.ts → Lead Business Logic           │  │
│  │  │  ├─ lead.model.ts → Lead Data Structure             │  │
│  │  │  ├─ lead.routes.ts → GET/POST /api/leads            │  │
│  │  │  └─ lead.enums.ts → Statuses, Sources               │  │
│  │  ├─ /properties → Property Management                   │  │
│  │  │  ├─ property.controller.ts → Property Handlers      │  │
│  │  │  ├─ property.service.ts → Property Logic            │  │
│  │  │  └─ property.routes.ts → GET /api/properties        │  │
│  │  ├─ /notifications → Communication                      │  │
│  │  │  ├─ email.service.ts → Email Integration            │  │
│  │  │  └─ whatsapp.service.ts → WhatsApp Integration      │  │
│  │  ├─ /insurance → Future Module (Placeholder)           │  │
│  │  └─ /finance → Future Module (Placeholder)             │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  /middlewares → Request Middlewares                      │  │
│  │  ├─ auth.middleware.ts → JWT Validation                 │  │
│  │  ├─ error.middleware.ts → Error Handler                 │  │
│  │  └─ validation.middleware.ts → Request Validation       │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  /config → Configuration                                 │  │
│  │  ├─ database.ts → PostgreSQL Connection                 │  │
│  │  └─ env.ts → Environment Variables                      │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  /database → Database Layer                              │  │
│  │  ├─ /models → Database Models                           │  │
│  │  │  ├─ user.model.ts                                    │  │
│  │  │  ├─ lead.model.ts                                    │  │
│  │  │  ├─ lead_notes.model.ts                              │  │
│  │  │  ├─ lead_followups.model.ts                          │  │
│  │  │  └─ property.model.ts                                │  │
│  │  ├─ /migrations → SQL Migration Files                   │  │
│  │  └─ /seeds → Initial Data                               │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↕ SQL Queries
┌─────────────────────────────────────────────────────────────────┐
│                    DATABASE: PostgreSQL                         │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Tables:                                                 │  │
│  │  ├─ users (id, email, password_hash, role, ...)         │  │
│  │  ├─ leads (id, name, email, phone, source, status, ...) │  │
│  │  ├─ lead_notes (id, lead_id, note_text, ...)            │  │
│  │  ├─ lead_followups (id, lead_id, scheduled_at, ...)     │  │
│  │  └─ properties (id, title, address, price, ...)         │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow Diagram - Lead Capture Example

```
┌──────────────────────────────────────────────────────────────────────┐
│ STEP 1: User Visits Contact Page                                     │
│                                                                       │
│  Browser → https://yoursite.com/contact                              │
│    ↓                                                                  │
│  Next.js Route: /app/(public)/contact/page.tsx                       │
│    ↓                                                                  │
│  Renders: <ContactForm /> Component                                  │
│  Component Location: /components/forms/ContactForm.tsx               │
└──────────────────────────────────────────────────────────────────────┘
                              ↓ User fills form
┌──────────────────────────────────────────────────────────────────────┐
│ STEP 2: User Submits Form                                            │
│                                                                       │
│  ContactForm.tsx → handleSubmit()                                    │
│    ↓                                                                  │
│  Calls: lib/api.ts → createLead(formData)                            │
│    ↓                                                                  │
│  HTTP POST Request: /api/leads                                       │
│  Body: { name: "John", email: "john@email.com", phone: "123456",    │
│         source: "GOOGLE" }                                           │
└──────────────────────────────────────────────────────────────────────┘
                              ↓ HTTP Request
┌──────────────────────────────────────────────────────────────────────┐
│ STEP 3: Backend Receives Request                                     │
│                                                                       │
│  Express Server: main.ts                                             │
│    ↓                                                                  │
│  Routes to: /modules/leads/lead.routes.ts                            │
│    ↓                                                                  │
│  POST /api/leads → lead.controller.ts → createLead()                 │
└──────────────────────────────────────────────────────────────────────┘
                              ↓ Controller Logic
┌──────────────────────────────────────────────────────────────────────┐
│ STEP 4: Controller Processes Request                                 │
│                                                                       │
│  lead.controller.ts → createLead(req, res)                           │
│    ↓                                                                  │
│  Validates: Request body (name, email, phone required)               │
│    ↓                                                                  │
│  Calls: lead.service.ts → createLead(data)                           │
└──────────────────────────────────────────────────────────────────────┘
                              ↓ Service Logic
┌──────────────────────────────────────────────────────────────────────┐
│ STEP 5: Service Executes Business Logic                              │
│                                                                       │
│  lead.service.ts → createLead(data)                                  │
│    ↓                                                                  │
│  Business Logic:                                                     │
│    • Validate email format                                           │
│    • Check for duplicate email                                       │
│    • Set default status = "NEW"                                      │
│    • Set source = data.source or "DIRECT"                            │
│    ↓                                                                  │
│  Database Query: INSERT INTO leads (...)                             │
│    ↓                                                                  │
│  Returns: Created lead object { id, name, email, status: "NEW", ...} │
└──────────────────────────────────────────────────────────────────────┘
                              ↓ Database Operation
┌──────────────────────────────────────────────────────────────────────┐
│ STEP 6: Database Saves Lead                                          │
│                                                                       │
│  PostgreSQL: INSERT INTO leads                                       │
│    ↓                                                                  │
│  Returns: New lead record with generated ID                          │
└──────────────────────────────────────────────────────────────────────┘
                              ↓ Response
┌──────────────────────────────────────────────────────────────────────┐
│ STEP 7: Response Returns to Frontend                                 │
│                                                                       │
│  Service → Controller → HTTP Response                                │
│    ↓                                                                  │
│  Status: 201 Created                                                 │
│  Body: { id: 1, name: "John", email: "john@email.com",              │
│         status: "NEW", created_at: "2024-01-01", ... }               │
└──────────────────────────────────────────────────────────────────────┘
                              ↓ Frontend Update
┌──────────────────────────────────────────────────────────────────────┐
│ STEP 8: Frontend Updates UI                                          │
│                                                                       │
│  lib/api.ts → Receives response                                      │
│    ↓                                                                  │
│  ContactForm.tsx → handleSuccess()                                   │
│    ↓                                                                  │
│  UI Update: Show success message "Thank you! We'll contact you soon."│
│    ↓                                                                  │
│  Optional: Update store/lead.store.ts (if admin panel is open)       │
└──────────────────────────────────────────────────────────────────────┘
                              ↓ Optional Notification
┌──────────────────────────────────────────────────────────────────────┐
│ STEP 9: Backend Triggers Notification (Async)                        │
│                                                                       │
│  lead.service.ts → After saving lead                                 │
│    ↓                                                                  │
│  notifications/email.service.ts → sendEmail()                        │
│    ↓                                                                  │
│  Sends: Welcome email to lead + Notification email to admin          │
│    ↓                                                                  │
│  Optional: notifications/whatsapp.service.ts → sendWhatsApp()        │
│    ↓                                                                  │
│  Sends: WhatsApp notification to admin about new lead                │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 🎯 Component Hierarchy

### Frontend Component Tree

```
RootLayout (app/layout.tsx)
│
├─ PublicLayout (app/(public)/layout.tsx)
│  ├─ Header (components/layout/Header.tsx)
│  │  ├─ Logo (components/ui/Logo.tsx)
│  │  └─ Navigation (components/layout/Navigation.tsx)
│  │
│  ├─ LandingPage (app/(public)/page.tsx)
│  │  ├─ HeroSection (components/layout/HeroSection.tsx)
│  │  ├─ PropertyCard (components/cards/PropertyCard.tsx) × N
│  │  └─ Button (components/ui/Button.tsx)
│  │
│  ├─ ContactPage (app/(public)/contact/page.tsx)
│  │  └─ ContactForm (components/forms/ContactForm.tsx)
│  │     ├─ Input (components/ui/Input.tsx) × 3
│  │     └─ Button (components/ui/Button.tsx)
│  │
│  └─ Footer (components/layout/Footer.tsx)
│
└─ AdminLayout (app/(admin)/layout.tsx)
   ├─ Sidebar (components/layout/Sidebar.tsx)
   │  └─ Navigation (components/layout/AdminNav.tsx)
   │
   ├─ DashboardPage (app/(admin)/dashboard/page.tsx)
   │  ├─ DashboardCard (components/cards/DashboardCard.tsx) × 4
   │  └─ Chart (components/ui/Chart.tsx)
   │
   └─ LeadsPage (app/(admin)/leads/page.tsx)
      ├─ LeadFilter (components/forms/LeadFilter.tsx)
      ├─ LeadTable (components/ui/Table.tsx)
      │  └─ LeadRow (components/cards/LeadCard.tsx) × N
      └─ LeadModal (components/ui/Modal.tsx)
         └─ LeadForm (components/forms/LeadForm.tsx)
```

---

## 🔐 Authentication Flow Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│ LOGIN FLOW                                                        │
│                                                                   │
│  1. User visits /login                                           │
│     └─ app/(admin)/login/page.tsx                                │
│                                                                   │
│  2. User enters credentials                                      │
│     └─ components/forms/LoginForm.tsx                            │
│                                                                   │
│  3. Submit form                                                  │
│     └─ lib/api.ts → POST /api/auth/login                         │
│                                                                   │
│  4. Backend validates                                            │
│     └─ modules/auth/auth.service.ts → validateUser()            │
│                                                                   │
│  5. Generate JWT Token                                           │
│     └─ auth.service.ts → generateToken(user)                     │
│                                                                   │
│  6. Return token                                                 │
│     └─ Response: { token: "eyJhbG...", user: {...} }            │
│                                                                   │
│  7. Frontend saves token                                         │
│     └─ lib/auth.ts → saveToken(token)                            │
│                                                                   │
│  8. Update auth store                                            │
│     └─ store/auth.store.ts → setUser(user)                       │
│                                                                   │
│  9. Redirect to dashboard                                        │
│     └─ Navigate to /dashboard                                    │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ PROTECTED ROUTE FLOW                                              │
│                                                                   │
│  1. User visits /leads                                           │
│     └─ app/(admin)/leads/page.tsx                                │
│                                                                   │
│  2. Check authentication                                         │
│     └─ lib/auth.ts → isAuthenticated()                           │
│        ├─ If not authenticated → Redirect to /login             │
│        └─ If authenticated → Continue                            │
│                                                                   │
│  3. Make API call                                                │
│     └─ lib/api.ts → GET /api/leads                               │
│        Headers: { Authorization: "Bearer eyJhbG..." }            │
│                                                                   │
│  4. Backend middleware validates                                 │
│     └─ middlewares/auth.middleware.ts → validateToken()         │
│        ├─ If invalid → Return 401 Unauthorized                  │
│        └─ If valid → Extract user, attach to req.user           │
│                                                                   │
│  5. Controller receives request                                  │
│     └─ req.user = { id, email, role }                           │
│                                                                   │
│  6. Execute controller logic                                     │
│     └─ lead.controller.ts → getLeads()                           │
│                                                                   │
│  7. Return data                                                  │
│     └─ Response: [{ id, name, email, ... }, ...]                │
└──────────────────────────────────────────────────────────────────┘
```

---

## 📊 Module Structure Pattern

Every module follows the same pattern:

```
/modules/[module-name]/
│
├─ [module].controller.ts    → HTTP Request Handlers
│   └─ Functions:
│      ├─ get[Module]s()     → GET /api/[module]s
│      ├─ get[Module]()      → GET /api/[module]s/:id
│      ├─ create[Module]()   → POST /api/[module]s
│      ├─ update[Module]()   → PUT /api/[module]s/:id
│      └─ delete[Module]()   → DELETE /api/[module]s/:id
│
├─ [module].service.ts       → Business Logic Layer
│   └─ Functions:
│      ├─ get[Module]s()     → Query database with filters
│      ├─ get[Module]()      → Get single record
│      ├─ create[Module]()   → Create with validation
│      ├─ update[Module]()   → Update with validation
│      └─ delete[Module]()   → Soft/hard delete
│
├─ [module].routes.ts        → Route Definitions
│   └─ Routes:
│      ├─ GET    /api/[module]s      → controller.get[Module]s()
│      ├─ POST   /api/[module]s      → controller.create[Module]()
│      ├─ GET    /api/[module]s/:id  → controller.get[Module]()
│      ├─ PUT    /api/[module]s/:id  → controller.update[Module]()
│      └─ DELETE /api/[module]s/:id  → controller.delete[Module]()
│
├─ [module].model.ts         → Data Structure (TypeScript Interface)
│   └─ Interface: [Module] { id, name, ... }
│
└─ [module].enums.ts         → Enumerations (Optional)
    └─ Exports: STATUS, SOURCE, etc.
```

**Example: `/leads` module**

```
/modules/leads/
├─ lead.controller.ts    → getLeads(), createLead(), updateLead()
├─ lead.service.ts       → Business logic for lead operations
├─ lead.routes.ts        → POST /api/leads, GET /api/leads, etc.
├─ lead.model.ts         → Lead interface
├─ lead.enums.ts         → LEAD_STATUS, LEAD_SOURCE
├─ lead_notes.model.ts   → Related model
└─ lead_followups.model.ts → Related model
```

---

## 🗂️ File Organization Summary

### Frontend Files by Purpose

| Purpose | Location | Example |
|---------|----------|---------|
| **Pages/Routes** | `/app` | `app/(public)/contact/page.tsx` |
| **Reusable UI** | `/components/ui` | `components/ui/Button.tsx` |
| **Forms** | `/components/forms` | `components/forms/ContactForm.tsx` |
| **Layout** | `/components/layout` | `components/layout/Header.tsx` |
| **Cards** | `/components/cards` | `components/cards/PropertyCard.tsx` |
| **API Calls** | `/lib/api.ts` | `lib/api.ts` → `createLead()` |
| **Auth Utils** | `/lib/auth.ts` | `lib/auth.ts` → `getToken()` |
| **Constants** | `/lib/constants.ts` | `lib/constants.ts` → `LEAD_STATUS` |
| **Auth State** | `/store/auth.store.ts` | `store/auth.store.ts` → `user` |
| **Lead State** | `/store/lead.store.ts` | `store/lead.store.ts` → `leads` |
| **Types** | `/types/index.ts` | `types/index.ts` → `Lead` interface |

### Backend Files by Purpose

| Purpose | Location | Example |
|---------|----------|---------|
| **Request Handlers** | `/modules/[module]/[module].controller.ts` | `lead.controller.ts` |
| **Business Logic** | `/modules/[module]/[module].service.ts` | `lead.service.ts` |
| **Routes** | `/modules/[module]/[module].routes.ts` | `lead.routes.ts` |
| **Data Models** | `/modules/[module]/[module].model.ts` | `lead.model.ts` |
| **Enums** | `/modules/[module]/[module].enums.ts` | `lead.enums.ts` |
| **Database Models** | `/database/models/[model].model.ts` | `database/models/lead.model.ts` |
| **Migrations** | `/database/migrations/[name].sql` | `001_create_leads.sql` |
| **Middleware** | `/middlewares/[name].middleware.ts` | `auth.middleware.ts` |
| **Config** | `/config/[name].ts` | `database.ts`, `env.ts` |
| **Utils** | `/utils/[name].ts` | `logger.ts`, `helpers.ts` |
| **Entry Point** | `/main.ts` | `main.ts` |

---

This visual diagram helps you understand the complete architecture at a glance! 🚀



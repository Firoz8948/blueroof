# BlueRoof Realty - Complete Architecture & Development Guide

## 📚 Table of Contents
1. [Overview](#overview)
2. [Frontend Architecture (Next.js)](#frontend-architecture-nextjs)
3. [Backend Architecture (Node.js Modular Monolith)](#backend-architecture-nodejs-modular-monolith)
4. [Data Flow & Interaction](#data-flow--interaction)
5. [Where to Add Code](#where-to-add-code)
6. [Development Workflow](#development-workflow)

---

## Overview

This is a **Lead Generation Real Estate Platform** with an integrated **Mini CRM** system. The architecture is designed to:
- Capture leads from Google/Instagram/Facebook ads
- Manage leads through a custom CRM
- Scale easily to Insurance and Finance modules later

**Tech Stack:**
- **Frontend**: Next.js 14+ (App Router) - React framework with server-side rendering
- **Backend**: Node.js (Modular Monolith) - Single application with modular organization
- **Database**: PostgreSQL - Relational database for structured data
- **Auth**: JWT - Stateless authentication tokens

---

## Frontend Architecture (Next.js)

### 🎯 **What is Next.js App Router?**
Next.js App Router uses **file-based routing** where folders define routes, and `page.tsx` files are the actual pages that render.

### 📁 **Frontend Directory Structure Explained**

#### **`/app` - The Pages Directory**

This is where **ALL your UI pages** live. Next.js automatically creates routes based on folder structure.

```
/app
├── layout.tsx              → Root layout (wraps entire app)
├── (public)/               → Public route group (no prefix in URL)
│   ├── layout.tsx         → Public pages layout (header, footer)
│   ├── page.tsx           → Landing page (URL: /)
│   ├── properties/
│   │   └── page.tsx       → Properties listing (URL: /properties)
│   ├── contact/
│   │   └── page.tsx       → Contact/Enquiry form (URL: /contact)
│   └── about/
│       └── page.tsx       → About page (URL: /about)
│
└── (admin)/                → Admin route group (protected routes)
    ├── layout.tsx         → Admin layout (sidebar, navigation)
    ├── login/
    │   └── page.tsx       → Admin login (URL: /login)
    ├── dashboard/
    │   └── page.tsx       → Dashboard (URL: /dashboard)
    ├── leads/
    │   └── page.tsx       → Leads CRM page (URL: /leads)
    ├── agents/
    │   └── page.tsx       → Agents management (URL: /agents)
    └── settings/
        └── page.tsx       → Settings page (URL: /settings)
```

**Route Groups `(public)` and `(admin)`:**
- Parentheses `()` in folder names don't create URL segments
- They're used for **organizational purposes** and **shared layouts**
- `(public)/page.tsx` → URL is `/` (not `/public`)
- `(admin)/dashboard/page.tsx` → URL is `/dashboard` (not `/admin/dashboard`)

**Task of Each Page:**

1. **`(public)/page.tsx`** - Landing Page
   - **Purpose**: First page visitors see from ads (Google/Instagram/Facebook)
   - **What to add**: Hero section, property highlights, call-to-action buttons
   - **Code location**: `frontend/app/(public)/page.tsx`

2. **`(public)/properties/page.tsx`** - Properties Listing
   - **Purpose**: Display available properties to generate interest
   - **What to add**: Property cards, filters, search functionality
   - **Code location**: `frontend/app/(public)/properties/page.tsx`

3. **`(public)/contact/page.tsx`** - Lead Capture Form
   - **Purpose**: **PRIMARY LEAD CAPTURE** - Where leads submit their info
   - **What to add**: Contact form (name, email, phone, message), form validation
   - **Code location**: `frontend/app/(public)/contact/page.tsx`

4. **`(public)/about/page.tsx`** - About Page
   - **Purpose**: Build trust and credibility
   - **What to add**: Company info, testimonials, team
   - **Code location**: `frontend/app/(public)/about/page.tsx`

5. **`(admin)/login/page.tsx`** - Admin Login
   - **Purpose**: Authentication for CRM access
   - **What to add**: Login form, JWT token handling
   - **Code location**: `frontend/app/(admin)/login/page.tsx`

6. **`(admin)/dashboard/page.tsx`** - CRM Dashboard
   - **Purpose**: Overview of leads, stats, quick actions
   - **What to add**: Charts, statistics, recent leads, quick filters
   - **Code location**: `frontend/app/(admin)/dashboard/page.tsx`

7. **`(admin)/leads/page.tsx`** - **MINI CRM CORE**
   - **Purpose**: Main CRM interface for managing leads
   - **What to add**: Lead list table, filters, status updates, lead detail modal, notes, follow-ups
   - **Code location**: `frontend/app/(admin)/leads/page.tsx`

8. **`(admin)/agents/page.tsx`** - Agents Management
   - **Purpose**: Manage real estate agents and assign leads
   - **What to add**: Agent list, create/edit agents, assign leads to agents
   - **Code location**: `frontend/app/(admin)/agents/page.tsx`

9. **`(admin)/settings/page.tsx`** - Settings
   - **Purpose**: System configuration, user preferences
   - **What to add**: User profile, notification settings, system config
   - **Code location**: `frontend/app/(admin)/settings/page.tsx`

---

#### **`/components` - Reusable UI Components**

This is where you create **reusable React components** that are used across multiple pages.

```
/components
├── ui/                    → Basic UI primitives
│   ├── Button.tsx        → Reusable button component
│   ├── Input.tsx         → Form input component
│   ├── Modal.tsx         → Modal/dialog component
│   ├── Card.tsx          → Card container component
│   └── Table.tsx         → Data table component
│
├── forms/                 → Form components
│   ├── ContactForm.tsx   → Lead capture form (used in /contact)
│   ├── LoginForm.tsx     → Admin login form
│   └── LeadForm.tsx      → Create/edit lead form (CRM)
│
├── layout/                → Layout components
│   ├── Header.tsx        → Site header/navigation
│   ├── Footer.tsx        → Site footer
│   ├── Sidebar.tsx       → Admin sidebar navigation
│   └── AdminNav.tsx      → Admin panel navigation
│
└── cards/                 → Card components
    ├── PropertyCard.tsx  → Property display card (used in /properties)
    ├── LeadCard.tsx      → Lead display card (used in CRM)
    └── DashboardCard.tsx → Dashboard stat card
```

**Task of Components:**
- **UI Components**: Basic building blocks (buttons, inputs) - reusable across entire app
- **Form Components**: Complete forms with validation - used in specific pages
- **Layout Components**: Page structure elements (headers, sidebars) - shared across route groups
- **Card Components**: Display cards for specific data types - reusable content blocks

**Example Usage:**
```tsx
// In frontend/app/(public)/contact/page.tsx
import ContactForm from '@/components/forms/ContactForm';

export default function ContactPage() {
  return (
    <div>
      <h1>Contact Us</h1>
      <ContactForm /> {/* Reusable form component */}
    </div>
  );
}
```

---

#### **`/lib` - Utility Libraries & Helpers**

This contains **helper functions and configurations** used throughout the frontend.

```
/lib
├── api.ts                → API client for backend communication
├── auth.ts               → Authentication utilities (JWT handling)
└── constants.ts          → App-wide constants (statuses, enums, config)
```

**Task of Each File:**

1. **`lib/api.ts`** - API Client
   - **Purpose**: Centralized HTTP client for all backend API calls
   - **What it does**:
     - Handles API endpoints (`/api/leads`, `/api/auth`, etc.)
     - Adds authentication headers (JWT tokens)
     - Error handling and response parsing
     - Request/response interceptors
   - **Usage**: `import api from '@/lib/api'; api.get('/leads')`

2. **`lib/auth.ts`** - Authentication Utilities
   - **Purpose**: JWT token management, auth helpers
   - **What it does**:
     - Store/retrieve JWT tokens (localStorage/cookies)
     - Check if user is authenticated
     - Get current user from token
     - Logout functionality
   - **Usage**: `import { isAuthenticated, getToken } from '@/lib/auth';`

3. **`lib/constants.ts`** - Constants
   - **Purpose**: Shared constants across the app
   - **What it contains**:
     - Lead statuses: `NEW`, `CONTACTED`, `QUALIFIED`, etc.
     - Lead sources: `GOOGLE`, `INSTAGRAM`, `FACEBOOK`
     - API endpoints
     - Configuration values
   - **Usage**: `import { LEAD_STATUS, LEAD_SOURCE } from '@/lib/constants';`

---

#### **`/store` - State Management**

This is where **global state** is managed (user auth, leads data, etc.). You can use Zustand, Redux, or Context API.

```
/store
├── auth.store.ts         → Authentication state (user, token, login/logout)
└── lead.store.ts         → Leads state (lead list, filters, selected lead)
```

**Task of Stores:**

1. **`store/auth.store.ts`** - Auth State
   - **Purpose**: Manage authentication state globally
   - **What it stores**:
     - Current user object
     - JWT token
     - Is authenticated flag
   - **Actions**: `login()`, `logout()`, `checkAuth()`

2. **`store/lead.store.ts`** - Lead State
   - **Purpose**: Manage leads data in CRM
   - **What it stores**:
     - List of leads
     - Filters (status, source, date range)
     - Selected lead for detail view
     - Loading states
   - **Actions**: `fetchLeads()`, `updateLead()`, `setFilters()`

**Example Usage:**
```tsx
// In a component
import { useAuthStore } from '@/store/auth.store';

export default function Dashboard() {
  const { user, isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) return <Login />;
  
  return <div>Welcome, {user.name}</div>;
}
```

---

#### **`/types` - TypeScript Type Definitions**

Type definitions for TypeScript type safety.

```
/types
└── index.ts              → All TypeScript interfaces and types
```

**Task:**
- Define interfaces for data structures (Lead, User, Property, etc.)
- Shared types between frontend and backend
- Type safety across the application

**Example:**
```typescript
// types/index.ts
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: 'GOOGLE' | 'INSTAGRAM' | 'FACEBOOK';
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'CONVERTED';
  created_at: Date;
}
```

---

## Backend Architecture (Node.js Modular Monolith)

### 🎯 **What is Modular Monolith?**
A **modular monolith** is a single application divided into **modules** (like mini-apps), but deployed as one service. Each module is independent but shares the same database and infrastructure.

**Benefits:**
- ✅ Easy to develop and test
- ✅ Can later extract modules to microservices if needed
- ✅ Shared code and database
- ✅ Simple deployment

### 📁 **Backend Directory Structure Explained**

#### **`/src/modules` - Feature Modules**

Each module represents a **business feature** with its own:
- **Controller**: Handles HTTP requests/responses
- **Service**: Contains business logic
- **Routes**: Defines API endpoints
- **Model**: Database schema/types

```
/src/modules
├── auth/                  → Authentication module
├── users/                 → User management module
├── leads/                 → **MINI CRM CORE** - Lead management
├── properties/            → Property management
├── insurance/             → Future module (placeholder)
├── finance/               → Future module (placeholder)
└── notifications/         → Notifications (WhatsApp, Email)
```

---

#### **Module Structure Explained**

Each module follows the same pattern:

**Example: `/leads` module (Mini CRM Core)**

```
/leads
├── lead.controller.ts    → HTTP request handlers
├── lead.service.ts       → Business logic
├── lead.routes.ts        → API endpoint definitions
├── lead.model.ts         → Data model/types
├── lead.enums.ts         → Enums (statuses, sources)
├── lead_notes.model.ts   → Related model (notes)
└── lead_followups.model.ts → Related model (followups)
```

**Task of Each File:**

1. **`lead.controller.ts`** - Request Handlers
   - **Purpose**: Handle HTTP requests, validate input, call service, return response
   - **What it does**:
     - Receives HTTP requests (GET, POST, PUT, DELETE)
     - Validates request data
     - Calls service layer for business logic
     - Returns JSON responses
   - **Example endpoints**:
     - `GET /api/leads` - List all leads
     - `POST /api/leads` - Create new lead
     - `GET /api/leads/:id` - Get single lead
     - `PUT /api/leads/:id` - Update lead
     - `DELETE /api/leads/:id` - Delete lead

2. **`lead.service.ts`** - Business Logic
   - **Purpose**: Contains all business rules and data operations
   - **What it does**:
     - Database queries (CRUD operations)
     - Business logic (validations, calculations)
     - Calls other services if needed
     - No HTTP knowledge - pure business logic
   - **Methods**:
     - `createLead(data)` - Create lead with validation
     - `getLeads(filters)` - Fetch leads with filters
     - `updateLeadStatus(id, status)` - Update lead status
     - `assignLeadToAgent(leadId, agentId)` - Assign lead

3. **`lead.routes.ts`** - Route Definitions
   - **Purpose**: Define API endpoints and connect them to controllers
   - **What it does**:
     - Maps URLs to controller functions
     - Applies middlewares (auth, validation)
     - Exports router for main.ts to use
   - **Example**:
     ```typescript
     router.get('/', authMiddleware, leadController.getLeads);
     router.post('/', authMiddleware, validateLead, leadController.createLead);
     ```

4. **`lead.model.ts`** - Data Model
   - **Purpose**: Define data structure for leads
   - **What it contains**:
     - TypeScript interfaces/types
     - ORM model (if using Prisma/TypeORM)
     - Database schema definition
   - **Fields**: id, name, email, phone, source, status, assigned_to, etc.

5. **`lead.enums.ts`** - Enumerations
   - **Purpose**: Define constants for statuses, sources, etc.
   - **What it contains**:
     - Lead statuses: `NEW`, `CONTACTED`, `QUALIFIED`, `CONVERTED`, `LOST`
     - Lead sources: `GOOGLE`, `INSTAGRAM`, `FACEBOOK`, `DIRECT`
     - Priorities, etc.

---

#### **Module Details:**

**1. `/auth` Module - Authentication**

```
/auth
├── auth.controller.ts    → Login, logout, token refresh handlers
├── auth.service.ts       → JWT generation, password hashing, validation
└── auth.routes.ts        → POST /api/auth/login, POST /api/auth/logout
```

**Task:**
- User login/logout
- JWT token generation and validation
- Password hashing (bcrypt)
- Token refresh

**2. `/users` Module - User Management**

```
/users
├── user.model.ts         → User schema (id, email, password_hash, role, name)
├── user.service.ts       → CRUD operations for users
└── user.routes.ts        → User management endpoints
```

**Task:**
- Manage admin users and agents
- User CRUD operations
- Role management (admin, agent)

**3. `/leads` Module - MINI CRM CORE**

```
/leads
├── lead.controller.ts    → Lead CRUD handlers
├── lead.service.ts       → Lead business logic
├── lead.model.ts         → Lead schema
├── lead.routes.ts        → /api/leads endpoints
├── lead.enums.ts         → Statuses, sources
├── lead_notes.model.ts   → Notes schema (id, lead_id, note_text, created_by)
└── lead_followups.model.ts → Followups schema (id, lead_id, scheduled_at)
```

**Task:**
- **Create lead** from contact form
- **List leads** with filters (status, source, date, agent)
- **Update lead** status, assign to agent
- **Add notes** to leads
- **Schedule followups**
- **Search leads** by name, email, phone

**4. `/properties` Module - Property Management**

```
/properties
├── property.controller.ts → Property CRUD handlers
├── property.service.ts    → Property business logic
├── property.model.ts      → Property schema (id, title, address, price, type)
└── property.routes.ts     → /api/properties endpoints
```

**Task:**
- Manage property listings
- Property search and filters
- Property details

**5. `/notifications` Module - Communication**

```
/notifications
├── email.service.ts       → Email sending (SendGrid/SMTP)
├── whatsapp.service.ts    → WhatsApp integration
└── notification.routes.ts → Trigger notifications
```

**Task:**
- Send emails to leads (welcome, follow-up)
- Send WhatsApp messages
- Notification triggers (new lead, follow-up reminder)

**6. `/insurance` & `/finance` - Future Modules**

```
/insurance/
/finance/
```

**Task:**
- Placeholder for future expansion
- Can be structured like `/leads` module when needed

---

#### **`/src/config` - Configuration**

```
/config
├── database.ts           → PostgreSQL connection setup
└── env.ts                → Environment variables loader
```

**Task:**

1. **`config/database.ts`** - Database Configuration
   - PostgreSQL connection pool
   - Connection string from environment
   - Database client initialization (pg, Prisma, TypeORM)

2. **`config/env.ts`** - Environment Variables
   - Load `.env` variables
   - Type-safe config
   - Validation of required env vars

---

#### **`/src/middlewares` - Request Middlewares**

Middlewares run **before** controllers to handle cross-cutting concerns.

```
/middlewares
├── auth.middleware.ts      → JWT token validation
├── error.middleware.ts     → Global error handler
└── validation.middleware.ts → Request validation
```

**Task:**

1. **`auth.middleware.ts`** - Authentication Middleware
   - Validates JWT token on protected routes
   - Extracts user from token
   - Blocks unauthorized requests

2. **`error.middleware.ts`** - Error Handler
   - Catches all errors
   - Formats error responses
   - Logs errors

3. **`validation.middleware.ts`** - Request Validation
   - Validates request body/query using schemas (Zod/Joi)
   - Returns validation errors

---

#### **`/src/utils` - Utility Functions**

```
/utils
├── logger.ts              → Logging utility (Winston/Pino)
└── helpers.ts             → Shared helper functions
```

**Task:**
- Logging for debugging and monitoring
- Helper functions used across modules (formatting, parsing, etc.)

---

#### **`/src/database` - Database Layer**

```
/database
├── models/                → Database model definitions
│   ├── user.model.ts
│   ├── lead.model.ts
│   ├── lead_notes.model.ts
│   ├── lead_followups.model.ts
│   └── property.model.ts
├── migrations/            → SQL migration files
└── seeds/                 → Initial data seeding
```

**Task:**

1. **`models/`** - Database Models
   - ORM models (Prisma/TypeORM) or raw SQL schemas
   - Define database tables and relationships

2. **`migrations/`** - Database Migrations
   - Version control for database schema
   - SQL files to create/alter tables

3. **`seeds/`** - Seed Data
   - Initial data for development
   - Test data creation

---

#### **`/src/main.ts` - Application Entry Point**

**Task:**
- Initialize Express server
- Connect to database
- Register all route modules
- Apply global middlewares
- Start server

**Example Structure:**
```typescript
// main.ts
import express from 'express';
import { connectDatabase } from './config/database';
import authRoutes from './modules/auth/auth.routes';
import leadRoutes from './modules/leads/lead.routes';
// ... other routes

const app = express();

// Middlewares
app.use(express.json());
app.use(errorMiddleware);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);
// ... other routes

// Start server
connectDatabase().then(() => {
  app.listen(3000, () => console.log('Server running on port 3000'));
});
```

---

## Data Flow & Interaction

### 🔄 **Complete Flow Example: Lead Capture**

**1. User Fills Contact Form (Frontend)**
```
User visits: https://yoursite.com/contact
↓
Page: frontend/app/(public)/contact/page.tsx
↓
Component: components/forms/ContactForm.tsx
↓
User submits form
```

**2. Frontend Sends API Request**
```
ContactForm.tsx
↓
Calls: lib/api.ts → POST /api/leads
↓
With data: { name, email, phone, message, source: 'GOOGLE' }
```

**3. Backend Receives Request**
```
Request hits: backend/src/main.ts
↓
Routes to: backend/src/modules/leads/lead.routes.ts
↓
POST /api/leads → lead.controller.ts → createLead()
```

**4. Controller Processes Request**
```
lead.controller.ts
↓
Validates request body
↓
Calls: lead.service.ts → createLead(data)
```

**5. Service Executes Business Logic**
```
lead.service.ts → createLead()
↓
Validates business rules
↓
Saves to database: database/models/lead.model.ts
↓
Creates lead with status: 'NEW'
↓
Returns lead object
```

**6. Response Goes Back**
```
Service returns lead
↓
Controller formats response
↓
Returns JSON: { id, name, email, status: 'NEW', ... }
```

**7. Frontend Updates UI**
```
API client receives response
↓
Updates: store/lead.store.ts (if needed)
↓
Shows success message to user
```

**8. Optional: Notification Triggered**
```
Backend detects new lead
↓
Calls: notifications/email.service.ts
↓
Sends welcome email to lead
↓
Triggers WhatsApp notification to admin
```

---

## Where to Add Code

### 🎨 **Adding UI/Pages**

#### **Add a New Page:**

1. **Create page file:**
   ```
   frontend/app/(public)/new-page/page.tsx
   ```
   Accessible at: `https://yoursite.com/new-page`

2. **Add content:**
   ```tsx
   // frontend/app/(public)/new-page/page.tsx
   import Header from '@/components/layout/Header';
   
   export default function NewPage() {
     return (
       <div>
         <Header />
         <h1>New Page</h1>
         {/* Your UI code here */}
       </div>
     );
   }
   ```

#### **Add a New Admin Page:**

1. **Create page:**
   ```
   frontend/app/(admin)/reports/page.tsx
   ```
   Accessible at: `https://yoursite.com/reports`

2. **Add auth protection:**
   ```tsx
   // Use layout or middleware to protect
   import { useAuthStore } from '@/store/auth.store';
   
   export default function ReportsPage() {
     const { isAuthenticated } = useAuthStore();
     if (!isAuthenticated) redirect('/login');
     
     return <div>Reports</div>;
   }
   ```

---

### 🧩 **Adding Components**

#### **Create a Reusable Component:**

1. **Create component:**
   ```
   frontend/components/ui/Button.tsx
   ```

2. **Implement component:**
   ```tsx
   // components/ui/Button.tsx
   interface ButtonProps {
     children: React.ReactNode;
     onClick?: () => void;
     variant?: 'primary' | 'secondary';
   }
   
   export default function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
     return (
       <button 
         onClick={onClick}
         className={`btn btn-${variant}`}
       >
         {children}
       </button>
     );
   }
   ```

3. **Use in pages:**
   ```tsx
   import Button from '@/components/ui/Button';
   
   export default function ContactPage() {
     return <Button onClick={handleSubmit}>Submit</Button>;
   }
   ```

---

### 🔌 **Adding API Endpoints**

#### **Create a New API Endpoint:**

1. **Add route in module:**
   ```typescript
   // backend/src/modules/leads/lead.routes.ts
   router.get('/stats', authMiddleware, leadController.getStats);
   ```

2. **Add controller method:**
   ```typescript
   // backend/src/modules/leads/lead.controller.ts
   export async function getStats(req: Request, res: Response) {
     try {
       const stats = await leadService.getLeadStatistics();
       res.json(stats);
     } catch (error) {
       res.status(500).json({ error: 'Failed to get stats' });
     }
   }
   ```

3. **Add service method:**
   ```typescript
   // backend/src/modules/leads/lead.service.ts
   export async function getLeadStatistics() {
     // Business logic here
     const totalLeads = await db.leads.count();
     const newLeads = await db.leads.count({ where: { status: 'NEW' } });
     return { totalLeads, newLeads };
   }
   ```

4. **Use in frontend:**
   ```typescript
   // frontend/lib/api.ts
   export const getLeadStats = () => api.get('/leads/stats');
   
   // In component
   import { getLeadStats } from '@/lib/api';
   const stats = await getLeadStats();
   ```

---

### 🗄️ **Adding Database Models**

#### **Create a New Table/Model:**

1. **Create migration:**
   ```
   backend/src/database/migrations/001_create_companies.sql
   ```
   ```sql
   CREATE TABLE companies (
     id SERIAL PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     address TEXT,
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

2. **Create model:**
   ```typescript
   // backend/src/database/models/company.model.ts
   export interface Company {
     id: number;
     name: string;
     address?: string;
     created_at: Date;
   }
   ```

3. **Create module:**
   ```
   backend/src/modules/companies/
   ├── company.controller.ts
   ├── company.service.ts
   ├── company.model.ts
   └── company.routes.ts
   ```

---

## Development Workflow

### 🚀 **Starting Development**

**1. Frontend Development:**
```bash
cd frontend
npm install
npm run dev
# Server runs on http://localhost:3000
```

**2. Backend Development:**
```bash
cd backend
npm install
npm run dev
# Server runs on http://localhost:5000 (or your port)
```

### 📝 **Typical Development Tasks**

**Task: Add a new lead status filter**

1. **Backend:**
   - Update `backend/src/modules/leads/lead.enums.ts` - add new status
   - Update `backend/src/modules/leads/lead.service.ts` - add filter logic
   - Update database migration if needed

2. **Frontend:**
   - Update `frontend/lib/constants.ts` - add status constant
   - Update `frontend/app/(admin)/leads/page.tsx` - add filter UI
   - Update `frontend/store/lead.store.ts` - add filter state

**Task: Add email notification on new lead**

1. **Backend:**
   - In `backend/src/modules/leads/lead.service.ts` → `createLead()`
   - After saving lead, call `notificationService.sendEmail()`
   - Configure email service in `backend/src/modules/notifications/email.service.ts`

---

## Key Concepts Summary

### **Frontend (Next.js):**
- **Pages** (`/app`) = Routes and UI
- **Components** (`/components`) = Reusable UI pieces
- **Lib** (`/lib`) = Utilities and API client
- **Store** (`/store`) = Global state management

### **Backend (Modular Monolith):**
- **Modules** (`/modules`) = Feature domains (auth, leads, properties)
- **Controllers** = HTTP request handlers
- **Services** = Business logic
- **Models** = Data structures
- **Routes** = API endpoint definitions

### **Data Flow:**
```
User Action → Frontend Page → Component → API Call → 
Backend Route → Controller → Service → Database → 
Response → Frontend Update → UI Refresh
```

---

## Next Steps

1. ✅ **Structure is ready** - Start implementing features
2. 🔧 **Install dependencies** - Set up package.json files
3. 🗄️ **Set up database** - Configure PostgreSQL connection
4. 🎨 **Build UI** - Start with landing page and contact form
5. 🔐 **Implement auth** - JWT authentication
6. 📊 **Build CRM** - Lead management interface
7. 📧 **Add notifications** - Email and WhatsApp integration

---

This architecture provides a solid foundation for a scalable lead generation platform with an integrated CRM system! 🚀



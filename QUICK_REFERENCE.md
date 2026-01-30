# Quick Reference Guide - BlueRoof Realty

## 🎯 Where to Add Code - Quick Lookup

### Frontend (Next.js) - UI & Pages

| What You Want to Do | Where to Add Code | File Path |
|---------------------|-------------------|-----------|
| **Create a new public page** | `/app/(public)/page-name/page.tsx` | `frontend/app/(public)/page-name/page.tsx` |
| **Create a new admin page** | `/app/(admin)/page-name/page.tsx` | `frontend/app/(admin)/page-name/page.tsx` |
| **Create reusable button/input** | `/components/ui/ComponentName.tsx` | `frontend/components/ui/Button.tsx` |
| **Create form component** | `/components/forms/FormName.tsx` | `frontend/components/forms/ContactForm.tsx` |
| **Create layout component** | `/components/layout/ComponentName.tsx` | `frontend/components/layout/Header.tsx` |
| **Add API call function** | `/lib/api.ts` | `frontend/lib/api.ts` |
| **Add auth utility function** | `/lib/auth.ts` | `frontend/lib/auth.ts` |
| **Add constants/enums** | `/lib/constants.ts` | `frontend/lib/constants.ts` |
| **Add global state (auth)** | `/store/auth.store.ts` | `frontend/store/auth.store.ts` |
| **Add global state (leads)** | `/store/lead.store.ts` | `frontend/store/lead.store.ts` |
| **Add TypeScript types** | `/types/index.ts` | `frontend/types/index.ts` |

---

### Backend (Node.js) - API & Business Logic

| What You Want to Do | Where to Add Code | File Path |
|---------------------|-------------------|-----------|
| **Create new API endpoint** | Module's `routes.ts` file | `backend/src/modules/leads/lead.routes.ts` |
| **Handle HTTP request** | Module's `controller.ts` file | `backend/src/modules/leads/lead.controller.ts` |
| **Add business logic** | Module's `service.ts` file | `backend/src/modules/leads/lead.service.ts` |
| **Define data structure** | Module's `model.ts` file | `backend/src/modules/leads/lead.model.ts` |
| **Add enums/constants** | Module's `enums.ts` file | `backend/src/modules/leads/lead.enums.ts` |
| **Create new module** | New folder in `/modules` | `backend/src/modules/new-module/` |
| **Add database model** | `/database/models/model-name.model.ts` | `backend/src/database/models/company.model.ts` |
| **Create migration** | `/database/migrations/migration-name.sql` | `backend/src/database/migrations/001_create_table.sql` |
| **Add middleware** | `/middlewares/middleware-name.ts` | `backend/src/middlewares/cors.middleware.ts` |
| **Add utility function** | `/utils/utility-name.ts` | `backend/src/utils/date-helpers.ts` |
| **Configure database** | `/config/database.ts` | `backend/src/config/database.ts` |
| **Environment variables** | `/config/env.ts` | `backend/src/config/env.ts` |
| **Register routes** | `/main.ts` | `backend/src/main.ts` |

---

## 📋 Common Tasks & File Locations

### Task: Add a Contact Form

**Frontend:**
1. Page: `frontend/app/(public)/contact/page.tsx` - Render the page
2. Form Component: `frontend/components/forms/ContactForm.tsx` - Form UI
3. API Call: `frontend/lib/api.ts` - `createLead(data)` function
4. Types: `frontend/types/index.ts` - `LeadFormData` interface

**Backend:**
1. Route: `backend/src/modules/leads/lead.routes.ts` - `POST /api/leads`
2. Controller: `backend/src/modules/leads/lead.controller.ts` - `createLead()` handler
3. Service: `backend/src/modules/leads/lead.service.ts` - Business logic
4. Model: `backend/src/modules/leads/lead.model.ts` - Data structure
5. Database: `backend/src/database/models/lead.model.ts` - Table schema

---

### Task: Add Lead Status Filter in CRM

**Frontend:**
1. Page: `frontend/app/(admin)/leads/page.tsx` - Add filter UI
2. Store: `frontend/store/lead.store.ts` - Add filter state
3. Constants: `frontend/lib/constants.ts` - Add status constants
4. API: `frontend/lib/api.ts` - `getLeads(filters)` function

**Backend:**
1. Route: `backend/src/modules/leads/lead.routes.ts` - `GET /api/leads?status=NEW`
2. Controller: `backend/src/modules/leads/lead.controller.ts` - Extract query params
3. Service: `backend/src/modules/leads/lead.service.ts` - Filter logic
4. Model: Database query with WHERE clause

---

### Task: Add Email Notification on New Lead

**Backend:**
1. Service: `backend/src/modules/leads/lead.service.ts` - In `createLead()` method
2. Email Service: `backend/src/modules/notifications/email.service.ts` - `sendEmail()` function
3. Config: `backend/src/config/env.ts` - Email API keys

**Flow:**
```
lead.service.ts → createLead()
  ↓ (after saving)
notificationService.sendEmail({
  to: lead.email,
  subject: 'Welcome!',
  body: 'Thank you for your inquiry'
})
```

---

### Task: Add Admin Dashboard Stat Cards

**Frontend:**
1. Page: `frontend/app/(admin)/dashboard/page.tsx` - Dashboard UI
2. Component: `frontend/components/cards/DashboardCard.tsx` - Stat card component
3. API: `frontend/lib/api.ts` - `getDashboardStats()` function
4. Store (optional): `frontend/store/dashboard.store.ts` - Dashboard state

**Backend:**
1. Route: `backend/src/modules/leads/lead.routes.ts` - `GET /api/leads/stats`
2. Controller: `backend/src/modules/leads/lead.controller.ts` - `getStats()` handler
3. Service: `backend/src/modules/leads/lead.service.ts` - Calculate statistics

---

## 🔄 Data Flow Examples

### Example 1: User Submits Contact Form

```
1. User fills form: frontend/app/(public)/contact/page.tsx
   ↓
2. Form component: frontend/components/forms/ContactForm.tsx
   ↓
3. On submit: calls frontend/lib/api.ts → POST /api/leads
   ↓
4. Backend receives: backend/src/main.ts → routes to lead.routes.ts
   ↓
5. Controller: backend/src/modules/leads/lead.controller.ts → createLead()
   ↓
6. Service: backend/src/modules/leads/lead.service.ts → createLead(data)
   ↓
7. Database: Saves to PostgreSQL → leads table
   ↓
8. Response: Returns created lead { id, name, email, ... }
   ↓
9. Frontend: Updates UI with success message
   ↓
10. Optional: Backend triggers notification
    → notifications/email.service.ts → sends email
```

---

### Example 2: Admin Views Leads in CRM

```
1. Admin visits: frontend/app/(admin)/leads/page.tsx
   ↓
2. Page loads: Calls frontend/lib/api.ts → GET /api/leads
   ↓
3. API client: Adds JWT token to Authorization header
   ↓
4. Backend: backend/src/middlewares/auth.middleware.ts → validates token
   ↓
5. Controller: backend/src/modules/leads/lead.controller.ts → getLeads()
   ↓
6. Service: backend/src/modules/leads/lead.service.ts → fetchLeads(filters)
   ↓
7. Database: Queries PostgreSQL → SELECT * FROM leads WHERE ...
   ↓
8. Response: Returns array of leads [{ id, name, ... }, ...]
   ↓
9. Frontend: Updates store/lead.store.ts with leads
   ↓
10. UI: Displays leads in table/list
```

---

## 🎨 Component Structure Examples

### Page Structure (Next.js App Router)

```tsx
// frontend/app/(public)/contact/page.tsx
import ContactForm from '@/components/forms/ContactForm';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ContactPage() {
  return (
    <div>
      <Header />
      <main>
        <h1>Contact Us</h1>
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
```

### Component Structure (Reusable)

```tsx
// frontend/components/forms/ContactForm.tsx
'use client'; // For client-side interactivity in Next.js

import { useState } from 'react';
import { createLead } from '@/lib/api';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const lead = await createLead(formData);
    alert('Thank you! We will contact you soon.');
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <Input 
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        placeholder="Name"
      />
      <Input 
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        placeholder="Email"
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

---

## 🔌 API Structure Examples

### Frontend API Client

```typescript
// frontend/lib/api.ts
import { getToken } from './auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

class ApiClient {
  async get(endpoint: string) {
    const response = await fetch(`${API_URL}/api${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return response.json();
  }
  
  async post(endpoint: string, data: any) {
    const response = await fetch(`${API_URL}/api${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
}

export const api = new ApiClient();

// Lead API functions
export const getLeads = (filters?: any) => api.get(`/leads?${new URLSearchParams(filters)}`);
export const createLead = (data: any) => api.post('/leads', data);
export const updateLead = (id: string, data: any) => api.post(`/leads/${id}`, data);
```

### Backend Route

```typescript
// backend/src/modules/leads/lead.routes.ts
import express from 'express';
import * as leadController from './lead.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = express.Router();

router.get('/', authMiddleware, leadController.getLeads);
router.post('/', leadController.createLead); // Public endpoint for contact form
router.get('/:id', authMiddleware, leadController.getLead);
router.put('/:id', authMiddleware, leadController.updateLead);
router.delete('/:id', authMiddleware, leadController.deleteLead);

export default router;
```

### Backend Controller

```typescript
// backend/src/modules/leads/lead.controller.ts
import { Request, Response } from 'express';
import * as leadService from './lead.service';

export async function getLeads(req: Request, res: Response) {
  try {
    const filters = req.query; // ?status=NEW&source=GOOGLE
    const leads = await leadService.getLeads(filters);
    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
}

export async function createLead(req: Request, res: Response) {
  try {
    const leadData = req.body; // { name, email, phone, source }
    const lead = await leadService.createLead(leadData);
    res.status(201).json(lead);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create lead' });
  }
}
```

### Backend Service

```typescript
// backend/src/modules/leads/lead.service.ts
import { db } from '../../config/database';
import { Lead } from './lead.model';
import { LEAD_STATUS, LEAD_SOURCE } from './lead.enums';

export async function getLeads(filters: any): Promise<Lead[]> {
  // Build query with filters
  let query = 'SELECT * FROM leads WHERE 1=1';
  const params: any[] = [];
  
  if (filters.status) {
    query += ' AND status = $' + (params.length + 1);
    params.push(filters.status);
  }
  
  if (filters.source) {
    query += ' AND source = $' + (params.length + 1);
    params.push(filters.source);
  }
  
  const result = await db.query(query, params);
  return result.rows;
}

export async function createLead(data: any): Promise<Lead> {
  // Validate data
  if (!data.name || !data.email || !data.phone) {
    throw new Error('Name, email, and phone are required');
  }
  
  // Create lead with default status
  const query = `
    INSERT INTO leads (name, email, phone, source, status)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  const result = await db.query(query, [
    data.name,
    data.email,
    data.phone,
    data.source || LEAD_SOURCE.DIRECT,
    LEAD_STATUS.NEW,
  ]);
  
  return result.rows[0];
}
```

---

## 🗄️ Database Model Example

```typescript
// backend/src/database/models/lead.model.ts
export interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  source: 'GOOGLE' | 'INSTAGRAM' | 'FACEBOOK' | 'DIRECT';
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'CONVERTED' | 'LOST';
  assigned_to?: number; // user_id
  property_id?: number;
  notes?: string;
  created_at: Date;
  updated_at: Date;
}
```

```sql
-- backend/src/database/migrations/001_create_leads.sql
CREATE TABLE leads (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  source VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'NEW',
  assigned_to INTEGER REFERENCES users(id),
  property_id INTEGER REFERENCES properties(id),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_source ON leads(source);
CREATE INDEX idx_leads_assigned_to ON leads(assigned_to);
```

---

## 🔐 Authentication Flow

### Login Flow

```
1. User enters credentials: frontend/app/(admin)/login/page.tsx
   ↓
2. Form submits: frontend/lib/api.ts → POST /api/auth/login
   ↓
3. Backend: backend/src/modules/auth/auth.controller.ts → login()
   ↓
4. Service: backend/src/modules/auth/auth.service.ts → validateUser()
   ↓
5. Database: Check user credentials
   ↓
6. Generate JWT: auth.service.ts → generateToken(user)
   ↓
7. Response: Returns { token, user }
   ↓
8. Frontend: Saves token to localStorage
   ↓
9. Store: frontend/store/auth.store.ts → setUser(user)
   ↓
10. Redirect: Navigate to /dashboard
```

### Protected Route Flow

```
1. User visits: frontend/app/(admin)/leads/page.tsx
   ↓
2. Check auth: frontend/lib/auth.ts → isAuthenticated()
   ↓
3. If not authenticated: Redirect to /login
   ↓
4. If authenticated: Make API call with token
   ↓
5. Backend: backend/src/middlewares/auth.middleware.ts → validateToken()
   ↓
6. Extract user from token
   ↓
7. Attach user to request (req.user)
   ↓
8. Continue to controller
```

---

This quick reference guide helps you quickly find where to add code for common tasks! 🚀
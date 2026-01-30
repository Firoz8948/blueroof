# BlueRoof Realty - Lead Generation Platform

Production-ready lead generation real estate website with built-in Mini CRM.

## Architecture

- **Frontend**: Next.js (App Router)
- **Backend**: Node.js (Modular Monolith)
- **Database**: PostgreSQL
- **Auth**: JWT

## Project Structure

```
├── frontend/          # Next.js application
│   ├── app/          # App Router pages
│   ├── components/   # React components
│   ├── lib/          # Utilities and helpers
│   └── store/        # State management
│
├── backend/          # Node.js modular monolith
│   └── src/
│       ├── modules/  # Feature modules (auth, users, leads, properties)
│       ├── config/   # Configuration files
│       ├── middlewares/
│       ├── utils/
│       └── database/ # Models, migrations, seeds
│
└── README.md
```

## Modules

- **Auth**: JWT authentication and authorization
- **Users**: User management (admin, agents)
- **Leads**: Mini CRM core - lead capture and management
- **Properties**: Property listings for lead generation
- **Insurance**: Future module (placeholder)
- **Finance**: Future module (placeholder)
- **Notifications**: WhatsApp and email services

## Getting Started

See individual README files in frontend/ and backend/ directories for setup instructions.



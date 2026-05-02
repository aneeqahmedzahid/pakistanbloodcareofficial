# 🩸 Pakistan Bloodcare Official

> **Pakistan's National Blood Donation Management Platform** — Connecting donors, blood banks, hospitals, and patients across the nation.

![Pakistan Bloodcare](./Assets/logo.png)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
  - [1. Supabase Setup](#1-supabase-setup)
  - [2. Backend Setup](#2-backend-setup)
  - [3. Frontend Setup](#3-frontend-setup)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Features](#features)
- [User Roles](#user-roles)
- [API Endpoints](#api-endpoints)

---

## Overview

Pakistan Bloodcare Official is an enterprise-level, production-ready web application designed to streamline blood donation management across Pakistan. It connects:

- 🩸 **Donors** — Register, track donations, earn badges, book appointments
- 🏥 **Blood Banks & Hospitals** — Manage inventory, appointments, and requests
- 🚨 **Patients/Requesters** — Submit emergency blood requests, find compatible donors
- 🛡️ **National Admins** — Oversee the national blood supply, manage organizations

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Vite 5 + React 18 + TypeScript (strict) |
| **Styling** | Tailwind CSS v3 + Material UI v6 |
| **Animations** | Framer Motion v11 |
| **Backend** | Node.js + Express.js + TypeScript |
| **Database** | Supabase (PostgreSQL) |
| **Auth** | Supabase Auth |
| **State** | Zustand + TanStack Query v5 |
| **Forms** | React Hook Form + Zod |
| **Routing** | React Router v6.4 |
| **PDF** | @react-pdf/renderer |
| **Maps** | Leaflet + react-leaflet |

---

## Prerequisites

- **Node.js** >= 20.x
- **npm** >= 10.x
- A **Supabase** project ([supabase.com](https://supabase.com))

---

## Setup Instructions

### 1. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Navigate to **SQL Editor** in your Supabase dashboard
3. Run the schema file:
   ```
   supabase/schema.sql
   ```
4. Run the RLS policies file:
   ```
   supabase/rls-policies.sql
   ```
5. (Optional) Run seed data:
   ```
   supabase/seed.sql
   ```
6. Copy your **Project URL** and **Anon Key** from `Settings → API`

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Fill in your values in .env

# Run in development mode
npm run dev
```

The backend will start on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Fill in your values in .env

# Run in development mode
npm run dev
```

The frontend will start on `http://localhost:5173`

---

## Environment Variables

### Frontend (`frontend/.env`)

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_BACKEND_URL=http://localhost:5000/api
VITE_APP_NAME="Pakistan Bloodcare Official"
```

### Backend (`backend/.env`)

```env
PORT=5000
NODE_ENV=development
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
SUPABASE_ANON_KEY=your_supabase_anon_key
JWT_SECRET=your_jwt_secret_min_32_chars
FRONTEND_URL=http://localhost:5173
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

---

## Available Scripts

### Frontend

| Script | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors |
| `npm run format` | Format with Prettier |
| `npm run type-check` | TypeScript type check |

### Backend

| Script | Description |
|---|---|
| `npm run dev` | Start with nodemon (hot reload) |
| `npm run build` | Compile TypeScript |
| `npm start` | Run compiled JS |
| `npm run lint` | Run ESLint |
| `npm run type-check` | TypeScript type check |

---

## Features

### 🩸 Donor Module
- Complete donor registration with medical profile
- Smart eligibility checker (questionnaire-based)
- Appointment booking with nearby blood banks
- Donation history with downloadable certificates (PDF)
- Gamification: badges, streaks, city & national leaderboards

### 🚨 Emergency Blood Request
- Urgent blood request form with urgency levels
- Real-time request feed (Supabase Realtime)
- Intelligent donor-request matching by blood group & location
- Live request status tracking

### 🏥 Blood Bank Dashboard
- Real-time blood inventory by group & component
- Appointment management
- Request approval workflow
- Analytics (stock trends, monthly donations)

### 🛡️ Admin Panel
- National blood supply overview
- Blood bank & hospital management
- Donor verification
- Emergency campaign management
- Audit trail & activity logs

### 🌟 Platform Features
- Dark / Light mode
- Fully responsive (mobile-first)
- Real-time notifications
- Location-based services (Pakistan cities + Leaflet maps)
- PDF certificate & report generation
- Rate limiting & security hardening

---

## User Roles

| Role | Access |
|---|---|
| `donor` | Donor dashboard, profile, appointments, badges |
| `patient` | Submit requests, track status |
| `blood_bank_admin` | Inventory, appointments, request approval |
| `national_admin` | Full platform access, analytics, user management |

---

## API Endpoints

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/auth/register` | Register user | Public |
| POST | `/auth/login` | Login | Public |
| GET | `/donors` | List donors | Auth |
| POST | `/donors` | Create donor profile | Donor |
| GET | `/blood-requests` | List blood requests | Auth |
| POST | `/blood-requests` | Create blood request | Patient |
| GET | `/inventory/:bankId` | Get bank inventory | Auth |
| PUT | `/inventory/:bankId` | Update inventory | BloodBank |
| POST | `/appointments` | Book appointment | Donor |
| GET | `/admin/analytics` | National stats | Admin |

---

## License

© 2025 Pakistan Bloodcare Official. All rights reserved.

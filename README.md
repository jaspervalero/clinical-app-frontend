# Clinical App Frontend

👉 **[Proof of Work — Hands-on Engineering Leadership](./PROOF-OF-WORK.md)**

Next.js frontend for a simple clinical workflow:

- View patients on the home page
- Add a new patient
- Add clinical data for a selected patient
- Delete a patient

The frontend uses internal Next API routes as a proxy layer to the backend service.

## Tech Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- Biome (linting/formatting/checking)

## Prerequisites

- Node.js 20+
- npm
- Backend API running (default: `http://localhost:8000`)

## Environment

Create a `.env.local` file in the project root if you need a backend URL other than localhost:

```bash
BACKEND_API_URL=http://localhost:8000
```

If not set, the app defaults to `http://localhost:8000`.

## Install

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Open `http://localhost:3000`.

## Available Scripts

- `npm run dev` — start development server
- `npm run build` — create production build
- `npm run start` — run production server
- `npm run lint` — run Biome lint
- `npm run check` — run Biome checks (lint + formatting validations)
- `npm run format` — apply Biome formatting
- `npm run format:check` — verify formatting without writing changes

## App Routes

- `/` — Home page with patient list and actions
- `/add-patient` — Create patient form
- `/add-clinicals/[patientId]` — Add clinical data for a specific patient

## Internal API Routes (Proxy)

These routes are handled by Next.js and forward requests to the backend:

- `GET /api/patients` → backend `GET /api/patients`
- `POST /api/patients` → backend `POST /api/patients`
- `DELETE /api/patients/:patientId` → backend `DELETE /api/patients/:patientId`
- `POST /api/clinicals` → backend `POST /api/clinicals`

## Project Structure

```text
app/
	page.tsx                          # Home page
	add-patient/page.tsx              # Add patient form
	add-clinicals/[patientId]/page.tsx# Add clinical data form
	api/
		patients/route.ts               # Patients GET/POST proxy
		patients/[patientId]/route.ts   # Patient DELETE proxy
		clinicals/route.ts              # Clinical data POST proxy
lib/
	backend.ts                        # BACKEND_API_URL config
```

## Notes

- The frontend calls only internal `/api/*` routes from the browser.
- Backend host configuration is centralized in `lib/backend.ts`.

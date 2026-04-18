
# AI Legal Aid — RTI & Legal Draft Generator

AI Legal Aid is a lightweight full-stack app to generate bilingual (English/Hindi) legal drafts — RTI applications, FIR drafts, consumer complaints, legal notices, affidavits, tenancy disputes, employment complaints, cyber complaints, and more. It uses template files and an optional AI assistant to extract structured inputs and fill templates.

Tech stack
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB (Mongoose)
- Optional: OpenAI for structured extraction (configured via `OPENAI_API_KEY`)

Highlights / Features
- Document Builder: guided forms to collect information and generate draft documents.
- Bilingual output: generate in English or Hindi.
- Chat assistant: contextual chat helps collect or refine inputs for drafts.
- Editable live preview and PDF export.
- Authentication (signup/login) with JWT; generated documents persist to MongoDB per user.
- Templates browser: inspect template text via API.

Prerequisites
- Node.js 18+ and npm
- A running MongoDB instance (local or Atlas)

Environment variables
- `MONGODB_URI` — MongoDB connection string (defaults to `mongodb://127.0.0.1:27017/hckgg`)
- `JWT_SECRET` — signing key for JSON Web Tokens (defaults to `devsecret` for local dev)
- `OPENAI_API_KEY` — optional, set to enable OpenAI-powered extraction
- `PORT` — optional server port (defaults to `4000`)

Quick start (development)

1. Start the backend

```bash
cd server
npm install
# development with auto-reload
npm run dev
```

2. Start the frontend

```bash
cd client
npm install
npm run dev
```

Open the app in the browser (Vite default): `http://localhost:5173`. The dev server proxies `/api` to `http://localhost:4000`.

API overview
- `POST /api/auth/signup` — create account (body: `{ name, email, password }`)
- `POST /api/auth/login` — login (body: `{ email, password }`) — returns `token`
- `GET /api/auth/me` — get current user (requires `Authorization: Bearer <token>`)
- `POST /api/generate` — generate a document (requires auth) — body: `{ docType, language, answers }`.
	- Response includes `document` (text) and saved metadata under `saved` when successful.
- `GET /api/documents` — list saved documents for current user (requires auth)
- `POST /api/documents` — save a document manually (requires auth)
- `GET /api/documents/:id` — fetch a saved document (requires auth)
- `GET /api/templates` — list available template files
- `GET /api/templates/:docType/:lang` — fetch template content (e.g. `/api/templates/rti/en`)

Directory layout (important files)
- `client/` — React frontend (entry: `client/src/main.jsx`, pages in `client/src/pages`)
- `server/` — Express backend (entry: `server/index.js`)
- `server/templates/` — text templates used to render documents

Demo checklist (recommended for hackathon)
1. Signup and login to create a user.
2. Navigate to the document builder (`Workspace`) and select a template.
3. Fill form fields (or use the chat assistant) and click Generate — verify the generated text appears and is saved.
4. Visit `/api/documents` (via curl or later UI) to verify documents persisted in MongoDB.
5. Use the Preview panel to edit and export PDF.

Troubleshooting
- If the backend fails to start, ensure MongoDB is running and `MONGODB_URI` is set.
- For OpenAI features, set `OPENAI_API_KEY` in environment.

Want me to demo or add a UI page to list saved documents? I can add a "My Documents" view and wire download/open actions.



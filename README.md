
# AI Legal Aid — Bilingual Legal Draft Generator (Hackathon-ready)

AI Legal Aid helps users quickly produce formal legal drafts (RTI, FIR, complaints, notices, affidavits, tenancy & employment complaints, cyber complaints, court applications, and more) using editable templates and guided inputs. The app supports English and Hindi output, per-user persistence, and a lightweight chat assistant to collect structured answers.

Why this project
- Rapidly create formal legal documents from templates.
- Bilingual support (English/Hindi) for broader accessibility.
- Simple API to generate, preview, save, and export drafts.

Key features
- Guided Document Builder with live preview
- Bilingual output: English and Hindi
- Template library (plain-text templates under `server/templates/`)
- Per-user persistence: generated drafts are saved to MongoDB
- Authentication with JWT (signup/login)
- Export to PDF from the Preview panel
- Lightweight chat assistant to help collect inputs (mockable, optional OpenAI integration)
- Theme toggle and language selector in the navbar

Tech stack
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB via Mongoose
- Optional: OpenAI (for automated extraction of structured answers)

Repository layout (high level)
- `client/` — React app (entry: `client/src/main.jsx`, pages under `client/src/pages`)
- `server/` — Express API (entry: `server/index.js`, models in `server/models`)
- `server/templates/` — plain text templates used to render documents

Prerequisites
- Node.js 18+ and npm
- MongoDB (local or Atlas) running and accessible

Essential environment variables (server)
- `MONGODB_URI` — MongoDB connection string (example: `mongodb://127.0.0.1:27017/ai_legal`) — defaults to `mongodb://127.0.0.1:27017/hckgg` for local dev
- `JWT_SECRET` — secret key for JWT signing (set a strong value for production)
- `OPENAI_API_KEY` — optional, set to enable OpenAI features
- `PORT` — server port (default `4000`)

Quick start — development

1) Backend

```bash
cd server
npm install
# development with auto-reload
npm run dev
```

2) Frontend

```bash
cd client
npm install
npm run dev
```

Open the frontend (Vite): `http://localhost:5173` (client proxies `/api` to the backend).

API overview (most-used endpoints)

- `POST /api/auth/signup` — create account
	- body: `{ name, email, password }`
- `POST /api/auth/login` — login
	- body: `{ email, password }` — returns `{ token }`
- `GET /api/auth/me` — get current user (requires `Authorization: Bearer <token>`)
- `POST /api/generate` — generate and (optionally) save a document (requires auth)
	- body: `{ docType, language, answers }`
	- response: `{ document: <text>, saved: <metadata> }` when saved
- `GET /api/documents` — list saved documents (user-scoped)
- `GET /api/documents/:id` — fetch a saved document
- `GET /api/templates` — list available templates
- `GET /api/templates/:docType/:lang` — fetch template content

Quick curl examples

Sign up:

```bash
curl -X POST http://localhost:4000/api/auth/signup \
	-H "Content-Type: application/json" \
	-d '{"name":"Alice","email":"alice@example.com","password":"secret"}'
```

Login (get token):

```bash
curl -X POST http://localhost:4000/api/auth/login \
	-H "Content-Type: application/json" \
	-d '{"email":"alice@example.com","password":"secret"}'
```

Generate (authenticated):

```bash
curl -X POST http://localhost:4000/api/generate \
	-H "Content-Type: application/json" \
	-H "Authorization: Bearer <TOKEN>" \
	-d '{"docType":"complaint","language":"en","answers":{"name":"Alice","detail":"..."}}'
```

Troubleshooting & notes
- If the backend fails to connect to MongoDB, confirm `MONGODB_URI` and that MongoDB is running.
- For local development you can use the provided default `MONGODB_URI` if you run MongoDB locally.
- OpenAI features are optional — do not set `OPENAI_API_KEY` if you don't want to use them.

Planned / Next steps (quick wins for the hackathon)
- Add a dedicated "My Documents" frontend page to list, open, and download saved drafts (API already available).
- Improve translations for question labels and template placeholders (currently core UI strings are localized).
- Add small E2E smoke tests for signup -> generate -> list flow.

Credits
- Built for a hackathon demo — feel free to fork and iterate.

If you want, I can:
- add the `My Documents` UI now and wire it to `GET /api/documents`, or
- start the dev servers here, run a quick end-to-end (signup -> generate -> list) and report results.




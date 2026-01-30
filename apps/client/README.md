# TODOs Client (Next.js)

Next.js 16 app for managing todos. Features include tabs (All/Pending/Completed), sorting (Newest/Oldest/Priority), popover-based create form with zod validation, inline edit, mark done/undone, and soft delete with Undo/Confirm.

## Prerequisites

- Node.js 18+
- pnpm 8+
- Backend running on http://localhost:3001 (NestJS)

## Setup & Run

From the repository root:

```bash
pnpm install
```

Configure environment variables:

1. Copy `.env.example` to `.env` in `apps/client`
2. Set `NEXT_PUBLIC_API_BASE_URL` to your backend URL (default `http://localhost:3001`)

Start the dev server:

```bash
cd apps/client
pnpm dev
```

Build and run:

```bash
pnpm build
pnpm start
```

## Environment Variables

- `NEXT_PUBLIC_API_BASE_URL`: Base URL for API requests (required)
- Clerk (optional, if enabling auth UI):
  - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
  - `CLERK_SECRET_KEY`

## Usage Highlights

- Create: Click “+ Add new” (popover), fill title/optional description/priority
- Edit: Pencil icon → inline edit; Save (check) or Cancel (X)
- Complete: Checkbox toggles done/undone
- Delete: Trash icon → soft delete with toast; Undo restores; Confirm hard-deletes
- Filter: Tabs (All/Pending/Completed) with clear active highlight
- Sort: Newest/Oldest/Priority (High→Low)

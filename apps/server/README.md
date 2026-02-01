# TODOs Server (NestJS + Prisma)

NestJS 11 API for the TODOs app, using Prisma ORM and Postgres. Swagger is enabled at `/docs`.

## Prerequisites

- Node.js 18+
- pnpm 8+
- Local Postgres database (or any reachable Postgres instance)

## Setup & Run

From the repository root:

```bash
pnpm install
```

Configure environment variables:

1. Copy `.env.example` to `.env` in `apps/server`
2. Set `DATABASE_URL` to your Postgres connection string, for example:

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/todos?schema=public
```

Generate Prisma client and apply migrations:

```bash
cd apps/server
pnpm run prisma:generate
pnpm run prisma:migrate
```

Start the server:

```bash
pnpm run start:dev
```

API is served on `http://localhost:3001`.

## API Docs (Swagger)

- UI: http://localhost:3001/docs
- JSON: http://localhost:3001/docs-json

## DB Connection Notes (Local)

- Ensure Postgres is running locally; default port is `5432`
- Create the database (e.g., `todos`) before running migrations
- `DATABASE_URL` must include a valid `schema` (e.g., `public`)
- Re-run `pnpm run prisma:migrate` whenever schema changes are made

## Common Commands

- Build: `pnpm run build`
- Dev: `pnpm run start:dev`
- Generate Prisma: `pnpm run prisma:generate`
- Migrate: `pnpm run prisma:migrate`

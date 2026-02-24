# {{ system_name }}/{{ stack_name }}/{{ layer_name }} layer

Layer type: **app-bun** (Bun + TypeScript + Elysia)

## Stack

| Component | Technology |
|-----------|-----------|
| Runtime | [Bun](https://bun.sh) |
| Framework | [Elysia](https://elysiajs.com) |
| Language | TypeScript (strict mode) |
| Linter/Formatter | [Biome](https://biomejs.dev) |
| Testing | Bun built-in test runner |
| Container | Multi-stage Docker build |

## Project Structure

```
src/
├── index.ts          # Application entry point
├── config.ts         # Environment configuration
└── routes/
    ├── health.ts     # Health check endpoints
    ├── api.ts        # API v1 routes
    └── __tests__/    # Route tests
        ├── health.test.ts
        └── api.test.ts
```

## Local Development

```bash
# Install dependencies
bun install

# Start dev server with hot reload
bun run dev

# Run tests
bun test

# Type check
bun run typecheck

# Lint & format
bun run check
```

## Docker

```bash
# Build the image
docker compose build

# Run production mode
docker compose up

# Run dev mode with hot reload
docker compose --profile dev up {{ layer_name }}-dev
```

## API Documentation

Swagger UI is available at `http://localhost:3000/swagger` when the server is running.

## Available Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Start dev server with hot reload |
| `bun run start` | Start production server |
| `bun run build` | Build for production |
| `bun run typecheck` | Run TypeScript type checking |
| `bun run lint` | Lint with Biome |
| `bun run lint:fix` | Lint and auto-fix |
| `bun run format` | Format with Biome |
| `bun run check` | Run all checks (lint + typecheck) |
| `bun test` | Run tests |
| `bun test --coverage` | Run tests with coverage |

## Just Commands

```bash
just app-bun-install        # Install dependencies
just app-bun-dev             # Start dev server
just app-bun-test            # Run tests
just app-bun-lint            # Lint code
just app-bun-typecheck       # Type check
just app-bun-build-image     # Build Docker image
just app-bun-push-image      # Push to registry
just app-bun-ci              # Run full CI pipeline
```

<!-- BEGIN AUTO-LAYER -->
<!-- This section is managed by scripts. Manual edits inside may be overwritten. -->
<!-- END AUTO-LAYER -->

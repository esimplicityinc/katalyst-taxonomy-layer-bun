# syntax=docker/dockerfile:1

# Multi-stage Dockerfile for {{ layer_name }}
# Runtime: Bun | Framework: Elysia | Layer: {{ system_name }}/{{ stack_name }}/{{ layer_name }}

# -----------------------------------------------------------------------------
# Install dependencies stage
# -----------------------------------------------------------------------------
FROM oven/bun:1-alpine AS deps

WORKDIR /app

# Copy dependency manifests first (for better caching)
COPY package.json bun.lock ./

# Install production dependencies only
RUN bun install --frozen-lockfile --production

# Install all dependencies (including devDependencies for build)
FROM oven/bun:1-alpine AS dev-deps

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# -----------------------------------------------------------------------------
# Build stage
# -----------------------------------------------------------------------------
FROM oven/bun:1-alpine AS builder

WORKDIR /app

COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .

# Type check
RUN bun run typecheck

# Build the application (Bun compile for single binary)
RUN bun build ./src/index.ts \
    --target=bun \
    --outdir=./dist \
    --minify

# -----------------------------------------------------------------------------
# Production stage
# -----------------------------------------------------------------------------
FROM oven/bun:1-alpine AS runtime

# Add non-root user for security
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup

WORKDIR /app

# Copy production dependencies
COPY --from=deps --chown=appuser:appgroup /app/node_modules ./node_modules

# Copy built application
COPY --from=builder --chown=appuser:appgroup /app/dist ./dist
COPY --from=builder --chown=appuser:appgroup /app/package.json ./

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# Expose application port
EXPOSE 3000

# Run as non-root user
USER appuser

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD bun --eval "fetch('http://localhost:3000/health').then(r => r.ok ? process.exit(0) : process.exit(1)).catch(() => process.exit(1))"

# Start application
CMD ["bun", "run", "dist/index.js"]

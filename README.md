# katalyst-taxonomy-layer-bun

Katalyst Taxonomy layer type for **Bun + TypeScript + Elysia** applications.

This repository provides the `app-bun` layer type template and associated actions for use with the [Katalyst Taxonomy](https://github.com/esimplicityinc/katalyst-taxonomy) system.

## What's Included

### Layer Type: `app-bun`

A full-stack application template using:

| Component | Technology |
|-----------|-----------|
| Runtime | [Bun](https://bun.sh) |
| Framework | [Elysia](https://elysiajs.com) |
| Language | TypeScript (strict mode) |
| Linter/Formatter | [Biome](https://biomejs.dev) |
| Testing | Bun built-in test runner |
| Container | Multi-stage Docker build |

### Scaffolded Files

When you create a layer with `--layer-type app-bun`, you get:

```
<layer>/
├── layer.yaml
├── Dockerfile
├── docker-compose.yaml
├── package.json
├── tsconfig.json
├── biome.json
├── bunfig.toml
├── .dockerignore
├── .gitignore
├── .env.example
├── README.md
├── base/
├── env-template/          # Rendered per environment
│   ├── .env
│   ├── docker-compose.override.yaml
│   └── environment.yaml
├── environment-template/
└── src/
    ├── index.ts
    ├── config.ts
    └── routes/
        ├── health.ts
        ├── api.ts
        └── __tests__/
            ├── health.test.ts
            └── api.test.ts
```

### Actions (12 total)

| Action | Stage | Description |
|--------|-------|-------------|
| `app-bun-install` | pre | Install dependencies |
| `app-bun-dev` | main | Start dev server with hot reload |
| `app-bun-build` | pre | Build for production |
| `app-bun-test` | pre | Run tests |
| `app-bun-typecheck` | pre | TypeScript type checking |
| `app-bun-lint` | pre | Lint with Biome |
| `app-bun-fmt` | pre | Format and type check |
| `app-bun-build-image` | pre | Build Docker image |
| `app-bun-push-image` | main | Push image to registry |
| `app-bun-scan-image` | post | Scan image with Trivy |
| `app-bun-security` | post | Semgrep security scan |
| `app-bun-ci` | main | Full CI pipeline |

## Installation

### From GitHub (release-based)

```bash
# Add to an existing kata taxonomy
kata add --layer-type app-bun --source github:esimplicityinc/katalyst-taxonomy-layer-bun

# Add a specific version
kata add --layer-type app-bun --source github:esimplicityinc/katalyst-taxonomy-layer-bun@v0.1.0
```

### From Git (clone-based)

```bash
kata add --layer-type app-bun --source git:https://github.com/esimplicityinc/katalyst-taxonomy-layer-bun.git
```

## Usage

After installing the layer type, create a layer:

```bash
kata create layer app \
  --parent my-stack \
  --parent-subsystem my-subsystem \
  --parent-system my-system \
  --layer-type app-bun \
  -d "My Bun API service" \
  -O team@example.com \
  -e dev -e staging -e prod
```

Run actions:

```bash
# List available actions
kata action list --layer-type app-bun

# Run an action
kata action run app-bun-test my-system.my-subsystem.my-stack.app --env dev

# Dry-run
kata action run app-bun-build-image my-system.my-subsystem.my-stack.app --env dev --dry-run
```

## Repository Structure

```
katalyst-taxonomy-layer-bun/
├── templates/
│   ├── manifest.json                          # Source manifest
│   └── plugins/
│       ├── layer_types/
│       │   ├── manifest.json                  # Layer types package manifest
│       │   └── app-bun/                       # The layer type template
│       │       ├── layer.yaml
│       │       ├── Dockerfile
│       │       ├── ...
│       │       └── src/
│       └── layer_actions/
│           ├── manifest.json                  # Actions package manifest
│           └── app-bun.yaml                   # Action definitions
├── .github/
│   └── workflows/
│       └── release.yml                        # Auto-publish on tag
└── README.md
```

## Releasing

To create a new release:

```bash
git tag v0.2.0
git push origin v0.2.0
```

The GitHub Actions workflow will automatically create a release with the required archive assets (`templates.tar.gz`, `layer_types.tar.gz`, etc.) that `kata` can consume.

## License

MIT

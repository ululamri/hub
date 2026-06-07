# Pass 68G — Hub Base Path Readiness

Karyra Hub is a separate SvelteKit repository, but beta deployment keeps one domain first.

## Local development

Run Hub at root locally:

```bash
pnpm install
pnpm run audit:hub
pnpm run audit:hub-paths
pnpm run check
pnpm run build
pnpm run dev
```

## One-domain beta build

Build Hub under `/hub`:

```bash
PUBLIC_HUB_BASE_PATH=/hub pnpm run build
```

Expected public paths:

- `/hub`
- `/hub/resources`
- `/hub/missions`

## Production later

When Spark and Hub are moved to separate domains/subdomains, build Hub without `PUBLIC_HUB_BASE_PATH` or set it to an empty value.

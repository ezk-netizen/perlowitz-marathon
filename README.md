# Perlowitz Marathon

A Next.js marathon registration site configured for Cloudflare Workers with the OpenNext Cloudflare adapter.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Cloudflare build

```bash
npm run build
npx opennextjs-cloudflare build
```

## Deploy

```bash
npm run deploy
```

Registration submissions validate on the server. If a Cloudflare KV binding named `REGISTRATIONS` is configured, submissions are stored there; otherwise they are logged by the Worker runtime.

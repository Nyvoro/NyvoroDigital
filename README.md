This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Copy .env.local.sample → .env.local

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Using the chat client

```tsx
const { sendPrompt, isLoading, conversation } = useChat();
```

This hook depends on the upcoming UI from the L2-3 milestone to render messages.
## Polish
Smooth scrolling, loading spinner and error banner improve overall UX.

## Testing

Run the full unit and integration test suite:

```bash
pnpm test
```

To generate a coverage report, use:

```bash
pnpm test:cov
```

Open `coverage/index.html` in your browser to view detailed coverage results.

## E2E tests

```bash
pnpm test:e2e           # local headless
USE_OPENAI_STUB=0 pnpm test:e2e  # hit real API
```

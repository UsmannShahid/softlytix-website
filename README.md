Softlytix marketing site — Next.js 14 (App Router), Tailwind, shadcn/ui, framer-motion.

## Design Spec

See design guidelines, components, and patterns:

- [softlytix/design-spec.md](./design-spec.md)

Highlights in v1.1:
- Apple-style Services segmented control (connected pills, deep links).
- Uniform pill buttons sitewide (shadcn Button tuned).
- Subtle Apple-like parallax on section illustrations/headings.
- Reduced-motion support for major interactions.
- Favicon now configured to use `/favicon.png` (place the asset in `public/favicon.png`).
- PWA icons added: apple touch and maskable icons via `/images/*` and `site.webmanifest`.

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Key files:
- `src/app/page.tsx` — home page (hero, services tabs, sections, parallax).
- `src/components/ServicesTabs.tsx` — Apple-style segmented tabs (ARIA, keyboard, mobile chevrons, deep link `?service=<id>#solutions`).
- `src/components/ScrollParallax.tsx` — small wrapper for subtle scroll transforms.
- `src/components/ui/button.tsx` — shadcn Button with unified pill shape and consistent sizes.

Edit services content in `src/components/ServicesTabs.tsx` (labels, title, description, use cases, href).

Assets:
- Favicon: place your icon at `softlytix/public/images/favicon.png` (32x32 or 48x48).
- Apple touch icon: `softlytix/public/images/apple-touch-icon.png` (we currently mirror the favicon for convenience).
- Android/Maskable: `softlytix/public/images/android-chrome-192x192.png` and `...512x512.png` (also mirrored now).
- Manifest: `softlytix/public/site.webmanifest` declares icons and display mode.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Future Styles / TODOs
- Add tab dividers for iOS-like segmented look (optional).
- Add deep-link “Share this tab” helper.
- Global reduced-motion toggle to disable decorative effects.
- Extract animation tokens (durations/easings) to a constants file.

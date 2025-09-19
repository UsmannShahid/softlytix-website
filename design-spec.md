**Softlytix Design Spec**

 - Version: 1.1
- Scope: Softlytix marketing site (home-first), Next.js App Router
- Ownership: Frontend/UI

**Brand & Visual Language**
- Colors
  - Primary: `#0086D1` (CTA, links, accents)
  - Primary Dark: `#004B87` (hover/active, dark gradients)
  - Heading: `#1F2937`
  - Dark Hero Base: `#0B1220`
  - Use oklch tokens from `globals.css` for neutrals and surfaces.
- Typography
  - Heading: `Outfit` (variable `--font-outfit`)
  - Body: `Inter` (variable `--font-inter`)
  - Sizes: mobile-first; hero H1 `text-4xl` → `md:text-6xl`.
- Spacing & Radius
  - Radius scale via CSS vars (`--radius`); cards typically rounded-xl/2xl.
  - Section vertical rhythm: 16–20 units on mobile, +4–8 on larger.

**Header & Navigation**
- Behavior
  - Transparent at page top (no border/shadow), white logo/text over dark hero.
  - On scroll (`window.scrollY > 10`): switch to gradient header (`from #E0F3FC → white`), dark text, subtle border/shadow.
  - Fixed header at top (`position: fixed; z-40`).
- Logo
  - White logo: `/images/Softlytix Official Logo - White.png` when transparent.
  - Default logo: `/softlytix-official-logo.png` when scrolled.
  - Mobile size: height `h-10` (~170px intrinsic via `sizes`), `sm:h-10`, `md:h-11`.
- Desktop Nav
  - Link color follows header state: white over hero; heading/primary on scroll.
  - Solutions dropdown uses Radix NavigationMenu without viewport (`viewport={false}`) to avoid flashes.
- Dropdown Panel
  - Desktop: right-aligned to trigger (`md:absolute md:right-0`), `md:w-[min(90vw,640px)]`, `max-h-[80vh]`, `overflow-auto`.
  - Mobile: centered with gutters (`left-4 right-4`), `max-h-[70vh]`.
  - Surface: semi-opaque with backdrop blur to read over hero.
  - Animations: subtle fade/zoom; no white flash on open.

**Hero Section**
- Theme
  - Dark background with subtle nebula glows; centered content.
  - Starfield and single meteor animation for depth; very subtle motion.
- Illustration
  - Replace static image with Lottie animation.
  - Source: `/public/animations/AI Tools.json` (URL-encode space in code).
  - Render via LottieFiles web component; load script after interactive.
  - Size: responsive height `clamp(220px, 38vw, 340px)`; max width 520px.
- Content
  - H1 uses primary gradient text; concise subheader; single primary CTA + text link.
  - Micro-interactions via framer-motion: `fadeInUp` with 0.6s duration, gentle stagger.

**Animation Guidelines**
- Principles
  - Keep motion subtle and purposeful; avoid distracting loops.
  - Use easing `easeInOut` or `easeOut` and durations between 0.2–0.8s for UI; decorative loops ≥ 4s cycles.
- Components
  - Stars: opacity twinkle with random delay/duration; ≤ 42 nodes; client-only.
  - Meteor: one pass every ~10–12s; opacity in/out; client-only.
  - Section entrances: `whileInView` with `viewport={{ once: true }}`.
 - Reduced Motion
  - Honor `prefers-reduced-motion`: reduce or disable selection/hover animations and parallax.
  - Decorative effects (Stars/Meteor) should be gated in the future when reduced motion is requested.

**Responsiveness**
- Breakpoints
  - Mobile-first; key checks at 320, 360–390, 414–430, 768, 1024, 1280.
- Layout
  - Hero: centered vertical stack; min-height ~70vh.
  - Services grid: single-column → `md:grid-cols-3`.
  - Dropdowns/overlays: `max-h` with internal scroll, side gutters on mobile.
- Safe Areas
  - Mobile menu overlay must pad for `env(safe-area-inset-*)` to avoid status/home bar overlap.
- Overflow
  - Global guard: `html, body { max-width: 100vw; overflow-x: hidden; }`.
  - Media defaults: images/videos/iframes `max-width: 100%`.

**Accessibility**
- Color contrast: ensure ≥ 4.5:1 for text on backgrounds; white over hero is acceptable; use blurred panels.
- Focus states: rely on shadcn/tailwind styles (rings); avoid removing outlines.
- Landmarks: header, main, footer present; nav uses list semantics.
- Alt text: meaningful for logos and illustrations where applicable; decorative images can be empty alt.

**Performance & SSR**
- Hydration Safety
  - Client-only render for components with randomness or custom elements (Stars, Meteor, LottiePlayer) to prevent SSR/client mismatch.
  - Avoid `Math.random()`, `Date.now()` in SSR markup; gate behind mount.
- Scroll Behavior
  - Disable initial scroll restoration on Home; force `window.scrollTo(0,0)` at mount to keep transparent header visible on refresh.
- Assets
  - Use `next/image` with `sizes` for logos/graphics; avoid layout shifts.

**Component References**
- Header: `src/components/Header.tsx`
  - States: `scrolled`, `useWhiteLogo`, `mobileMenuOpen`.
  - Desktop Solutions uses Radix NavigationMenu with `viewport={false}`.
- Navigation Menu Primitives: `src/components/ui/navigation-menu.tsx`
  - Content classes remove jumpy margin when viewport is disabled; right-align supported by parent.
- Home Page: `src/app/page.tsx`
  - Hero layout, Lottie loader (`next/script`), Stars/Meteor, sections with motion.
  - Lottie component: `LottiePlayer()`; stars/meteor gated behind mount.
- Styles: `src/app/globals.css` (tokens, base/reset, overflow guards).
 - Services Tabs: `src/components/ServicesTabs.tsx`
   - Connected segmented control with icons/two-line labels, ARIA roles, keyboard support.
   - Deep-links `?service=<id>#solutions`; reduced-motion aware; mobile chevrons.
 - Scroll Parallax: `src/components/ScrollParallax.tsx`
   - Small wrapper for subtle y/opacity transforms on scroll.
 - Buttons: `src/components/ui/button.tsx`
   - Unified pill shape (`rounded-full`) and size tuning across the site.

**Assets & Paths**
- Logos
  - White: `/public/images/Softlytix Official Logo - White.png`
  - Default: `/public/softlytix-official-logo.png`
- Lottie Animation
  - `/public/animations/AI Tools.json`

**Do / Don’t**
- Do
  - Keep hero motion subtle; ensure header transitions are smooth.
  - Constrain dropdowns and overlays to viewport; add internal scroll when needed.
  - Use gradient text for prominent headings sparingly.
- Don’t
  - Introduce blocking heavy animations on mobile.
  - Allow dropdowns to overflow the screen or flash white on open.
  - Render random visual effects during SSR.

**Open Enhancements**
- Add a global reduced-motion hook to disable non-essential animations.
- Add visual regression tests for header states across breakpoints.
- Extract animation tokens (durations/easings) into a single constants file.
 
**Services Section (v1.1 — supersedes grid)**

- Visual: Apple-style segmented tabs on a connected track.
  - Selected pill: near-black background, white text, soft shadow.
  - Inactive: white background, gray text, subtle border, no heavy shadow.
- Behavior & A11y:
  - `role="tablist"` + `role="tab"` + `aria-selected` + `aria-controls`; panel is `role="tabpanel"`.
  - Keyboard: ArrowLeft/Right move focus (roving tabindex); Enter/Space selects.
  - Reduced motion: selection/hover animations and parallax are minimized.
  - Deep link: selection syncs to URL `?service=<id>#solutions` and restores on reload.
- Mobile: chevrons navigate left/right; active pill auto-centers (scrollbar hidden).
- Content model: `id, icon, labelTop, labelBottom, title, description, useCases[], href`.

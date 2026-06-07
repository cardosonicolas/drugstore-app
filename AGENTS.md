# Agent Workflow for `drugstore-app`
Use this workflow whenever an AI agent contributes code in this repository.

## 1) Pick the right skill(s) before editing
- `next-best-practices`: default for App Router pages, layouts, route handlers, metadata, RSC boundaries, and async Next APIs.
- `react-best-practices`: React performance, rendering, waterfalls, and bundle optimizations.
- `vercel-composition-patterns`: component API refactors, boolean-prop cleanup, compound components, and context architecture.
- `tailwind-css-patterns`: UI styling, responsive layout, spacing/typography consistency, and utility-class patterns.
- `frontend-design`: high-fidelity UI redesigns, landing sections, visual polish, and stronger design direction.
- `accessibility`: a11y audits, keyboard navigation, semantic fixes, ARIA, contrast, and WCAG alignment.
- `seo`: metadata quality, structured data, robots/sitemap/canonical, and search-oriented content structure.
- `typescript-advanced-types`: reusable type utilities, generics/conditional types, strict typing refactors.
- `nodejs-backend-patterns`: API/Route Handler architecture, validation, middleware, auth, and error handling.
- `nodejs-best-practices`: backend decision-making tradeoffs (runtime/framework/architecture/security).
- `next-cache-components`: only when introducing Cache Components/PPR (`cacheComponents: true`) and cache directives.
- `next-upgrade`: only for Next.js version upgrades and migration/codemod work.

## 2) Skill routing by task type
- Page/layout/route work in `src/app/**`: start with `next-best-practices`; add `react-best-practices` for performance-sensitive changes.
- UI component work in `src/components/**`: start with `react-best-practices` + `tailwind-css-patterns`; add `vercel-composition-patterns` for API/architecture refactors.
- SEO changes (`metadata`, JSON-LD, crawl/index controls): include `seo` and validate with `next-best-practices` metadata conventions.
- Accessibility-focused tasks: include `accessibility` from the start, then verify keyboard/focus/labels semantics before completion.
- Advanced typing or shared type utility changes in `src/types/**` and `src/lib/**`: include `typescript-advanced-types`.
- Server/API behavior (Route Handlers, server actions with backend concerns): include `nodejs-backend-patterns`; use `nodejs-best-practices` for architectural choices.

## 3) PR checklist (required)
Before completing any coding task:
1. Run `npm run lint`
2. Run `npm run typecheck`
3. Run `npm run build`
4. For SEO-related changes, verify metadata/structured data output in changed routes.
5. For accessibility-related changes, verify keyboard navigation + visible focus + form labeling in affected UI.

## 4) Current project notes
- Stack: Next.js 16 + React 19 + TypeScript + Tailwind CSS 4.
- Cache Components are currently not enabled in `next.config.ts`; use `next-cache-components` only when a task explicitly introduces that feature.
- Root metadata and JSON-LD already exist in `src/app/layout.tsx`; SEO updates should extend existing patterns rather than replacing them.

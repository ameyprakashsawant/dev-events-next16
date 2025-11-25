<!-- Short, actionable instructions for AI coding agents working on this repo -->

# Copilot instructions for dev-event

This file captures project-specific conventions, architecture notes, and developer workflows so an AI coding agent can be immediately productive.

- Project type: Next.js (App Router) TypeScript project. Key files: `package.json`, `next.config.ts`, `tsconfig.json`, `app/layout.tsx`.
- Run locally: `npm run dev` (starts `next dev`). Build: `npm run build`. Start production preview: `npm run start`.

- Client vs Server boundaries:

  - The app uses the App Router (`app/`). Components under `app/` are server components by default.
  - Client-only components include the top line `"use client"` (example: `components/LightRays.tsx`) and should remain client files. Avoid moving WebGL or DOM-manipulating code to server components.

- Key patterns and files to reference:

  - `components/LightRays.tsx`: WebGL-based background using `ogl`. Contains complex GLSL shaders, `IntersectionObserver` visibility gating, cleanup logic (remove canvas, lose WebGL context). When editing, keep `cleanupFunctionRef` semantics and avoid server-side changes.
  - `lib/utils.ts`: `cn(...)` utility uses `clsx` + `tailwind-merge`. Use this for class composition to match styling conventions.
  - `app/layout.tsx`: global fonts (via `next/font`), background placement of `LightRays`, and global CSS import (`globals.css`). Preserve CSS variable usage for fonts.

- TypeScript / build conventions:

  - `tsconfig.json` uses `strict: true` and path alias `@/*` -> `./*`. Keep types precise and prefer exported types for props.
  - `package.json` targets `next` v16 + React 19. Avoid introducing packages that conflict with these versions.

- Styling and UI conventions:

  - Tailwind CSS + `cn` helper. Prefer `className={cn('px-4', cond && 'text-red')}` rather than concatenating strings.
  - Use `clsx`-friendly patterns and `tw-merge` to avoid class conflicts.

- Graphics/animation patterns:

  - `LightRays` uses `ogl` for WebGL rendering and mounts a canvas into a DOM container. Important constraints:
    - Keep WebGL initialization under client-side `useEffect` guarded by visibility checks.
    - On unmount/visibility change, call the cleanup logic: cancel animation frames, remove resize listeners, and use `WEBGL_lose_context` if available.
    - For shader edits, prefer incremental changes and test in `npm run dev` to avoid breaking runtime-wide GL state.

- Integration points & external deps to be mindful of:

  - `ogl` (WebGL), `tailwindcss` (styles), `lucide-react` (icons), `class-variance-authority` and `tailwind-merge` for styling helpers.
  - Fonts are loaded with `next/font` in `app/layout.tsx` — changing font variable names will affect layout classes.

- Tests & linting:

  - There are no automated tests in the repo. Linting is available via `npm run lint` (runs `eslint`). If adding TypeScript changes, ensure `tsc` type errors are respected (project is strict).

- Suggestions for PRs and edits by an AI agent (concrete):

  - When modifying a client component (e.g., `LightRays`), keep `"use client"` at the top and maintain `useEffect` cleanup logic.
  - Example: small shader tweak — edit the fragment string in `components/LightRays.tsx` and run `npm run dev` locally to validate; do not refactor shader into separate file without preserving runtime string injection.
  - Example: styling change — use `lib/utils.ts`'s `cn` helper and prefer Tailwind utility classes.

- What not to change automatically:
  - Do not convert client components to server components.
  - Do not change Next.js major config (`next.config.ts`) unless addressing a clearly stated issue — it's minimal by design.

If anything above is unclear or you'd like more detail (examples for PR templates, testing steps, or local debugging tips for WebGL), tell me which area to expand.

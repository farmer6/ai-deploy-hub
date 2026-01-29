# Repository Guidelines

## Project Structure & Module Organization
- `src/app` contains the Next.js App Router pages, layouts, and route handlers (e.g., `src/app/api/payment/alipay/route.ts`).
- `src/components` holds reusable UI components (e.g., `Navbar.tsx`, `FloatingCart.tsx`).
- `src/store` contains shared client-side state (Zustand).
- `src/data` stores local data modules used by pages/components.
- `public` holds static assets served at the site root.
- Build output lives in `.next` (dev/prod) and `out` (static export, if used).

## Build, Test, and Development Commands
- `npm run dev`: start the local dev server at `http://localhost:3000`.
- `npm run build`: create the production build.
- `npm run start`: run the production server from the build output.
- `npm run lint`: run ESLint checks.

## Coding Style & Naming Conventions
- Language: TypeScript + React (Next.js App Router).
- Indentation: 2 spaces, double quotes for strings in TS/TSX files (match existing files).
- Component files use `PascalCase` (e.g., `Navbar.tsx`); route folders in `src/app` are lowercase.
- Styling: Tailwind CSS with global styles in `src/app/globals.css`.
- Linting: ESLint via `eslint.config.mjs` (run before PRs).

## Testing Guidelines
- No automated test framework is configured yet. If you add tests, document the framework, add a `npm run test` script, and follow `*.test.ts(x)` naming.
- For now, use manual verification in dev (`npm run dev`) and add focused checks for routes in `src/app/api`.

## Commit & Pull Request Guidelines
- Git history currently has a single bootstrap commit (“Initial commit from Create Next App”), so no established message convention exists yet.
- Recommended: short, imperative summaries (e.g., “Add pricing page layout”).
- PRs should include: a brief description, key changes, and screenshots for UI updates. Link related issues when applicable.

## Security & Configuration Tips
- Do not commit secrets. Local secrets belong in `.env.local` and the `secrets/` directory.
- Keep API keys and payment credentials out of the repository and document required env vars in the PR description.

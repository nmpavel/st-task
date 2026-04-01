# Candidate Decisions & Notes

## 1. State Management & Architecture

**Fetching data:** I used **TanStack React Query** (`useQuery`) instead of writing my own `useEffect` + loading/error state. The fake API is slow and sometimes throws errors. React Query can **retry** failed requests and wait a bit longer between tries. I also used **`keepPreviousData`** so when you change the page, the old products stay on screen until the new ones load (the grid does not go empty).

**URL and state:** **React Router** reads and writes `page`, `limit`, `category`, and `search` in the URL. So you can **share a link**, **refresh the page**, and use the **browser back button** and things still make sense. When you change category or search, the page number goes back to `1` so you do not stay on a page that has no items.

**Search box:** The URL can update as you type, but the value that actually calls the API waits **~350ms** after you stop typing (`useDebouncedValue`). That way we do not call `fetchProducts` on every single key press.

**How the code is split:** `App.tsx` has the layout (search, category, grid, pagination, messages). **`ProductCard`** only shows one product. **`useProducts`** puts together React Query + URL updates. Types are in `src/types/`. Small helpers like `formatPrice` are in `src/utils/`.

**Crashes vs network errors:** **`react-error-boundary`** wraps the app in `main.tsx`. If React crashes while rendering, you see a fallback screen. That is different from “network failed” errors, which React Query handles.

**CSS:** I used **Tailwind** classes in the components as much as possible. `index.css` only has things like colors (`:root`), basic body styles, and scrollbar styling.

---

## 2. Trade-offs and Omissions

- **Categories in the dropdown** are written by hand in the UI. They match the mock data, but a real app would usually get the list from the server (or build it once from the data).
- **React Query** React Query has many options (when to reload data, etc.). I used the normal defaults and did not spend time changing every option.
- **Tests:** There are no unit/integration tests in this repo. With more time I would add tests for pagination, filters, and retries.

**If I had more time:** Add tests, maybe add a sort field in the URL later, use React Query Devtools in dev only.

---

## 3. AI Usage

I used **ChatGPT** & **Cursor** (the editor with AI) for this project.

**ChatGPT help**

First I copy pasted the entire Readme.md file which was given along with this  project . And asked gpt to explain and then create step by step prompts for a AI Agent that would help me to do the initialls or may be almost meet the basic requirements.

**Cursor help**

- Built the first versions of the grid, `ProductCard`, `useProducts`, pagination, filters, loading and error UI.
- Later I added: React Query, URL state, debounced search, skeleton loaders, error boundary for specific resons , for a better user experience and others.
- Moved types and helper functions related codes into `src/types/` and `src/utils/`, and moved styles from a big index.css file into **Tailwind** in the components (Tailwind first approach).
- Fixed TypeScript errors when the build failed.
- Small UI fixes (skeleton vs real card height, grid gaps on small/wide screens for responsive design ).

**How I used it**

- I read the code it suggested, ran **`npm run build`** and **`npm run dev`**, and changed things when they did not match what we wanted (images, spacing, typography).
- Big choices (React Query, URL state, what to skip) were mine—I used AI to go faster, not to skip thinking.

---

## 4. Edge Cases Identified

- **Category values:** The dropdown uses lowercase (`electronics`, …) but the mock products use names like `Electronics`. The API compares without caring about case, so it works. In a real app I would use one format everywhere.
- **Bad URL values:** If `page` or `limit` in the URL is weird, we force them to at least `1` so the app does not break.
- **Search and URL:** The debounced value controls API calls. Depending how we wire the search box, the URL might still update every keystroke—that is something to be clear about if you expect “API only after pause” everywhere.
- **Random mock data:** `api.ts` uses `Math.random()` for some fields, so two loads can look a bit different. Pagination for the same filters still works the same way.

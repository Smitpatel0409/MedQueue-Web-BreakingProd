# 🧠 Nuvo Next.js Project – README

A modern, scalable starter project built with **Next.js 14+** and **TypeScript**, equipped with powerful tools like **Tailwind CSS 4.1**, **Redux Toolkit**, **GraphQL**, and **ShadCN UI** for rapid frontend development.

---

## 🌟 Features & Why We Use This Stack

### ⚡ Next.js + TypeScript
- Provides app routing, SSR/SSG, and performance optimizations out of the box.
- TypeScript improves code reliability and DX (developer experience).

### 🎨 Tailwind CSS 4.1 with Dark/Light Mode
- Utility-first CSS framework for fast styling.
- Built-in support for dark/light mode via `class` strategy.

### 🧱 ShadCN UI (Radix-based Components)
- Beautifully styled and accessible components.
- Fully customizable via Tailwind and supports theming.

### 🧠 Redux Toolkit + RTK Query
- Scalable and opinionated state management.
- RTK Query simplifies API data fetching, caching, and error handling.

### 🔗 GraphQL (graphql-request)
- Lightweight client for interacting with GraphQL APIs.
- Clean and simple to use with full type support.

### 🧹 ESLint + Prettier + Husky
- Enforces consistent code style and prevents bad commits with pre-commit hooks.
- Integrated with lint-staged for formatting/linting only staged files.

---

## 📁 Folder Structure Overview

```bash
src/
├── app/
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Main landing page
│   └── themeProvider/
│       ├── setInitialTheme.ts  # Script to sync theme before hydration
│       ├── ThemeToggle.tsx     # Button to toggle dark/light mode
│       └── TestComponent.tsx   # Theme test/demo component

├── components/
│   └── ui/                     # UI components from ShadCN
│       ├── alert.tsx
│       ├── button.tsx
│       ├── input.tsx
│       ├── form.tsx
│       └── ...                 # Other UI primitives like badge, dialog, etc.

├── lib/
│   └── utils.ts                # Utility functions used across the app

├── provider/
│   └── providers.tsx           # Wraps app with Redux, Theme, etc.

├── store/                      # State management (Redux Toolkit)
│   ├── routes/users/
│   │   └── userApi.ts          # RTK Query API slice for user endpoints
│   ├── slices/
│   │   ├── authSlice.ts        # Auth-related state slice
│   │   ├── uiSlice.ts          # UI/global state slice
│   ├── configUrl.ts            # Base URLs for APIs
│   ├── graphqlApi.ts           # GraphQL client setup using graphql-request
│   ├── hooks.ts                # Typed hooks: useAppSelector, useAppDispatch
│   ├── serverApi.ts            # RTK Query base API configuration
│   └── store.ts                # Root Redux store setup

middleware.ts                   # Next.js Middleware (route protection)

.prettierrc                     # Prettier formatting config
.eslintrc.js                    # ESLint rules for linting
.husky/                         # Pre-commit hooks using Husky
README.md                       # This file 📘
tsconfig.json                   # TypeScript config
next.config.ts                  # Next.js config
# MedQueue-Web-BreakingProd
# MedQueue-Web-BreakingProd

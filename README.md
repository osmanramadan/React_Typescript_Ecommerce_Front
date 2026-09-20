# E-commerce Frontend

A React + TypeScript storefront for a modern ecommerce application. This frontend handles browsing products, managing categories, cart and wishlist flows, checkout, user authentication, user profile management, and admin-only screens.

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Redux Toolkit
- Redux Persist
- Bootstrap 5
- Axios
- ESLint + Prettier

## Features

- Product catalog and product detail browsing
- Category-based filtering and shopping experience
- Cart and wishlist management
- User login and registration
- Protected account and checkout routes
- Order history and profile editing
- Admin-only dashboard access
- Responsive layout for desktop and mobile screens

## Prerequisites

- Node.js 18+
- npm
- A running backend API

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create the environment file:

```bash
cp .env.example .env
```

3. Set the backend API URL in `.env`:

```bash
VITE_API_URL=http://localhost:5005/api
```

4. Start the app:

```bash
npm run dev
```

The frontend is usually available at:

```bash
http://localhost:5173
```

## Available Scripts

```bash
npm run dev               # start Vite dev server
npm run build             # production build
npm run preview           # preview production build
npm run lint              # run ESLint
npm run format            # format source files with Prettier
npm run format:check      # check formatting
```

## Environment Configuration

This project reads its API endpoint from `VITE_API_URL`. If it is not provided, it defaults to:

```bash
http://localhost:5005/api
```

## Notes

This frontend expects the ecommerce backend to be running and reachable. Make sure the backend service is available before testing features such as login, signup, cart checkout, orders, and profile management.


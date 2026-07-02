# Ecom Ecom Ecom Ecom

A lightweight two-page ecommerce experience built with React on the frontend and ASP.NET Core on the backend. The frontend fetches the catalog from the minimal API and posts orders back to the backend, keeping the project easy to run locally.

## Repository layout

- **backend/** – ASP.NET Core minimal API serving product and order endpoints.
- **frontend/** – Vite + React SPA with a home listing and checkout page.

## Backend

### Requirements

- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)

### Run locally

```bash
cd backend
dotnet run
```

The API listens on `http://localhost:5000`. Available endpoints:

- `GET /api/products` – returns the storefront catalog.
- `POST /api/orders` – accepts `{ customerName, email, items: [{ productId, quantity }] }` and returns a mock receipt.

## Frontend

### Requirements

- Node.js 20+ and npm

### Run locally

```bash
cd frontend
npm install
npm run dev
```

Vite proxies `/api` to the backend so the app can be browsed at `http://localhost:5173`.

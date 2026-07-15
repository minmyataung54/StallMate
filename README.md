# StallMate

StallMate is a full-stack ordering platform for food stalls. Stall owners manage their menu, incoming orders, and daily sales from a dashboard. Customers scan a stall's QR code, browse the menu, place an order, and pay by card or cash — no queueing at the stall.

The project is split into two applications: an Express REST API (`BackEnd_Combind`) and a React client (`FrontEnd_Combind`).

## Features

**Customers**

- Sign in with Google (session-based authentication via Passport.js)
- Open a stall's menu directly by scanning its QR code
- Browse stalls, view ratings, and save favorites
- Cart and checkout with Stripe card payments or cash
- Menu items and order notes are translated automatically between languages (Azure Translator)
- Order history with pending and completed orders
- Rate stalls and edit profile details

**Stall owners**

- Separate Google sign-in flow for owners
- Stall profile setup with logo and photos, stored on AWS S3
- A QR code linking to the stall's menu is generated automatically on profile creation
- Full menu management: add, edit, and remove items with images and categories
- Live order queue with the ability to mark orders as completed
- Order history, daily sales summary, and wallet transaction history

## Tech stack

- **Frontend:** React 18, Vite, React Router v6, Redux Toolkit, React-Bootstrap, Stripe.js
- **Backend:** Node.js, Express 4, Passport.js (Google OAuth 2.0), express-session with connect-mongo
- **Database:** MongoDB with Mongoose
- **Storage:** AWS S3 for menu images, profile photos, and QR codes (multer-s3)
- **Payments:** Stripe Checkout (embedded)
- **Translation:** Azure Translator for language detection and translation
- **Infrastructure:** Docker and Docker Compose; GitHub Actions deployment to AWS EC2

## Project structure

```
StallMate/
├── BackEnd_Combind/            Express API
│   ├── src/
│   │   ├── main.js             App entry point (Express, sessions, CORS, routing)
│   │   ├── config/             DB connection, Google OAuth, Passport, S3 client, QR utility
│   │   ├── middleware/         Auth guard, Azure translation middleware
│   │   ├── models/             Mongoose schemas: customers, stall owners, stall profiles,
│   │   │                       menus, orders, favorites, wallet history
│   │   ├── routes/             Auth, home, menu, orders, payments, ratings, favorites,
│   │   │                       profile setup/edit, wallet history
│   │   └── utils/              Daily sales updater
│   ├── Dockerfile
│   ├── compose.yaml            Backend + MongoDB services
│   └── .github/workflows/      Deploys to EC2 on push to main
│
└── FrontEnd_Combind/           React client (Vite)
    └── src/
        ├── clientPages/        Customer pages: home, login, checkout, wallet,
        │                       favorites, order history, stall menu, Stripe return
        ├── clientComponents/   Cart, navbar, rating form, stall cards
        ├── ownerPages/         Owner pages: login, stall profile, menu,
        │                       order queue, order history
        ├── ownerComponents/    Order cards, stall profile creation
        ├── utilities/          Auth contexts and protected routes for both roles
        ├── hooks/              Cookie-based auth hook
        └── store.js            Redux store (cart)
```

## API overview

All dashboard routes require an authenticated session.

- `/auth` — Google OAuth login and callback for customers and stall owners, logout
- `/dashboard/stallowner` — profile setup and editing, menu CRUD with image upload, order queue (pending/completed), wallet and sales history
- `/dashboard/customer` — order placement and history, Stripe checkout sessions, favorites, ratings, profile editing

## Getting started

### Prerequisites

- Node.js 18 or later
- MongoDB (local instance or Atlas), or use the provided Docker Compose setup
- Credentials for Google OAuth 2.0, AWS S3, Stripe, and Azure Translator

### Backend

```bash
cd BackEnd_Combind
npm install
```

Create a `.env` file in `BackEnd_Combind/`:

```env
# Server
PORT=3000
NODE_ENV=development
FRONT_END_BASE_URL=http://localhost:5173
SESSION_SECRET=your_session_secret

# Database
MONGO_URI=mongodb://localhost:27017/stallmate

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# AWS S3
AWS_REGION=your_aws_region
AWS_BUCKET_NAME=your_bucket_name
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key

# Azure Translator
AZURE_KEY=your_azure_translator_key
AZURE_ENDPOINT=https://api.cognitive.microsofttranslator.com
AZURE_LOCATION=your_azure_region
```

Start the server:

```bash
npm start
```

The API runs on port 3000 by default.

### Frontend

```bash
cd FrontEnd_Combind
npm install
```

Create a `.env` file in `FrontEnd_Combind/`:

```env
VITE_API_BACK_END_BASE_URL=http://localhost:3000
VITE_API_FRONT_END_BASE_URL=http://localhost:5173
VITE_API_STRIPE_PUBLIC_KEY=your_stripe_publishable_key
```

Start the dev server:

```bash
npm run dev
```

The client runs at http://localhost:5173.

### Running with Docker

The backend and a MongoDB instance can be run together with Docker Compose:

```bash
cd BackEnd_Combind
docker compose up --build
```

The API will be available at http://localhost:3000.

Notes:

- On macOS, `FRONT_END_BASE_URL` and `NODE_ENV` can be commented out of `.env` before running Docker.
- On Windows, Docker with WSL can be problematic; running the backend directly with `npm install && npm start` and the full `.env` file is more reliable.

## Deployment

Pushes to `main` trigger a GitHub Actions workflow that connects to an AWS EC2 instance over SSH, pulls the latest code, and restarts the application. The workflow expects an `EC2_SSH_KEY` repository secret containing the instance's private key.

## Security

- Sessions are stored in MongoDB with a one-hour TTL; cookies are `httpOnly`, `sameSite=lax`, and marked `secure` in production
- CORS is restricted to the configured frontend origin, with credentials enabled
- All dashboard routes sit behind authentication middleware

## License

ISC

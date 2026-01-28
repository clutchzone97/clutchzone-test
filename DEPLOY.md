# Deployment Guide for ClutchZone Next.js

## Vercel (Recommended)

1.  **Push to GitHub**: Ensure your code is pushed to a GitHub repository.
2.  **Import Project**: Go to [Vercel Dashboard](https://vercel.com/dashboard) and click "Add New..." -> "Project".
3.  **Select Repository**: Choose the `clutchzone-next` repository (or the repo where you pushed this).
4.  **Configure Project**:
    *   **Framework Preset**: Next.js
    *   **Root Directory**: `nextjs` (Edit this if the Next.js app is not in the root, currently it is in `nextjs` folder inside the project).
    *   **Build Command**: `next build` (Default)
    *   **Output Directory**: `.next` (Default)
    *   **Install Command**: `npm install` (Default)
5.  **Environment Variables**:
    *   Add `NEXT_PUBLIC_API_URL` if you want to override the backend URL (default is `https://clutchzone-backend.onrender.com/api`).
6.  **Deploy**: Click "Deploy".

## Render (Alternative)

1.  Create a new **Web Service**.
2.  Connect your GitHub repository.
3.  **Root Directory**: `nextjs`
4.  **Build Command**: `npm install && npm run build`
5.  **Start Command**: `npm run start`
6.  **Environment Variables**:
    *   `NODE_VERSION`: `20` (or compatible)
    *   `PORT`: `3000` (Render will set this automatically)

## Docker

The project is configured for standalone output. You can use a Dockerfile to build and run the container.

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
```

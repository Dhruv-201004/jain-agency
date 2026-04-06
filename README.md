# Jain Agency MVP Website

Production-ready MVP website for Jain Agency built with Next.js App Router, MongoDB, Mongoose, and Tailwind CSS.

## Features

- Public website
  - Home page with hero, services, and featured projects
  - Projects listing page and project details page
  - About page
  - Contact form storing inquiries in MongoDB
- Admin portal
  - Simple email/password login
  - Dashboard analytics (inquiries and projects count)
  - Add, edit, delete projects
  - View customer inquiries
- Developer features
  - App Router + API routes
  - MongoDB with Mongoose models
  - Environment-based configuration
  - Toast notifications and loading states
  - Responsive UI

## Folder Structure

- `app/`: routes, pages, layouts, and API route handlers
- `components/`: reusable UI components and admin widgets
- `lib/`: shared logic (DB connection, auth, helpers, validation)
- `models/`: Mongoose schemas for Projects and Messages
- `.env.example`: required environment variables template

## Setup (Local)

1. Install dependencies:
   - `npm install`
2. Create environment file:
   - Copy `.env.example` to `.env.local`
3. Fill variables in `.env.local`:
   - `MONGODB_URI`
   - `MONGODB_DB_NAME`
   - `JWT_SECRET`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD` or `ADMIN_PASSWORD_HASH`
4. Start development server:
   - `npm run dev`
5. Open app:
   - http://localhost:3000

## MongoDB Connection Guide

1. Create a MongoDB Atlas account and cluster.
2. Create a database user with read/write permissions.
3. Add your IP to Network Access allowlist.
4. Get the connection string from Atlas and place it in `MONGODB_URI`.
5. Optionally set `MONGODB_DB_NAME=jain_agency`.

## Admin Access

- Visit `/admin/login`
- Login using `ADMIN_EMAIL` and `ADMIN_PASSWORD` (or hashed password).

## Scripts

- `npm run dev`: start development server
- `npm run lint`: run ESLint
- `npm run build`: create production build
- `npm run start`: start production server

# Setup Guide

Follow these steps to set up the **Detco Shades** project from scratch on your local machine.

## Prerequisites

Ensure you have the following installed:

- **Node.js**: v20 or higher (Recommended)
- **PostgreSQL**: A local instance or a cloud database (e.g., [Neon](https://neon.tech/))
- **NPM**: Built-in with Node.js

## 1. Clone the Repository

```bash
git clone <repository-url>
cd detco-shades
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Environment Configuration

Create a `.env` file in the root directory and populate it with the following variables. You can use the provided `.env.example` as a template if it exists.

```env
NODE_ENV="development"

# Database Connection
DATABASE_URL="postgresql://user:password@localhost:5432/db_name"

# Authentication
JWT_SECRET="your_long_random_secret_string"

# API Configuration
NEXT_PUBLIC_API_URL="/api"

# Cloudinary (Required for media uploads)
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
CLOUDINARY_URL="cloudinary://api_key:api_secret@cloud_name"
```

## 4. Database Setup

The project uses **Drizzle ORM**. Sync your database schema by running:

```bash
# Push schema changes directly to the database
npm run db:push
```

### Initial Data (Seeding)

To populate the database with initial products, services, and an admin user:

```bash
npm run db:seed
```

> [!NOTE]
> Check `db/seed.ts` to see the default credentials or values being inserted.

## 5. Start Development Server

```bash
npm run dev
```

Your application should now be running at [http://localhost:3000](http://localhost:3000).

---

## Technical Scripts

| Command             | Description                                 |
| :------------------ | :------------------------------------------ |
| `npm run dev`       | Starts the Next.js development server       |
| `npm run build`     | Builds the application for production       |
| `npm run db:push`   | Syncs the Drizzle schema with your database |
| `npm run db:seed`   | Seeds the database with sample data         |
| `npm run db:studio` | Opens the Drizzle Studio database viewer    |
| `npm run lint`      | Runs ESLint to check for code issues        |

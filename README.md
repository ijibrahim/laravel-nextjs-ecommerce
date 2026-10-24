# Full-Stack E-commerce Application

A full-stack e-commerce project built with Laravel REST API, React, Next.js, Tailwind CSS, and MySQL.

## Tech Stack

- **Backend:** Laravel, PHP, REST API
- **Admin Dashboard:** React, Vite, Tailwind CSS
- **Frontend:** Next.js, TypeScript, Tailwind CSS
- **Database:** MySQL
- **API Communication:** Axios and Fetch API

## Project Structure

```text
ecommerce/
├── backend/    # Laravel REST API
├── admin/      # React admin dashboard
├── frontend/   # Next.js storefront
├── .gitignore
└── README.md
```

## Features

### Admin Dashboard

- Dashboard statistics
- Product CRUD operations
- Category management
- Product image upload
- Product search and filtering
- Product sorting and pagination
- Product details page
- Low-stock product monitoring

### Customer Storefront

- Product listing from Laravel API
- Product search
- Category filtering
- Dynamic product details pages
- Product quantity selector
- Add-to-cart functionality
- Cart data persistence using localStorage

## Requirements

Make sure you have installed:

- PHP
- Composer
- Node.js and npm
- MySQL

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/laravel-nextjs-ecommerce.git
cd laravel-nextjs-ecommerce
```

### 2. Setup Laravel Backend

```bash
cd backend
composer install
```

Copy `.env.example` to `.env` and configure your local database credentials.

```bash
php artisan key:generate
php artisan migrate --seed
php artisan storage:link
php artisan serve
```

The Laravel API will usually run at:

`http://127.0.0.1:8000`

### 3. Setup React Admin Dashboard

Open a new terminal:

```bash
cd admin
npm install
npm run dev
```

Configure the API base URL in the admin application if necessary.

### 4. Setup Next.js Frontend

Open another terminal:

```bash
cd frontend
npm install
```

Create a local `.env.local` file and configure:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
```

Start the frontend:

```bash
npm run dev
```

The Next.js frontend will usually run at:

`http://localhost:3000`

## Environment Variables

Do not commit `.env`, `.env.local`, database passwords, API keys, or other secrets to GitHub.

Use `.env.example` files to document the required environment variables.

## Project Status

This project is under development. More e-commerce features will be added over time.

## Author

**YOUR NAME**

- GitHub: https://github.com/ijibrahim/laravel-nextjs-ecommerce

# Posts Project

## Features

- **User authentication** - Powered by Laravel Fortify with Sanctum
- **Post management** - Full CRUD operations (Create, Read, Update, Delete)
- **Modern UI** - Built with React 19 and shadcn/ui components
- **Real-time updates** - Inertia.js for seamless SPA experience
- **Responsive design** - Mobile-friendly interface
- **Form validation** - Both client and server-side validation
- **User profiles** - User settings and profile management

## Requirements

- PHP 8.1 or higher
- Composer
- Node.js 18+ and npm
- MySQL/PostgreSQL/SQLite
- Git

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd test-task
```

### 2. Install PHP dependencies

```bash
composer install
```

### 3. Install JavaScript dependencies

```bash
npm install
```

### 4. Environment setup

```bash
cp .env.example .env
php artisan key:generate
```

### 5. Configure database

Edit `.env` file and set your database credentials:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

### 6. Run migrations and seeders

```bash
php artisan migrate --seed
```

This will create:
- 11 users (including test@example.com / password)
- 30 sample posts

### 7. Start development servers

**Terminal 1 - Laravel:**
```bash
php artisan serve
```

**Terminal 2 - Vite:**
```bash
npm run dev
```

### 8. Access the application

Open your browser and navigate to:
```
http://localhost:8000
```

**Test credentials:**
- Email: `test@example.com`
- Password: `password`


### Code Quality

```bash
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
composer pint        # Format PHP code with Laravel Pint
```

### Database

```bash
php artisan migrate              # Run migrations
php artisan migrate:fresh --seed # Fresh database with seed data
php artisan db:seed              # Run seeders only
```


## API Endpoints

All routes are protected by authentication middleware except the welcome page.

### Posts resource routes

| Method | URI | Action | Description |
|--------|-----|--------|-------------|
| GET | `/posts` | index | List all posts |
| GET | `/posts/create` | create | Show create form |
| POST | `/posts` | store | Store new post |
| GET | `/posts/{post}` | show | Show single post |
| GET | `/posts/{post}/edit` | edit | Show edit form |
| PUT/PATCH | `/posts/{post}` | update | Update post |
| DELETE | `/posts/{post}` | destroy | Delete post |


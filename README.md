# Mini CRM Backend - Prysm Labs Intern Assignment

This is a backend REST API built with **NestJS**, **Prisma**, and **PostgreSQL** for the Prysm Labs Backend Developer Intern assignment. It features JWT authentication, Role-Based Access Control (RBAC), and a clean architecture for managing Users, Customers, and Tasks.

## 🚀 Tech Stack

* **Framework:** NestJS (Node.js)
* **Language:** TypeScript
* **Database:** PostgreSQL
* **ORM:** Prisma
* **Authentication:** JWT (JSON Web Tokens) with Passport & Bcrypt
* **Documentation:** Swagger (OpenAPI)

---

## 🛠️ Setup Instructions

### 1. Prerequisites
Ensure you have the following installed:
* Node.js (v16 or higher)
* npm or yarn
* PostgreSQL (Local or Docker container)

### 2. Installation
Clone the repository and install dependencies:

```bash
git clone <your-repo-url-here>
cd prysm-backend
npm install
``` 

### 3. Environment Configuration
Create a .env file in the root directory. You can copy the example file:

```bash
cp .env.local .env
```
Update the .env variables to match your local PostgreSQL setup:
```env
### Database Connection String
# Format: postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public
DATABASE_URL="postgresql://postgres:password123@localhost:5432/prysm_db?schema=public"

# JWT Secret for Authentication
JWT_SECRET="your_secret_key"

# App Port
PORT=3000
```

### 4. Database Setup (Prisma)
Run the Prisma migrations to create the tables in your database:

```bash
# Generate Prisma Client
npx prisma generate

# Run Migrations
npx prisma migrate dev --name init

```

## 🏃‍♂️ How to Start the Server
To run the application in development mode:

```bash
npm run start:dev
```
The server will start on http://localhost:3000.

### 📚 API Documentation
Swagger API documentation is auto-generated and available at:

👉 http://localhost:3000/api

You can use the Swagger UI to:

Register a new user (Admin or Employee).

Login to receive a JWT accessToken.

Authorize by clicking the "Authorize" button and pasting the token as Bearer <token>.

Test all protected endpoints (Customers, Tasks, etc.).

### 🧪 Testing (Curl Commands)
You can test the API directly using these commands:

1. Register Admin
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "Admin User", "email": "admin@example.com", "password": "password123", "role": "ADMIN"}'
  ```

2. Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@example.com", "password": "password123"}'
  ```
3. Get Customers (Requires Token)
```bash
curl -X GET "http://localhost:3000/customers?page=1&limit=10" \
  -H "Authorization: Bearer <YOUR_ACCESS_TOKEN>"
  ```

### 📂 Project Structure
The project follows a modular Clean Architecture:
```bash
src/
├── auth/           # Authentication logic (JWT, Guards, Strategies)
├── users/          # User management (Admin only)
├── customers/      # Customer CRUD operations
├── tasks/          # Task management & assignment logic
├── prisma/         # Database connection module
└── main.ts         # Application entry point & Swagger setup
```
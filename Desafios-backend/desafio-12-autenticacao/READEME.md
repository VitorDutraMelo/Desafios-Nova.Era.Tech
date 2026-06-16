# 🚀 Challenge 12 — Authentication API

A complete authentication and authorization API built with **Node.js**, **Express**, **Prisma**, **PostgreSQL**, **JWT**, and **bcrypt**.

This project was developed as part of the **Nova Era Tech Backend JavaScript Challenges**.

The goal of this challenge is to implement a secure authentication flow with user registration, login, protected routes, JWT token validation, password hashing, and role-based access control.

---

## 🎯 Challenge Goal

Implement user authentication and access control for protected API routes.

The API allows users to:

- Register a new account
- Login with email and password
- Receive a JWT token
- Access authenticated routes
- Access specific routes based on user role
- Block unauthorized users from protected resources

---

## 🧠 Concepts Practiced

- Authentication with credentials
- Password hashing
- JWT authentication
- Token expiration
- Protected routes
- Role-based authorization
- Secure error messages
- Middleware architecture
- API security fundamentals
- Prisma ORM integration
- PostgreSQL database connection

---

## 🛠️ Technologies Used

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- Neon Database
- JWT
- bcryptjs
- Zod
- Dotenv
- CORS
- Nodemon

---

## 📁 Project Structure

```txt
desafio-12-autenticacao/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── config/
│   │   └── prisma.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── me.controller.js
│   │   └── protected.controller.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   └── role.middleware.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── me.routes.js
│   │   └── protected.routes.js
│   ├── validations/
│   │   └── auth.validation.js
│   ├── app.js
│   └── server.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
🔐 Features
Authentication
User registration
User login
Password encryption using bcrypt
JWT token generation
Token expiration
Authorization
Protected routes
Role-based access control
Admin-only route
Member route
Permission validation
Security
Passwords are never stored as plain text
Invalid credentials return secure messages
Sensitive routes require valid authentication
Users without permission receive 403 Forbidden
Invalid or expired tokens receive 401 Unauthorized
📦 API Endpoints
Health Check
Method	Route	Description
GET	/	Check if the API is running
Auth Routes
Method	Route	Description	Protected
POST	/auth/register	Register a new user	No
POST	/auth/login	Login and receive JWT token	No
User Route
Method	Route	Description	Protected
GET	/me	Get authenticated user data	Yes
Protected Routes
Method	Route	Description	Role
GET	/protected/member	Member protected route	ADMIN or MEMBER
GET	/protected/admin	Admin protected route	ADMIN
🧬 Database Model
enum Role {
  ADMIN
  MEMBER
}

model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  password  String
  role      Role     @default(MEMBER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
⚙️ Environment Variables

Create a .env file in the root of the project:

DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"

PORT=3000

JWT_SECRET="your_secret_key"

JWT_EXPIRES_IN="1h"

Example file:

DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"
PORT=3000
JWT_SECRET="your_secret_key"
JWT_EXPIRES_IN="1h"

Important: never commit your real .env file to GitHub.

🚀 How to Run the Project
1. Clone the repository
git clone https://github.com/your-username/your-repository.git
2. Enter the project folder
cd desafio-12-autenticacao
3. Install dependencies
npm install
4. Configure environment variables

Create a .env file based on .env.example.

5. Generate Prisma Client
npx prisma generate
6. Run database migration
npx prisma migrate dev --name init
7. Start the server
npm run dev

Server will run on:

http://localhost:3000
🧪 How to Test the API

You can test the API using Thunder Client, Insomnia, Postman, or any REST client.

📝 Register User
Request
POST /auth/register
Body
{
  "name": "Vitor Melo",
  "email": "vitor@email.com",
  "password": "123456",
  "role": "MEMBER"
}
Success Response
{
  "message": "User registered successfully",
  "user": {
    "id": "user-id",
    "name": "Vitor Melo",
    "email": "vitor@email.com",
    "role": "MEMBER",
    "createdAt": "2026-01-01T00:00:00.000Z"
  }
}
🔑 Login
Request
POST /auth/login
Body
{
  "email": "vitor@email.com",
  "password": "123456"
}
Success Response
{
  "message": "Login successful",
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "Vitor Melo",
    "email": "vitor@email.com",
    "role": "MEMBER"
  }
}
👤 Get Authenticated User
Request
GET /me
Headers
Authorization: Bearer your-token-here
Success Response
{
  "message": "Authenticated user data",
  "user": {
    "id": "user-id",
    "name": "Vitor Melo",
    "email": "vitor@email.com",
    "role": "MEMBER",
    "createdAt": "2026-01-01T00:00:00.000Z"
  }
}
🛡️ Access Member Route
Request
GET /protected/member
Headers
Authorization: Bearer your-token-here
Success Response
{
  "message": "Welcome member! You have access to this protected member route.",
  "user": {
    "id": "user-id",
    "name": "Vitor Melo",
    "email": "vitor@email.com",
    "role": "MEMBER"
  }
}
👑 Access Admin Route
Request
GET /protected/admin
Headers
Authorization: Bearer admin-token-here
Success Response
{
  "message": "Welcome admin! You have access to this protected admin route.",
  "user": {
    "id": "admin-id",
    "name": "Admin User",
    "email": "admin@email.com",
    "role": "ADMIN"
  }
}
❌ Error Examples
Invalid Credentials
{
  "message": "Invalid email or password"
}
Missing Token
{
  "message": "Authentication token is required"
}
Invalid or Expired Token
{
  "message": "Invalid or expired token"
}
Forbidden Access
{
  "message": "You do not have permission to access this resource"
}
User Already Exists
{
  "message": "User already exists"
}
✅ Acceptance Criteria
User can register successfully
User can login successfully
Password is stored as a hash
JWT token is generated on login
Token has expiration time
Protected routes require a valid token
Routes can be protected by user role
Unauthorized users receive proper errors
Users without permission receive 403 Forbidden
🔒 Security Notes

This project follows basic API security practices:

Passwords are hashed using bcrypt
JWT tokens include expiration
Sensitive routes require authentication
Role authorization is handled by middleware
Login errors do not expose whether email or password is wrong
Environment variables are used for sensitive configuration
📚 What I Learned

In this challenge, I practiced how to build a real authentication system for backend APIs.

Main lessons:

How to register users securely
How to hash passwords before saving them
How to validate login credentials
How to generate JWT tokens
How to protect private routes
How to create authorization middleware
How to block users without permission
How to structure an authentication API
🚀 Future Improvements
Refresh token
Basic 2FA
Forgot password flow
Email verification
Rate limiting
Swagger documentation
Automated tests with Jest
Deploy to Render
👨‍💻 Author

Developed by Vitor Dutra Melo.

Part of the Nova Era Tech Backend JavaScript Challenges.
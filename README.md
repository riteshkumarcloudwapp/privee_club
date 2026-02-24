# Privee Club Backend API

A Node.js + Express.js based backend system with authentication, user management, chat-ready architecture, push notifications (FCM), and Sequelize ORM.

## 🛠 Tech Stack

- Node.js
- Express.js
- MySQL
- Sequelize ORM
- Sequelize CLI
- Firebase Cloud Messaging (FCM)
- JWT Authentication

## ✨ Features

- User Authentication (JWT based)
- Role-based access control
- Sequelize migrations & models
- Push Notifications using FCM
- API error handling & validation
- Secure environment configuration

## 📁 Folder Structure

```bash
project-root/
│── src/
│ │── controllers/ # API logic & request handlers
│ │── models/ # Sequelize models
│ │── routes/ # Express route definitions
│ │── middlewares/ # Auth, validation, error handling
│ │── utils/ # Helper functions
│ │── socket/ # Socket.IO / real-time communication
│ │── db/ # Database connection & initialization
│ │── templates/ # Email / message templates
│
│── index.js # Entry point: Express app + server start
│── migrations/ # Sequelize migration files
│── seeders/ # Sequelize seed files
│── config/ # DB & environment configurations
│── public/
│ │── temp/ # Temporary static files / uploads

```

## 🔐 Environment Variables

Create a `.env` file in root directory:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=******
DB_NAME=privee_club
JWT_SECRET=your_secret_key
FCM_SERVER_KEY=your_fcm_key

```

## 🚀 Installation & Setup

### 1. Clone the repository

git clone https://github.com/ayush1910-maker/PRIVEE_CLUB
cd PRIVEE_CLUB

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a .env file in the root directory (refer to the Environment Variables section above).

### 4. Run the server

```bash
npm run dev
```

## 🗄 Sequelize Migration Commands

### Generate migration

```
npx sequelize-cli migration:generate --name users-table
```

Migrate single migration (eg):-

```
npx sequelize-cli db:migrate --to 20251117121500-create-shout-out.cjs
```

Migrate all migrations :-

```
npx sequelize-cli db:migrate
```

## 📬 API Documentation

Swagger Collection:  
http://localhost:5000/api-docs/

## Figma Link

```
https://www.figma.com/design/HEry3VSh0akGoaCtyVv9v3/Dating-app?node-id=0-1&t=KloeOkrSKtX6QVKf-1

```

## 🧠 Concepts Used

- MVC Architecture
- RESTful APIs
- Sequelize Associations
- Database migrations
- Authentication & Authorization

## 👤 Author

Ayush Porwal
GitHub: https://github.com/ayush1910-maker

# 🔐 Full Authentication System in Node.js

A complete user authentication system built with **Node.js**, **Express**, **PostgreSQL (Neon)**, **EJS**, **JWT**, **Google reCAPTCHA**, **Bootstrap**, and **Animate.css**.

---

## 🚀 Features

- 🔐 **User Registration & Login**
- 🧠 **Google reCAPTCHA v2 (for spam protection)**
- 🛡️ **JWT Authentication & Protected Routes**
- 🔒 **Password Hashing using bcrypt**
- 🎨 **Responsive UI with Bootstrap 5**
- 🎭 **EJS Views with Animate.css animations**
- 🧪 **Server-side Input Validation**
- 📅 **User Profile Dashboard**
- 🌐 **PostgreSQL Database hosted on [Neon](https://neon.tech)**

---

## 📁 Folder Structure

.
├── controllers/
│   ├── authController.js
│   └── userController.js
├── middleware/
│   └── authMiddleware.js
├── routes/
│   └── authRoutes.js
├── views/
│   ├── home.ejs
│   ├── login.ejs
│   ├── register.ejs
│   └── profile.ejs
├── db.js
├── app.js
├── .env
├── .gitignore
└── package.json





Query to add registration

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


login demo email viveksnh933@gmail.com passswork Vivek@1234

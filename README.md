# Portfolio Backend – Assignment 2

This is the backend API for my portfolio application, built for Assignment 2 in Web Application Development.

## 📦 Technologies Used
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication

## 🚀 Features
- CRUD operations for Users, Projects, Qualifications, Contacts
- JWT-based authentication and protected routes
- Error handling and validation
- API tested using Postman

## 🛠️ How to Run
1. Clone the repo
2. Run `npm install`
3. Set up `.env` with your MongoDB URI and JWT secret
4. Run `npm start`

## 📮 API Endpoints
- `POST /api/users` – Create user
- `POST /auth/signin` – Sign in
- `GET /api/projects` – List projects
- `PUT /api/users/:id` – Update user (protected)
- `DELETE /api/users/:id` – Delete user (protected)

## 📸 Postman Testing
All CRUD operations and authentication flows were tested using Postman. Screenshots are included in the assignment submission.


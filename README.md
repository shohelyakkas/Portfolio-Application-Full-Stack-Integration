# Portfolio Application - Full Stack Integration

A modern full-stack portfolio application built with the MERN stack (MongoDB, Express.js, React, Node.js), featuring user authentication, project management, qualifications tracking, and contact form functionality.

## 🌟 Features

### Backend (API)
- **User Management**: Create, read, update, and delete user profiles
- **Project Management**: CRUD operations for portfolio projects
- **Qualifications**: Track and manage educational qualifications and certifications
- **Contact Form**: Handle contact submissions from visitors
- **Authentication**: JWT-based authentication with protected routes
- **Security**: Helmet, CORS, compression, and cookie-parser for enhanced security
- **Error Handling**: Comprehensive error handling and validation

### Frontend (React + Vite)
- **Modern React**: Built with React 19 and React Router DOM
- **Fast Development**: Powered by Vite for lightning-fast development experience
- **Responsive Design**: Mobile-friendly and responsive UI
- **Client-Side Routing**: Seamless navigation with React Router
- **API Integration**: Full integration with backend REST API

## 📦 Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **Helmet** - Security middleware
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Environment variable management

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **ESLint** - Code linting

### Development Tools
- **Nodemon** - Auto-restart server during development
- **Concurrently** - Run multiple commands simultaneously
- **Babel** - JavaScript compiler

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB installation)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shohelyakkas/Portfolio-Application-Full-Stack-Integration.git
   cd Portfolio-Application-Full-Stack-Integration
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Set up environment variables**

   Create a `.env` file in the root directory with the following variables:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=3000
   ```

5. **Create an admin user (optional)**
   ```bash
   npm run create-admin
   ```

### Running the Application

#### Development Mode (Full Stack)
Run both frontend and backend concurrently:
```bash
npm run dev
```

#### Run Backend Only
```bash
npm run server
```

#### Run Frontend Only
```bash
npm run client
```

#### Production Build
```bash
npm run build
```

The application will be available at:
- Frontend: `http://localhost:5173` (Vite dev server)
- Backend API: `http://localhost:3000`

## 📮 API Endpoints

### Authentication
- `POST /auth/signin` - User sign in
- `POST /auth/signout` - User sign out

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user (protected)
- `DELETE /api/users/:id` - Delete user (protected)

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create new project (protected)
- `PUT /api/projects/:id` - Update project (protected)
- `DELETE /api/projects/:id` - Delete project (protected)

### Qualifications
- `GET /api/qualifications` - Get all qualifications
- `GET /api/qualifications/:id` - Get qualification by ID
- `POST /api/qualifications` - Create qualification (protected)
- `PUT /api/qualifications/:id` - Update qualification (protected)
- `DELETE /api/qualifications/:id` - Delete qualification (protected)

### Contacts
- `GET /api/contacts` - Get all contacts (protected)
- `POST /api/contacts` - Submit contact form
- `DELETE /api/contacts/:id` - Delete contact (protected)

## 🔒 Authentication

The application uses JWT (JSON Web Tokens) for authentication. Protected routes require a valid JWT token in the request headers or cookies.

### Example Authentication Flow
1. User signs in via `POST /auth/signin`
2. Server validates credentials and returns JWT token
3. Client includes token in subsequent requests
4. Server validates token for protected routes

## 📁 Project Structure

```
MyPortfolio/
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
├── server/                  # Backend code
│   ├── controllers/        # Route controllers
│   ├── models/             # Mongoose models
│   ├── routes/             # Express routes
│   └── helpers/            # Helper functions
├── config/                  # Configuration files
├── scripts/                # Utility scripts
├── docs/                   # Documentation
├── .babelrc               # Babel configuration
├── package.json           # Backend dependencies
├── server.js              # Server entry point
└── README.md              # This file
```

## 🧪 Testing

The API has been thoroughly tested using Postman. All CRUD operations, authentication flows, and edge cases have been verified.

## 📝 Scripts

- `npm run dev` - Run full stack in development mode
- `npm run client` - Run frontend only
- `npm run server` - Run backend only
- `npm run create-admin` - Create admin user
- `npm run build` - Build frontend for production
- `npm run lint` - Lint frontend code
- `npm run preview` - Preview production build

## 🛡️ Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Helmet.js for securing HTTP headers
- CORS configuration
- Protected routes middleware
- Input validation and sanitization

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Shohely Akkas**
- GitHub: [@shohelyakkas](https://github.com/shohelyakkas)

## 🎓 Academic Project

This portfolio application was developed as part of the Web Application Development course (Assignment 3) at Centennial College.

## 📸 Documentation

For detailed API integration documentation, please refer to the `/docs` folder:
- Part II-C: API Integration Documentation

## 🤝 Contributing

This is an academic project, but feedback and suggestions are welcome!

## 📞 Support

For any questions or issues, please open an issue on the GitHub repository.

---

**Note**: Remember to keep your `.env` file secure and never commit it to version control. The `.env` file should contain sensitive information like database credentials and JWT secrets.

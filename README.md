# 💰 FinTracker — Personal Finance Tracker

A full stack web application to manage your personal finances — track income and expenses, visualize spending patterns through interactive charts, and import bank statements automatically.

🔗 **[Live Demo](https://fintracker-nova.vercel.app/)**  &nbsp;&nbsp;|&nbsp;&nbsp; 🔗 **[Backend Repository](https://github.com/jayjosh-glitch/FinTracker-Backend)**

---

## ✨ Features

- 🔐 **Authentication** — Secure JWT based login and registration
- 💸 **Expense Management** — Add, edit and delete expense records with categories
- 💰 **Income Management** — Track multiple income sources
- 📅 **Smart Filtering** — Filter by month and financial year
- 📊 **Interactive Dashboard** — Visual charts showing spending patterns and financial summary

---

## 🖥️ Tech Stack

### Frontend
| Technology | Usage |
|-----------|-------|
| React | UI Framework |
| JavaScript (ES6+) | Core language |
| Context API | Global auth state management |
| Custom Hooks | Reusable data fetching logic |
| Axios | HTTP client with interceptors |
| React Router | Client side routing |
| HTML5 / CSS3 | Structure and styling |

### Backend
> Built with ASP.NET Core Web API — see [Backend Repository](https://github.com/jayjosh-glitch/FinTracker-Backend)

| Technology | Usage |
|-----------|-------|
| ASP.NET Core | Web API framework |
| Entity Framework Core | ORM and database management |
| SQL Server | Database |
| JWT | Authentication tokens |
| Microsoft Azure | Cloud hosting |

---

## 🏗️ Architecture

```
Frontend (React)
      ↓
Custom Hooks → Service Layer → Axios Interceptors
      ↓
REST API (ASP.NET Core — Azure)
      ↓
Entity Framework Core → SQL Server
```

**Key design decisions:**
- Custom hooks (`useFetchExpenses`, `useFetchIncomes`) abstract all data fetching — keeping components clean and logic reusable
- Context API manages global authentication state — eliminating prop drilling
- Axios interceptors automatically attach JWT Bearer tokens to every request
- Server side filtering keeps API responses lean and performant

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Backend API running — see [Backend Setup](https://github.com/jayjosh-glitch/FinTracker-Backend)

### Installation

```bash
# Clone the repository
git clone https://github.com/jayjosh-glitch/Project-FinTracker-Frontend.git

# Navigate to project folder
cd Project-FinTracker-Frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://your-backend-url.azurewebsites.net
```

For local development with backend running locally:

```env
VITE_API_BASE_URL=https://localhost:7001
```

---

## 📁 Project Structure

```
src/
├── features/            ← All features like auth, expense, income, history, dashboard and register
├── pages/               ← Page level components
├── shared/              ← Custom hooks (useFetchExpenses etc) and Reusable components 
├── services/            ← Different API services
├── app/                 ← apiClient
├── domain/              ← dashboard related data
└── App.jsx              ← Root component and routing

```

---

## 🔐 Authentication Flow

```
User logs in
      ↓
Backend validates credentials
      ↓
JWT token returned and stored in localStorage
      ↓
Auth Context updates — user state set globally
      ↓
Axios interceptor attaches token to every request
      ↓
Protected routes accessible
```

---


## 🌐 Deployment

| Service | Platform |
|---------|---------|
| Frontend | Vercel |
| Backend API | Microsoft Azure App Service |
| Database | Azure SQL |

---

## 👤 Author

**Jayant Joshi**
- GitHub: [@jayjosh-glitch](https://github.com/jayjosh-glitch)
- LinkedIn: [Add your LinkedIn URL here]
- Live Project: [project-fintracker.vercel.app](https://project-fintracker.vercel.app)

---

## 📝 License

This project is personal and proprietary. All rights reserved.

---



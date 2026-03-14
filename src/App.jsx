import Login from "../src/features/auth/Login"
import Logout from "../src/features/auth/Logout"
import Register from "/src/features/auth/Register"
import Expense from "../src/features/expense/Expense"
import History from "./features/history/Hisotry"
import Income from "../src/features/income/Income"
import { Routes, Route } from "react-router-dom"
import Home from "../src/pages/Home"
import Contact from "../src/pages/Contact"
import About from "../src/pages/About"
import Dashboard from "./features/dashboard/Dashboard"

function App() {
  
  return (
    <>
      <Routes>
        <Route path='/pages/home' element={<Home />} />
        <Route path='/' element={<Home />} />
        <Route path='/pages/contact' element={<Contact />} />
        <Route path='/pages/about' element={<About />} />
        <Route path='/auth/login' element={<Login />} />
        <Route path='/auth/logout' element={<Logout />} />
        <Route path='/auth/register' element={<Register />} />
        <Route path='/expense/expense' element={<Expense />} />
        <Route path='/income/income' element={<Income />} />
        <Route path='/history/history' element={<History />} />
        <Route path='/dashboard/dashboard' element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App

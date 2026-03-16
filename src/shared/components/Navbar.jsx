import React from 'react'
import { Link } from 'react-router-dom'
import '../components/navbar1.css';

const Navbar = () => {

  return (
    <nav className='nav-bar'>
        <div className='title-logo'>
            <h1>FinTracker</h1>
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="app-logo" className='logo' />
        </div>
        <div className='nav-links'>
          {/* <Link to='/dashboard/dashboard'>Dashboard</Link>
            <Link to='/expense/expense'>Expense</Link>
            <Link to='/income/income'>Income</Link>
            <Link to='/history/history'>History</Link> */}
            <Link to='/profile/profile'>Profile</Link>
            <Link to='/auth/logout'>Logout</Link>
        </div>
    </nav>
    
  )
}

export default Navbar
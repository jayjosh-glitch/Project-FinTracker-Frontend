import React from 'react';
import { Link } from 'react-router-dom';
import '../components/navbar1.css';

const Navbar1 = () => {
	return (
		<nav className='nav-bar'>
        <div className='title-logo'>
            <h1>FinTracker</h1>
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="app-logo" className='logo' />
        </div>
        <div className='nav-links'>
            <Link to='/auth/login'>Login</Link>
            <Link to='/pages/home'>Home</Link>
            <Link to='/pages/contact'>Contact</Link>
            <Link to='/pages/about'>About</Link>
            <Link to='/auth/register'>Register</Link>
        </div>
    </nav>
	);
};

export default Navbar1;

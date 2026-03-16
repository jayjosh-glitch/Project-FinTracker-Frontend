import React from 'react';
import { Link } from 'react-router-dom';
import '../components/navbar1.css';
import logo from '../../images/logo1.png'
const Navbar1 = () => {
	return (
		<nav className='nav-bar'>
        <div className='title-logo'>
            <h1>FinTracker</h1>
            <img src={logo} alt="app-logo" className='logo' />
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

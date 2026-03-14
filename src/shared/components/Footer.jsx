import React from 'react';
import '../components/footer.css'
const Footer = () => {
	return (
		<footer className="footer">

			<div className="footer-container">

				<div className="footer-section brand">
					<h2>FinTracker</h2>
					<p>
						Track your income, monitor expenses, and gain insights into your
						financial habits with a simple dashboard.
					</p>
				</div>

				<div className="footer-section">
					<h3>Product</h3>
					<ul>
						<li>Dashboard</li>
						<li>Expense Tracking</li>
						<li>Income Tracking</li>
						<li>Analytics</li>
					</ul>
				</div>

				<div className="footer-section">
					<h3>Resources</h3>
					<ul>
						<li>Help Center</li>
						<li>Privacy Policy</li>
						<li>Terms of Service</li>
						<li>Documentation</li>
					</ul>
				</div>

				<div className="footer-section">
					<h3>Contact</h3>
					<ul>
						<li>Email: support@fintracker.com</li>
						<li>Location: India</li>
					</ul>
				</div>

			</div>

			<div className="footer-bottom">
				<p>© {new Date().getFullYear()} FinTracker. All rights reserved.</p>
			</div>

		</footer>
	);
};

export default Footer;

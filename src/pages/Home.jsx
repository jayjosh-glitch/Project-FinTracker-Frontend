import React from 'react';
import Navbar from '../shared/components/Navbar';
import Navbar1 from "../shared/components/Navbar1";
import '../pages/home.css'
import Footer from '../shared/components/Footer'
import hero1 from '../images/hero1.webp'
import hero2 from '../images/subhero1.webp'
import feature1 from '../images/Expe1.png'
import feature2 from '../images/analytics1.webp'
import feature3 from '../images/insight2.jpg'
import { useNavigate } from 'react-router-dom';


const Home = () => {

	const navigate = useNavigate()
	const handleclick = () => {
		navigate('/auth/register')
	}

	return (
		<>
			<header className='app-header'>
				<Navbar1 />
			</header>
			<div className="page-wrapper">
				<main className="home-container">
					<section className="hero-section">
						<div className="hero-text">
							<h1>Take Control of Your Finances</h1>
							<p>
								Track your income and expenses, visualize spending patterns, and
								manage your financial life with clarity.
							</p>
							<div className="hero-buttons">
								<button className="btn-primary" onClick={handleclick}>Get Started</button>
								<button className="btn-secondary" onClick={handleclick}>View Dashboard</button>
							</div>
						</div>
						<div className="hero-image">
							<img src={hero1} alt="finance dashboard preview" />
						</div>
					</section>

					<section className="features-section">
						<h2>Powerful Features</h2>
						<div className="features-grid">
							<div className="feature-card">
								<img src={feature1} alt="track expenses" />
								<h3>Track Expenses</h3>
								<p>
									Easily add and manage daily expenses and income with category
									tracking.
								</p>
							</div>
							<div className="feature-card">
								<img src={feature2} alt="analytics charts" />
								<h3>Smart Analytics</h3>
								<p>
									Visualize financial trends with charts and category breakdowns.
								</p>
							</div>
							<div className="feature-card">
								<img src={feature3} alt="financial insights" />
								<h3>Financial Insights</h3>
								<p>
									Get a clear overview of your income, expenses, and savings.
								</p>
							</div>
						</div>
					</section>

					<section className="dashboard-preview">
						<div className="preview-text">
							<h2>Visualize Your Financial Journey</h2>
							<p>
								Monitor income, expenses, and spending habits through a clean and
								intuitive dashboard.
							</p>
						</div>
						<div className="preview-image">
							<img src={hero2} alt="dashboard preview" />
						</div>
					</section>

					<section className="cta-section">
						<h2>Start Managing Your Money Today</h2>
						<p>
							Build better financial habits and make smarter spending decisions.
						</p>
						<button className="btn-primary large" onClick={handleclick}>Create Free Account</button>
					</section>
				</main>
			</div>
			<Footer />
		</>

	);
};

export default Home;

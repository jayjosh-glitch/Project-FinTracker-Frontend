import hero1 from '../images/hero1.webp'
import hero2 from '../images/subhero1.webp'
import '../pages/about.css'
import Footer from '../shared/components/Footer';
import Navbar1 from "../shared/components/Navbar1";

const About = () => {
	return (
		<>
			<Navbar1 />
			<div className="about-container">

				{/* HERO SECTION */}

				<section className="about-hero">
					<div className="about-text">
						<h1>About FinTracker</h1>
						<p>
							FinTracker is a personal finance management tool designed to help
							individuals track income, monitor expenses, and gain meaningful
							insights into their financial habits.
						</p>
					</div>

					<div className="about-image">
						<img src={hero1} alt="finance management illustration" />
					</div>
				</section>


				{/* MISSION SECTION */}

				<section className="mission-section">

					<div className="mission-image">
						<img src={hero2} alt="financial planning illustration" />
					</div>

					<div className="mission-text">
						<h2>Our Mission</h2>
						<p>
							Our mission is to simplify personal finance management by providing
							an intuitive platform that helps users visualize spending patterns
							and make smarter financial decisions.
						</p>

						<p>
							By combining clear analytics, easy tracking, and a user-friendly
							interface, FinTracker empowers people to take control of their
							financial future.
						</p>
					</div>

				</section>


				{/* FEATURES SECTION */}

				<section className="about-features">

					<h2>What FinTracker Helps You Do</h2>

					<div className="about-features-grid">

						<div className="about-feature-card">
							<h3>Track Daily Expenses</h3>
							<p>
								Log your daily spending and income with simple and fast entries.
							</p>
						</div>

						<div className="about-feature-card">
							<h3>Analyze Spending</h3>
							<p>
								Visualize your financial activity using charts and reports.
							</p>
						</div>

						<div className="about-feature-card">
							<h3>Plan Better</h3>
							<p>
								Identify spending patterns and make smarter financial choices.
							</p>
						</div>

					</div>

				</section>


				{/* CTA SECTION */}

				<section className="about-cta">

					<h2>Start Managing Your Finances Today</h2>

					<p>
						Take the first step toward financial clarity and better money habits.
					</p>

					<button className="btn-primary large">
						Go to Dashboard
					</button>

				</section>

			</div>
			<Footer />
		</>

	);
};

export default About;
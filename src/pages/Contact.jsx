import React from "react";
import "../pages/contact.css";
import feature3 from '../images/insight2.jpg'
import Navbar from "../shared/components/Navbar";
import Footer from "../shared/components/Footer";
import Navbar1 from "../shared/components/Navbar1";

const Contact = () => {
	return (
		<>
			<Navbar1 />
			<div className="contact-container">

				{/* HERO SECTION */}

				<section className="contact-hero">

					<div className="contact-text">
						<h1>Contact Us</h1>
						<p>
							Have questions, suggestions, or feedback? We'd love to hear from you.
							Reach out using the form below.
						</p>
					</div>

					<div className="contact-image">
						<img src={feature3} alt="contact illustration" />
					</div>

				</section>


				{/* CONTACT CONTENT */}

				<section className="contact-content">

					{/* CONTACT FORM */}

					<div className="contact-form">

						<h2>Send a Message</h2>

						<form>

							<div className="form-group">
								<label>Name</label>
								<input type="text" placeholder="Enter your name" />
							</div>

							<div className="form-group">
								<label>Email</label>
								<input type="email" placeholder="Enter your email" />
							</div>

							<div className="form-group">
								<label>Message</label>
								<textarea rows="5" placeholder="Write your message"></textarea>
							</div>

							<button className="btn-primary">Send Message</button>

						</form>

					</div>


					{/* CONTACT INFO */}

					<div className="contact-info">

						<h2>Get in Touch</h2>

						<p>
							Feel free to reach out for support, feedback, or collaboration.
						</p>

						<div className="info-item">
							<h4>Email</h4>
							<p>support@fintracker.com</p>
						</div>

						<div className="info-item">
							<h4>Location</h4>
							<p>India</p>
						</div>

						<div className="info-item">
							<h4>Response Time</h4>
							<p>Within 24 hours</p>
						</div>

					</div>

				</section>

			</div>
			<Footer/>
		</>

	);
};

export default Contact;
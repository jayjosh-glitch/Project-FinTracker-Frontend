import React, { useState } from "react";
import "../pages/contact.css";
import feature3 from '../images/insight2.jpg'
import Navbar from "../shared/components/Navbar";
import Footer from "../shared/components/Footer";
import Navbar1 from "../shared/components/Navbar1";

const Contact = () => {
    
	const [formdata, setformdata] = useState({
		cname : "",
		email : "",
		message : ""
	})

	const handlechange = (e) => {
		const { name, value } = e.target
		setformdata((prev) => ({
            ...prev,
            [name]: value
        }))
	}

	const handlesubmit = () => {
		if(formdata.name === "" || formdata.email === "" || formdata.message === ""){
			alert("Please fill all the details")
		}else {
			alert("Message has been sent. Support team will reach out to you")
		}
	}
	return (
		<>
			<Navbar1 />
			<div className="contact-container">

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

				<section className="contact-content">


					<div className="contact-form">

						<h2>Send a Message</h2>

						<form>

							<div className="form-group">
								<label htmlFor="name">Name</label>
								<input type="text" name="name" placeholder="Enter your name" onChange={(e) => handlechange(e)} value={formdata.name} />
							</div>

							<div className="form-group">
								<label htmlFor="email">Email</label>
								<input type="email" name="email" placeholder="Enter your email" onChange={(e) => handlechange(e)} value={formdata.email} />
							</div>

							<div className="form-group">
								<label htmlFor="message">Message</label>
								<textarea rows="5" name="message" placeholder="Write your message" onChange={(e) => handlechange(e)} value={formdata.message}></textarea>
							</div>

							<button className="btn-primary" onClick={handlesubmit}>Send Message</button>

						</form>

					</div>

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
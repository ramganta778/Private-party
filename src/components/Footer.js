// src/components/Footer.jsx

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faFacebookF,
	faInstagram,
	faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-blue-950 text-white pt-8 pb-4">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
					{/* Social Media */}
					<div className="text-center md:text-left">
						<h4 className="text-lg font-semibold mb-3">
							Follow Us
						</h4>
						<div className="flex justify-center md:justify-start gap-3">
							<a
								href="#"
								className="bg-blue-800 p-2.5 rounded-full hover:bg-blue-700 transition-colors"
							>
								<FontAwesomeIcon icon={faFacebookF} />
							</a>
							<a
								href="#"
								className="bg-pink-600 p-2.5 rounded-full hover:bg-pink-500 transition-colors"
							>
								<FontAwesomeIcon icon={faInstagram} />
							</a>
							<a
								href="#"
								className="bg-red-600 p-2.5 rounded-full hover:bg-red-500 transition-colors"
							>
								<FontAwesomeIcon icon={faYoutube} />
							</a>
						</div>
					</div>

					{/* Quick Links */}
					<div className="text-center">
						<h4 className="text-lg font-semibold mb-3">
							Quick Links
						</h4>
						<nav className="flex flex-col gap-1 text-sm">
							<Link
								to="/"
								className="hover:text-orange-300 transition-colors"
							>
								Home
							</Link>
							<Link
								to="/gallery"
								className="hover:text-orange-300 transition-colors"
							>
								Gallery
							</Link>
							<Link
								to="/refund-policy"
								className="hover:text-orange-300 transition-colors"
							>
								Refund Policy
							</Link>
							<Link
								to="/privacy-policy"
								className="hover:text-orange-300 transition-colors"
							>
								Privacy Policy
							</Link>
							<Link
								to="/terms"
								className="hover:text-orange-300 transition-colors"
							>
								Terms and Conditions
							</Link>
						</nav>
					</div>

					{/* Contact */}
					<div className="text-center md:text-right">
						<h4 className="text-lg font-semibold mb-3">
							Call Now!
						</h4>
						<p className="text-orange-400 font-bold text-sm mb-1">
							<a
								href="tel:+917075456456"
								className="hover:text-orange-300"
							>
								+91 70 75 456 456
							</a>
						</p>
						<p className="text-orange-400 font-bold text-sm mb-1">
							<a
								href="tel:+917103456456"
								className="hover:text-orange-300"
							>
								+91 71 03 456 456
							</a>
						</p>
						<p className="text-gray-400 text-xs">Email:</p>
						<a
							href="mailto:info@party-bash.com"
							className="text-orange-400 text-sm hover:text-orange-300"
						>
							info@party-bash.com
						</a>
					</div>
				</div>

				{/* Copyright */}
				<div className="border-t border-blue-900 pt-4 text-center text-gray-400 text-xs">
					<p>
						© {currentYear} Party-Bash. All Rights Reserved.
						Developed by{" "}
						<span className="text-orange-300 font-semibold">
							BVS Software Solution
						</span>
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;

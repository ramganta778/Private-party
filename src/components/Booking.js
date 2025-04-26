import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Booking() {
	const navigate = useNavigate();
	const [showPopup, setShowPopup] = useState(false);

	const openPopup = () => setShowPopup(true);
	const closePopup = () => setShowPopup(false);

	const nelloreLocation =
		"https://www.google.com/maps?q=Nellore,Andhra+Pradesh";

	const [formData, setFormData] = useState({
		name: "",
		date: "",
		numberOfPersons: "",
		location: "",
		timePreference: "",
		whatsappNumber: "",
		status: "Not Confirmed",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await axios.post(
				"https://partyform-e8f95-default-rtdb.firebaseio.com/booked-via-call.json",
				formData
			);
			toast.success("Your booking request has been submitted!");
			setFormData({
				name: "",
				date: "",
				numberOfPersons: "",
				location: "",
				timePreference: "",
				whatsappNumber: "",
				status: "Not Confirmed",
			});
			closePopup();
		} catch (error) {
			console.error("Error submitting form:", error);
			toast.error("Something went wrong. Please try again.");
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-300 text-white flex flex-col items-center p-8">
			<h2 className="text-2xl font-bold mb-8">Location: Nellore</h2>

			<div className="flex justify-center">
				{/* Card - Nellore */}
				<div className="bg-white rounded-2xl p-4 text-black shadow-lg max-w-xs">
					<div className="relative">
						<img
							src="https://bnbtplstorageaccount.blob.core.windows.net/theaterpics/v3carnival3.jpg"
							className="rounded-xl"
							alt="Nellore"
						/>
						<a
							href={nelloreLocation}
							target="_blank"
							rel="noopener noreferrer"
							className="absolute top-2 right-2"
						>
							<img
								src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC10aIGcrdtvbwpYkeboJsf9YXZ0K6cwbOMw&s"
								alt="Google Maps Icon"
								className="w-10 h-10 bg-500 p-2 rounded-full"
							/>
						</a>
					</div>
					<div className="flex items-center justify-between mt-2">
						<h3 className="text-lg font-semibold">Nellore</h3>
						<span className="flex items-center text-sm">
							<i className="fas fa-star text-yellow-400 mr-1"></i>
							4.9 (5000+ reviews)
						</span>
					</div>
					<div className="flex justify-between mt-2">
						<button
							onClick={() => navigate("/book-online")}
							className="bg-purple-700 text-white px-4 py-2 rounded mt-3"
						>
							Book Online
						</button>
					</div>
				</div>
			</div>

			{/* Book via Call Button */}
			<button
				onClick={openPopup}
				className="bg-purple-800 text-white px-6 py-3 rounded-full mt-10 shadow-lg"
			>
				📞 Book Via Call
			</button>

			{/* Popup Form */}
			{showPopup && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
					<div className="bg-white p-6 rounded-lg shadow-lg w-80 text-black relative">
						<button
							onClick={closePopup}
							className="absolute top-2 right-3 text-xl"
						>
							×
						</button>
						<h3 className="text-lg font-bold mb-3 text-purple-500">
							Request Callback
						</h3>
						<form className="space-y-3" onSubmit={handleSubmit}>
							<input
								type="text"
								placeholder="Your Name"
								name="name"
								value={formData.name}
								onChange={handleChange}
								className="w-full border rounded px-3 py-2"
								required
							/>
							<input
								type="date"
								name="date"
								value={formData.date}
								onChange={handleChange}
								className="w-full border rounded px-3 py-2"
								required
							/>
							<select
								name="numberOfPersons"
								value={formData.numberOfPersons}
								onChange={handleChange}
								className="w-full border rounded px-3 py-2"
								required
							>
								<option value="">Number of Persons</option>
								{[...Array(12).keys()].map((i) => (
									<option key={i} value={i + 1}>
										{i + 1}
									</option>
								))}
							</select>
							<select
								name="location"
								value={formData.location}
								onChange={handleChange}
								className="w-full border rounded px-3 py-2"
								required
							>
								<option value="">Select Location</option>
								<option value="Nellore">Nellore</option>
							</select>
							<select
								name="timePreference"
								value={formData.timePreference}
								onChange={handleChange}
								className="w-full border rounded px-3 py-2"
								required
							>
								<option value="">Select Time Preference</option>
								<option value="Morning (9:00 AM to 12:00 PM)">
									Morning (9:00 AM to 12:00 PM)
								</option>
								<option value="Afternoon (12:00 PM to 5:00 PM)">
									Afternoon (12:00 PM to 5:00 PM)
								</option>
								<option value="Evening (5:00 PM to 9:00 PM)">
									Evening (5:00 PM to 9:00 PM)
								</option>
								<option value="Night (9:00 PM to 1:00 AM)">
									Night (9:00 PM to 1:00 AM)
								</option>
							</select>
							<input
								type="tel"
								placeholder="WhatsApp Number (10 digit)"
								name="whatsappNumber"
								value={formData.whatsappNumber}
								onChange={handleChange}
								className="w-full border rounded px-3 py-2"
								pattern="[0-9]{10}"
								required
							/>
							<button
								type="submit"
								className="bg-purple-700 text-white px-4 py-2 rounded w-full"
							>
								Submit
							</button>
						</form>
					</div>
				</div>
			)}

			{/* Toast Container */}
			<ToastContainer position="top-center" autoClose={3000} />
		</div>
	);
}

export default Booking;

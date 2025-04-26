import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminWaitlist = () => {
	const [bookings, setBookings] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchBookings = async () => {
			try {
				const res = await axios.get(
					"https://partyform-e8f95-default-rtdb.firebaseio.com/waitlist.json"
				);
				setBookings(res.data || {});
				setLoading(false);
			} catch (error) {
				console.error("Error fetching waitlist bookings:", error);
				toast.error("Failed to fetch waitlist bookings.");
			}
		};
		fetchBookings();
	}, []);

	const handleStatusChange = async (bookingId, newStatus) => {
		try {
			await axios.patch(
				`https://partyform-e8f95-default-rtdb.firebaseio.com/waitlist/${bookingId}.json`,
				{ status: newStatus }
			);
			setBookings((prev) => ({
				...prev,
				[bookingId]: { ...prev[bookingId], status: newStatus },
			}));
			toast.success("Status updated successfully");
		} catch (error) {
			console.error("Error updating status:", error);
			toast.error("Failed to update status.");
		}
	};

	const handleDelete = async (bookingId) => {
		const confirm = window.confirm("Are you sure you want to delete this waitlist entry?");
		if (!confirm) return;

		try {
			await axios.delete(
				`https://partyform-e8f95-default-rtdb.firebaseio.com/waitlist/${bookingId}.json`
			);
			const updatedBookings = { ...bookings };
			delete updatedBookings[bookingId];
			setBookings(updatedBookings);
			toast.success("Booking deleted successfully");
		} catch (error) {
			console.error("Error deleting booking:", error);
			toast.error("Failed to delete booking.");
		}
	};

	if (loading) return <div className="text-center mt-10 text-xl">Loading...</div>;

	return (
		<div className="p-4 md:p-8">
			<ToastContainer />
			<h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Join Waitlist Bookings</h2>
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{Object.entries(bookings).map(([id, booking]) => (
					<div
						key={id}
						className="bg-white shadow-md rounded-xl p-5 border border-gray-200 flex flex-col justify-between"
					>
						<div className="space-y-2 text-gray-700">
							<h3 className="text-xl font-semibold">{booking.name}</h3>
							<p><strong>Date:</strong> {booking.date}</p>
							<p><strong>Location:</strong> {booking.location}</p>
							<p><strong>Persons:</strong> {booking.persons}</p>
							<p><strong>WhatsApp:</strong> {booking.whatsapp}</p>
							<p><strong>Status:</strong> {booking.status || "notconfirm"}</p>
						</div>

						<div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
							<select
								value={booking.status || "notconfirm"}
								onChange={(e) => handleStatusChange(id, e.target.value)}
								className="border px-3 py-2 rounded text-sm"
							>
								<option value="notconfirm">Not Confirmed</option>
								<option value="confirmed">Confirmed</option>
							</select>

							<button
								onClick={() => handleDelete(id)}
								className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm"
							>
								Delete
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default AdminWaitlist;

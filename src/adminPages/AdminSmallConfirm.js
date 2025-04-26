
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const AdminSmallConfirm = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(
          "https://partyform-e8f95-default-rtdb.firebaseio.com/bookings.json"
        );
        if (res.data) {
          const bookingsArray = Object.entries(res.data).map(([id, booking]) => ({
            id,
            ...booking,
          }));
          setBookings(bookingsArray);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        toast.error("Failed to fetch bookings.");
      }
    };
    fetchBookings();
  }, []);

  const handleDelete = async (bookingId) => {
    const confirm = window.confirm("Are you sure you want to delete this booking?");
    if (!confirm) return;

    try {
      await axios.delete(
        `https://partyform-e8f95-default-rtdb.firebaseio.com/bookings/${bookingId}.json`
      );
      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
      toast.success("Booking deleted successfully");
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast.error("Failed to delete booking.");
    }
  };

  const generatePDF = (booking) => {
    const input = document.getElementById(`small-booking-${booking.id}`);
    html2canvas(input, {
      scale: 2,
      logging: false,
      useCORS: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`booking-summary-${booking.id}.pdf`);
    });
  };

  if (loading) return <div className="text-center mt-10 text-xl">Loading...</div>;

  return (
    <div className="p-4 md:p-8">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Booking Summary</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white shadow-md rounded-xl p-5 border border-gray-200 flex flex-col justify-between"
          >
            {/* Hidden div for PDF */}
            <div
              id={`small-booking-${booking.id}`}
              style={{ position: "absolute", left: "-9999px", width: "210mm" }}
              className="p-5 bg-white"
            >
              <h3 className="text-2xl font-bold mb-4 text-center">Booking Summary</h3>
              <div className="border-b-2 border-gray-300 mb-4" />
              <p><strong>Booking ID:</strong> {booking.id}</p>
              <p><strong>Name:</strong> {booking.bookingName}</p>
              <p><strong>Date:</strong> {booking.date}</p>
              <p><strong>Time:</strong> {booking.time}</p>
              <p><strong>Location:</strong> {booking.location}</p>
              <p><strong>Persons:</strong> {booking.persons}</p>
              <p><strong>Contact:</strong> {booking.whatsapp}</p>
              <p><strong>Email:</strong> {booking.email}</p>
              <div className="border-b-2 border-gray-300 my-4" />
              <p><strong>Total Amount:</strong> ₹{booking.total}</p>
              <p><strong>Advance Paid:</strong> ₹{booking.advance}</p>
              <p><strong>Balance:</strong> ₹{booking.balance}</p>
              <p className="mt-4 text-sm text-gray-600">
                Thank you for your booking. Please present this summary on the day of your event.
              </p>
            </div>

            {/* Card Display */}
            <div className="space-y-2 text-gray-700 text-sm">
              <h3 className="text-xl font-semibold text-black">{booking.bookingName}</h3>
              <p><strong>Date:</strong> {booking.date}</p>
              <p><strong>Time:</strong> {booking.time}</p>
              <p><strong>Location:</strong> {booking.location}</p>
              <p><strong>Persons:</strong> {booking.persons}</p>
              <p><strong>WhatsApp:</strong> {booking.whatsapp}</p>
              <p><strong>Email:</strong> {booking.email}</p>
              <hr />
              <p><strong>Total:</strong> ₹{booking.total}</p>
              <p><strong>Advance:</strong> ₹{booking.advance}</p>
              <p><strong>Balance:</strong> ₹{booking.balance}</p>
            </div>

            <div className="mt-4 flex justify-between gap-2">
              <button
                onClick={() => generatePDF(booking)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm"
              >
                Download PDF
              </button>
              <button
                onClick={() => handleDelete(booking.id)}
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

export default AdminSmallConfirm;

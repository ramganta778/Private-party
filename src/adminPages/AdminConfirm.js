import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const AdminConfirm = () => {
  const [confirmData, setConfirmData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfirmData = async () => {
      try {
        const res = await axios.get(
          "https://partyform-e8f95-default-rtdb.firebaseio.com/confirm.json"
        );
        setConfirmData(res.data || {});
        setLoading(false);
      } catch (error) {
        console.error("Error fetching confirm data:", error);
        toast.error("Failed to fetch confirm data.");
      }
    };
    fetchConfirmData();
  }, []);

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await axios.patch(
        `https://partyform-e8f95-default-rtdb.firebaseio.com/confirm/${bookingId}.json`,
        { status: newStatus }
      );
      setConfirmData((prev) => ({
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
    const confirm = window.confirm("Are you sure you want to delete this booking?");
    if (!confirm) return;

    try {
      await axios.delete(
        `https://partyform-e8f95-default-rtdb.firebaseio.com/confirm/${bookingId}.json`
      );
      const updatedData = { ...confirmData };
      delete updatedData[bookingId];
      setConfirmData(updatedData);
      toast.success("Booking deleted successfully");
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast.error("Failed to delete booking.");
    }
  };

  const generatePDF = (bookingId, booking) => {
    const input = document.getElementById(`booking-${bookingId}`);
    
    html2canvas(input, {
      scale: 2, // Higher scale for better quality
      logging: false,
      useCORS: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`booking-confirmation-${bookingId}.pdf`);
    });
  };

  if (loading) return <div className="text-center mt-10 text-xl">Loading...</div>;

  return (
    <div className="p-4 md:p-8">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Confirmed Bookings</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(confirmData).map(([id, booking]) => (
          <div
            key={id}
            className="bg-white shadow-md rounded-xl p-5 border border-gray-200 flex flex-col justify-between"
          >
            {/* Hidden div for PDF generation */}
            <div 
              id={`booking-${id}`} 
              style={{ position: 'absolute', left: '-9999px', width: '210mm' }}
              className="p-5 bg-white"
            >
              <h3 className="text-2xl font-bold mb-4 text-center">Booking Confirmation</h3>
              <div className="border-b-2 border-gray-300 mb-4"></div>
              
              <div className="mb-4">
                <h4 className="text-xl font-semibold mb-2">Customer Details</h4>
                <p><strong>Name:</strong> {booking.bookingInfo?.bookingName}</p>
                <p><strong>Occasion:</strong> {booking.occasion?.type} {booking.occasion?.icon}</p>
                <p><strong>Date:</strong> {booking.bookingInfo?.date}</p>
                <p><strong>Time:</strong> {booking.bookingInfo?.time}</p>
                <p><strong>Location:</strong> {booking.bookingInfo?.location}</p>
                <p><strong>Persons:</strong> {booking.bookingInfo?.persons}</p>
                <p><strong>Contact:</strong> {booking.bookingInfo?.whatsapp}</p>
                <p><strong>Email:</strong> {booking.bookingInfo?.email}</p>
              </div>
              
              <div className="border-b-2 border-gray-300 mb-4"></div>
              
              <div className="mb-4">
                <h4 className="text-xl font-semibold mb-2">Pricing Details</h4>
                <p><strong>Base Price:</strong> ₹{booking.pricing?.basePrice}</p>
                <p><strong>Decoration Cost:</strong> ₹{booking.pricing?.decorationCost}</p>
                <p><strong>Cake Price:</strong> ₹{booking.pricing?.cakePrice}</p>
                <p><strong>AddOns Price:</strong> ₹{booking.pricing?.addOnsPrice}</p>
                <p><strong>Total Amount:</strong> ₹{booking.pricing?.total}</p>
                <p><strong>Advance Paid:</strong> ₹{booking.pricing?.advance}</p>
                <p><strong>Balance Amount:</strong> ₹{booking.pricing?.balance}</p>
              </div>
              
              {booking.addOns?.cakeAddons && (
                <>
                  <div className="border-b-2 border-gray-300 mb-4"></div>
                  <div className="mb-4">
                    <h4 className="text-xl font-semibold mb-2">Cake Add-Ons</h4>
                    <ul>
                      {Object.entries(booking.addOns.cakeAddons).map(([cake, qty]) => (
                        <li key={cake}>{cake} x {qty}</li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
              
              {booking.addOns?.otherAddons && (
                <>
                  <div className="border-b-2 border-gray-300 mb-4"></div>
                  <div className="mb-4">
                    <h4 className="text-xl font-semibold mb-2">Other Add-Ons</h4>
                    <ul>
                      {Object.entries(booking.addOns.otherAddons).map(([key, addon]) => (
                        <li key={key}>{addon.name} - ₹{addon.price} x {addon.quantity}</li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
              
              <div className="border-b-2 border-gray-300 mb-4"></div>
              <p className="text-lg"><strong>Status:</strong> {booking.status}</p>
              <p className="mt-4 text-sm text-gray-600">Thank you for your booking. Please present this confirmation on the day of your event.</p>
            </div>

            {/* Visible booking card */}
            <div className="space-y-2 text-gray-700 text-sm">
              <h3 className="text-xl font-semibold text-black">{booking.bookingInfo?.bookingName}</h3>
              <p><strong>Occasion:</strong> {booking.occasion?.type} {booking.occasion?.icon}</p>
              <p><strong>Date:</strong> {booking.bookingInfo?.date}</p>
              <p><strong>Time:</strong> {booking.bookingInfo?.time}</p>
              <p><strong>Location:</strong> {booking.bookingInfo?.location}</p>
              <p><strong>Persons:</strong> {booking.bookingInfo?.persons}</p>
              <p><strong>WhatsApp:</strong> {booking.bookingInfo?.whatsapp}</p>
              <p><strong>Email:</strong> {booking.bookingInfo?.email}</p>
              <hr />
              <p><strong>Base Price:</strong> ₹{booking.pricing?.basePrice}</p>
              <p><strong>Decoration Cost:</strong> ₹{booking.pricing?.decorationCost}</p>
              <p><strong>Cake Price:</strong> ₹{booking.pricing?.cakePrice}</p>
              <p><strong>AddOns Price:</strong> ₹{booking.pricing?.addOnsPrice}</p>
              <p><strong>Total:</strong> ₹{booking.pricing?.total}</p>
              <p><strong>Advance:</strong> ₹{booking.pricing?.advance}</p>
              <p><strong>Balance:</strong> ₹{booking.pricing?.balance}</p>
              <hr />
              {booking.addOns?.cakeAddons && (
                <>
                  <p><strong>Cake Add-Ons:</strong></p>
                  <ul className="list-disc list-inside">
                    {Object.entries(booking.addOns.cakeAddons).map(([cake, qty]) => (
                      <li key={cake}>{cake} x {qty}</li>
                    ))}
                  </ul>
                </>
              )}
              {booking.addOns?.otherAddons && (
                <>
                  <p><strong>Other Add-Ons:</strong></p>
                  <ul className="list-disc list-inside">
                    {Object.entries(booking.addOns.otherAddons).map(([key, addon]) => (
                      <li key={key}>{addon.name} - ₹{addon.price} x {addon.quantity}</li>
                    ))}
                  </ul>
                </>
              )}
              <p><strong>Status:</strong> {booking.status}</p>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <select
                value={booking.status}
                onChange={(e) => handleStatusChange(id, e.target.value)}
                className="border px-3 py-2 rounded text-sm"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <div className="flex gap-2">
                <button
                  onClick={() => generatePDF(id, booking)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm"
                >
                  Download PDF
                </button>
                <button
                  onClick={() => handleDelete(id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminConfirm;
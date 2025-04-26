import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BookingDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  const [total, setTotal] = useState(data.total);
  const [decorationCost, setDecorationCost] = useState(0);
  const [bookingName, setBookingName] = useState("");
  const [persons, setPersons] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [decoration, setDecoration] = useState("");

  useEffect(() => {
    // Ensure decoration cost added only once
    if (decoration === "yes") {
      setDecorationCost(749);
      setTotal(data.basePrice + 749);
    } else if (decoration === "no") {
      setDecorationCost(0);
      setTotal(data.basePrice);
    }
  }, [decoration, data.basePrice]);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^\d{10}$/.test(phone);
  };

  const handleProceed = () => {
    if (!bookingName || !persons || !whatsapp || !email || !decoration) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!validatePhone(whatsapp)) {
      toast.error("Please enter a valid 10-digit WhatsApp number.");
      return;
    }

    const formData = {
      bookingName,
      persons,
      whatsapp,
      email,
      decoration,
      total,
      decorationCost,
      basePrice: data.basePrice,
      advance: data.advance,
      balance: total - data.advance,
      location: data.location,
      date: data.date,
      time: data.time,
    };
    if (decoration === "yes") {
      navigate("/occasion", { state: formData });
    } else {
      navigate("/confirmationtwo", { state: formData });
    }
  };

  if (!data) {
    return <div className="text-center mt-10 text-gray-600">No booking data found.</div>;
  }

  return (
    <div className="p-4 max-w-6xl mx-auto text-gray-800">
      <ToastContainer />
      <button onClick={() => navigate(-1)} className="text-sm text-purple-600 flex items-center mb-4">
        &larr; Back
      </button>

      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="text-lg font-semibold text-purple-700 mb-3">Overview</h2>
        <div className="flex flex-col md:flex-row justify-between gap-2 text-sm">
          <div className="flex items-center gap-1"><span>📍</span>{data.location}</div>
          <div className="flex items-center gap-1"><span>📅</span>{data.date}</div>
          <div className="flex items-center gap-1"><span>⏰</span>{data.time}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Booking Form */}
        <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Booking Details</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <input
              className="border rounded-lg p-3 w-full"
              placeholder="Booking Name *"
              value={bookingName}
              onChange={(e) => setBookingName(e.target.value)}
            />
            <select
              className="border rounded-lg p-3 w-full"
              value={persons}
              onChange={(e) => setPersons(e.target.value)}
            >
              <option value="">Number of Persons *</option>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <input
              className="border rounded-lg p-3 w-full"
              placeholder="WhatsApp Number *"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />
            <input
              className="border rounded-lg p-3 w-full"
              placeholder="Email Id *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-6">
            <select
              className="border rounded-lg p-3 w-full"
              value={decoration}
              onChange={(e) => setDecoration(e.target.value)}
            >
              <option value="">Do you want decoration? *</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        {/* Right: Summary */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="flex justify-between font-semibold text-lg mb-4">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <div className="border-t border-gray-200 pt-4 text-sm">
            <h4 className="font-medium mb-4">Booking Summary</h4>
            <div className="flex justify-between mb-3">
              <span>Base Price</span>
              <span>₹{data.basePrice}</span>
            </div>
            <div className="flex justify-between mb-3">
              <span>Decoration</span>
              <span>₹{decorationCost}</span>
            </div>
            <div className="flex justify-between mb-3">
              <span>Advance amount payable</span>
              <span className="text-red-600">- ₹{data.advance}</span>
            </div>
            <div className="flex justify-between mb-3 font-semibold">
              <span>Balance Amount</span>
              <span>₹{total - data.advance}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">(To be paid at venue)</p>
          </div>

          <button
            onClick={handleProceed}
            className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg"
          >
            PROCEED
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingDetails;

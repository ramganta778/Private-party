
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ConfirmationPageTwo = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state;
    const [agreed, setAgreed] = useState(false);
    const balanceAmount = (data.total || 0) - (data.advance || 0);

    const handleSubmit = async () => {
        if (!agreed) {
            toast.error("Please agree to the terms and conditions.");
            return;
        }

        try {
            await axios.post(
                "https://partyform-e8f95-default-rtdb.firebaseio.com/bookings.json",
                data
            );
            toast.success("Booking confirmed!");
            setTimeout(() => {
                navigate("/success");
            }, 2000);
        } catch (error) {
            console.error("Error saving booking:", error);
            toast.error("There was an error saving your booking.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <ToastContainer />
            <h2 className="text-2xl font-bold text-center mb-6">
                Booking Confirmation
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Left section */}
                <div className="bg-white shadow rounded-lg p-4 space-y-2">
                    <h3 className="text-xl font-semibold">
                        Nellore, {data.location}
                    </h3>
                    <p>
                        <strong>Date:</strong> {data.date}
                    </p>
                    <p>
                        <strong>Time:</strong> {data.time}
                    </p>
                    <p>
                        <strong>Persons:</strong> {data.persons}
                    </p>
                    <p>
                        <strong>Decoration:</strong> {data.decoration || "No"}
                    </p>
                    <p>
                        <strong>Event:</strong> {data.eventType}
                    </p>

                    {/* Cake Section */}
                    {data.cakes?.length > 0 && (
                        <div>
                            <p className="font-semibold">Cake Add-ons:</p>
                            <ul className="list-disc ml-6">
                                {data.cakes.map((cake, index) => (
                                    <li key={index}>
                                        {cake.name} (x{cake.quantity})
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Addons */}
                    {data.addons?.length > 0 && (
                        <div>
                            <p className="font-semibold">Add-Ons:</p>
                            <ul className="list-disc ml-6">
                                {data.addons.map((item, index) => (
                                    <li key={index}>
                                        {item.name} (x{item.quantity})
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Right section */}
                <div className="bg-gray-100 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2">
                        Booking Summary
                    </h3>
                    <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                            <span>Base Price</span>
                            <span>₹{data.basePrice}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Decoration</span>
                            <span>₹{data.decorationPrice || 0}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Cake</span>
                            <span>₹{data.cakePrice || 0}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Addons</span>
                            <span>₹{data.addonPrice || 0}</span>
                        </div>
                        <div className="flex justify-between font-medium">
                            <span>Advance amount payable</span>
                            <span className="text-red-600">
                                - ₹{data.advance}
                            </span>
                        </div>
                        <div className="flex justify-between font-bold">
                            <span>Balance Amount</span>
                            <span>₹{balanceAmount}</span>
                        </div>

                        <div className="flex justify-between mt-2 border-t pt-2 font-bold text-purple-700">
                            <span>Total</span>
                            <span>₹{data.total}</span>
                        </div>
                    </div>

                    <div className="mt-4 text-xs text-gray-600">
                        (To be paid at venue)
                    </div>
                </div>
            </div>

            {/* Terms and Conditions */}
            <div className="bg-gray-50 p-4 mt-6 rounded-md">
                <h3 className="font-semibold mb-2">Important Instructions</h3>
                <ul className="list-disc ml-6 text-sm space-y-1">
                    <li>
                        Partial advance amount (Rs 500/-) will be refunded only
                        if canceled 72+ hours in advance.
                    </li>
                    <li>No smoking or alcohol in the theatre.</li>
                    <li>Bring your own OTT accounts.</li>
                    <li>No party poppers, foam, or champagne allowed.</li>
                    <li>Outside food is strictly prohibited.</li>
                    <li>Full charges for children 5+ years.</li>
                    <li>Right to admission is reserved.</li>
                </ul>

                <label className="flex items-center mt-4 text-sm">
                    <input
                        type="checkbox"
                        className="mr-2"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                    />
                    I agree to all the above conditions.
                </label>
            </div>

            <button
                className={`w-full mt-4 py-2 px-4 rounded-md text-white font-semibold ${
                    agreed
                        ? "bg-purple-600 hover:bg-purple-700"
                        : "bg-gray-400 cursor-not-allowed"
                }`}
                onClick={handleSubmit}
                disabled={!agreed}
            >
                Confirm & Pay Advance
            </button>
        </div>
    );
};

export default ConfirmationPageTwo;
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function ConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingDetails, occasionDetails } = location.state || {};
  const [isAgreed, setIsAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!location.state) {
    return <div className="text-center mt-10 text-gray-600">No confirmation data found.</div>;
  }

  const formatCakeAddOns = () => {
    if (!bookingDetails.cakeAddons || Object.keys(bookingDetails.cakeAddons).length === 0) {
      return "None";
    }
    return Object.entries(bookingDetails.cakeAddons).map(([name, quantity]) => {
      return `${name} (x${quantity})`;
    }).join(", ");
  };

  const formatOtherAddOns = () => {
    if (!bookingDetails.addOns || Object.keys(bookingDetails.addOns).length === 0) {
      return "None";
    }
    return Object.entries(bookingDetails.addOns).map(([key, item]) => {
      const [category, name] = key.split('_');
      return `${name} (x${item.quantity})`;
    }).join(", ");
  };

  const handleConfirmBooking = async () => {
    if (!isAgreed) return;
  
    setIsSubmitting(true);
  
    // Build occasion name with relevant names
    let occasionName = occasionDetails.type;
    
    if (occasionDetails.type === "Birthday" && occasionDetails.birthdayPerson) {
      occasionName = `${occasionDetails.type} (${occasionDetails.birthdayPerson})`;
    } 
    else if ((occasionDetails.type === "Anniversary" || occasionDetails.type === "Date Night") && 
             occasionDetails.yourName && occasionDetails.partnerName) {
      occasionName = `${occasionDetails.type} (${occasionDetails.yourName} & ${occasionDetails.partnerName})`;
    }
    else if (occasionDetails.type === "Surprise" && occasionDetails.partnerName) {
      occasionName = `${occasionDetails.type} (For ${occasionDetails.partnerName})`;
    }
  
    const bookingData = {
      occasion: {
        type: occasionName,  // This now includes the names
        icon: occasionDetails.icon,
        ...(occasionDetails.birthdayPerson && { birthdayPerson: occasionDetails.birthdayPerson }),
        ...(occasionDetails.yourName && occasionDetails.partnerName && {
          names: `${occasionDetails.yourName} & ${occasionDetails.partnerName}`
        }),
        ...(occasionDetails.specialRequest && { specialRequest: occasionDetails.specialRequest }),
      },
      bookingInfo: {
        bookingName: bookingDetails.bookingName,
        email: bookingDetails.email,
        whatsapp: bookingDetails.whatsapp,
        location: bookingDetails.location,
        date: bookingDetails.date,
        time: bookingDetails.time,
        persons: bookingDetails.persons,
      },
      pricing: {
        basePrice: bookingDetails.basePrice,
        decorationCost: bookingDetails.decorationCost,
        cakePrice: bookingDetails.cakePrice,
        addOnsPrice: bookingDetails.addOnsPrice,
        advance: bookingDetails.advance,
        balance: bookingDetails.balance,
        total: bookingDetails.total,
      },
      addOns: {
        cakeAddons: bookingDetails.cakeAddons || {},
        otherAddons: bookingDetails.addOns || {},
      },
      status: "pending",
      timestamp: new Date().toISOString(),
    };
  
    try {
      const response = await fetch("https://partyform-e8f95-default-rtdb.firebaseio.com/confirm.json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData)
      });
  
      if (!response.ok) throw new Error("Failed to save booking.");
  
      toast.success("Booking Confirmed!");
      setTimeout(() => {
        navigate('/booking-success', { state: { bookingId: new Date().getTime() } });
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong! Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 text-gray-800">
      <ToastContainer position="top-center" autoClose={3000} />
      <button onClick={() => navigate(-1)} className="text-sm text-purple-600 flex items-center mb-4">
        ← Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-purple-700">Booking Details</h2>

            {occasionDetails && (
              <div className="mb-4 p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">{occasionDetails.icon}</span>
                  <h3 className="font-medium">{occasionDetails.type}</h3>
                </div>
                <div> {occasionDetails.birthdayPerson && (
                <p className="text-sm mt-1">For: {occasionDetails.birthdayPerson}</p>
              )}
              {occasionDetails.yourName && occasionDetails.partnerName && (
                <p className="text-sm mt-1">
                  {occasionDetails.yourName} & {occasionDetails.partnerName}
                </p>
              )}
              {occasionDetails.partnerName && !occasionDetails.yourName && (
                <p className="text-sm mt-1">For: {occasionDetails.partnerName}</p>
              )}
              {occasionDetails.yourNick && occasionDetails.partnerNick && (
                <p className="text-sm mt-1">
                  {occasionDetails.yourNick} & {occasionDetails.partnerNick}
                </p>
              )}
              </div>
                {occasionDetails.birthdayPerson && (
                  <p className="text-sm mt-1">For: {occasionDetails.birthdayPerson}</p>
                )}
                {occasionDetails.yourName && occasionDetails.partnerName && (
                  <p className="text-sm mt-1">
                    {occasionDetails.yourName} & {occasionDetails.partnerName}
                  </p>
                )}
                {occasionDetails.specialRequest && (
                  <p className="text-sm mt-1 italic">Note: {occasionDetails.specialRequest}</p>
                )}
              </div>
            )}

            <div className="space-y-2 text-sm">
              {[
                ['Booking Name', bookingDetails.bookingName],
                ['Email', bookingDetails.email],
                ['WhatsApp Number', bookingDetails.whatsapp],
                ['Location', bookingDetails.location],
                ['Date', bookingDetails.date],
                ['Time', bookingDetails.time],
                ['Persons', bookingDetails.persons]
              ].map(([label, value]) => (
                <div className="flex justify-between" key={label}>
                  <span className="text-gray-600">{label}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Summary */}
          <div className="border rounded-lg p-4 space-y-3 text-sm">
            <h3 className="font-semibold text-gray-700">Booking Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Base Price</span>
                <span>₹{bookingDetails.basePrice}</span>
              </div>

              {bookingDetails.decorationCost > 0 && (
                <div className="flex justify-between">
                  <span>Decoration</span>
                  <span>₹{bookingDetails.decorationCost}</span>
                </div>
              )}

              {bookingDetails.cakePrice > 0 && (
                <div className="flex justify-between">
                  <span>Cake Add-ons</span>
                  <span>₹{bookingDetails.cakePrice}</span>
                </div>
              )}

              {bookingDetails.addOnsPrice > 0 && (
                <div className="flex justify-between">
                  <span>Extra Add-ons</span>
                  <span>₹{bookingDetails.addOnsPrice}</span>
                </div>
              )}

              <div className="flex justify-between text-green-600">
                <span>Advance Paid</span>
                <span>- ₹{bookingDetails.advance}</span>
              </div>

              <div className="flex justify-between font-semibold border-t pt-2">
                <span>Balance Amount</span>
                <span>₹{bookingDetails.balance}</span>
              </div>
              <p className="text-xs text-gray-500 text-right">(To be paid at venue)</p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-white p-6 rounded-xl shadow-md text-sm space-y-4">
          <h3 className="text-md font-semibold text-purple-700">Important Instructions</h3>

          <div className="bg-red-100 text-red-700 p-3 rounded-md text-xs">
            <strong>Refund Policy:</strong> Partial advance amount (Rs 500/-) will be refundable if you cancel the slot at least 72 hours prior to your booking time.
          </div>

          <div className="bg-blue-50 p-3 rounded-md">
            <h4 className="font-medium mb-2">Selected Cake Add-Ons:</h4>
            {bookingDetails.cakeAddons && Object.keys(bookingDetails.cakeAddons).length > 0 ? (
              <ul className="list-disc pl-5 space-y-1">
                {Object.entries(bookingDetails.cakeAddons).map(([name, quantity]) => {
                  const cake = cakes.find(c => c.name === name);
                  return (
                    <li key={name}>
                      {name} (x{quantity}) - ₹{(cake?.price || 0) * quantity}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-gray-500">No cake add-ons selected</p>
            )}
          </div>

          <div className="bg-blue-50 p-3 rounded-md">
            <h4 className="font-medium mb-2">Selected Extra Add-Ons:</h4>
            {bookingDetails.addOns && Object.keys(bookingDetails.addOns).length > 0 ? (
              <ul className="list-disc pl-5 space-y-1">
                {Object.entries(bookingDetails.addOns).map(([key, item]) => {
                  const [category, name] = key.split('_');
                  return (
                    <li key={key}>
                      {name} (x{item.quantity}) - ₹{item.price * item.quantity}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-gray-500">No extra add-ons selected</p>
            )}
          </div>

          <ul className="list-decimal pl-5 space-y-1 text-gray-700">
            <li>Smoking and Alcohol is strictly prohibited inside the Theaters.</li>
            <li>You need to bring your own OTT accounts to watch content.</li>
            <li>Party poppers, foam, and champagne are not allowed due to sensitivity.</li>
            <li>Outside food is prohibited due to carpet/recliner sensitivity.</li>
            <li>Children above 5 charged full, 5 and below half.</li>
            <li>Management reserves the right to admission.</li>
          </ul>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="agree" checked={isAgreed} onChange={(e) => setIsAgreed(e.target.checked)} required />
            <label htmlFor="agree">I agree to all the above conditions.</label>
          </div>

          <button
            onClick={handleConfirmBooking}
            disabled={!isAgreed || isSubmitting}
            className={`bg-purple-700 hover:bg-purple-800 text-white w-full py-3 rounded-lg text-sm font-semibold ${(!isAgreed || isSubmitting) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'PROCESSING...' : 'CONFIRM & PAY ADVANCE'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Cakes list used in the summary
const cakes = [
  { name: 'Vanilla', price: 500, img: '/images/vanillacake.jpg', eggless: true },
  { name: 'Strawberry', price: 550, img: '/images/strawberrycake.jpg', eggless: true },
  { name: 'Butterscotch', price: 550, img: '/images/butterscotchcake.jpg', eggless: false },
  { name: 'Pineapple', price: 550, img: '/images/pineapplecake.jpg', eggless: true },
  { name: 'Mango Crush', price: 550, img: '/images/mangocrushcake.png', eggless: true },
  { name: 'Chocolate', price: 600, img: '/images/chocolatecake.jpg', eggless: false },
  { name: 'Dark Chocolate', price: 600, img: '/images/darkchoclatecake.jpg', eggless: false },
  { name: 'Black Forest', price: 600, img: '/images/blackforestcake.jpg', eggless: false },
  { name: 'White Forest', price: 600, img: '/images/whiteforestcake.jpg', eggless: true },
  { name: 'Chocochips', price: 600, img: '/images/chocochipscake.jpg', eggless: false },
  { name: 'Blueberry', price: 600, img: '/images/blueberrycake.jpg', eggless: true },
  { name: 'Dry Fruit', price: 650, img: '/images/dryfruitcake.jpg', eggless: true },
  { name: 'Almond Crunch', price: 650, img: '/images/almondcrunchcake.jpeg', eggless: false },
  { name: 'Chocolate Coffee', price: 700, img: '/images/choclatecoffeecake.jpg', eggless: false },
  { name: 'Chocolate Truffle', price: 700, img: '/images/chocolatetrufflecake.png', eggless: false },
  { name: 'Kitkat Chocolate', price: 700, img: '/images/kitkatchoclatecake.jpg', eggless: true },
];

export default ConfirmationPage;


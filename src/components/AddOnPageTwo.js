import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const addOnsData = {
  "Extra Decorations": [
    { name: 'Fog Effect', price: 499, image: '/images/fogeffect.png' },
    { name: 'Photo Clippings (16 Pics)', price: 499, image: '/images/photoclippings.jpg' },
    { name: 'Cold Fire (2 pieces)', price: 750, image: '/images/cold_fire.webp' },
    { name: 'Cold Fire (4 pieces)', price: 1500, image: '/images/cold_fire (1).webp' },
    { name: 'Candle Path', price: 250, image: '/images/Candle Path (Rs 300).png' },
    { name: 'Party Props', price: 199, image: '/images/partyprops.jpg' },
    { name: 'LED Numbers', price: 99, image: '/images/lednumbers.jpg' },
    { name: 'HBD Letters', price: 99, image: '/images/hbdletters.jpg' }
  ],
  "Rose": [
    { name: 'Single Rose', price: 49, image: '/images/singleflower.jpg' },
    { name: 'Rose Bouquet', price: 349, image: '/images/rosebouquet.png' }
  ],
  "Photography (soft copies only)": [
    { name: 'Photography - 20 pics', price: 299, image: '/images/photo20.jpeg' },
    { name: 'Photography - 50 pics', price: 499, image: '/images/photo50.jpeg' },
    { name: 'Photography - 75 pics', price: 699, image: '/images/photo75.jpeg' },
    { name: 'Photography - 100 pics', price: 999, image: '/images/photo100.jpeg' }
  ]
};

const AddOnPageTwo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingDetails, occasionDetails } = location.state || {};
  
  const [selectedAddOns, setSelectedAddOns] = useState({});

  if (!location.state) {
    return (
      <div className="text-center mt-10 text-gray-600">
        No booking data received. Please start your booking from the beginning.
      </div>
    );
  }

  const handleSelect = (category, name, price) => {
    const key = `${category}_${name}`;
    setSelectedAddOns(prev => {
      const current = prev[key] || { name, price, quantity: 0 };
      const newQty = current.quantity + 1;

      return {
        ...prev,
        [key]: { ...current, quantity: newQty }
      };
    });
  };

  const handleRemove = (category, name) => {
    const key = `${category}_${name}`;
    setSelectedAddOns(prev => {
      const current = prev[key];
      if (!current) return prev;

      const newQty = current.quantity - 1;
      if (newQty <= 0) {
        const updated = { ...prev };
        delete updated[key];
        return updated;
      }

      return {
        ...prev,
        [key]: { ...current, quantity: newQty }
      };
    });
  };

  const totalAddOnCost = Object.values(selectedAddOns).reduce(
    (sum, item) => sum + (item.price * item.quantity), 0
  );

  const handleNext = () => {
    navigate("/confirmation", {
      state: {
        bookingDetails: {
          ...bookingDetails,
          addOns: selectedAddOns,
          addOnsPrice: totalAddOnCost,
          total: bookingDetails.total + totalAddOnCost,
          balance: (bookingDetails.total + totalAddOnCost) - bookingDetails.advance
        },
        occasionDetails
      }
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <ToastContainer position="top-center" autoClose={3000} />
      
      {/* Left - Add On Selection */}
      <div className="w-full md:w-2/3 p-4 space-y-6">
        <button 
          onClick={handleBack}
          className="text-blue-600 hover:underline mb-2"
        >
          ← Back
        </button>

        {Object.keys(addOnsData).map((category) => (
          <div key={category}>
            <h2 className="text-xl font-semibold mb-2">{category}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {addOnsData[category].map((item) => {
                const key = `${category}_${item.name}`;
                const selected = selectedAddOns[key];
                return (
                  <div
                    key={item.name}
                    className={`border p-3 rounded-xl text-center shadow-sm transition-colors duration-200 ${
                      selected ? 'bg-purple-100 border-purple-500' : 'bg-white'
                    }`}
                  >
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="h-24 w-24 object-cover rounded-full mx-auto mb-2"
                    />
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500 mb-1">₹{item.price}</p>

                    {selected ? (
                      <div className="flex items-center justify-center gap-2 mt-2">
                        <button
                          onClick={() => handleRemove(category, item.name)}
                          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          –
                        </button>
                        <span className="font-semibold">{selected.quantity}</span>
                        <button
                          onClick={() => handleSelect(category, item.name, item.price)}
                          className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleSelect(category, item.name, item.price)}
                        className="mt-2 px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
                      >
                        Add
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Notes */}
            {category === 'Extra Decorations' && (
              <div className="text-sm text-yellow-600 mt-2 space-y-1 bg-yellow-50 p-3 rounded">
                <p>📌 For photoclippings, our team will reach out on the booking day. You need to send 16 soft copies of photos to place inside the theater.</p>
                <p>📌 You can take those hard copies with you after the party.</p>
              </div>
            )}
            {category === 'Photography (soft copies only)' && (
              <div className="text-sm text-yellow-600 mt-2 bg-yellow-50 p-3 rounded">
                📸 Timing of the photography is according to availability of the photographer.
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Right - Summary */}
      <div className="w-full md:w-1/3 p-4 bg-white shadow-inner space-y-4">
        <div className="border rounded-lg p-4 space-y-3">
          <h3 className="text-lg font-semibold">Booking Summary</h3>

          {occasionDetails && (
            <div className="mb-4 p-2 bg-purple-50 rounded">
              <div className="flex items-center">
                <span className="text-2xl mr-2">{occasionDetails.icon}</span>
                <h3 className="font-medium">{occasionDetails.type}</h3>
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
                <p className="text-sm mt-1 italic">
                  Note: {occasionDetails.specialRequest}
                </p>
              )}
            </div>
          )}

          <div className="space-y-2 text-sm border-t pt-4">
            <div className="flex justify-between"><span>Booking Name</span><span>{bookingDetails.bookingName}</span></div>
            <div className="flex justify-between"><span>Email</span><span>{bookingDetails.email}</span></div>
            <div className="flex justify-between"><span>WhatsApp Number</span><span>{bookingDetails.whatsapp}</span></div>
            <div className="flex justify-between"><span>Location</span><span>{bookingDetails.location}</span></div>
            <div className="flex justify-between"><span>Date</span><span>{bookingDetails.date}</span></div>
            <div className="flex justify-between"><span>Time</span><span>{bookingDetails.time}</span></div>
            <div className="flex justify-between"><span>Persons</span><span>{bookingDetails.persons}</span></div>
            <div className="flex justify-between"><span>Base Price</span><span>₹{bookingDetails.basePrice}</span></div>
            {bookingDetails.decorationCost > 0 && (
              <div className="flex justify-between"><span>Decoration</span><span>₹{bookingDetails.decorationCost}</span></div>
            )}
            {bookingDetails.cakePrice > 0 && (
              <div className="flex justify-between"><span>Cake Add-ons</span><span>₹{bookingDetails.cakePrice}</span></div>
            )}
            <div className="flex justify-between"><span>Extra Add-ons</span><span>₹{totalAddOnCost}</span></div>
            <div className="flex justify-between text-green-600"><span>Advance Paid</span><span>- ₹{bookingDetails.advance}</span></div>
            <div className="flex justify-between font-semibold border-t pt-2"><span>Balance Amount</span><span>₹{bookingDetails.total + totalAddOnCost - bookingDetails.advance}</span></div>
          </div>

          <hr className="my-4" />
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>₹{bookingDetails.total + totalAddOnCost}</span>
          </div>
          <button 
            onClick={handleNext}
            className="mt-4 w-full bg-purple-700 hover:bg-purple-800 text-white py-2 rounded"
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddOnPageTwo;

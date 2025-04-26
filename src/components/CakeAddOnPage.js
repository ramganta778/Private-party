import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

export default function CakeAddOnPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingDetails, occasionDetails } = location.state || {};
  
  const [selectedCakes, setSelectedCakes] = useState({});
  const [egglessOnly, setEgglessOnly] = useState(false);

  if (!location.state) {
    return (
      <div className="text-center mt-10 text-gray-600">
        No booking data received. Please start your booking from the beginning.
      </div>
    );
  }

  const handleSelect = (name) => {
    setSelectedCakes(prev => ({
      ...prev,
      [name]: prev[name] ? prev[name] + 1 : 1
    }));
  };

  const handleDecrease = (name) => {
    setSelectedCakes(prev => {
      const updated = { ...prev };
      if (updated[name] > 1) updated[name] -= 1;
      else delete updated[name];
      return updated;
    });
  };

  const filteredCakes = egglessOnly ? cakes.filter(c => c.eggless) : cakes;

  const totalCakePrice = Object.entries(selectedCakes).reduce((acc, [name, qty]) => {
    const cake = cakes.find(c => c.name === name);
    return acc + (cake?.price || 0) * qty;
  }, 0);

  const handleNext = () => {
    if (Object.keys(selectedCakes).length === 0) {
      toast.error("Please select at least one cake");
      return;
    }

    navigate("/addons-step2", {
      state: {
        bookingDetails: {
          ...bookingDetails,
          cakeAddons: selectedCakes,
          cakePrice: totalCakePrice,
          // cakeNames: selectedCakes.map(cake => `${cake.name}(x${cake.quantity})`),
          total: bookingDetails.total + totalCakePrice,
          balance: (bookingDetails.total + totalCakePrice) - bookingDetails.advance
        },
        occasionDetails
      }
    });
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <ToastContainer position="top-center" autoClose={3000} />
      
      {/* Back & Toggle */}
      <div className="flex items-center justify-between mb-4">
        <button 
          className="text-blue-600 hover:underline" 
          onClick={() => navigate(-1)}
        >
          &larr; Back
        </button>
        <div className="flex items-center space-x-2">
          <label className="font-semibold">Eggless</label>
          <input
            type="checkbox"
            checked={egglessOnly}
            onChange={(e) => setEgglessOnly(e.target.checked)}
            className="w-4 h-4"
          />
        </div>
      </div>

      {/* Cakes and Summary */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Cake Grid */}
        <div className="w-full md:w-2/3">
          <p className="text-yellow-700 text-sm mb-2">⚠️ Images are for demonstration purposes only. Actual cake may look different.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredCakes.map((cake) => (
              <div 
                key={cake.name} 
                className={`border rounded-lg p-2 text-center bg-white shadow-sm ${
                  selectedCakes[cake.name] ? 'ring-2 ring-purple-400' : ''
                }`}
              >
                 <img 
                  src={cake.img} 
                  alt={cake.name} 
                  className="w-full h-32 object-contain rounded bg-white"
                />
                <h3 className="mt-2 font-medium">{cake.name}</h3>
                <p className="text-sm text-gray-600">₹ {cake.price}</p>
                {selectedCakes[cake.name] ? (
                  <div className="flex justify-center items-center mt-2 space-x-2">
                    <button 
                      onClick={() => handleDecrease(cake.name)} 
                      className="bg-red-500 text-white px-2 rounded"
                    >
                      -
                    </button>
                    <span>{selectedCakes[cake.name]}</span>
                    <button 
                      onClick={() => handleSelect(cake.name)} 
                      className="bg-green-500 text-white px-2 rounded"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => handleSelect(cake.name)} 
                    className="mt-2 bg-purple-500 text-white px-3 py-1 rounded"
                  >
                    Add
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Summary Panel */}
        <div className="w-full md:w-1/3">
          <div className="bg-white border p-4 rounded-lg shadow-md sticky top-6">
            <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
            
            {/* Occasion Info */}
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
              {occasionDetails.partnerName && !occasionDetails.yourName && (
                <p className="text-sm mt-1">For: {occasionDetails.partnerName}</p>
              )}
              {occasionDetails.yourNick && occasionDetails.partnerNick && (
                <p className="text-sm mt-1">
                  {occasionDetails.yourNick} & {occasionDetails.partnerNick}
                </p>
              )}
              {occasionDetails.specialRequest && (
                <p className="text-sm mt-1 italic">
                  Note: {occasionDetails.specialRequest}
                </p>
              )}
            </div>

            {/* Booking Details */}
            <ul className="space-y-2 text-sm border-t pt-4">
              <li className="flex justify-between">
                <span>Booking Name</span>
                <span>{bookingDetails.bookingName}</span>
              </li>
              <li className="flex justify-between">
                <span>Email</span>
                <span>{bookingDetails.email}</span>
              </li>
              <li className="flex justify-between">
                <span>WhatsApp Number</span>
                <span>{bookingDetails.whatsapp}</span>
              </li>
              <li className="flex justify-between">
                <span>Location</span>
                <span>{bookingDetails.location}</span>
              </li>
              <li className="flex justify-between">
                <span>Date</span>
                <span>{bookingDetails.date}</span>
              </li>
              <li className="flex justify-between">
                <span>Time</span>
                <span>{bookingDetails.time}</span>
              </li>
              <li className="flex justify-between">
                <span>Persons</span>
                <span>{bookingDetails.persons}</span>
              </li>
              <li className="flex justify-between">
                <span>Base Price</span>
                <span>₹{bookingDetails.basePrice}</span>
              </li>
              <li className="flex justify-between">
                <span>Decoration</span>
                <span>₹{bookingDetails.decorationCost}</span>
              </li>
              <li className="flex justify-between">
                <span>Cake Add-ons</span>
                <span>₹{totalCakePrice}</span>
              </li>
              <li className="flex justify-between text-green-600">
                <span>Advance Paid</span>
                <span>- ₹{bookingDetails.advance}</span>
              </li>
              <li className="flex justify-between font-semibold border-t pt-2">
                <span>Balance Amount</span>
                <span>₹{(bookingDetails.total + totalCakePrice) - bookingDetails.advance}</span>
              </li>
            </ul>

            <hr className="my-4" />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>₹{bookingDetails.total + totalCakePrice}</span>
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
    </div>
  );
}
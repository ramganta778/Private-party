import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";
import axios from "axios";

// Firebase configuration
const firebaseURL = "https://partyform-e8f95-default-rtdb.firebaseio.com";
const slotsEndpoint = `${firebaseURL}/slots.json`;
const waitlistEndpoint = `${firebaseURL}/waitlist.json`;

const theaterDetails = [
  {
    name: "Paradise Theatre",
    price: "\u20B92999 for 4 people",
    maxPeople: 4,
    extraCharge: 400,
    screen: "120 inch 4K screen",
    sound: "1000W Dolby atmos",
    decoration: 0,
    images: [
      "/images/paradise1V1.jpg",
      "/images/paradise2V1.jpg",
      "/images/paradise3V1.jpg",
      "/images/paradise4V1.jpg",
    ],
  },
  {
    name: "Stellar Theatre",
    price: "\u20B91799 for 4 people",
    maxPeople: 6,
    extraCharge: 400,
    screen: "133 inch 4K screen",
    sound: "1000W Dolby atmos",
    decoration: 749,
    images: [
      "/images/v3stellar1.jpg",
      "/images/v3stellar2.jpg",
      "/images/v3stellar3.jpg",
      "/images/v3stellar4.jpg",
    ],
  },
  {
    name: "Platinum Theatre",
    price: "\u20B91799 for 6 people",
    maxPeople: 12,
    extraCharge: 400,
    screen: "150 inch 4K screen",
    sound: "1000W Dolby atmos",
    decoration: 749,
    images: [
      "/images/v3platinum1.jpg",
      "/images/v3platinum2.jpg",
      "/images/v3platinum3.jpg",
      "/images/v3platinum4.jpg",
    ],
  },
  {
    name: "Carnival Theatre",
    price: "\u20B91899 for 4 people",
    maxPeople: 10,
    extraCharge: 400,
    screen: "133 inch 4K screen",
    sound: "1000W Dolby atmos",
    decoration: 749,
    images: [
      "/images/v3carnival1.jpg",
      "/images/v3carnival2.jpg",
      "/images/v3carnival3.jpg",
      "/images/v3carnival4.jpg",
    ],
  },
  {
    name: "Majestic Theatre",
    price: "\u20B91899 for 4 people",
    maxPeople: 10,
    extraCharge: 400,
    screen: "133 inch 4K screen",
    sound: "1000W Dolby atmos",
    decoration: 749,
    images: [
      "/images/v3majestic1.jpg",
      "/images/v3majestic2.jpg",
      "/images/v3majestic3.jpg",
      "/images/v3majestic4.jpg",
    ],
  },
  {
    name: "Scarlet Theatre (Couple)",
    price: "\u20B91499 for 2 people",
    maxPeople: 2,
    extraCharge: 0,
    screen: "120 inch 4K screen",
    sound: "1000W Dolby atmos",
    decoration: 749,
    images: [
      "/images/v3scarlet1.jpg",
      "/images/v3scarlet2.jpg",
      "/images/v3scarlet3.jpg",
      "/images/v3scarlet4.jpg",
    ],
  },
];

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: false,
  slidesToShow: 1,
  slidesToScroll: 1,
};

function BookOnline() {
  const [selectedSlots, setSelectedSlots] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPopup, setShowPopup] = useState(false);
  const [waitlistForm, setWaitlistForm] = useState({
    name: "",
    persons: 1,
    location: "Nellore",
    whatsapp: "",
    date: new Date(),
    status: "notconfirm",
  });
  const [availableSlots, setAvailableSlots] = useState({});
  const [loading, setLoading] = useState(false);
  const [slotBookings, setSlotBookings] = useState({});
  const [verifyingSlots, setVerifyingSlots] = useState(false);

  const navigate = useNavigate();

  // Load selected slots from localStorage on component mount
  useEffect(() => {
    const loadSelectedSlots = async () => {
      const savedSlots = localStorage.getItem('selectedSlots');
      if (savedSlots) {
        const parsedSlots = JSON.parse(savedSlots);
  
        // Verify the slots are still valid
        setVerifyingSlots(true);
        try {
          const validSlots = {};
          const dateStr = formatDateForFirebase(selectedDate);
  
          // Check each selected slot in Firebase
          for (const [index, slotDisplay] of Object.entries(parsedSlots)) {
            const theater = theaterDetails[parseInt(index)];
            const slotKey = formatDisplayToSlotKey(slotDisplay);
  
            const response = await axios.get(
              `${firebaseURL}/slots/${theater.name}/${dateStr}/${slotKey}.json`
            );
  
            if (response.data && response.data.available) {
              validSlots[index] = slotDisplay;
            }
          }
  
          setSelectedSlots(validSlots);
          localStorage.setItem('selectedSlots', JSON.stringify(validSlots));
        } catch (error) {
          console.error("Error verifying slots:", error);
          localStorage.removeItem('selectedSlots');
        } finally {
          setVerifyingSlots(false);
        }
      }
    };
    
    loadSelectedSlots();
  }, []);
  

  useEffect(() => {
    if (selectedDate) {
      fetchSlotsForDate();
    }
  }, [selectedDate]);

  // Function to check if a time slot is in the past
  const isSlotInPast = (slotKey, selectedDate) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const selected = new Date(selectedDate);
    selected.setHours(0, 0, 0, 0);
    
    // If selected date is in the past, all slots are invalid
    if (selected < today) return true;
    
    // If selected date is today, we need to check the time
    if (selected.getTime() === today.getTime()) {
      // Extract time from slot key (format: "9_00_AM_to_12_00_PM")
      const timeParts = slotKey.split('_to_');
      if (timeParts.length !== 2) return false;
      
      const startTime = timeParts[0]; // "9_00_AM"
      const [startHour, startMinute, startPeriod] = startTime.split('_');
      
      let startHour24 = parseInt(startHour);
      if (startPeriod === 'PM' && startHour24 !== 12) {
        startHour24 += 12;
      } else if (startPeriod === 'AM' && startHour24 === 12) {
        startHour24 = 0;
      }
      
      const slotStartTime = new Date();
      slotStartTime.setHours(startHour24, parseInt(startMinute), 0, 0);
      
      return now > slotStartTime;
    }
    
    return false;
  };

  const fetchSlotsForDate = async () => {
    setLoading(true);
    try {
      const dateStr = formatDateForFirebase(selectedDate);
      const response = await axios.get(slotsEndpoint);
      const allSlots = response.data || {};

      const slotsData = {};
      const bookingsData = {};
      
      theaterDetails.forEach(theater => {
        const theaterSlots = allSlots[theater.name]?.[dateStr] || {};
        bookingsData[theater.name] = theaterSlots;

        const availableSlotsForTheater = Object.entries(theaterSlots)
          .filter(([slotKey, slotData]) => {
            // Only show slots that are available AND not in the past
            return slotData.available && !isSlotInPast(slotKey, selectedDate);
          })
          .map(([slotKey, slotData]) => ({
            display: formatSlotKeyToDisplay(slotKey),
            key: slotKey,
            data: slotData
          }));

        slotsData[theater.name] = availableSlotsForTheater;
      });

      setAvailableSlots(slotsData);
      setSlotBookings(bookingsData);
    } catch (error) {
      console.error("Error fetching slots:", error);
      toast.error("Failed to fetch slot availability");
    } finally {
      setLoading(false);
    }
  };

  const formatDateForFirebase = (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };

  const formatSlotKeyToDisplay = (slotKey) => {
    return slotKey
      .replace(/_/g, ' ')
      .replace(/(\d+):(\d+)_(AM|PM)/g, '$1:$2 $3')
      .replace(/_/g, ' - ');
  };
  

  const formatDisplayToSlotKey = (displaySlot) => {
    return displaySlot
      .replace(/\s+/g, '_')
      .replace(/(\d+):(\d+)\s(AM|PM)/g, '$1_$2_$3')
      .replace(/\s-\s/g, '_');
  };

  const handleSlotSelection = async (theaterIndex, slot) => {
    const theater = theaterDetails[theaterIndex];
    const dateStr = formatDateForFirebase(selectedDate);
    const slotKey = slot.key;
  
    try {
      const slotStatus = await axios.get(
        `${firebaseURL}/slots/${theater.name}/${dateStr}/${slotKey}.json`
      );
  
      if (!slotStatus.data?.available || isSlotInPast(slotKey, selectedDate)) {
        toast.error("This slot is no longer available");
        await fetchSlotsForDate(); // Refresh slots
        return;
      }
  
      // Update local state and Firebase immediately for better UX
      const newSelectedSlots = { ...selectedSlots, [theaterIndex]: slot.display };
      setSelectedSlots(newSelectedSlots);
      localStorage.setItem('selectedSlots', JSON.stringify(newSelectedSlots));
  
      // Update Firebase to mark the slot as booked
      const bookingData = {
        ...slotStatus.data,
        available: false,
        bookedAt: new Date().toISOString(),
        bookedBy: "user", // replace with actual user ID
      };
  
      await axios.patch(
        `${firebaseURL}/slots/${theater.name}/${dateStr}/${slotKey}.json`,
        bookingData
      );
  
      toast.success(`Slot ${slot.display} booked successfully!`);
      await fetchSlotsForDate(); // Refresh available slots
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Failed to book slot. Please try again.");
      setSelectedSlots(prev => {
        const newState = { ...prev };
        delete newState[theaterIndex];
        return newState;
      });
      localStorage.removeItem('selectedSlots');
    }
  };
  
  const handleSlotDeselection = async (theaterIndex) => {
    const theater = theaterDetails[theaterIndex];
    const dateStr = formatDateForFirebase(selectedDate);
    const slotDisplay = selectedSlots[theaterIndex];
    const slotKey = formatDisplayToSlotKey(slotDisplay);
  
    try {
      const newSelectedSlots = { ...selectedSlots };
      delete newSelectedSlots[theaterIndex];
      setSelectedSlots(newSelectedSlots);
      localStorage.setItem('selectedSlots', JSON.stringify(newSelectedSlots));
  
      const slotStatus = await axios.get(
        `${firebaseURL}/slots/${theater.name}/${dateStr}/${slotKey}.json`
      );
  
      await axios.patch(
        `${firebaseURL}/slots/${theater.name}/${dateStr}/${slotKey}.json`,
        {
          ...slotStatus.data,
          available: true,
          bookedAt: null,
          bookedBy: null
        }
      );
  
      toast.success("Slot released successfully!");
      await fetchSlotsForDate(); // Refresh available slots
    } catch (error) {
      console.error("Error releasing slot:", error);
      toast.error("Failed to release slot");
      setSelectedSlots(prev => ({
        ...prev,
        [theaterIndex]: slotDisplay
      }));
      localStorage.setItem('selectedSlots', JSON.stringify(selectedSlots));
    }
  };
  

  const handleProceed = (index) => {
    const today = new Date();
    const selected = new Date(selectedDate);
    today.setHours(0, 0, 0, 0);
    selected.setHours(0, 0, 0, 0);

    if (selected < today) {
      toast.error("Please select a valid date");
      return;
    }

    if (!selectedSlots[index]) {
      toast.error("Please select a slot");
      return;
    }

    const theater = theaterDetails[index];
    const basePrice = parseInt(theater.price.match(/\d+/)[0]);
    const decorationPrice = theater.decoration;
    const totalPrice = basePrice + decorationPrice;

    const bookingData = {
      location: theater.name,
      date: selected.toLocaleDateString(),
      time: selectedSlots[index],
      total: basePrice,
      basePrice,
      decoration: decorationPrice,
      advance: 750,
      balance: totalPrice - 750,
    };

    navigate("/booking-details", { state: bookingData });
  };

  const handleWaitlistChange = (e) => {
    const { name, value } = e.target;
    setWaitlistForm({ ...waitlistForm, [name]: value });
  };

  const handleWaitlistSubmit = async () => {
    if (
      !waitlistForm.name ||
      !waitlistForm.whatsapp ||
      waitlistForm.whatsapp.length !== 10
    ) {
      toast.error("Please enter valid details");
      return;
    }

    try {
      const formattedDate = waitlistForm.date.toLocaleDateString();
      const waitlistData = {
        ...waitlistForm,
        date: formattedDate,
        status: "notconfirm",
        timestamp: new Date().toISOString(),
      };

      const response = await axios.post(waitlistEndpoint, waitlistData);
      
      if (response.status === 200) {
        toast.success("Waitlist submitted successfully");
        setShowPopup(false);
        setWaitlistForm({
          name: "",
          persons: 1,
          location: "Nellore",
          whatsapp: "",
          date: new Date(),
        });
      } else {
        toast.error("Failed to submit waitlist. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting waitlist:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-purple-300 px-6 py-10 relative">
      <ToastContainer position="top-center" />
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-white flex items-center mb-4"
      >
        &larr; Back
      </button>

      <h1 className="text-3xl font-bold text-white text-center mb-8">
        Choose your theater at Nellore City
      </h1>

      <div className="mb-6 text-center">
        <p className="text-white mb-2 text-lg font-medium">
          Check Slot Availability:
        </p>
        <div className="relative inline-block">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            minDate={new Date()}
            dateFormat="dd/MM/yyyy"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[250px]"
            placeholderText="DD/MM/YYYY"
          />
          <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
      </div>

      {loading && (
        <div className="text-center text-white mb-4">Loading slot availability...</div>
      )}

      {verifyingSlots && (
        <div className="text-center text-white mb-4">Verifying your selected slots...</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-20 w-full px-4 md:px-6 lg:px-10 max-w-[75rem] mx-auto">
        {theaterDetails.map((theater, index) => {
          const theaterSlots = availableSlots[theater.name] || [];
          const hasAvailableSlots = theaterSlots.length > 0;
          const isSlotSelected = !!selectedSlots[index];
          
          return (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-4 flex flex-col"
            >
              <Slider {...sliderSettings}>
                {theater.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${theater.name} ${i + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ))}
              </Slider>

              <h2 className="text-xl font-bold mt-4 mb-1">
                {theater.name}
              </h2>
              <p className="text-sm text-gray-600 mb-1">
                {theater.price}
              </p>
              <p className="text-xs text-gray-500 mb-1">
                Max {theater.maxPeople} People | Decoration: ₹
                {theater.decoration}
              </p>
              <p className="text-xs text-gray-500 mb-1">
                {theater.screen} | {theater.sound}
              </p>
              <p className="text-xs text-gray-500 mb-2">
                ₹{theater.extraCharge} per extra person
              </p>
              <p className="text-xs text-gray-400 italic mb-2">
                Add Cakes and Photography in the next step
              </p>
              <p className="text-xs text-gray-400 italic mb-2">
                Refund eligible if cancelled 72 hours before the slot time
              </p>

              {selectedDate && (
                <div className="mb-3">
                  <p className="text-sm font-medium">
                    Choose Your Slot -
                  </p>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    {isSlotSelected ? (
                      <div className="col-span-2 flex items-center justify-between bg-purple-100 rounded-lg p-2">
                        <span className="text-purple-800 font-medium">
                          {selectedSlots[index]}
                        </span>
                        <button
                          onClick={() => handleSlotDeselection(index)}
                          className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
                        >
                          Change
                        </button>
                      </div>
                    ) : hasAvailableSlots ? (
                      theaterSlots.map((slot, i) => (
                        <button
                          key={i}
                          onClick={() => handleSlotSelection(index, slot)}
                          className="border border-purple-500 rounded-lg px-2 py-1 text-sm hover:bg-purple-100"
                        >
                          {slot.display}
                        </button>
                      ))
                    ) : (
                      <span className="text-sm text-red-500 col-span-2">
                        {loading ? "Checking availability..." : "No slots available"}
                      </span>
                    )}
                  </div>
                </div>
              )}

              <button
                className={`mt-auto ${
                  isSlotSelected
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "bg-gray-400 cursor-not-allowed"
                } text-white rounded-lg py-2 px-4 transition-colors`}
                onClick={() => handleProceed(index)}
                disabled={!isSlotSelected}
              >
                Proceed
              </button>
              <p className="text-xs text-center mt-1">
                (Just Pay ₹750 Now)
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-10 text-center">
        <button
          className="bg-white text-purple-600 border border-purple-600 hover:bg-purple-100 rounded-lg py-2 px-4"
          onClick={() => setShowPopup(true)}
        >
          JOIN WAITLIST
        </button>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-80 relative">
            <button
              className="absolute top-2 right-4 text-gray-800 hover:text-purple-1000 text-lg"
              onClick={() => setShowPopup(false)}
            >
              &times;
            </button>
            <h2 className="text-lg font-bold mb-4 text-left text-purple-700">
              Waiting List
            </h2>

            <input
              type="text"
              name="name"
              placeholder="Name *"
              value={waitlistForm.name}
              onChange={handleWaitlistChange}
              className="w-full border px-3 py-2 rounded mb-3"
              required
            />

            <select
              name="persons"
              value={waitlistForm.persons}
              onChange={handleWaitlistChange}
              className="w-full border px-3 py-2 rounded mb-3"
              required
            >
              <option value="">Select No of Persons</option>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            <select
              name="location"
              value={waitlistForm.location}
              onChange={handleWaitlistChange}
              className="w-full border px-3 py-2 rounded mb-3"
              required
            >
              <option value="Location">Select Location</option>
              <option value="Nellore">Nellore</option>
            </select>

            <input
              type="tel"
              name="whatsapp"
              placeholder="WhatsApp Number (10 digits) *"
              value={waitlistForm.whatsapp}
              onChange={handleWaitlistChange}
              className="w-full border px-3 py-2 rounded mb-3"
              maxLength={10}
              pattern="[0-9]{10}"
              required
            />

            <div className="relative mb-4">
              <DatePicker
                selected={waitlistForm.date}
                onChange={(date) => setWaitlistForm({ ...waitlistForm, date })}
                minDate={new Date()}
                dateFormat="dd/MM/yyyy"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholderText="Select Date"
              />
              <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
            <button
              onClick={handleWaitlistSubmit}
              className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition-colors"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookOnline;
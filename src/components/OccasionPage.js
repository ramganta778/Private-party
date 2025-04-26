import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const occasions = [
  { label: "Birthday", icon: "🎉" },
  { label: "Anniversary", icon: "🎂" },
  { label: "Bride to be", icon: "👰" },
  { label: "Groom to be", icon: "🤵" },
  { label: "Mom to be", icon: "🤰" },
  { label: "Farewell", icon: "👋" },
  { label: "Romantic Date", icon: "💘" },
  { label: "Marriage Proposal", icon: "💍" },
  { label: "Love Proposal", icon: "💌" },
  { label: "Baby Shower", icon: "🍼" },
  { label: "Congratulations", icon: "🏆" },
];

const OccasionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  const [selected, setSelected] = useState("");
  const [yourNick, setYourNick] = useState("");
  const [partnerNick, setPartnerNick] = useState("");
  const [yourName, setYourName] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [birthdayPerson, setBirthdayPerson] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");

  const handleNext = () => {
    if (!selected) {
      toast.error("Please select an occasion.");
      return;
    }

    // Validate fields based on selected occasion
    switch (selected) {
      case "Birthday":
        if (!birthdayPerson.trim()) {
          toast.error("Please enter birthday person's name.");
          return;
        }
        break;
      case "Anniversary":
        if (!yourName.trim() || !partnerName.trim()) {
          toast.error("Please enter both names.");
          return;
        }
        break;
      case "Bride to be":
      case "Groom to be":
      case "Mom to be":
      case "Farewell":
      case "Baby Shower":
      case "Congratulations":
        if (!partnerName.trim()) {
          toast.error(`Please enter ${selected.toLowerCase()} name.`);
          return;
        }
        break;
      case "Romantic Date":
      case "Marriage Proposal":
      case "Love Proposal":
        if (!yourNick.trim() || !partnerNick.trim()) {
          toast.error("Please enter both nicknames.");
          return;
        }
        if (yourNick.length > 8 || partnerNick.length > 8) {
          toast.error("Nicknames should be 8 characters or less.");
          return;
        }
        break;
      default:
        break;
    }

    // Prepare occasion details based on selection
    const occasionDetails = {
      type: selected,
      icon: occasions.find(occ => occ.label === selected)?.icon || "",
      yourNick,
      partnerNick,
      yourName,
      partnerName,
      birthdayPerson,
      specialRequest
    };

    // Navigate to the next page with all data
    navigate("/addons", {
      state: {
        // Booking details from previous page
        bookingDetails: {
          bookingName: data.bookingName,
          location: data.location,
          date: data.date,
          time: data.time,
          persons: data.persons,
          whatsapp: data.whatsapp,
          email: data.email,
          basePrice: data.basePrice,
          decorationCost: data.decorationCost,
          advance: data.advance,
          total: data.total,
          balance: data.total - data.advance
        },
        // Occasion details from this page
        occasionDetails
      }
    });
  };

  if (!data) {
    return (
      <div className="text-center mt-10 text-gray-600">
        No data received from booking page.
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row w-full p-6 gap-6">
      <ToastContainer position="top-center" autoClose={3000} />
      
      {/* Left Section */}
      <div className="w-full lg:w-2/3">
        <button
          onClick={() => navigate(-1)}
          className="text-sm mb-4 text-gray-600 hover:underline"
        >
          &larr; Back
        </button>
        <h2 className="text-2xl font-semibold mb-4">Select Occasion</h2>
        <div className="grid grid-cols-3 gap-4">
          {occasions.map((item) => (
            <div
              key={item.label}
              onClick={() => setSelected(item.label)}
              className={`p-4 border rounded-lg text-center cursor-pointer ${
                selected === item.label
                  ? "bg-purple-100 border-purple-500"
                  : "hover:bg-gray-100"
              }`}
            >
              <div className="text-3xl mb-2">{item.icon}</div>
              <div className="font-medium">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Birthday */}
        {selected === "Birthday" && (
          <div className="mt-6">
            <div className="flex flex-col">
              <label className="text-sm text-gray-700">
                Birthday Person's Name
              </label>
              <input
                value={birthdayPerson}
                onChange={(e) => setBirthdayPerson(e.target.value)}
                className="border rounded px-3 py-2 w-48"
                placeholder="Enter name"
              />
            </div>
          </div>
        )}

        {/* Bride to be */}
        {selected === "Bride to be" && (
          <div className="mt-6">
            <label className="text-sm text-gray-700">Bride's Name</label>
            <br />
            <input
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              className="border rounded px-3 py-2 w-48"
              placeholder="Enter name"
            />
          </div>
        )}

        {/* Groom to be */}
        {selected === "Groom to be" && (
          <div className="mt-6">
            <label className="text-sm text-gray-700">Groom's Name</label>
            <br />
            <input
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              className="border rounded px-3 py-2 w-48"
              placeholder="Enter name"
            />
          </div>
        )}

        {/* Mom to be */}
        {selected === "Mom to be" && (
          <div className="mt-6">
            <label className="text-sm text-gray-700">Mom's Name</label>
            <br />
            <input
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              className="border rounded px-3 py-2 w-48"
              placeholder="Enter name"
            />
          </div>
        )}

        {/* Farewell */}
        {selected === "Farewell" && (
          <div className="mt-6">
            <label className="text-sm text-gray-700">Person's Name</label>
            <br />
            <input
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              className="border rounded px-3 py-2 w-48"
              placeholder="Enter name"
            />
          </div>
        )}

        {/* Romantic Date */}
        {selected === "Romantic Date" && (
          <div className="mt-6 flex gap-4">
            <div className="flex flex-col">
              <label className="text-sm text-gray-700">Your Nickname</label>
              <input
                value={yourNick}
                onChange={(e) => setYourNick(e.target.value)}
                className="border rounded px-3 py-2 w-48"
                maxLength={8}
                placeholder="Your nickname"
              />
              <span className="text-xs text-gray-500">
                {yourNick.length}/8 characters
              </span>
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-700">Partner's Nickname</label>
              <input
                value={partnerNick}
                onChange={(e) => setPartnerNick(e.target.value)}
                className="border rounded px-3 py-2 w-48"
                maxLength={8}
                placeholder="Partner's nickname"
              />
              <span className="text-xs text-gray-500">
                {partnerNick.length}/8 characters
              </span>
            </div>
          </div>
        )}

        {/* Marriage Proposal */}
        {selected === "Marriage Proposal" && (
          <div className="mt-6 flex gap-4">
            <div className="flex flex-col">
              <label className="text-sm text-gray-700">Your Nickname</label>
              <input
                value={yourNick}
                onChange={(e) => setYourNick(e.target.value)}
                className="border rounded px-3 py-2 w-48"
                maxLength={8}
                placeholder="Your nickname"
              />
              <span className="text-xs text-gray-500">
                {yourNick.length}/8 characters
              </span>
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-700">Partner's Nickname</label>
              <input
                value={partnerNick}
                onChange={(e) => setPartnerNick(e.target.value)}
                className="border rounded px-3 py-2 w-48"
                maxLength={8}
                placeholder="Partner's nickname"
              />
              <span className="text-xs text-gray-500">
                {partnerNick.length}/8 characters
              </span>
            </div>
          </div>
        )}

        {/* Love Proposal */}
        {selected === "Love Proposal" && (
          <div className="mt-6 flex gap-4">
            <div className="flex flex-col">
              <label className="text-sm text-gray-700">Your Nickname</label>
              <input
                value={yourNick}
                onChange={(e) => setYourNick(e.target.value)}
                className="border rounded px-3 py-2 w-48"
                maxLength={8}
                placeholder="Your nickname"
              />
              <span className="text-xs text-gray-500">
                {yourNick.length}/8 characters
              </span>
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-700">Partner's Nickname</label>
              <input
                value={partnerNick}
                onChange={(e) => setPartnerNick(e.target.value)}
                className="border rounded px-3 py-2 w-48"
                maxLength={8}
                placeholder="Partner's nickname"
              />
              <span className="text-xs text-gray-500">
                {partnerNick.length}/8 characters
              </span>
            </div>
          </div>
        )}

        {/* Baby Shower */}
        {selected === "Baby Shower" && (
          <div className="mt-6">
            <label className="text-sm text-gray-700">Mom's Name</label>
            <br />
            <input
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              className="border rounded px-3 py-2 w-48"
              placeholder="Enter name"
            />
          </div>
        )}

        {/* Congratulations */}
        {selected === "Congratulations" && (
          <div className="mt-6">
            <label className="text-sm text-gray-700">Person's Name</label>
            <br />
            <input
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              className="border rounded px-3 py-2 w-48"
              placeholder="Enter name"
            />
          </div>
        )}

        {/* Anniversary */}
        {selected === "Anniversary" && (
          <div className="mt-6 flex gap-4">
            <div className="flex flex-col">
              <label className="text-sm text-gray-700">Your Name</label>
              <input
                value={yourName}
                onChange={(e) => setYourName(e.target.value)}
                className="border rounded px-3 py-2 w-48"
                placeholder="Your name"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-700">Partner's Name</label>
              <input
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                className="border rounded px-3 py-2 w-48"
                placeholder="Partner's name"
              />
            </div>
          </div>
        )}

        {/* Special Request Field (for all occasions) */}
        <div className="mt-6">
          <label className="text-sm text-gray-700">Special Requests (Optional)</label>
          <textarea
            value={specialRequest}
            onChange={(e) => setSpecialRequest(e.target.value)}
            className="border rounded px-3 py-2 w-full"
            placeholder="Any special requests or notes..."
            rows={3}
          />
        </div>

        <div className="mt-2 text-yellow-600 text-sm">
          <p>
            ⚠ Decorations are not customizable. Please select predefined
            add-ons in the next window.
          </p>
          <p>⚠ Maximum 8 characters allowed for nickname</p>
        </div>
      </div>

      {/* Right Section - Summary */}
      <div className="w-full lg:w-1/3 border rounded-lg p-4 shadow">
        <h3 className="text-lg font-medium mb-4">Total: ₹{data.total}</h3>
        <div className="text-sm border-t pt-4 space-y-2">
          <div className="flex justify-between">
            <span>Booking Name</span>
            <span>{data.bookingName}</span>
          </div>
          <div className="flex justify-between">
            <span>Location</span>
            <span>{data.location}</span>
          </div>
          <div className="flex justify-between">
            <span>Date</span>
            <span>{data.date}</span>
          </div>
          <div className="flex justify-between">
            <span>Time</span>
            <span>{data.time}</span>
          </div>
          <div className="flex justify-between">
            <span>Persons</span>
            <span>{data.persons}</span>
          </div>
          <div className="flex justify-between">
            <span>Base Price</span>
            <span>₹{data.basePrice}</span>
          </div>
          <div className="flex justify-between">
            <span>Decoration</span>
            <span>₹{data.decorationCost}</span>
          </div>
          <div className="flex justify-between">
            <span>WhatsApp Number</span>
            <span>{data.whatsapp}</span>
          </div>
          <div className="flex justify-between">
            <span>Email</span>
            <span>{data.email}</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Advance amount payable</span>
            <span>- ₹{data.advance}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Balance Amount</span>
            <span>₹{data.total - data.advance}</span>
          </div>
        </div>

        <button
          onClick={handleNext}
          className="mt-6 w-full bg-purple-700 hover:bg-purple-800 text-white py-2 rounded"
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

export default OccasionPage;

import React, { useState, useEffect } from "react";
import axios from "axios";

const firebaseURL = "https://partyform-e8f95-default-rtdb.firebaseio.com/slots";

const slots = [
  "9:00 AM - 12:00 PM",
  "12:00 PM - 5:00 PM",
  "5:00 PM - 9:00 PM",
  "9:00 PM - 1:00 AM"
];

const theaters = [
  "Paradise Theatre",
  "Stellar Theatre",
  "Platinum Theatre",
  "Carnival Theatre",
  "Majestic Theatre",
  "Scarlet Theatre (Couple)"
];

const currentYear = new Date().getFullYear();

const AdminSlotManager = () => {
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedTheatre, setSelectedTheatre] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchedSlots, setFetchedSlots] = useState(null);

  const generateYearSlots = async () => {
    if (!selectedTheatre || !selectedYear) {
      setStatus("⚠️ Select both year and theatre.");
      return;
    }

    setLoading(true);
    setStatus("Processing...");

    const start = new Date(`${selectedYear}-01-01`);
    const end = new Date(`${selectedYear}-12-31`);

    const dates = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split("T")[0];
      const slotData = {};
      slots.forEach((slot) => {
        const formatted = slot.replaceAll('.', '').replaceAll(' ', '_');
        slotData[formatted] = { available: true, bookedBy: null };
      });
      dates.push({ dateStr, slotData });
    }

    try {
      const promises = dates.map(({ dateStr, slotData }) =>
        axios.put(
          `${firebaseURL}/${selectedTheatre}/${dateStr}.json`,
          slotData
        )
      );
      await Promise.all(promises);
      setStatus(`✅ Slots generated for ${selectedTheatre} in ${selectedYear}`);
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to generate slots.");
    } finally {
      setLoading(false);
    }
  };

  const fetchSlotDetails = async () => {
    if (!selectedTheatre || !selectedDate) {
      setFetchedSlots(null);
      return;
    }

    try {
      const res = await axios.get(
        `${firebaseURL}/${selectedTheatre}/${selectedDate}.json`
      );
      setFetchedSlots(res.data || {});
    } catch (err) {
      console.error("Failed to fetch slots", err);
      setFetchedSlots(null);
    }
  };

  const toggleAvailability = async (slotKey) => {
    if (!selectedTheatre || !selectedDate) return;

    const newAvailability = !fetchedSlots[slotKey].available;
    const update = { ...fetchedSlots[slotKey], available: newAvailability };

    try {
      await axios.patch(
        `${firebaseURL}/${selectedTheatre}/${selectedDate}/${slotKey}.json`,
        update
      );
      setFetchedSlots((prev) => ({
        ...prev,
        [slotKey]: update
      }));
    } catch (err) {
      console.error("Error updating availability", err);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchSlotDetails();
    }
  }, [selectedDate, selectedTheatre]);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-4">Admin Slot Manager</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border p-2 rounded"
        >
          {[...Array(5)].map((_, i) => {
            const year = currentYear + i;
            return <option key={year}>{year}</option>;
          })}
        </select>

        <select
          value={selectedTheatre}
          onChange={(e) => setSelectedTheatre(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select Theatre</option>
          {theaters.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <button
        onClick={generateYearSlots}
        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Slots for Selected Year & Theatre"}
      </button>

      {status && <p className="mt-2 text-center text-sm text-gray-700">{status}</p>}

      {fetchedSlots && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Slot Availability on {selectedDate}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(fetchedSlots).map(([slotKey, data]) => (
              <div
                key={slotKey}
                className={`p-3 rounded border flex justify-between items-center ${
                  data.available ? "bg-green-100" : "bg-red-100"
                }`}
              >
                <span>{slotKey.replaceAll("_", " ")}</span>
                <button
                  onClick={() => toggleAvailability(slotKey)}
                  className={`px-3 py-1 text-sm rounded ${
                    data.available
                      ? "bg-red-500 text-white"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {data.available ? "Mark Unavailable" : "Mark Available"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 🔥 Delete Options */}
      <div className="mt-6 border-t pt-4">
        <h3 className="text-lg font-semibold mb-2">Delete Slot Data</h3>

        {/* Delete by Date */}
        <button
          onClick={async () => {
            if (!selectedTheatre || !selectedDate) return alert("Select theatre and date");
            try {
              await axios.delete(`${firebaseURL}/${selectedTheatre}/${selectedDate}.json`);
              setStatus(`🗑️ Deleted slots for ${selectedDate}`);
              setFetchedSlots(null);
            } catch (err) {
              console.error("Error deleting date", err);
              setStatus("❌ Failed to delete selected date.");
            }
          }}
          className="w-full mb-2 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
        >
          Delete Slots for Selected Date
        </button>

        {/* Delete by Month */}
        <button
          onClick={async () => {
            if (!selectedTheatre || !selectedYear) return alert("Select theatre and year");

            const month = prompt("Enter month number (1-12):");
            if (!month || month < 1 || month > 12) return alert("Invalid month");

            const paddedMonth = month.toString().padStart(2, "0");
            setLoading(true);
            setStatus("Deleting month data...");

            try {
              const res = await axios.get(`${firebaseURL}/${selectedTheatre}.json`);
              const data = res.data || {};
              const deletes = Object.keys(data)
                .filter((date) => date.startsWith(`${selectedYear}-${paddedMonth}`))
                .map((date) =>
                  axios.delete(`${firebaseURL}/${selectedTheatre}/${date}.json`)
                );

              await Promise.all(deletes);
              setStatus(`🗑️ Deleted all slots for ${selectedYear}-${paddedMonth}`);
            } catch (err) {
              console.error("Error deleting month", err);
              setStatus("❌ Failed to delete month.");
            } finally {
              setLoading(false);
            }
          }}
          className="w-full mb-2 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
        >
          Delete Entire Month
        </button>

        {/* Delete by Year */}
        <button
          onClick={async () => {
            if (!selectedTheatre || !selectedYear) return alert("Select theatre and year");

            const confirmDelete = window.confirm(
              `Are you sure you want to delete all slot data for ${selectedTheatre} in ${selectedYear}?`
            );
            if (!confirmDelete) return;

            setLoading(true);
            setStatus("Deleting year data...");

            try {
              const res = await axios.get(`${firebaseURL}/${selectedTheatre}.json`);
              const data = res.data || {};
              const deletes = Object.keys(data)
                .filter((date) => date.startsWith(`${selectedYear}-`))
                .map((date) =>
                  axios.delete(`${firebaseURL}/${selectedTheatre}/${date}.json`)
                );

              await Promise.all(deletes);
              setStatus(`🗑️ Deleted all slots for ${selectedYear}`);
              setFetchedSlots(null);
            } catch (err) {
              console.error("Error deleting year", err);
              setStatus("❌ Failed to delete year.");
            } finally {
              setLoading(false);
            }
          }}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
        >
          Delete Entire Year
        </button>
      </div>
    </div>
  );
};

export default AdminSlotManager;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Booking from "./components/Booking";
import BookOnline from "./components/BookOnline";
import BookingDetails from "./components/BookingDetails";
import OccasionPage from "./components/OccasionPage";
import AddOnPageTwo from "./components/AddOnPageTwo"; // optional
import CakeAddOnPage from "./components/CakeAddOnPage";
import Confirmation from "./components/Confirmation";
import ConfirmationPageTwo from "./components/ConfirmationPageTwo";
import AdminBookingViaCall from './adminPages/AdminBookingViaCall';
import AdminWaitlist from "./adminPages/AdminWaitlist";
import AdminConfirm   from "./adminPages/AdminConfirm"
import AdminSlotManager from "./adminPages/AdminSlotManager"
import HeroCarousel from "./components/HeroCarousel";
import Footer from "./components/Footer";
import Navbar from "./components/NavBar";
import AboutPage from "./components/AboutPage";
import RefundPolicy from "./components/RefundPolicy";
import AddOnsPage from "./components/AddOn";
import PrivacyPolicy from "./components/PrivacyPolicy";




function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element = {<AboutPage/>}/>
        <Route path="/refund" element = {<RefundPolicy/>}/>
        <Route path="/add" element = {<AddOnsPage/>}/>
        <Route path="/privacy" element = {<PrivacyPolicy />}/>
        <Route path="/booking" element={<Booking />} />
        <Route path="/book-online" element={<BookOnline />} />
        <Route path="/booking-details" element={<BookingDetails />} />
        <Route path="/occasion" element={<OccasionPage />} />
        <Route path="/addons" element={<CakeAddOnPage />} /> {/* optional */}
        <Route path="/addons-step2" element={<AddOnPageTwo />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/confirmationtwo" element={<ConfirmationPageTwo />} />
        <Route path="/adminBookingViaCall" element={<AdminBookingViaCall />} />
        <Route path="/adminWaitlist" element={<AdminWaitlist />} />
        <Route path="/adminConfirm"  element={<AdminConfirm/>} />
        <Route path="/adminslot"  element={<AdminSlotManager/>} />
        <Route path="/hero"    element={< HeroCarousel/>}/>
      </Routes>
      <Footer></Footer>
    </Router>
  );
}

export default App;

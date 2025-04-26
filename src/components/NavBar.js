import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-blue-950 text-white">
      {/* Top banner */}
      <div className="bg-orange-600 py-2 text-white text-center text-sm md:text-base">
        <div className="container mx-auto flex justify-center items-center gap-4 md:gap-8 flex-wrap">
          <div className="flex items-center">
            <i className="pi pi-phone mr-2"></i>
            <span>KPHB: 7075 456 456</span>
          </div>
          <div className="flex items-center">
            <i className="pi pi-phone mr-2"></i>
            <span>Manikonda: 7103 456 456</span>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <a href="#" className="hover:text-orange-200 transition-colors">
              <i className="pi pi-facebook text-lg"></i>
            </a>
            <a href="#" className="hover:text-orange-200 transition-colors">
              <i className="pi pi-instagram text-lg"></i>
            </a>
            <a href="#" className="hover:text-orange-200 transition-colors">
              <i className="pi pi-youtube text-lg"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto px-4 md:px-6 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-orange-500 font-bold text-2xl md:text-3xl">PARTY</span>
            <span className="text-orange-400 font-bold text-2xl md:text-3xl">BASH</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="font-medium hover:text-orange-400">Home</Link>
            <Link to="/about" className="font-medium hover:text-orange-400">Who we are</Link>
            <Link to="/booking" className="font-medium hover:text-orange-400">Booking</Link>
            {/* <Link to="/gallery" className="font-medium hover:text-orange-400">Gallery</Link> */}
            <Link to="/refund" className="font-medium hover:text-orange-400">Refund Policy</Link>
            <Link to="/add" className="font-medium hover:text-orange-400">Add On's</Link>
            <Link to="/privacy" className="font-medium hover:text-orange-400">Privacy Policy</Link>
          </nav>

          {/* Book Button */}
          <Link 
            to="/booking" 
            className="hidden md:block bg-orange-500 text-white px-6 py-2 rounded-full font-medium hover:bg-orange-600 transform hover:scale-105 transition-all"
          >
            Book Now!
          </Link>

          {/* Mobile Menu Toggle - Hamburger Button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="space-y-2">
              <span className={`block h-0.5 w-6 bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block h-0.5 w-6 bg-white transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-0.5 w-6 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`${isMenuOpen ? 'max-h-96' : 'max-h-0'} md:hidden overflow-hidden transition-all duration-300 ease-in-out`}>
          <nav className="flex flex-col gap-4 pt-4 pb-4">
            <Link to="/" className="font-medium hover:text-orange-400 py-2 border-b border-blue-900" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/about" className="font-medium hover:text-orange-400 py-2 border-b border-blue-900" onClick={() => setIsMenuOpen(false)}>Who we are</Link>
            <Link to="/booking" className="font-medium hover:text-orange-400 py-2 border-b border-blue-900" onClick={() => setIsMenuOpen(false)}>Booking</Link>
            {/* <Link to="/gallery" className="font-medium hover:text-orange-400 py-2 border-b border-blue-900" onClick={() => setIsMenuOpen(false)}>Gallery</Link> */}
            <Link to="/refund" className="font-medium hover:text-orange-400 py-2 border-b border-blue-900" onClick={() => setIsMenuOpen(false)}>Refund Policy</Link>
            <Link to="/add" className="font-medium hover:text-orange-400 py-2 border-b border-blue-900" onClick={() => setIsMenuOpen(false)}>Add On's</Link>
            <Link to="/privacy" className="font-medium hover:text-orange-400 py-2 border-b border-blue-900" onClick={() => setIsMenuOpen(false)}>Privacy Policy</Link>
            <Link 
              to="/booking" 
              className="bg-orange-500 text-white px-6 py-2 rounded-full font-medium hover:bg-orange-600 transform hover:scale-105 self-start mt-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Book Now!
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
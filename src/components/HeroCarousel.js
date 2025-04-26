import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const HeroCarousel = () => {
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=1470&auto=format&fit=crop',
      title: "Let's create",
      subtitle: "Magic together",
      highlight: "✨"
    },
    {
      image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1470&auto=format&fit=crop',
      title: "Unforgettable",
      subtitle: "Party experiences",
      highlight: "🎉"
    },
    {
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1470&auto=format&fit=crop',
      title: "Celebrate in style",
      subtitle: "Premium party venues",
      highlight: "🥂"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef(null);

  const startSlideInterval = () => {
    stopSlideInterval();
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
  };

  const stopSlideInterval = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
      slideInterval.current = null;
    }
  };

  useEffect(() => {
    startSlideInterval();
    return () => stopSlideInterval();
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    startSlideInterval();
  };

  return (
    <div className="relative w-full h-screen max-h-[800px] overflow-hidden">
      {/* Carousel Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image with Gradient Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center transform scale-110 group-hover:scale-100 transition-transform duration-10000 ease-linear"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-950/80 via-blue-950/60 to-blue-950/30"></div>
          </div>

          {/* Floating Decorative Elements */}
          <div className="absolute -left-20 -top-20 w-72 h-72 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-[80px] animate-float"></div>
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-gradient-to-br from-orange-400/20 to-pink-400/20 blur-[80px] animate-float-delay"></div>
          
          {/* Animated Confetti Elements */}
          <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-yellow-400 rounded-full opacity-70 animate-confetti-1"></div>
          <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-pink-400 rounded-full opacity-70 animate-confetti-2"></div>
          <div className="absolute bottom-1/4 left-1/3 w-5 h-5 bg-blue-400 rounded-full opacity-70 animate-confetti-3"></div>

          {/* Content */}
          <div className="relative z-20 h-full container mx-auto px-6 flex flex-col justify-center">
            <div className="max-w-2xl">
              <div className="inline-block px-4 py-2 mb-6 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <h2 className="text-white font-medium text-lg md:text-xl animate-fadeInUp">
                  Welcome to the home of unforgettable parties!
                </h2>
              </div>
              
              <div className="mb-8">
                <h1 className="text-white font-bold text-5xl md:text-6xl lg:text-7xl mb-3 animate-fadeInUp animation-delay-300">
                  {slide.title} <span className="text-yellow-400">{slide.highlight}</span>
                </h1>
                <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 font-bold text-5xl md:text-6xl lg:text-7xl mb-6 animate-fadeInUp animation-delay-500">
                  {slide.subtitle}
                </h1>
              </div>
              
              <div className="flex flex-wrap gap-4 animate-fadeInUp animation-delay-700">
                <Link
                  to="/booking"
                  className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-4 rounded-full font-bold hover:shadow-lg hover:shadow-orange-500/30 transition-all transform hover:scale-105 group"
                >
                  <span className="relative z-10">Book Now</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Link>
                <Link
                  to="/contact"
                  className="relative overflow-hidden bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 hover:border-white/50 transition-all group"
                >
                  <span className="relative z-10">Book via Call</span>
                  <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-gradient-to-r from-orange-400 to-pink-500 w-8 shadow-[0_0_10px_rgba(251,146,60,0.7)]'
                : 'bg-white/50 hover:bg-white/80 w-3'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
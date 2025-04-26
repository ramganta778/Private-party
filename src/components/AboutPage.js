import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80 z-0"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 z-0"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1470&auto=format&fit=crop')" }}
        ></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Our <span className="text-yellow-400">Story</span> & Passion
              </h1>
              <p className="text-lg text-white/90 mb-8 max-w-lg">
                Discover the heart behind Party Bash and what makes our celebrations truly magical.
              </p>
              <Link 
                to="/booking" 
                className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-full font-bold hover:shadow-lg hover:shadow-orange-500/30 transition-all transform hover:scale-105"
              >
                Book Your Celebration
              </Link>
            </div>
            
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl blur-lg opacity-30"></div>
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://party-bash.com/wp-content/uploads/2024/04/1-1-200x200.jpg" 
                    alt="Party Bash Founder" 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder's Message */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-block px-4 py-2 mb-4 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
              Founder's Vision
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              A Message From Our Founder
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mb-8"></div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/3 flex justify-center">
              <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-xl">
                <img 
                  src="https://party-bash.com/wp-content/uploads/2024/04/1-1-200x200.jpg" 
                  alt="Party Bash Founder" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
              </div>
            </div>
            
            <div className="lg:w-2/3">
              <blockquote className="relative">
                <div className="absolute -top-6 -left-6 text-7xl text-blue-100 font-serif">"</div>
                <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed relative z-10">
                  Step into the world of Party Bash, where imagination knows no bounds. With our expertise and attention to detail, we're here to make your event planning experience seamless and stress-free. Trust us to deliver an unforgettable celebration that reflects your unique style and personality.
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mr-4"></div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">Founder, Party Bash</h4>
                    <p className="text-blue-600">Creating Memories Since 2024</p>
                  </div>
                </div>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Our Resources Section */}
      <section className="py-20 bg-gradient-to-b from-blue-900 to-blue-950 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">Why Choose</span> Party Bash?
            </h2>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto">
              We provide everything you need for an extraordinary celebration
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-orange-400/30 transition-all hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-white mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Premium Theater Experience</h3>
              <p className="text-blue-200">
                Indulge in your favorite movies and shows on our expansive screens with pristine 4K video quality.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-orange-400/30 transition-all hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-white mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Dolby Atmos Sound</h3>
              <p className="text-blue-200">
                Immerse yourself in top-notch audio with our state-of-the-art Dolby Atmos compliant sound systems.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-orange-400/30 transition-all hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-white mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">All-Inclusive Packages</h3>
              <p className="text-blue-200">
                Celebrate milestones like birthdays and anniversaries with our hassle-free all-inclusive event packages.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <Link
              to="/booking"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full font-bold hover:shadow-lg hover:shadow-orange-500/30 transition-all transform hover:scale-105"
            >
              Explore Our Services
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-pink-500">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Create Unforgettable Memories?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let us handle the details while you enjoy the celebration with your loved ones.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/booking"
              className="px-8 py-4 bg-white text-orange-600 rounded-full font-bold hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              Book Your Event Now
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-all"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
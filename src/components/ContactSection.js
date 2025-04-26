import React from 'react';
import { Link } from 'react-router-dom';

const ContactSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
            We are here to help you
          </h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Contact Info */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-3">Our Locations</h4>
              
              <div className="mb-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-orange-100 p-3 rounded-full text-orange-500">
                    <i className="pi pi-map-marker text-xl"></i>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-1">Party-Bash (2nd Floor, Above Neeru's, Opposite Challagulla Food Court)</h5>
                    <p className="text-gray-600">Near CarOn Mall, Telangana 500072</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-full text-orange-500">
                    <i className="pi pi-map-marker text-xl"></i>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-1">Party-Bash Manikonda 301, Kavyashree Nilaya</h5>
                    <p className="text-gray-600">Hyderabad, Telangana 500089</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-orange-100 p-3 rounded-full text-orange-500">
                  <i className="pi pi-envelope text-xl"></i>
                </div>
                <div>
                  <h5 className="font-semibold">Email Address</h5>
                  <a href="mailto:info@party-bash.com" className="text-blue-600 hover:underline">info@party-bash.com</a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-orange-100 p-3 rounded-full text-orange-500">
                  <i className="pi pi-phone text-xl"></i>
                </div>
                <div>
                  <h5 className="font-semibold">Phone Numbers</h5>
                  <a href="tel:+917075456456" className="text-blue-600 hover:underline block">+91 7075 456 456</a>
                  <a href="tel:+917103456456" className="text-blue-600 hover:underline block">+91 7103 456 456</a>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center gap-4 mt-8">
              <Link 
                to="/booking" 
                className="bg-orange-500 text-white px-6 py-3 rounded-full font-medium hover:bg-orange-600 transition-all transform hover:scale-105"
              >
                Book Now
              </Link>
              <a 
                href="tel:+917075456456" 
                className="bg-blue-900 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-800 transition-all"
              >
                Call Us
              </a>
            </div>
          </div>
          
          {/* Map */}
          <div className="h-[400px] rounded-lg overflow-hidden shadow-md">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.3039112760045!2d78.3845!3d17.4449!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI2JzQxLjYiTiA3OMKwMjMnMDQuMiJF!5e0!3m2!1sen!2sin!4v1650450351232!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Party Bash Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

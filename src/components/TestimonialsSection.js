import { useState, useEffect, useRef } from 'react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      text: "Hosting our event at party theatre was a great decision. The ambiance was magical, the affordability was unbeatable and the overall experience far exceeded our expectations.",
      author: "Sathishna"
    },
    {
      text: "The quality of service and facilities at the party theatre was exceptional. From the decor to the sound system, everything was top-notch!",
      author: "Satiya Sree"
    },
    {
      text: "I was amazed by the affordable rates to book the party theatre. It allowed us to host a fantastic event without stretching our budget.",
      author: "Rudra"
    },
    {
      text: "The venue was perfect for our anniversary celebration. The staff was very accommodating and helped make our special day even more memorable.",
      author: "Aarav Patel"
    },
    {
      text: "The attention to detail was impressive. Everything from lighting to acoustics was perfectly set up for our corporate event.",
      author: "Priya Sharma"
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonialInterval = useRef(null);

  const startTestimonialInterval = () => {
    stopTestimonialInterval();
    testimonialInterval.current = setInterval(() => {
      setCurrentTestimonial((prev) => 
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);
  };

  const stopTestimonialInterval = () => {
    if (testimonialInterval.current) {
      clearInterval(testimonialInterval.current);
      testimonialInterval.current = null;
    }
  };

  useEffect(() => {
    startTestimonialInterval();
    return () => stopTestimonialInterval();
  }, []);

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
    startTestimonialInterval();
  };

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
            Client Testimonials
          </h3>
        </div>
        
        <div className="relative max-w-4xl mx-auto overflow-hidden">
          {/* Testimonials */}
          <div className="relative min-h-[200px]">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute transition-all duration-700 ease-in-out transform w-full ${
                  index === currentTestimonial
                    ? 'opacity-100 translate-x-0'
                    : index < currentTestimonial
                    ? 'opacity-0 -translate-x-full'
                    : 'opacity-0 translate-x-full'
                }`}
              >
                <div className="text-center p-6">
                  <div className="mb-6 flex justify-center">
                    <span className="text-orange-500 text-6xl">"</span>
                  </div>
                  <p className="text-gray-700 text-lg md:text-xl italic mb-6">
                    {testimonial.text}
                  </p>
                  <p className="text-blue-900 font-bold">{testimonial.author}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentTestimonial
                    ? 'bg-orange-500 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

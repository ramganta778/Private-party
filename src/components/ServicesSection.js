import { Link } from 'react-router-dom';

const ServiceCard = ({ title, image }) => {
  return (
    <Link 
      to={`/services/${title.toLowerCase().replace(/\s+/g, '-')}`}
      className="group block overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      </div>
      <div className="absolute bottom-0 w-full p-4 text-center">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
    </Link>
  );
};

const ServicesSection = () => {
  const services = [
    { 
      title: "Decoration", 
      image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=1470&auto=format&fit=crop" 
    },
    { 
      title: "Floral", 
      image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1373&auto=format&fit=crop" 
    },
    { 
      title: "Photography", 
      image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1470&auto=format&fit=crop" 
    },
    { 
      title: "Food and Beverages", 
      image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=1472&auto=format&fit=crop" 
    },
    { 
      title: "Cakes", 
      image: "https://ocakes.in/storage/app/public/images/item/item-667ab251cac30.webp" 
    },
    { 
      title: "Theatres", 
      image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1470&auto=format&fit=crop" 
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h3 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
            What we offer
          </h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} title={service.title} image={service.image} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

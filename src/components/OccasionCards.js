import { Link } from 'react-router-dom';

const OccasionCard = ({ title, image }) => {
  return (
    <Link 
      to={`/booking?occasion=${title.toLowerCase()}`}
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

const OccasionCards = () => {
  const occasions = [
    { 
      title: "Anniversary", 
      image: "https://rukminim2.flixcart.com/image/850/1000/kn0n6a80/birthday-combo/o/5/d/54-pcs-happy-anniversary-letters-foil-balloons-with-hd-metallic-original-imagfsggerp5shgt.jpeg?q=20&crop=false" 
    },
    { 
      title: "Bachelorette Parties", 
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1374&auto=format&fit=crop" 
    },
    { 
      title: "Birthday Parties", 
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1470&auto=format&fit=crop" 
    },
    { 
      title: "Proposal", 
      image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1470&auto=format&fit=crop" 
    },
    { 
      title: "Baby Shower", 
      image: "https://images.pexels.com/photos/3593432/pexels-photo-3593432.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" 
    },
    { 
      title: "Dates and Proposals", 
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1469&auto=format&fit=crop" 
    },
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold">Hello there!</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-blue-900 mt-2 mb-6">
            Celebrate occasions with our private theatre experience.
          </h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {occasions.map((occasion, index) => (
            <OccasionCard key={index} title={occasion.title} image={occasion.image} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OccasionCards;

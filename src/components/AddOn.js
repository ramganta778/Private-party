import { useState } from 'react';

const AddOnsPage = () => {
  const [activeTab, setActiveTab] = useState('decorations');
  const [hoveredItem, setHoveredItem] = useState(null);

  const addOnsData = {
    decorations: {
      title: "Extra Decorations",
      items: [
        { name: 'Fog Effect', image: '/images/fogeffect.png' },
        { name: 'Photo Clippings (16 Pics)', image: '/images/photoclippings.jpg' },
        { name: 'Cold Fire (2 pieces)', image: '/images/cold_fire.webp' },
        { name: 'Cold Fire (4 pieces)', image: '/images/cold_fire (1).webp' },
        { name: 'Candle Path', image: '/images/Candle Path (Rs 300).png' },
        { name: 'Party Props', image: '/images/partyprops.jpg' },
        { name: 'LED Numbers', image: '/images/lednumbers.jpg' },
        { name: 'HBD Letters', image: '/images/hbdletters.jpg' }
      ]
    },
    roses: {
      title: "Roses",
      items: [
        { name: 'Single Rose', image: '/images/singleflower.jpg' },
        { name: 'Rose Bouquet', image: '/images/rosebouquet.png' }
      ]
    },
    photography: {
      title: "Photography (soft copies only)",
      items: [
        { name: 'Photography - 20 pics', image: '/images/photo20.jpeg' },
        { name: 'Photography - 50 pics', image: '/images/photo50.jpeg' },
        { name: 'Photography - 75 pics', image: '/images/photo75.jpeg' },
        { name: 'Photography - 100 pics', image: '/images/photo100.jpeg' }
      ]
    },
    cakes: {
      title: "Cakes",
      items: [
        { name: 'Vanilla', image: '/images/vanillacake.jpg', eggless: true },
        { name: 'Strawberry', image: '/images/strawberrycake.jpg', eggless: true },
        { name: 'Butterscotch', image: '/images/butterscotchcake.jpg', eggless: false },
        { name: 'Pineapple', image: '/images/pineapplecake.jpg', eggless: true },
        { name: 'Mango Crush', image: '/images/mangocrushcake.png', eggless: true },
        { name: 'Chocolate', image: '/images/chocolatecake.jpg', eggless: false },
        { name: 'Dark Chocolate', image: '/images/darkchoclatecake.jpg', eggless: false },
        { name: 'Black Forest', image: '/images/blackforestcake.jpg', eggless: false },
        { name: 'White Forest', image: '/images/whiteforestcake.jpg', eggless: true },
        { name: 'Chocochips', image: '/images/chocochipscake.jpg', eggless: false },
        { name: 'Blueberry', image: '/images/blueberrycake.jpg', eggless: true },
        { name: 'Dry Fruit', image: '/images/dryfruitcake.jpg', eggless: true },
        { name: 'Almond Crunch', image: '/images/almondcrunchcake.jpeg', eggless: false },
        { name: 'Chocolate Coffee', image: '/images/choclatecoffeecake.jpg', eggless: false },
        { name: 'Chocolate Truffle', image: '/images/chocolatetrufflecake.png', eggless: false },
        { name: 'Kitkat Chocolate', image: '/images/kitkatchoclatecake.jpg', eggless: true },
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-blue-950">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80 z-0"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10 z-0"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1374&auto=format&fit=crop')" }}
        ></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Our <span className="text-yellow-400">Add-Ons</span>
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Enhance your celebration with these special extras
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="py-8 bg-white sticky top-0 z-20 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {Object.keys(addOnsData).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg'
                    : 'bg-white text-blue-900 hover:bg-blue-50 border border-blue-100'
                }`}
              >
                {addOnsData[tab].title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Add-Ons Gallery */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
            {addOnsData[activeTab].title}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {addOnsData[activeTab].items.map((item, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-500 hover:shadow-xl"
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      hoveredItem === index ? 'scale-110' : 'scale-100'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  {activeTab === 'cakes' && item.eggless && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      Eggless
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 flex items-end p-5">
                  <div className={`transform transition-all duration-500 ${
                    hoveredItem === index ? 'translate-y-0' : 'translate-y-10'
                  }`}>
                    <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
                    <div className="w-12 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mb-3"></div>
                    <button className="text-white/80 hover:text-white transition-colors duration-300 flex items-center">
                      Inquire about this
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-b from-blue-900 to-blue-950 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Want to know more about our add-ons?
          </h2>
          <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
            Contact us for detailed information and availability
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full font-bold hover:shadow-lg hover:shadow-orange-500/30 transition-all transform hover:scale-105">
              WhatsApp Us
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-all">
              Call Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddOnsPage;
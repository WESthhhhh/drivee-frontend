import { Link } from 'react-router-dom';
import heroImage from '../assets/image1.png';
import feature1Icon from '../assets/add.png';
import feature2Icon from '../assets/arrow.png';
import feature3Icon from '../assets/star.png';

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <img 
          src={heroImage} 
          alt="Car rental service" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-white px-6 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Premium Car Rentals Made Simple
          </h1>
          <p className="text-xl mb-8">
            Discover the perfect vehicle for your journey at unbeatable prices
          </p>
          <Link 
            to="/offers" 
            className="bg-primary hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors duration-300 inline-block"
          >
            Browse Cars
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're redefining car rental with premium service and transparent pricing
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: feature1Icon,
              title: "Easy Booking",
              description: "Reserve your car in just 3 simple steps"
            },
            {
              icon: feature2Icon,
              title: "Best Prices",
              description: "Guanteed lowest rates or we'll match it"
            },
            {
              icon: feature3Icon,
              title: "24/7 Support",
              description: "Our team is always ready to assist you"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
              <img src={feature.icon} alt="" className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Vehicles */}
      <section className="py-16 px-4 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">Our Popular Vehicles</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              model: "Toyota Camry",
              type: "Sedan",
              price: "$45/day",
              image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2"
            },
            {
              model: "Ford Explorer",
              type: "SUV",
              price: "$65/day",
              image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d"
            },
            {
              model: "Mercedes E-Class",
              type: "Luxury",
              price: "$99/day",
              image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8"
            }
          ].map((car, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md hover:scale-[1.02] transition-transform duration-300">
              <img src={car.image} alt={car.model} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold">{car.model}</h3>
                <div className="flex justify-between mt-2 text-gray-600">
                  <span>{car.type}</span>
                  <span className="font-medium">{car.price}</span>
                </div>
                <Link 
                  to={`/offers?model=${car.model.toLowerCase().replace(' ', '-')}`}
                  className="mt-4 inline-block text-primary hover:text-b500 font-medium"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready for Your Next Adventure?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of satisfied customers who've traveled with confidence
        </p>
        <div className="space-x-4">
          <Link 
            to="/offers" 
            className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg text-lg font-medium inline-block"
          >
            Book Now
          </Link>
          <Link 
            to="/contact" 
            className="border-2 border-white hover:bg-white/10 px-8 py-3 rounded-lg text-lg font-medium inline-block"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import img1 from '../../assets/home-1.png';
import img2 from '../../assets/home-2.png';
import big_circle from '../../assets/home-ellipse.png';
import sm1 from '../../assets/home-elli-b.png';
import sm2 from '../../assets/home-elli-t.png';
// import feature1Icon from '../../assets/feature1-icon.png';
// import feature2Icon from '../../assets/feature2-icon.png';
// import feature3Icon from '../../assets/feature3-icon.png';

const Hero = () => {
  const navigate = useNavigate();

  const handleMove = () => {
    navigate('/offers');
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative flex justify-center items-center text-center pt-36 pb-20 min-h-[170vh] xl:min-h-auto xl:pt-60 lg:pt-52">
        {/* Background elements */}
        <img src={big_circle} className="absolute top-0 right-0" alt="" />
        <img src={big_circle} className="absolute top-1/5 left-0 transform rotate-180" alt="" />
        <img src={sm2} className="absolute left-[13%] top-1/5" alt="" />
        <img src={sm1} className="absolute right-[2%] top-1/2" alt="" />
        
        <div className="relative z-10 w-full px-4 xl:px-40 lg:px-16 md:px-8 sm:px-4">
          <span className="text-[#7D838B] tracking-widest font-semibold relative z-10">Find. Book. Drive.</span>
          <h1 className="my-4 text-4xl font-medium relative z-10 sm:text-3xl">
            Refine Your Skills with <span className="text-[#0B247A] font-bold relative z-10">Drivee.</span> <br />
            <b className="font-bold">More Driving,</b> No Theory!
          </h1>
          <p className="max-w-[1100px] w-full leading-8 text-lg relative z-10 sm:text-base sm:leading-7">
            Already have your driving permit? <span className="text-[#0B247A] font-bold relative z-10">Drivee</span> helps you find the best <span className="text-[#0B247A] font-bold relative z-10">offers</span> for extra training hours in <span className="text-[#0B247A] font-bold relative z-10">Agadir</span>, so you can refine your driving skills and gain real road experience with professional instructors
          </p>
          
          <div className="mt-8 flex gap-4 justify-center relative z-10">
            <button 
              onClick={handleMove}
              className="px-4 py-2 text-base font-normal bg-[#0B247A] text-white rounded-lg hover:bg-[#0a1f66] transition-colors"
            >
              Browse Offers
            </button>
            <button className="px-4 py-2 text-base font-normal text-[#0B247A] border border-[#0B247A] rounded-lg bg-transparent hover:bg-[#0B247A] hover:text-white transition-colors">
              List Your Offers
            </button>
          </div>
          
          <div className="mt-24 flex justify-center items-center gap-6 relative z-10 lg:flex-col">
            <img src={img1} className="lg:max-w-full lg:w-full" alt="" />
            <img src={img2} className="lg:max-w-full lg:w-full" alt="" />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're redefining car rental with premium service and transparent pricing
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: feature1Icon,
              title: "Easy Booking",
              description: "Reserve your car in just 3 simple steps"
            },
            {
              icon: feature2Icon,
              title: "Best Prices",
              description: "Guaranteed lowest rates or we'll match it"
            },
            {
              icon: feature3Icon,
              title: "24/7 Support",
              description: "Our team is always ready to assist you"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
              <img src={feature.icon} alt={feature.title} className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Vehicles Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
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
                    className="mt-4 inline-block text-[#0B247A] hover:text-[#0a1f66] font-medium"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-[#0B247A] text-white text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready for Your Next Adventure?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who've traveled with confidence
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/offers" 
              className="bg-white text-[#0B247A] hover:bg-gray-100 px-8 py-3 rounded-lg text-lg font-medium inline-block transition-colors"
            >
              Book Now
            </Link>
            <Link 
              to="/contact" 
              className="border-2 border-white hover:bg-white/10 px-8 py-3 rounded-lg text-lg font-medium inline-block transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
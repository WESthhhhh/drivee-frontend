import React from 'react';
import Button from '../components/UI/button';
import { useNavigate, Link } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleMove = () => {
    navigate('/offers');
  };

  return (
    <div className="bg-light">
      {/* Hero Section */}
      <section className="relative flex justify-center items-center text-center pt-36 pb-20 min-h-[170vh] xl:min-h-auto xl:pt-60 lg:pt-52">
        {/* Background elements */}
        <img src="/images/home-ellipse.png" className="absolute top-0 right-0 w-auto h-auto" alt="background circle" />
        <img src="/images/home-ellipse.png" className="absolute top-1/5 left-0 transform rotate-180 w-auto h-auto" alt="background circle" />
        <img src="/images/home-elli-t.png" className="absolute left-[13%] top-1/5 w-auto h-auto" alt="small decorative element" />
        <img src="/images/home-elli-b.png" className="absolute right-[2%] top-1/2 w-auto h-auto" alt="small decorative element" /> 
        <div className="relative z-10 w-full px-4 xl:px-40 lg:px-16 md:px-8 sm:px-4 space-y-[30px]">
          <span className="text-inputtext tracking-widest font-semibold relative z-10">Find. Book. Drive.</span>
          <h1 className="my-4 text-4xl font-medium  relative z-10 sm:text-3xl">
            Refine Your Skills with <span className="text-primary font-bold relative z-10">Drivee.</span> <br />
            <b className="font-bold">More Driving,</b> No Theory!
          </h1>
          <p className="max-w-[1100px] w-full leading-8 text-lg relative z-10 sm:text-base sm:leading-7">
            Already have your driving permit? <span className="text-primary font-bold relative z-10">Drivee</span> helps you find the best <span className="text-primary font-bold relative z-10">offers</span> for extra training hours in <span className="text-primary font-bold relative z-10">Agadir</span>, so you can refine your driving skills and gain real road experience with professional instructors
          </p>
          
          <div className="mt-8 flex gap-4 justify-center relative z-10">
            <Button
                type="primary"
                onClick={() => navigate('/offers')}
            >Browse Offers
            </Button>
            <Button
                type="secondary"
                onClick={() => navigate('/offers')}
            >List Your Offers
            </Button>
          </div>
          
          <div className="mt-24 flex flex-col justify-center items-center gap-6 relative z-10 md:flex-row">
            <img src="/images/home-1.png" className="w-full  md:w-[430px] " alt="driving illustration" />
            <img src="/images/home-2.png" className="w-full  md:w-[430px]" alt="driving illustration" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Drivee</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're redefining driving practice with premium service and professional instructors
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "/images/feature1-icon.png",
                title: "Easy Booking",
                description: "Reserve your training session in just 3 simple steps"
              },
              {
                icon: "/images/feature2-icon.png",
                title: "Best Instructors",
                description: "Certified professionals with years of experience"
              },
              {
                icon: "/images/feature3-icon.png",
                title: "Flexible Hours",
                description: "Available 7 days a week from 8AM to 8PM"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
                <img src={feature.icon} alt={feature.title} className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Vehicles Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Available Training Vehicles</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                model: "Toyota Yaris",
                type: "Manual Transmission",
                price: "150 MAD/hour",
                image: "/images/car1.jpg"
              },
              {
                model: "Renault Clio",
                type: "Automatic Transmission",
                price: "180 MAD/hour",
                image: "/images/car2.jpg"
              },
              {
                model: "Peugeot 208",
                type: "Manual Transmission",
                price: "160 MAD/hour",
                image: "/images/car3.jpg"
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
                  <button 
                    onClick={() => navigate('/offers')}
                    className="mt-4 text-primary hover:text-[#0a1f66] font-medium"
                  >
                    Book Now →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Students Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                quote: "Drivee helped me gain confidence on the road. My instructor was patient and professional.",
                name: "Karim B.",
                rating: "★★★★★"
              },
              {
                quote: "The flexible scheduling made it easy to fit lessons around my work. Highly recommended!",
                name: "Amina T.",
                rating: "★★★★☆"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md">
                <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                <div className="flex justify-between items-center">
                  <span className="font-medium">{testimonial.name}</span>
                  <span className="text-yellow-400">{testimonial.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-light text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Improve Your Driving?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join hundreds of students who've gained confidence with Drivee
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => navigate('/offers')}
              className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg text-lg font-medium transition-colors"
            >
              Browse Instructors
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className="border-2 border-white hover:bg-white/10 px-8 py-3 rounded-lg text-lg font-medium transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
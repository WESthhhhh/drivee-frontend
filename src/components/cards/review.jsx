// components/ReviewSwiper.jsx
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa6';
import r1 from '/images/qoute.png';

const ReviewSwiper = ({ reviews }) => {
  const swiperRef = useRef(null);

  return (
    <div className="relative w-full max-w-[700px] mx-auto">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        onSwiper={(swiper) => { swiperRef.current = swiper }} 
        className="w-full md:max-w-[550px] relative mt-12"
      >
        {reviews.map((item, index) => (
          <SwiperSlide 
            key={index} 
            className="flex flex-row items-center justify-start p-4 px-8 py-5 md:py-10 border border-b50 rounded-small-md md:rounded-large-md gap-8 relative"
          >
            <img src={item.img} alt={item.name} className="w-16 h-16 rounded-full object-cover" />
            <div className="content ">
              <h3 className="text-primary font-bold">{item.name}</h3>
              <p className="text-left max-w-[300px] my-4">{item.description}</p>
              <div className="flex items-center">
                {item.stars.map((star) => (
                  <div key={star.id} className="text-primary text-xl">
                    {star.icon()}
                  </div>
                ))}
              </div>
            </div>
            <img src={r1} className="absolute top-12 right-4 md:right-14 w-8 h-8 md:w-12 md:h-12" alt="" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Arrow Icons - Mobile responsive */}
      <div 
        className="absolute right-0 top-0 md:right-5 md:top-1/2 block w-8 h-8 md:flex justify-center items-center bg-[#f5fbfb] rounded-full cursor-pointer z-[9999]"
        onClick={() => swiperRef.current?.slideNext()}
      >
        <FaArrowRight />
      </div>
      <div 
        className="absolute left-0 top-0 md:left-4 md:top-1/2 block w-8 h-8 md:flex justify-center items-center bg-[#f5fbfb] rounded-full cursor-pointer z-[9999]"
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <FaArrowLeft />
      </div>
    </div>
  );
};

export default ReviewSwiper;
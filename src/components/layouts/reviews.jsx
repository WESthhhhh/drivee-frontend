import ReviewSwiper from '../cards/review';
import { review } from '../../review'; // Your reviews data
import rainbow from '/images/rainbow.png'; // Your image
const ReviewsPage = () => {
  return (
    <div className="min-h-screen w-full mx-auto flex justify-between items-center relative px-4 lg:px-0">
        <img 
        src={rainbow} 
        className="absolute top-0 max-w-full w-full left-0" 
        alt="Decorative rainbow background" 
      />
      <div className="max-w-[1000px] w-full mx-auto relative z-10 mt-48 pb-20">
        <h1 className="text-2xl md:text-3xl font-bold text0text text-center">Hear from Our Happy Learners!</h1>
        <p className="text-inputtext leading-8 mt-8 text-center">
          Real experiences from learners who found the perfect driving school <br /> through Drivee!
        </p>
        
        <ReviewSwiper reviews={review} />
      </div>
    </div>
  );
};

export default ReviewsPage;
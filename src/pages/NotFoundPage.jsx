import { useNavigate } from 'react-router-dom';
import Button from '../components/UI/button';
import { motion } from 'framer-motion';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-light flex flex-col items-center justify-center p-6 text-center font-poppins relative overflow-hidden">
      {/* Animated Ellipses */}
      <motion.img 
        src="/images/home-ellipse.png" 
        className="absolute top-0 right-0 w-auto h-auto" 
        alt="background circle"
        animate={{
          y: [0, 20, 0],
          x: [0, 10, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
      
      <motion.img 
        src="/images/home-ellipse.png" 
        className="absolute top-1/5 left-0 transform rotate-180 w-auto h-auto" 
        alt="background circle"
        animate={{
          y: [0, -15, 0],
          x: [0, -10, 0],
          rotate: [180, 175, 180]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      <motion.img 
        src="/images/home-elli-t.png" 
        className="absolute left-[13%] top-1/5 w-auto h-auto" 
        alt="small decorative element"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 10, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "mirror"
        }}
      />
      
      <motion.img 
        src="/images/home-elli-b.png" 
        className="absolute right-[2%] top-1/2 w-auto h-auto" 
        alt="small decorative element"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 0.5
        }}
      />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full relative z-10 flex flex-col items-center"
      >
        {/* Animated 404 text */}
        <motion.div
          animate={{ 
            y: [-10, 10, -10],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 4,
            ease: "easeInOut"
          }}
          className="text-9xl font-bold text-primary mb-4"
        >
          404
        </motion.div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-text mb-6">
          Oops! Page Not Found
        </h1>
        
        <p className="text-xl text-inputtext mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        {/* Floating car elements */}
        <div className="relative mb-10 w-full flex justify-center">
          <motion.div
            animate={{
              x: [-50, 50, -50],
              y: [0, -20, 0],
              rotate: [0, 15, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute left-1/4"
          >
          </motion.div>
          
          <motion.div
            animate={{
              x: [50, -50, 50],
              y: [0, 20, 0],
              rotate: [0, -15, 0]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.5
            }}
            className="absolute right-1/4"
          >
            {/* <img 
              src="/images/car-icon-2.png" 
              alt="Car icon" 
              className="w-12 h-12"
              onError={(e) => e.target.src = '/images/default-car.png'}
            /> */}
          </motion.div>
        </div>
        
        <div className="w-full flex justify-center">
          <Button
            type="primary"
            onClick={() => navigate('/')}
            className=""
          >
            Return Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
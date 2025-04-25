import { IoIosStar } from 'react-icons/io';
import { IoIosStarOutline } from 'react-icons/io';
import r1 from '/images/simane-1.png'
import r2 from '/images/khaoula-1.png'

export const review = [
  {
    id: 1,
    img: r1,
    name: "Simane Id belkacem",
    description: " l’expérience a été excellente dans Drivee. L’équipe a été professionnelle, réactive, et le résultat a dépassé mes attentes.",
    stars: [
      { id: 1, icon: IoIosStar },
      { id: 2, icon: IoIosStar },
      { id: 3, icon: IoIosStar },
      { id: 4, icon: IoIosStar },
      { id: 5, icon: IoIosStarOutline }
    ]
  },
  {
    id: 2,
    img: r2,
    name: "khaoula Hassoune", 
    description: "I entrusted Drivee to sell my TAG Heuer, and the outcome was fantastic.",
    stars: [
      { id: 1, icon: IoIosStar },
      { id: 2, icon: IoIosStar },
      { id: 3, icon: IoIosStar },
      { id: 4, icon: IoIosStar },
      { id: 5, icon: IoIosStar }
    ]
  }
];

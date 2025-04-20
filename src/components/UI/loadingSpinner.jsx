import { FaSpinner } from 'react-icons/fa';

export default function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 min-h-[50vh]">
      <FaSpinner className="animate-spin text-[35px] md:text-4xl text-primary mb-4" />
      <p className="text-lg">{message}</p>
    </div>
  );
}
import { Heart } from "lucide-react";
import { useState } from "react";


const LikeButton = ({ onClick, className }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLike = () => {
    setIsAnimating(true);
    onClick();

    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  }

  return (
    <button onClick={handleLike}>
      <Heart className={`w-6 h-6 cursor-pointer transition-all duration-300 hover:text-red-500 ${isAnimating ? "scale-150" : "scale-100"} ${className}`} />
    </button>
  )
}

export default LikeButton;
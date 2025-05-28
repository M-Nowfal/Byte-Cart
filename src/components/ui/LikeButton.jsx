import { Heart } from "lucide-react";
import { useState } from "react";


const LikeButton = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setIsAnimating(true);

    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  }

  return (
    <button className="text-gray-400 hover:text-red-500" onClick={handleLike}>
      <Heart className={`w-6 h-6 cursor-pointer transition-all duration-300 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-400"} ${isAnimating ? "scale-150" : "scale-100"}`} />
    </button>
  )
}

export default LikeButton;
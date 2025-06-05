import Link from "next/link";
import { Star } from "lucide-react";
import { useContext, useState } from "react";
import { context } from "@/context/AppContext";
import { toast } from "sonner";
import axios from "axios";
import Loader from "../ui/Loader";

const ProductCard = ({ props, isRequestSend, setIsRequestSend }) => {
  const { byteCartUser, setNoOfCartItems } = useContext(context);
  const [isLoading, setIsLoading] = useState(false);

  const addToCart = async (userid) => {
    try {
      setIsLoading(true);
      setIsRequestSend(true);
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/addtocart/${userid}`, { productid: props._id, quantity: 1, amount: props.price });
      if (res.status === 201) {
        toast.success(res.data.message);
        setNoOfCartItems(prev => prev + 1);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add product to cart");
    } finally {
      setIsLoading(false);
      setIsRequestSend(false);
    }
  };

  return (
    <div className="card card-side bg-white border border-gray-400 w-[98%] sm:w-5/6">
      <Link href={`/product/${props._id}`} className="flex-shrink-0">
        <figure className="relative w-30 md:w-80 h-full bg-white border-r-1 rounded-2xl p-2 border-gray-300">
          <img
            src={props.images[0]}
            alt={props.tags?.[0] || props.name}
            className="w-30 md:w-full h-50 object-contain object-center p-2"
          />
          {!props.status && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              Out of Stock
            </div>
          )}
        </figure>
      </Link>
      <div className="card-body p-4">
        <Link href={`/product/${props._id}`} >
          <div className="flex justify-between items-start">
            <div>
              <span className="text-sm text-gray-500">{props.category}</span>
              <h2 className="card-title text-lg text-black line-clamp-2">{props.name}</h2>
              <span className="text-sm font-semibold text-gray-600">{props.barand}</span>
            </div>
            <div className="badge bg-pink-900 text-white">₹{props.price.toLocaleString()}</div>
          </div>

          <div className="flex items-center mt-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < Math.round(props.ratings) ? "currentColor" : "none"}
                  className={
                    i < Math.round(props.ratings)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">
              ({props.reviews?.length || 0} reviews)
            </span>
          </div>

          <p className="line-clamp-2 text-sm text-gray-600 mt-2">
            {props.description}
          </p>
        </Link>
        <div className="card-actions justify-between items-center mt-4">
          <div className="text-xs">
            {props.stock > 0 ? (
              <span className="text-green-600">{props.stock} in stock</span>
            ) : (
              <span className="text-red-600">Out of stock</span>
            )}
          </div>
          <button
            className="btn bg-primary text-white border-0 btn-sm w-25 disabled:opacity-75"
            disabled={!props.status || props.stock <= 0}
            onClick={() => {
              if (!byteCartUser) {
                toast.error("create a new account or login to add product");
                return;
              } else {
                !isLoading && !isRequestSend ? addToCart(byteCartUser.id) : toast.warning("Previous request is pending! wait to complete it");
              }
            }}
          >
            {isLoading && <Loader />}
            {!isLoading && (props.status && props.stock > 0 ? "Add to Cart" : "Unavailable")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
import Link from "next/link";
import Loader from "../ui/Loader";
import { useContext, useState } from "react";
import { toast } from "sonner";
import { context } from "@/context/AppContext";
import axios from "axios";

const WishLiastCard = ({ item, loading, setLoading, setWishList }) => {
  const [isRemoved, setIsRemoved] = useState(false);
  const { byteCartUser } = useContext(context);

  const removeFromWishList = async () => {
    if (loading) return;
    try {
      setLoading(true);
      setIsRemoved(true);
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/product/addtowishlist`, {
        data: { userid: byteCartUser?.id, productid: item._id },
        headers: { "Content-Type": "application/json" }
      });
      if (res.status === 200) {
        toast.success(res.data?.message);
        setWishList(prev => prev.filter(product => product._id !== item._id));
      }
    } catch (err) {
      console.log(err)
      toast.error(err.response?.data?.message || "Failed to remove product");
    } finally {
      setLoading(false);
      setIsRemoved(false);
    }
  };

  return (
    <div className="flex flex-row border-gray-400 mx-3 border-b sm:border sm:m-5 rounded-xl ">
      <Link
        href={`/product/${item._id}`}
        className="block relative w-35 sm:w-38 md:w-56 h-full flex-shrink-0 rounded-xl"
      >
        <img
          src={item.images[0]}
          alt={item.name}
          className="w-35 sm:w-50 object-contain pr-2 object-center transition-transform duration-300 group-hover:scale-105 border-r border-gray-300 mt-5 rounded-xl"
        />
      </Link>
      <div className="flex-1 p-4 sm:p-6 flex flex-col">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              {item.category}
            </span>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 line-clamp-2">
              {item.name}
            </h2>
            <span className="text-sm text-gray-600">{item.brand}</span>
            <span className={`text-sm ${item.stock > 0 ? "text-green-600" : "text-red-700"} line-clamp-1`}>{item.stock > 0 ? "In stock" : "Out of stock"}</span>
            <span className="font-semibold text-gray-700 mt-1 line-clamp-2">
              ₹{item.price}
            </span>
          </div>
        </div>
        <div className="flex justify-start gap-3 mt-2">
          <Link href={`/product/${item._id}`}><button className="btn btn-warning w-25 btn-sm">View Product</button></Link>
          <button className="btn btn-primary w-15 btn-sm" onClick={removeFromWishList} >
            {isRemoved ? <Loader /> : "Remove"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default WishLiastCard;
"use client";

import { context } from "@/context/AppContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import Skeleton from "../ui/Skeloton";
import Link from "next/link";

const UserWishListPage = () => {
  const { isLoading, setIsLoading, byteCartUser } = useContext(context);
  const [wishList, setWishList] = useState([]);

  const getWishList = async () => {
    try {
      const user = await JSON.parse(localStorage.getItem("byteCartUser"));
      setIsLoading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/getwishlist/${user.id}`);
      if (res.status === 200) {
        setWishList(res.data.wishlists);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to get wishlists");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getWishList();
  }, []);

  const removeFromWishList = async (productid) => {
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/product/addtowishlist`, {
        data: { userid: byteCartUser?.id, productid },
        headers: { "Content-Type": "application/json" }
      });
      if (res.status === 200) {
        toast.success(res.data?.message);
        setWishList(prev => prev.filter(item => item._id !== productid));
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add product");
    }
  };

  if (wishList?.length === 0) {
    return (
      <div className="flex justify-center min-h-75 mt-10">
        <h2 className="text-black font-bold text-2xl">Empty Wishlist</h2>
      </div>
    )
  }

  return (
    isLoading ? (
      <Skeleton skelotonFor="Home" />
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {wishList?.map(item => (
          <div key={item._id} className="flex flex-row border-gray-400 mx-3 border-b sm:border sm:m-5 rounded-3xl ">
            <Link
              href={`/product/${item._id}`}
              className="block relative sm:w-38 md:w-56 h-full flex-shrink-0 rounded-3xl"
            >
              <img
                src={item.images[0]}
                alt={item.name}
                className="w-30 sm:w-50 object-contain pr-2 object-center transition-transform duration-300 group-hover:scale-105 border-r border-gray-300 mt-5 rounded-3xl"
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
                  <span className="font-semibold text-gray-700 mt-1 line-clamp-2">
                    ₹{item.price}
                  </span>
                </div>
              </div>
              <div className="flex justify-end">
                <button className="btn btn-primary w-15 btn-sm" onClick={() => removeFromWishList(item._id)}>Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  );
}

export default UserWishListPage;
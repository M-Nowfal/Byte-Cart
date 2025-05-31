"use client";

import { context } from "@/context/AppContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import Skeleton from "../ui/Skeloton";
import WishLiastCard from "../cards/WishLiastCard";

const UserWishListPage = () => {
  const { isLoading, setIsLoading, byteCartUser } = useContext(context);
  const [wishList, setWishList] = useState([]);
  const [loading, setLoading] = useState(false);

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
          <WishLiastCard 
            key={item._id} 
            item={item} 
            setLoading={setLoading}
            loading={loading}
            setWishList={setWishList}
          />
        ))}
      </div>
    )
  );
}

export default UserWishListPage;
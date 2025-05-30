"use client";

import { context } from "@/context/AppContext";
import axios from "axios";
import { Minus, Plus, Star, Trash2 } from "lucide-react";
import Link from "next/link";
import { useContext, useState } from "react";
import { toast } from "sonner";
import Loader from "../ui/Loader";

const CartItemCard = ({ cartItem, setTotal, qty, id, cartId, setCart, loading, setLoading }) => {
  const { setNoOfCartItems } = useContext(context);
  const [quantity, setQuantity] = useState(qty);

  const updayeCartItem = async (state) => {
    try {
      setLoading(true);
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/updatecart/${cartId}/${id}/${state}`);
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Failed to update");
    } finally {
      setLoading(false);
    }
  };

  const removeCartItem = async () => {
    try {
      setLoading(true);
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/removecart`, {
        data: { id, cartId },
        headers: { "Content-Type": "application/json" }
      });
      if (res.status === 200) {
        toast.success(res.data?.message);
        setCart(prev => ({
          ...prev,
          cartItems: prev.cartItems.filter(item => item._id !== id)
        }));
        setTotal(prev => (
          prev - quantity * cartItem.price
        ));
        setNoOfCartItems(prev => prev - quantity);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Failed to remove");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-row border-gray-400 mx-3 border-b sm:border sm:m-5 rounded-3xl">
      <Link
        href={`/product/${cartItem._id}`}
        className="block relative sm:w-38 md:w-56 h-full flex-shrink-0 rounded-3xl"
      >
        <img
          src={cartItem.images[0]}
          alt={cartItem.name}
          className="w-30 sm:w-50 object-contain pr-2 object-center transition-transform duration-300 group-hover:scale-105 border-r border-gray-300 mt-5"
        />
      </Link>

      <div className="flex-1 p-4 sm:p-6 flex flex-col">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              {cartItem.category}
            </span>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 line-clamp-2">
              {cartItem.name}
            </h2>
            <span className="text-sm text-gray-600">{cartItem.brand}</span>
            <span className="font-semibold text-gray-700 mt-1 line-clamp-2">
              ₹{cartItem.price}
            </span>
          </div>

        </div>

        <div className="flex items-center mt-2 mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                fill={i < Math.round(cartItem.ratings) ? "currentColor" : "none"}
                className={
                  i < Math.round(cartItem.ratings)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">
            ({cartItem.reviews.length} reviews)
          </span>
        </div>
        <span className="text-gray-500 text-sm mb-3">
          stock {cartItem.stock}
        </span>
        <div className="mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Qty:</span>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button
                onClick={() => {
                  if (quantity > 1) {
                    updayeCartItem("dec");
                    setQuantity((prev) => Math.max(1, prev - 1));
                    setTotal(prev => prev - cartItem.price);
                    setNoOfCartItems(prev => prev - 1);
                  } else {
                    removeCartItem();
                  }
                }}
                className="px-3 py-1 hover:bg-gray-100 transition-colors"
                aria-label="Decrease quantity"
                disabled={loading}
              >
                {quantity > 1 ? <Minus size={16} className="text-gray-600" /> : <Trash2 size={16} className="text-gray-600" />}
              </button>
              <span className="px-4 text-gray-900 font-medium w-10 h-8 flex items-center">
                {loading ? <span className="loading loading-spinner w-4 h-4 text-primary"></span> : quantity}
              </span>
              <button
                onClick={() => {
                  if (quantity < cartItem?.stock) {
                    updayeCartItem("inc");
                    setQuantity((prev) => prev + 1);
                    setTotal(prev => prev + cartItem.price);
                    setNoOfCartItems(prev => prev + 1);
                  } else {
                    toast.error(
                      `Maximum available stock: ${cartItem.stock}`
                    );
                  }
                }}
                className="px-3 py-1 hover:bg-gray-100 transition-colors"
                aria-label="Increase quantity"
                disabled={loading}
              >
                <Plus size={16} className="text-gray-600" />
              </button>
            </div>
            {quantity > 1 && <button
              className={`text-gray-400 hover:text-red-500 transition-colors cursor-pointer m-auto`}
              onClick={removeCartItem}
            >
              <Trash2 className="size-6" />
            </button>}
          </div>

        </div>
        <div className="mt-5 ps-7">
          <span className="text-xl font-bold text-gray-900">
            ₹{(cartItem.price * quantity)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
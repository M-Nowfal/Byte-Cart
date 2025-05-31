"use client"

import { context } from "@/context/AppContext";
import axios from "axios";
import { Menu, Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { toast } from "sonner";

const Header = () => {
  const { byteCartUser, noOfCartItems, setNoOfCartItems } = useContext(context);
  useEffect(() => {
    async function getTotalCartItem() {
      try {
        const id = (await JSON.parse(localStorage.getItem("byteCartUser"))).id;
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/getcart/${id}`);
        if (res.status === 200) {
          setNoOfCartItems(res.data?.cartItems?.cartItems?.reduce((acc, item) => acc + item.quantity, 0));
        }
      } catch (err) {
        console.log(err);
      }
    }
    getTotalCartItem();
  }, []);

  return (
    <header className="sticky top-0 z-10 bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section - Menu & Logo */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-200 hover:text-amber-600">
              <label htmlFor="my-drawer">
                <Menu className="h-6 w-6 cursor-pointer" />
              </label>
            </button>

            <Link href="/" className="text-2xl font-bold">
              <span className="text-amber-600">Byte</span>
              <span className="text-gray-200">Cart</span>
            </Link>
          </div>

          {/* Center Section - Search */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-6">
            <div className="relative w-full">
              <input
                name="search-products"
                type="text"
                placeholder="Search products..."
                className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500 text-white"
              />
              <button className="absolute right-0 top-0 h-full px-4 bg-amber-500 text-white rounded-r-md hover:bg-amber-600 transition-colors cursor-pointer">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Right Section - Navigation */}
          <div className="flex items-center space-x-4">
            {/* User Account */}
            <div className="flex items-center space-x-1 cursor-pointer group">
              <User className="h-6 w-6 text-gray-200 group-hover:text-amber-600" />
              <Link href={byteCartUser ? `/user/account/${byteCartUser?.id}` : `/user/auth/login`}>
                <div className="text-sm">
                  <p className="font-medium text-gray-200 group-hover:text-amber-600">Hello, {byteCartUser?.name || " Sign in"}</p>
                  <p className="text-xs text-gray-300 hidden sm:block">Account</p>
                </div>
              </Link>
            </div>

            {/* Returns & Orders */}
            <div className="hidden md:flex flex-col cursor-pointer group ml-2">
              <p className="text-sm font-medium text-gray-200 group-hover:text-amber-600">Returns</p>
              <p className="text-xs text-gray-300">& Orders</p>
            </div>

            {/* Shopping Cart */}
            <Link href={byteCartUser ? `/user/usercart/${byteCartUser.id}` : ""}>
              <div className="relative cursor-pointer group" role="btn" onClick={() => {
                if (!byteCartUser) {
                  toast.error("Create a new account or login to view cart");
                }
              }}>
                <div className="flex items-center">
                  <ShoppingCart className="h-6 w-6 text-gray-200 group-hover:text-amber-600" />
                  {noOfCartItems > 0 && <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs font-bold rounded-full h-4 w-5 flex items-center justify-center">
                    {noOfCartItems}
                  </span>}
                </div>
                <span className="hidden md:inline-block ml-1 text-sm font-medium text-gray-200 group-hover:text-amber-600">
                  Cart
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile Search - Hidden on desktop */}
        <div className="mt-3 md:hidden">
          <div className="relative">
            <input
              type="text"
              name="search-products"
              placeholder="Search products..."
              className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500 text-white"
            />
            <button className="absolute right-0 h-10 top-1/2 transform -translate-y-1/2 bg-amber-500 text-white p-2 rounded-r-md">
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div >
    </header >
  );
};

export default Header;
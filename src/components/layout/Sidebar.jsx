"use client";

import { context } from "@/context/AppContext";
import { CircleX, ShoppingCart, ShoppingBag, Smartphone, Laptop, Shirt, Settings, HelpCircle, LogOut, User, LogIn, List } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";
import { toast } from "sonner";

const Sidebar = () => {
  const { byteCartUser, byteCartSeller, setFilterProducts, products } = useContext(context);

  const shopByDepartment = (category) => {
    switch (category) {
      case "mobile":
        setFilterProducts(products.filter(item => item.category === "mobile"));
        break;
      case "computer":
        setFilterProducts(products.filter(item => item.category === "computer"));
        break;
      case "dress":
        setFilterProducts(products.filter(item => item.category === "dress"));
        break;
      default:
        setFilterProducts(products);
        break;
    }
  };

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side z-50">
        {/* Overlay with transition */}
        <label
          htmlFor="my-drawer"
          className="drawer-overlay bg-black bg-opacity-0 transition-all duration-300 checked:bg-opacity-30"
        ></label>

        {/* Sidebar with slide-in animation */}
        <ul className="menu bg-white min-h-full w-80 p-4 shadow-xl text-base-content border-r border-gray-200 transform transition-transform duration-300 ease-in-out -translate-x-full drawer-open:translate-x-0">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-orange-600">{byteCartUser?.name || byteCartSeller?.name || "My Account"}</h2>
            <label htmlFor="my-drawer" className="hover:bg-gray-100 cursor-pointer">
              <CircleX className="w-6 h-6 text-gray-500 hover:text-red-500 transition-colors" />
            </label>
          </div>

          {/* Shop by Category */}
          <div>
            {byteCartSeller ? "" : <>
              <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Shop by Category
              </h2>
              <ul className="space-y-2">
                <li className="hover:ps-3 duration-200" onClick={() => shopByDepartment("mobile")}>
                  <Link href={``} className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-100 text-gray-700 transition-all">
                    <Smartphone className="w-5 h-5" />
                    Mobile
                  </Link>
                </li>
                <li className="hover:ps-3 duration-200" onClick={() => shopByDepartment("computer")}>
                  <Link href={``} className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-100 text-gray-700 transition-all">
                    <Laptop className="w-5 h-5" />
                    Computer
                  </Link>
                </li>
                <li className="hover:ps-3 duration-200" onClick={() => shopByDepartment("dress")}>
                  <Link href={``} className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-100 text-gray-700 transition-all">
                    <Shirt className="w-5 h-5" />
                    Dress
                  </Link>
                </li>
                <li className="hover:ps-3 duration-200" onClick={() => shopByDepartment("others")}>
                  <Link href={``} className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-100 text-gray-700 transition-all">
                    <ShoppingBag className="w-5 h-5" />
                    All Category
                  </Link>
                </li>
              </ul>
            </>}
          </div>

          {byteCartSeller && <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Your Products
            </h2>
            <ul className="space-y-2">
              <li className="hover:ps-3 duration-200">
                <Link href={`/seller/dashboard`} className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-100 text-gray-700 transition-all">
                  Products
                </Link>
              </li>
            </ul>
          </div>}

          <div className="divider my-4"></div>

          {/* Cart & Orders */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              {!byteCartSeller && "Cart &"} Orders
            </h2>
            {!byteCartSeller && <ul className="space-y-2">
              <li className="hover:ps-3 duration-200" onClick={() => {
                if (!byteCartUser) {
                  toast.error("Create a new account or login to view cart");
                }
              }}>
                {byteCartSeller ? "" : <Link href={byteCartUser ? `/user/usercart/${byteCartUser.id}` : ""} className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-100 text-gray-700 transition-all">
                  <ShoppingCart className="w-5 h-5" />
                  Cart
                </Link>}
              </li>
              <li className="hover:ps-3 duration-200">
                <Link href={byteCartUser ? `/user/orders` : (byteCartSeller ? `/seller/orders` : "")} className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-100 text-gray-700 transition-all">
                  <ShoppingBag className="w-5 h-5" />
                  Orders
                </Link>
              </li>
              {byteCartUser && <li className="hover:ps-3 duration-200">
                <Link href={byteCartUser ? `/user/wishlist` : ""} className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-100 text-gray-700 transition-all">
                  <List className="w-5 h-5" />
                  Wishlist
                </Link>
              </li>}
            </ul>}
            {byteCartSeller && <ul>
              <li className="hover:ps-3 duration-200">
                <Link href={`/seller/orders`} className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-100 text-gray-700 transition-all">
                  <ShoppingBag className="w-5 h-5" />
                  Orders
                </Link>
              </li>
            </ul>}
          </div>

          <div className="divider my-4"></div>

          {/* Help & Settings */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Help & Settings
            </h2>
            <ul className="space-y-2">
              <li className="hover:ps-3 duration-200">
                <Link href={byteCartUser ? `/user/account/${byteCartUser.id}` : (byteCartSeller ? `/seller/account/${byteCartSeller.id}` : "/user/auth/login")} className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-100 text-gray-700 transition-all">
                  <User className="w-5 h-5" />
                  Your Account
                </Link>
              </li>
              <li className="hover:ps-3 duration-200">
                <Link href={`/customerservice`} className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-100 text-gray-700 transition-all">
                  <HelpCircle className="w-5 h-5" />
                  Customer Service
                </Link>
              </li>
              {byteCartSeller && <li className="hover:ps-3 duration-200">
                <Link href={`/seller/auth/logout`} className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-100 transition-all">
                  <LogOut className="w-5 h-5" />
                  Log-Out
                </Link>
              </li>}
              <li className="hover:ps-3 duration-200">
                <Link href={byteCartUser ? `/user/auth/signout` : (byteCartSeller ? `/seller/auth/signout` : "/user/auth/login")} className={`flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-100 ${byteCartUser || byteCartSeller ? "text-red-500" : "text-blue-500"} transition-all`}>
                  {byteCartUser || byteCartSeller ? <LogOut className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}
                  {byteCartUser || byteCartSeller ? "Sign-Out" : "Log-In"}
                </Link>
              </li>
            </ul>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
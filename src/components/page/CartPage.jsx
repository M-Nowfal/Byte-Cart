"use client";

import { context } from "@/context/AppContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import Skeleton from "../ui/Skeloton";
import CartItemCard from "../cards/CartItemCard";
import { useRouter } from "next/navigation";

const CartPage = ({ id }) => {
  const { isLoading, setIsLoading, noOfCartItems } = useContext(context);
  const [cart, setCart] = useState({});
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getCartProducts = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/getcart/${id}`);
        if (res.status === 200) {
          setCart(res.data?.cartItems);
          const t = res.data?.cartItems?.cartItems.reduce((sum, item) => sum + (item.productid.price * item.quantity), 0);
          setTotal(t);
        }
      } catch (err) {
        console.log(err);
        toast.error(err.response?.data?.message || "Failed to fetch cart");
      } finally {
        setIsLoading(false);
      }
    };

    getCartProducts();
  }, []);

  return (
    isLoading ? (
      <Skeleton skelotonFor="Home" />
    ) : (
      <div className="min-h-[calc(100vh-200px)] pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 text-black mt-5 gap-4">
          {cart.cartItems?.map(item => (
            <CartItemCard
              key={item._id}
              cartItem={item.productid}
              qty={item.quantity}
              id={item._id}
              cartId={cart._id}
              setCart={setCart}
              setTotal={setTotal}
              loading={loading}
              setLoading={setLoading}
            />
          ))}
        </div>

        {cart?.cartItems?.length > 0 ? (<div className="mt-8 p-6 bg-white rounded-xl shadow-md border-3 border-gray-100 border-t-gray-900 mx-3">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="me-auto sm:m-auto">
              <h3 className="text-lg font-medium text-gray-900">Order Summary</h3>
              <p className="mt-1 text-gray-600">
                {noOfCartItems || 0} items
              </p>
            </div>
            <div className="ms-auto sm:m-auto">
              <p className="text-sm text-gray-500">Subtotal</p>
              <p className="text-2xl font-bold text-black">
                ₹{total}
              </p>
            </div>
            <button className="w-full sm:m-auto sm:w-48 px-6 py-3 bg-orange-600 rounded-lg transition-colors" 
              onClick={() => router.push(`/user/ordersummary/cartorder/${cart._id}`)}
            >
              Checkout
            </button>
          </div>
        </div>) : (
          <div className="text-black flex flex-col items-center gap-7">
            <h2 className="text-3xl font-bold">Empty Cart</h2>
            <button className="btn btn-primary w-1/2 font-bold text-lg" onClick={() => router.push("/")}>Back to purchase</button>
          </div>
        )}
      </div>)
  );

}

export default CartPage;
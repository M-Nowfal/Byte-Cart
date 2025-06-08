"use client";

import { context } from "@/context/AppContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import Skeleton from "../ui/Skeloton";
import OrderSummaryCard from "../cards/OrderSummaryCard";
import { useRouter } from "next/navigation";
import OrderAddressDetails from "../cards/OrderAddressDetails";

const OrderSummaryPage = ({ productid = null, quantity = null, cartid = null }) => {
  const { isLoading, setIsLoading } = useContext(context);
  const [orderSummary, setOrderSummary] = useState([]);
  const [total, setTotal] = useState({ totalAmount: 0, totalItem: 0 });
  const [address, setAddress] = useState({
    doorNo: "",
    street: "",
    city: "",
    state: "",
    country: "",
    pinCode: ""
  });
  const router = useRouter();

  const findTotalAmount = (items) => items.reduce((acc, item) => acc + item.amount * item.quantity, 0);
  const findTotalItem = (items) => items.reduce((acc, item) => acc + item.quantity, 0);

  const getOrderedProducts = async () => {
    try {
      setIsLoading(true);
      let res;
      if (cartid) {
        const user = await JSON.parse(localStorage.getItem("byteCartUser"));
        res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/getcart/${user?.id}`);
        setOrderSummary(res.data?.cartItems?.cartItems);
        setTotal({
          totalAmount: findTotalAmount(res.data?.cartItems?.cartItems),
          totalItem: findTotalItem(res.data?.cartItems?.cartItems)
        });
      } else {
        res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/product/${productid}`);
        setOrderSummary([{ productid: res.data?.product, quantity, amount: res.data?.product?.price }]);
        setTotal({
          totalAmount: quantity * res.data?.product?.price,
          totalItem: quantity
        });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch product retry");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getOrderedProducts();
  }, []);

  return (
    isLoading ? (
      <Skeleton skelotonFor="Home" />
    ) : (
      <div>
        <div className="border-1 border-gray-400 mx-3 m-5 rounded-2xl">
          {productid ? (
            <div className="text-black grid grid-cols-1 md:grid-cols-2">
              {orderSummary.map(order => (
                <OrderSummaryCard key={order.productid._id} quantity={quantity} ordersummary={order.productid} />
              ))}
            </div>
          ) : (
            <div className="text-black grid grid-cols-1 md:grid-cols-2">
              {orderSummary.map(order => (
                <OrderSummaryCard key={order._id} quantity={order.quantity} ordersummary={order.productid} />
              ))}
            </div>
          )}
        </div>
        <OrderAddressDetails address={address} setAddress={setAddress} />
        <div className="flex flex-col items-center mt-10 text-black gap-5 border border-gray-500 rounded-2xl m-5 py-5">
          <span className="text-2xl font-bold">Total Amount ₹<span className="text-orange-700">{(total.totalAmount).toLocaleString()}</span></span>
          <button className="btn btn-primary w-[95%] md:w-1/2"
            disabled={!address.street || !address.city || !address.state || !address.country || !address.pinCode}
            onClick={() => {
              sessionStorage.clear();
              sessionStorage.setItem("orderSummary", JSON.stringify(orderSummary));
              sessionStorage.setItem("address", JSON.stringify(address));
              router.push(`/payment`);
            }}>Proceed to Buy {total.totalItem} Items</button>
        </div>
      </div>
    )
  );
}

export default OrderSummaryPage;
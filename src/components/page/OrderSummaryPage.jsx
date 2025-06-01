"use client";

import { context } from "@/context/AppContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import Skeleton from "../ui/Skeloton";
import OrderSummaryCard from "../cards/OrderSummaryCard";
import { useRouter } from "next/navigation";
import { Edit, Check, X, MapPin } from 'lucide-react';

const OrderSummaryPage = ({ productid = null, quantity = null, cartid = null }) => {
  const { isLoading, setIsLoading } = useContext(context);
  const [orderSummary, setOrderSummary] = useState([]);
  const [total, setTotal] = useState({ totalAmount: 0, totalItem: 0 });
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
        setOrderSummary([res.data?.product]);
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
                <OrderSummaryCard key={order._id} quantity={quantity} ordersummary={order} />
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
        <OrderAddressDetails />
        <div className="flex flex-col items-center mt-10 text-black gap-5 border border-gray-500 rounded-2xl m-5 py-5">
          <span className="text-2xl font-bold">Total Amount ₹<span className="text-orange-700">{total.totalAmount}</span></span>
          <button className="btn btn-primary w-[95%] md:w-1/2" onClick={() => router.push(`/payment/${total.totalAmount}`)}>Proceed to Buy {total.totalItem} Items</button>
        </div>
      </div>
    )
  );
}

export default OrderSummaryPage;


const OrderAddressDetails = () => {
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    pinCode: ""
  });
  const [isEditable, setIsEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasAddress, setHasAddress] = useState(false);

  useEffect(() => {
    const fetchUserAddress = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("byteCartUser"));
        if (!user?.id) return;
        
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/getuser/${user.id}`);
        if (res.status === 200 && res.data?.user?.address) {
          setAddress(res.data.user.address);
          setHasAddress(true);
        }
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to fetch address");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserAddress();
  }, []);

  const handleChange = (e) => {
    setAddress(prev => ({
      ...prev, 
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("byteCartUser"));
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/update/${user.id}`,
        { userData: address }
      );
      
      if (res.status === 200) {
        toast.success("Address updated successfully");
        setHasAddress(true);
        setIsEditable(false);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update address");
    }
  };

  const addressFields = [
    { name: "doorNo", label: "Door No", placeholder: "12/3"},
    { name: "street", label: "Street Address", placeholder: "123 Main St" },
    { name: "city", label: "City", placeholder: "New York" },
    { name: "state", label: "State/Province", placeholder: "NY" },
    { name: "country", label: "Country", placeholder: "United States" },
    { name: "pinCode", label: "ZIP/Postal Code", placeholder: "10001" }
  ];

  if (isLoading) {
    return (
      <div className="p-6 bg-gray-50 rounded-lg animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden m-5 text-black">
      <div className="flex items-center justify-between bg-gray-50 px-6 py-4 border-b">
        <div className="flex items-center gap-2">
          <MapPin className="text-blue-600 h-5 w-5" />
          <h3 className="font-bold text-gray-800 text-xl">
            {hasAddress ? "Delivery Address" : "Add Delivery Address"}
          </h3>
        </div>
        
        {!isEditable ? (
          <button 
            onClick={() => setIsEditable(true)}
            className="flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            <Edit className="mr-1 h-4 w-4" /> {hasAddress ? "Edit" : "Add Address"}
          </button>
        ) : (
          <div className="flex gap-2">
            <button 
              onClick={handleSave}
              className="flex items-center text-sm text-green-600 hover:text-green-800"
            >
              <Check className="mr-1 h-4 w-4" /> Save
            </button>
            <button 
              onClick={() => {
                setIsEditable(false);
                if (!hasAddress) return;
                // Re-fetch original address if canceled
                const user = JSON.parse(localStorage.getItem("byteCartUser"));
                axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/getuser/${user.id}`)
                  .then(res => setAddress(res.data?.user?.address || {}));
              }}
              className="flex items-center text-sm text-red-600 hover:text-red-800"
            >
              <X className="mr-1 h-4 w-4" /> Cancel
            </button>
          </div>
        )}
      </div>

      <div className="p-6">
        {isEditable ? (
          <form className="space-y-4">
            {addressFields.map((field) => (
              <div key={field.name} className="space-y-1">
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                <input
                  type="text"
                  id={field.name}
                  name={field.name}
                  value={address[field.name] || ""}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            ))}
          </form>
        ) : hasAddress ? (
          <div className="space-y-2 text-gray-700 font-medium">
            <p>{address.doorNo}</p>
            <p>{address.street}</p>
            <p>{address.city}, {address.state}</p>
            <p>{address.country}</p>
            <p>{address.pinCode}</p>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <MapPin className="mx-auto h-12 w-12 text-gray-300" />
            <p className="mt-2">No delivery address saved</p>
            <button
              onClick={() => setIsEditable(true)}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              Add Delivery Address
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

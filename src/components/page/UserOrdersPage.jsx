"use client";

import { context } from "@/context/AppContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { Package, Calendar, Truck, CheckCircle, Loader2, CreditCard, Home, MapPin, Wallet, Clock } from "lucide-react";

const UserOrdersPage = () => {
  const { isLoading, setIsLoading, byteCartUser } = useContext(context);
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/orders/${byteCartUser?.id}`);
      if (res.status === 200) {
        setOrders(res.data.orders?.orders || []);
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to fetch orders");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (byteCartUser?.id) {
      getOrders();
    }
  }, [byteCartUser]);

  const isStepCompleted = (days, orderedAt) => {
    const orderDate = new Date(orderedAt);
    const threshold = new Date(orderDate.getTime() + days * 24 * 60 * 60 * 1000);
    return new Date() > threshold;
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Order Delivered':
        return 'bg-green-100 text-green-800';
      case 'Order Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Order Placed':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Order Delivered':
        return <CheckCircle className="w-5 h-5 mr-1" />;
      case 'Order Shipped':
        return <Truck className="w-5 h-5 mr-1" />;
      case 'Order Placed':
        return <Package className="w-5 h-5 mr-1" />;
      default:
        return <Clock className="w-5 h-5 mr-1" />;
    }
  };

  const getPaymentIcon = (method) => {
    switch (method) {
      case 'card':
        return <CreditCard className="w-4 h-4 mr-1" />;
      case 'upi':
        return <Wallet className="w-4 h-4 mr-1" />;
      case 'netbanking':
        return <CreditCard className="w-4 h-4 mr-1" />;
      default: // cod
        return <Wallet className="w-4 h-4 mr-1" />;
    }
  };

  const sortedOrders = [...orders].sort((a, b) => {
    return new Date(b.orderedAt) - new Date(a.orderedAt);
  });

  return (
    <div className="container mx-auto px-4 py-8 text-black">
      <div className="flex items-center mb-8">
        <Package className="w-8 h-8 mr-2 text-indigo-600" />
        <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-600">No orders found</h3>
          <p className="text-gray-500 mt-2">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {sortedOrders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center flex-wrap">
                <div className="flex items-center mb-2 sm:mb-0">
                  <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                  <span className="text-gray-600">Ordered: {formatDate(order.orderedAt)}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2">Order #:</span>
                  <span className="font-medium">{order._id}</span>
                </div>
              </div>

              <div className="p-4 border-b border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2">Status:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.orderStatus)} flex items-center`}>
                    {getStatusIcon(order.orderStatus)}
                    {order.orderStatus}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2">Payment:</span>
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${order.paymentStatus === 'success' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'} flex items-center`}>
                    {getPaymentIcon(order.paymentMethod)}
                    {order.paymentMethod.toUpperCase()} ({order.paymentStatus})
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2">Total:</span>
                  <span className="font-bold text-lg">₹{(order.totalAmount).toLocaleString()}</span>
                </div>
              </div>

              <div className="p-4 border-b border-gray-200">
                <h3 className="flex items-center text-lg font-medium text-gray-800 mb-2">
                  <MapPin className="w-5 h-5 mr-2 text-indigo-600" />
                  Shipping Address
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-600">
                  <div className="flex items-start">
                    <Home className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{order.shippingAddress.doorNo}, {order.shippingAddress.street}</span>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{order.shippingAddress.city}, {order.shippingAddress.state}</span>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{order.shippingAddress.country} - {order.shippingAddress.pinCode}</span>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                <div className="p-4 bg-gray-50 font-medium text-gray-700 grid grid-cols-12">
                  <div className="col-span-6 md:col-span-7">Product</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>
                {order.orderItems.map((item) => (
                  <div key={item._id} className="p-4 grid grid-cols-12 items-center">
                    <div className="col-span-6 md:col-span-7 flex items-center">
                      <div className="flex-shrink-0 mr-4">
                        <img
                          src={item.productid?.images[0]}
                          alt={item.productid?.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-800 line-clamp-2">{item.productid?.name}</h3>
                      </div>
                    </div>
                    <div className="col-span-2 text-center text-gray-600">
                      {item.quantity}
                    </div>
                    <div className="col-span-2 text-center text-gray-600">
                      ₹{item.amount.toLocaleString()}
                    </div>
                    <div className="col-span-2 text-right font-medium">
                      ₹{(item.amount * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-gray-50 flex justify-between items-center flex-wrap">
                <div className="mb-2 sm:mb-0">
                  <span className="text-gray-600 mr-2">Ordered on:</span>
                  <span className="font-medium">{formatDate(order.orderedAt)}</span>
                </div>
                <ul className="steps">
                  <li className="step step-primary">Order Placed</li>
                  <li className={`step ${isStepCompleted(1, order.orderedAt) && "step-primary"}`}>Shipped</li>
                  <li className={`step ${isStepCompleted(2, order.orderedAt) && "step-primary"}`}>Out for Delivery</li>
                  <li className={`step ${isStepCompleted(3, order.orderedAt) && "step-primary"}`}>Delivered</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrdersPage;
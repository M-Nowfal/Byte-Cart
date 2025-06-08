"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Package, Truck, CheckCircle, Clock, CreditCard, MapPin, ChevronDown, ChevronUp } from "lucide-react";

const SellerOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const getOrders = async () => {
    try {
      const seller = await JSON.parse(localStorage.getItem("byteCartSeller"));
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/seller/orders/${seller.id}`);
      if (res.status === 200) {
        setOrders(res.data.orders);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const toggleOrderExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Order Placed":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "Shipped":
        return <Truck className="h-4 w-4 text-blue-500" />;
      case "Delivered":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Package className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-150">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Package className="h-6 w-6" />
            Your Orders
          </h1>
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
            {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
          </span>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <Package className="h-12 w-12 mx-auto text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No orders found</h3>
            <p className="mt-1 text-gray-500">You haven't received any orders yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-lg shadow overflow-hidden">
                <div 
                  className="p-4 cursor-pointer hover:bg-gray-50 transition-colors flex justify-between items-center"
                  onClick={() => toggleOrderExpand(order._id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Package className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Order #{order._id.substring(18, 24).toUpperCase()}</h3>
                      <p className="text-sm text-gray-500">{formatDate(order.orderedAt)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="font-medium text-gray-900">₹{order.totalAmount.toLocaleString()}</p>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        {getStatusIcon(order.orderStatus)}
                        <span>{order.orderStatus}</span>
                      </div>
                    </div>
                    {expandedOrder === order._id ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>

                {expandedOrder === order._id && (
                  <div className="border-t border-gray-200 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Order Items */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Order Items ({order.totalItem})</h4>
                        <div className="space-y-4">
                          {order.orderItems.map((item) => (
                            <div key={item._id} className="flex gap-4">
                              <img 
                                src={item.productid.images[0]} 
                                alt={item.productid.name}
                                className="h-20 w-20 object-contain rounded-md border border-gray-200"
                                onError={(e) => {
                                  e.target.src = 'https://via.placeholder.com/80?text=Image+Not+Found';
                                  e.target.className = 'h-20 w-20 object-contain rounded-md border border-gray-200 bg-gray-100';
                                }}
                              />
                              <div className="flex-1">
                                <h5 className="font-medium text-gray-900">{item.productid.name}</h5>
                                <p className="text-sm text-gray-500 line-clamp-1">{item.productid.description}</p>
                                <div className="flex items-center justify-between mt-2">
                                  <span className="text-sm text-gray-700">Qty: {item.quantity}</span>
                                  <span className="font-medium">₹{item.amount.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Order Details */}
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Shipping Address</h4>
                          <div className="bg-gray-50 p-4 rounded-md">
                            <div className="flex items-start gap-3">
                              <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-gray-900">{order.shippingAddress.doorNo}, {order.shippingAddress.street}</p>
                                <p className="text-gray-600">{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                                <p className="text-gray-600">{order.shippingAddress.country} - {order.shippingAddress.pinCode}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Payment Information</h4>
                          <div className="bg-gray-50 p-4 rounded-md">
                            <div className="flex items-center gap-3 mb-2">
                              <CreditCard className="h-5 w-5 text-gray-400" />
                              <div>
                                <p className="text-gray-900 capitalize">{order.paymentMethod}</p>
                                <p className={`text-sm ${order.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                                  {order.paymentStatus}
                                </p>
                              </div>
                            </div>
                            <div className="flex justify-between border-t border-gray-200 pt-3 mt-3">
                              <span className="text-gray-600">Total Amount:</span>
                              <span className="font-medium">₹{order.totalAmount.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                          <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                            Update Status
                          </button>
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                            Contact Buyer
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerOrderPage;
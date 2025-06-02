"use client";

import { useContext, useEffect, useState } from "react";
import { CreditCard, Wallet, Banknote, IndianRupee } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { context } from "@/context/AppContext";
import { useRouter } from "next/navigation";

const PaymentPage = () => {
  const { byteCartUser } = useContext(context);
  const [orderSummary, setOrderSummary] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: ""
  });
  const router = useRouter();

  async function getOrderSummary() {
    const orderedProducts = await JSON.parse(sessionStorage.getItem("orderSummary"));
    setOrderSummary(orderedProducts || []);
  }

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };

  const calculateTotal = () => {
    return orderSummary.reduce((total, item) => total + (item.amount * item.quantity), 0);
  };

  useEffect(() => {
    getOrderSummary();
  }, []);

  const placeOrder = async () => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/order/${byteCartUser?.id}`, {
        orderItems: orderSummary, shippingAddress: await JSON.parse(sessionStorage.getItem("address")), paymentMethod
      });
      if (res.status === 201) {
        toast.success(res.data.message);
        router.push("/user/orders");
      } 
    } catch (err) {
      console.log(err.response?.data?.error || "");
      toast.error(err.response?.data?.message || "Failed to place Order");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8  text-black">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Complete Your Purchase</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Order Summary Section */}
          <div className="md:w-1/2 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Wallet className="w-5 h-5" /> Order Summary
            </h2>
            
            <div className="divide-y divide-gray-200">
              {orderSummary?.length > 0 ? (
                orderSummary.map(item => (
                  <div key={item.productid._id} className="py-4 flex justify-between">
                    <div className="flex gap-4">
                      <img 
                        src={item.productid.images[0]} 
                        alt={item.productid.name}
                        className="w-16 h-16 object-contain rounded"
                      />
                      <div>
                        <h3 className="font-medium">{item.productid.name}</h3>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        <p className="text-sm text-gray-500">{item.productid.brand}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{(item.amount * item.quantity).toLocaleString()}</p>
                      <p className="text-sm text-gray-500">₹{item.amount?.toLocaleString() || item.productid.price} each</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="py-4 text-gray-500">No items in your order</p>
              )}
            </div>

            <div className="border-t border-gray-200 pt-4 mt-4  text-black">
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>₹{calculateTotal().toLocaleString()}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping:</span>
                <span className="text-green-600">{calculateTotal() > 499 ? "Free" : "₹40" }</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-4">
                <span>Total:</span>
                <span>₹{calculateTotal() > 499 ? calculateTotal().toLocaleString() : calculateTotal() + 40}</span>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="md:w-1/2 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5" /> Payment Method
            </h2>

            <div className="space-y-4 mb-6">
              <div 
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${paymentMethod === 'upi' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                onClick={() => setPaymentMethod('upi')}
              >
                <div className="flex items-center gap-3">
                  <input 
                    type="radio" 
                    name="paymentmethod" 
                    checked={paymentMethod === 'upi'}
                    className="h-4 w-4 text-blue-600"
                    readOnly
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">UPI Payment</h3>
                    <p className="text-sm text-gray-500">Pay using any UPI app</p>
                  </div>
                  <IndianRupee className="w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div 
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                onClick={() => setPaymentMethod('card')}
              >
                <div className="flex items-center gap-3">
                  <input 
                    type="radio" 
                    name="paymentmethod" 
                    checked={paymentMethod === 'card'}
                    className="h-4 w-4 text-blue-600"
                    readOnly
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">Credit/Debit Card</h3>
                    <p className="text-sm text-gray-500">Pay using your card</p>
                  </div>
                  <CreditCard className="w-5 h-5 text-gray-400" />
                </div>

                {paymentMethod === 'card' && (
                  <div className="mt-4 space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                      <input
                        type="text"
                        name="number"
                        value={cardDetails.number}
                        onChange={handleCardChange}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                      <input
                        type="text"
                        name="name"
                        value={cardDetails.name}
                        onChange={handleCardChange}
                        placeholder="John Doe"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                        <input
                          type="text"
                          name="expiry"
                          value={cardDetails.expiry}
                          onChange={handleCardChange}
                          placeholder="MM/YY"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          value={cardDetails.cvv}
                          onChange={handleCardChange}
                          placeholder="123"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div 
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${paymentMethod === 'netbanking' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                onClick={() => setPaymentMethod('netbanking')}
              >
                <div className="flex items-center gap-3">
                  <input 
                    type="radio" 
                    name="paymentmethod" 
                    checked={paymentMethod === 'netbanking'}
                    className="h-4 w-4 text-blue-600"
                    readOnly
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">Net Banking</h3>
                    <p className="text-sm text-gray-500">Pay directly from your bank</p>
                  </div>
                  <Banknote className="w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div 
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                onClick={() => setPaymentMethod('cod')}
              >
                <div className="flex items-center gap-3">
                  <input 
                    type="radio" 
                    name="paymentmethod" 
                    checked={paymentMethod === 'cod'}
                    className="h-4 w-4 text-blue-600"
                    readOnly
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">Cash on Delivery</h3>
                    <p className="text-sm text-gray-500">Pay when you receive your order</p>
                  </div>
                  <Wallet className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" onClick={placeOrder}>
              Pay ₹{calculateTotal() > 499 ? calculateTotal().toLocaleString() : calculateTotal() + 40}
            </button>

            <p className="text-xs text-gray-500 mt-4">
              By completing your purchase, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
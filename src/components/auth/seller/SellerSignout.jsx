"use client";
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Lock, Mail, Phone, Loader2, LogOut } from 'lucide-react';
import axios from 'axios';
import { context } from '@/context/AppContext';

const SellerSignout = () => {
  const router = useRouter();
  const { byteCartSeller } = useContext(context);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const sendOtp = async () => {
    if (formData.email) {
      try {
        setIsLoading(true);
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/sendotp`, { email: formData.email });
        if (res.status === 200) {
          toast.success(res.data?.message);
          return true;
        }
      } catch (err) {
        console.log(err);
        toast.error(err.response?.data?.message || "Failed to send otp!");
        return false;
      } finally {
        setIsLoading(false);
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignout = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!formData.email || !formData.phone || !formData.password) {
        throw new Error('Please fill in all fields');
      }
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/seller/auth/signout/isexist`, { id: byteCartSeller.id, email: formData.email, password: formData.password });
      if (res.status === 200) {
        if (await sendOtp()) {
          sessionStorage.setItem("signoutData", JSON.stringify({ email: formData.email, phone: formData.phone, password: formData.password, id: byteCartSeller.id }));
          router.push(`/verifyotp?auth=sellersignout&email=${formData.email}`);
        } else {
          throw new Error("Error");
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Sign out failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-150 bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-black">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center">
            <LogOut className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Secure Sign Out
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Please verify your identity to securely sign out
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSignout}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Registered Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="py-2 pl-10 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                  placeholder="seller@bytecart.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Registered Phone
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="py-2 pl-10 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                  placeholder="+919876543210"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="py-2 pl-10 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="confirm-signout"
                name="confirm-signout"
                type="checkbox"
                required
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <label htmlFor="confirm-signout" className="ml-2 block text-sm text-gray-900">
                I understand this will log me out from all devices
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    Signing Out...
                  </>
                ) : (
                  <>
                    <LogOut className="h-5 w-5 mr-2" />
                    Confirm Sign Out
                  </>
                )}
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => router.back()}
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Cancel and go back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerSignout;
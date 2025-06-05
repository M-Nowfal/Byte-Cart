"use client";

import { Mail, Phone } from "lucide-react";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { context } from "@/context/AppContext";
import axios from "axios";
import { toast } from "sonner";

const UserForgotPass = () => {
  const { isLoading, setIsLoading } = useContext(context);
  const [data, setData] = useState({
    email: "", phone: ""
  });
  const router = useRouter();

  const sendOtp = async () => {
    if (data.email) {
      try {
        setIsLoading(true);
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/sendotp`, { email: loginDetails.email });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (await sendOtp()) {
        toast.success("OTP sent successfully!");
        router.push(`/verifyotp?auth=forgotpassuser&email=${data.email}`);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed, try again");
    }
  };

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setData(prev => {
      if (name === "phone") 
        if (isNaN(value)) {
        return { ...prev }    
        }
      return { ...prev, [name]: value }
    });
  }

  return (
    <div className="bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Byte Cart Forgot Password
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={data.email}
                  onChange={handleInputs}
                  className="py-2 pl-10 block w-full border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-black"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="current-password"
                  required
                  value={data.phone}
                  onChange={handleInputs}
                  className="py-2 pl-10 block w-full border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-black"
                  placeholder="1234567890"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${isLoading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
                  }`}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserForgotPass;
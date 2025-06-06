"use client";

import { context } from "@/context/AppContext";
import axios from "axios";
import { Eye, EyeClosed, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { toast } from "sonner";

const SellerChangePass = () => {
  const { isLoading, setIsLoading, byteCartUser } = useContext(context);
  const [data, setData] = useState({ password: "", cnfPass: "" });
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password !== data.cnfPass) {
      toast.warning("Password missmatch");
      return;
    }
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/seller/changepassword`, {
        userid: byteCartUser?.id, newPass: data.password
      });
      if (res.status === 200) {
        toast.success(res.data.message);
        router.push("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to change password");
    }
  }

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setData(prev => (
      { ...prev, [name]: value }
    ));
  }
  return (
    <div className="bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Byte Cart, Change Password
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={isVisible ? "text" : "password"}
                  required
                  value={data.password}
                  onChange={handleInputs}
                  minLength="8"
                  maxLength="15"
                  className="py-2 pl-10 block w-full border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-black"
                  placeholder="New Password"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={() => setIsVisible(prev => !prev)} >
                  {isVisible ? (
                    <Eye className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeClosed className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="cnfpass" className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="cnfpass"
                  name="cnfPass"
                  type="password"
                  required
                  value={data.cnfPass}
                  onChange={handleInputs}
                  className="py-2 pl-10 block w-full border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-black"
                  placeholder="Confirm Password"
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
                {isLoading ? "Updating..." : "Change Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SellerChangePass;
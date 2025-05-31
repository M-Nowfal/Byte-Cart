"use client";

import { Eye, EyeClosed, Lock, Mail } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { context } from "@/context/AppContext";
import axios from "axios";
import { toast } from "sonner";

const UserLogin = () => {

  const { isLoading, setIsLoading } = useContext(context);
  const [loginDetails, setLoginDetails] = useState({
    email: "", password: ""
  });
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("byteCartUser")) {
      toast.error("Log out from the current session to login");
      router.push("/");
    };
  }, []);

  const sendOtp = async () => {
    if (loginDetails.email) {
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

  const login = async () => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/auth/login`, { loginDetails });
      if (res.status === 201) {
        if (await sendOtp()) {
          sessionStorage.setItem("loginData", JSON.stringify(loginDetails));
          router.push(`/verifyotp?auth=login&email=${loginDetails.email}`);
        } else {
          throw new Error("Error");
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      if (!loginDetails.email || !loginDetails.password)
        throw new Error("Please fill in all fields");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginDetails.email))
        throw new Error("Please enter a valid email address");
      await login();
      // router.push("/");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputs = (e) => {
    setLoginDetails(prev => (
      { ...prev, [e.target.name]: e.target.value }
    ));
  };

  return (
    <div className="bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Welcome to Byte Cart
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to your account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-md">
              {error}
            </div>
          )}

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
                  value={loginDetails.email}
                  onChange={handleInputs}
                  className="py-2 pl-10 block w-full border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-black"
                  placeholder="you@example.com"
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
                  type={isVisible ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={loginDetails.password}
                  onChange={handleInputs}
                  className="py-2 pl-10 block w-full border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-black"
                  placeholder="••••••••"
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

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href={`${isLoading ? "" : "/user/forgot-password"}`} className={`font-medium ${isLoading ? "text-gray-400" : "text-primary hover:text-primary-dark"}`}>
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${isLoading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
                  }`}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  New to Byte Cart?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => router.push("/user/auth/signup")}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer"
                disabled={isLoading}
              >
                Create an account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
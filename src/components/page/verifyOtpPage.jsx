'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { context } from '@/context/AppContext';
import axios from 'axios';

const VerifyOtpPage = () => {
  const inputRef = useRef({});
  const [otp, setOtp] = useState({
    inp1: "", inp2: "", inp3: "", inp4: "", inp5: "", inp6: ""
  });
  const otpInputs = ["inp1", "inp2", "inp3", "inp4", "inp5", "inp6"];
  const { isLoading, setIsLoading, setByteCartUser, setNoOfCartItems } = useContext(context);
  const [timer, setTimer] = useState(59);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const auth = searchParams.get("auth");

  async function getCart(id) {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/getcart/${id}`);
      if (res.status === 200) {
        setNoOfCartItems(res.data?.cartItems?.cartItems?.reduce((acc, item) => acc + item.quantity, 0));
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const otpString = Object.values(otp).join("");

    try {
      setIsLoading(true);
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/verifyotp`, { email, otp: otpString });
      if (res.status === 200) {
        toast.success(res.data?.message);
        // Signup
        if (auth === "signup") {
          const formData = await JSON.parse(sessionStorage.getItem("signupData"));
          const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/auth/signup`, { formData });
          if (res.status === 201) {
            toast.success(res.data.message);
            localStorage.setItem("byteCartUser", JSON.stringify(res.data.user));
            setByteCartUser(res.data?.user);
            router.push("/");
          }
        }
        // Login
        else if (auth === "login") {
          const loginDetails = await JSON.parse(sessionStorage.getItem("loginData"));
          const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/auth/login`, { loginDetails });
          if (res.status === 201) {
            toast.success(res?.data?.message);
            localStorage.setItem("byteCartUser", JSON.stringify(res.data.user));
            setByteCartUser(res?.data?.user);
            await getCart(res?.data?.user?.id);
            router.push("/");
          }
        }
        // Signout
        else if (auth === "signout") {
          const data = await JSON.parse(sessionStorage.getItem("signoutData"));
          const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/user/auth/signout`, {
            data, headers: { 'Content-Type': 'application/json' }
          });
          if (res.status === 200) {
            toast.success(res.data?.message);
            localStorage.clear();
            setByteCartUser(null);
            setNoOfCartItems(0);
            router.push('/user/login');
          }
        }
      } else {
        toast.error(res.data?.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
      sessionStorage.clear();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev >= 0 && prev - 1);

      return () => clearInterval(interval);
    }, 1000);
  }, []);

  const handleChange = (key, value) => {
    if (isNaN(value)) return;

    setOtp(prev => ({
      ...prev,
      [key]: value
    }));

    const currentIndex = otpInputs.indexOf(key);
    if (value && currentIndex < 5) {
      inputRef.current[otpInputs[currentIndex + 1]]?.focus();
    }
  };

  const handleKeyDown = (key, e) => {
    const currentIndex = otpInputs.indexOf(key);

    if (e.key === 'Backspace' && !otp[key] && currentIndex > 0) {
      inputRef.current[otpInputs[currentIndex - 1]]?.focus();
    } else if (e.key === "ArrowRight" && currentIndex < 5) {
      inputRef.current[otpInputs[currentIndex + 1]]?.focus();
    } else if (e.key === "ArrowLeft" && currentIndex > 0) {
      inputRef.current[otpInputs[currentIndex - 1]]?.focus();
    } else if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handleResendOtp = async () => {
    try {
      if (email) {
        try {
          const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/sendotp`, { email });
          if (res.status === 200) {
            toast.success(res.data?.message);
            setTimer(59);
          }
        } catch (err) {
          console.log(err);
          toast.error(err.response?.data?.message || "Failed to resend otp!");
        }
      }
    } catch (err) {
      toast.error('Failed to resend OTP');
    }
  };

  return (
    <div className="min-h-175 flex text-black items-center justify-center bg-white p-4">
      <div className="bg-white p-8 rounded-lg shadow-md shadow-gray-400 w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Verify Your Email</h1>
          <p className="text-gray-600 mt-2">
            Enter the 6-digit code sent to {email}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center space-x-2">
            {otpInputs.map((key) => (
              <input
                key={key}
                ref={(el) => (inputRef.current[key] = el)}
                name={key}
                type="number"
                maxLength="1"
                value={otp[key]}
                onChange={(e) => handleChange(key, e.target.value)}
                onKeyDown={(e) => handleKeyDown(key, e)}
                className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                autoFocus={key === 'inp1'}
                disabled={isLoading}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isLoading || Object.values(otp).some(digit => !digit)}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          Didn't receive code?{' '}
          <button
            onClick={handleResendOtp}
            disabled={isLoading || timer >= 0}
            className={`font-medium text-primary hover:text-primary-dark disabled:opacity-50 cursor-pointer`}
          >
            Resend OTP
          </button>
          {timer >= 0 && <span> in &nbsp;
            <span className="font-bold text-primary">
              <span className="countdown">
                <span style={{ "--value": timer }} aria-live="polite" aria-label={timer}>{timer}</span>
              </span>
            </span> sec</span>}
        </div>
      </div>
    </div>
  );
}

export default VerifyOtpPage;
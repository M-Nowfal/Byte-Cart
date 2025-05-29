'use client';

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { context } from '@/context/AppContext';

const UserLogout = () => {
  const { byteCartUser, setByteCartUser, setNoOfCartItems } = useContext(context);
  const router = useRouter();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        setTimeout(() => {
          localStorage.clear();
          setByteCartUser(null);
          setNoOfCartItems(0);
          router.push("/");
        }, 2000);
      } catch (error) {
        toast.error("Failed to logout");
        router.push('/');
      }
    };

    if (!byteCartUser) {
      toast.error("First login");
      router.push("/user/login");
    } else {
      logoutUser();
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-150 bg-whiite">
      <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-md shadow-gray-400">
        <span className="loading loading-spinner w-12 h-12 bg-primary"></span>
        <h1 className="mt-4 text-xl font-semibold text-gray-800">Logging out...</h1>
        <p className="mt-2 text-gray-600">Please wait while we sign you out</p>
      </div>
    </div>
  );
}

export default UserLogout;
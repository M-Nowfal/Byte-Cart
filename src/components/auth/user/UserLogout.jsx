'use client';

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { context } from '@/context/AppContext';

const UserLogout = () => {
  const { setByteCartUser } = useContext(context);
  const router = useRouter();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        setTimeout(() => {
          localStorage.clear();
          setByteCartUser(null);
          router.push("/");
        }, 2000);
      } catch (error) {
        toast.error("Failed to logout");
        router.push('/');
      }
    };

    logoutUser();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-md">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <h1 className="mt-4 text-xl font-semibold text-gray-800">Logging out...</h1>
        <p className="mt-2 text-gray-600">Please wait while we sign you out</p>
      </div>
    </div>
  );
}

export default UserLogout;
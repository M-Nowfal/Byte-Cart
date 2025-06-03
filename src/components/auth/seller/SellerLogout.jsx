"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2, CheckCircle2 } from 'lucide-react';

const SellerLogout = () => {
  const router = useRouter();

  useEffect(() => {
    const performLogout = async () => {
      try {
        // Replace with actual API call to logout endpoint
        // await axios.post('/api/seller/logout');
        
        // Clear seller auth data
        // localStorage.removeItem('sellerAuth');
        // sessionStorage.removeItem('sellerAuth');
        
        toast.success('Logged out successfully');
        
        // Redirect after slight delay to show success message
        // setTimeout(() => {
        //   router.push('/seller/login');
        // }, 1500);
      } catch (error) {
        toast.error('Logout failed. Please try again.');
        console.error('Logout error:', error);
        router.push('/seller/dashboard');
      }
    };

    performLogout();
  }, [router]);

  return (
    <div className="min-h-150 bg-gray-50 flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md shadow-gray-400 max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <Loader2 className="h-12 w-12 text-indigo-600 animate-spin" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Logging Out</h2>
        <p className="text-gray-600">Please wait while we securely sign you out...</p>
      </div>
    </div>
  );
};

export default SellerLogout;
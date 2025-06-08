"use client";

import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { context } from '@/context/AppContext';

const SellerLogout = () => {
  const router = useRouter();
  const { setByteCartSeller } = useContext(context);
  const [showModal, setShowModal] = useState(true);

  const logoutSeller = () => {
    setTimeout(() => {
      localStorage.clear();
      sessionStorage.clear();
      toast.success("Logged out successfully!");
      setByteCartSeller(null);
      router.push("/");
    }, 2000);
  };

  return (
    showModal ? <>
      < input type="checkbox" checked={showModal} className="modal-toggle" readOnly />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Byte-Cart Seller Logout</h3>
          <p className="pt-4">Are you sure to logout this session?</p>
          <div className="modal-action">
            <button className="btn" onClick={() => router.push("/seller/dashboard")}>Cancel</button>
            <button className="btn" onClick={() => {
              setShowModal(false);
              logoutSeller();
            }}>Ok</button>
          </div>
        </div>
      </div>
    </> : (
      <div className="min-h-150 bg-gray-50 flex flex-col justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-md shadow-gray-400 max-w-md w-full text-center">
          <div className="flex justify-center mb-4">
            <Loader2 className="h-12 w-12 text-indigo-600 animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Logging Out</h2>
          <p className="text-gray-600">Please wait while we securely sign you out...</p>
        </div>
      </div>
    )
  );
};

export default SellerLogout;
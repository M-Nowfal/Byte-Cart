"use client";

import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Phone, Store, User, Eye, EyeOff, Check, X, Edit2, Save } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { context } from '@/context/AppContext';

const SellerAccountPage = ({ sellerid }) => {
  const { setByteCartSeller } = useContext(context);
  const router = useRouter();
  const [seller, setSeller] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [changePasswordMode, setChangePasswordMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    storeName: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        if (!sellerid) {
          router.push('/seller/login');
          return;
        }

        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/seller/getseller/${sellerid}`);
        setSeller(res.data.seller);
        setFormData({
          name: res.data.seller.name,
          email: res.data.seller.email,
          phone: res.data.seller.phone,
          storeName: res.data.seller.storeName
        });
      } catch (err) {
        toast.error('Failed to fetch seller data');
      } finally {
        setLoading(false);
      }
    };

    fetchSeller();
  }, [router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/seller/update/${sellerid}`, formData);

      if (res.status === 200) {
        const updatedSeller = res.data.seller;
        localStorage.setItem('byteCartSeller', JSON.stringify({id: updatedSeller._id, name: updatedSeller.name}));
        toast.success(res.data.message);
        setByteCartSeller(prev => ({ ...prev, name: updatedSeller.name }));
        setSeller({
          name: updatedSeller.name,
          email: updatedSeller.email,
          phone: updatedSeller.phone,
          storeName: updatedSeller.storeName
        });
        setEditMode(false);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/seller/changepassword`, {
        sellerid, oldPass: passwordData.currentPassword, newPass: passwordData.newPassword
      });

      if (res.status === 200) {
        toast.success(res.data.message);
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setChangePasswordMode(false);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change password');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-150">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!seller) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-gray-600">Seller not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-8 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">{seller.storeName}</h1>
                <p className="text-blue-100">{seller.name}</p>
              </div>
              {!editMode && !changePasswordMode && (
                <button
                  onClick={() => setEditMode(true)}
                  className="flex items-center gap-1 bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors"
                >
                  <Edit2 size={16} />
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Profile Content */}
          <div className="px-6 py-8">
            {!changePasswordMode ? (
              <>
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Account Information</h2>

                <div className="space-y-6">
                  {/* Name Field */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="w-full sm:w-1/3">
                      <label className="flex items-center gap-2 text-gray-600">
                        <User size={18} />
                        Name
                      </label>
                    </div>
                    <div className="w-full sm:w-2/3">
                      {editMode ? (
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <p className="text-gray-800">{seller.name}</p>
                      )}
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="w-full sm:w-1/3">
                      <label className="flex items-center gap-2 text-gray-600">
                        <Mail size={18} />
                        Email
                      </label>
                    </div>
                    <div className="w-full sm:w-2/3">
                      {editMode ? (
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <p className="text-gray-800">{seller.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Phone Field */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="w-full sm:w-1/3">
                      <label className="flex items-center gap-2 text-gray-600">
                        <Phone size={18} />
                        Phone
                      </label>
                    </div>
                    <div className="w-full sm:w-2/3">
                      {editMode ? (
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <p className="text-gray-800">{seller.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Store Name Field */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="w-full sm:w-1/3">
                      <label className="flex items-center gap-2 text-gray-600">
                        <Store size={18} />
                        Store Name
                      </label>
                    </div>
                    <div className="w-full sm:w-2/3">
                      {editMode ? (
                        <input
                          type="text"
                          name="storeName"
                          value={formData.storeName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <p className="text-gray-800">{seller.storeName}</p>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {editMode && (
                    <div className="flex justify-end gap-4 pt-6">
                      <button
                        onClick={() => {
                          setEditMode(false);
                          setFormData({
                            name: seller.name,
                            email: seller.email,
                            phone: seller.phone,
                            storeName: seller.storeName
                          });
                        }}
                        className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      >
                        <X size={16} />
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveProfile}
                        className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        <Save size={16} />
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>

                {/* Password Change Section */}
                {!editMode && (
                  <div className="mt-12 pt-6 border-t border-gray-200">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold text-gray-800">Password</h2>
                      <button
                        onClick={() => setChangePasswordMode(true)}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                      >
                        <Lock size={16} />
                        Change Password
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Change Password</h2>

                <div className="space-y-6">
                  {/* Current Password */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="w-full sm:w-1/3">
                      <label className="flex items-center gap-2 text-gray-600">
                        <Lock size={18} />
                        Current Password
                      </label>
                    </div>
                    <div className="w-full sm:w-2/3 relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="w-full sm:w-1/3">
                      <label className="flex items-center gap-2 text-gray-600">
                        <Lock size={18} />
                        New Password
                      </label>
                    </div>
                    <div className="w-full sm:w-2/3 relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="w-full sm:w-1/3">
                      <label className="flex items-center gap-2 text-gray-600">
                        <Check size={18} />
                        Confirm Password
                      </label>
                    </div>
                    <div className="w-full sm:w-2/3">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Password Action Buttons */}
                  <div className="flex justify-end gap-4 pt-6">
                    <button
                      onClick={() => {
                        setChangePasswordMode(false);
                        setPasswordData({
                          currentPassword: '',
                          newPassword: '',
                          confirmPassword: ''
                        });
                      }}
                      className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      <X size={16} />
                      Cancel
                    </button>
                    <button
                      onClick={handleChangePassword}
                      className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      <Save size={16} />
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerAccountPage;
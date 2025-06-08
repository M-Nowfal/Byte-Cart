'use client';

import { useContext, useEffect, useState } from 'react';
import { Edit, Mail, Phone, Home, MapPin, Lock, Check, X, User, Save, DoorClosed, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { context } from '@/context/AppContext';
import axios from 'axios';
import { toast } from 'sonner';
import Skeleton from '../ui/Skeloton';
import { useRouter } from 'next/navigation';
import ChangePasswordCard from '../cards/ChangePasswordCard';

const AccountPage = ({ id }) => {
  const { isLoading, setIsLoading, byteCartUser } = useContext(context);
  const [userData, setUserData] = useState({});
  const [originalUserData, setOriginalUserData] = useState({});
  const [hasChanges, setHasChanges] = useState(false);
  const [changePass, setChangePass] = useState(false);
  const router = useRouter();

  const getUserAccount = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/getuser/${id}`);
      if (res.status === 200) {
        setUserData(res.data.user);
        setOriginalUserData(res.data.user);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserAccount();
  }, []);

  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState('');

  const handleEditClick = (field, value) => {
    setEditingField(field);
    setTempValue(value);
  };

  const handleCancelEdit = () => {
    setEditingField(null);
    setTempValue('');
  };

  const handleFieldChange = (field) => {
    if (field.includes('address.')) {
      const addressField = field.split('.')[1];
      setUserData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: tempValue
        }
      }));
    } else {
      setUserData(prev => ({
        ...prev,
        [field]: tempValue
      }));
    }
    setHasChanges(true);
    setEditingField(null);
    setTempValue('');
  };

  const saveChanges = async () => {
    try {
      setIsLoading(true);
      const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/user/update/${id}`, { userData });
      if (res.status === 200) {
        toast.success(res.data?.message);
        setOriginalUserData(userData);
        setHasChanges(false);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || "Failed to update profile");
      // Revert to original data if update fails
      setUserData(originalUserData);
    } finally {
      setIsLoading(false);
    }
  };

  const discardChanges = () => {
    setUserData(originalUserData);
    setHasChanges(false);
  };

  const renderField = (label, field, value, icon, isNested = false) => {
    const fullField = isNested ? `address.${field}` : field;
    const displayValue = userData[field] || (isNested && userData.address?.[field]) || '';

    return (
      <div className="mb-6 text-black">
        <label className="flex items-center text-sm font-medium text-gray-500 mb-1">
          {icon}
          <span className="ml-2">{label}</span>
        </label>

        {editingField === fullField ? (
          <div className="flex items-center">
            <input
              type="text"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleFieldChange(fullField)}
              className="flex-1 border-b-2 border-primary py-1 px-2 focus:outline-none"
              autoFocus
            />
            <div className="flex ml-2 space-x-2">
              <button
                onClick={() => handleFieldChange(fullField)}
                className="text-green-500 hover:text-green-700"
              >
                <Check size={18} />
              </button>
              <button
                onClick={handleCancelEdit}
                className="text-red-500 hover:text-red-700"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <p className="text-lg font-medium text-gray-800 py-1">{displayValue}</p>
            <button
              onClick={() => handleEditClick(fullField, displayValue)}
              className="text-gray-400 hover:text-primary"
            >
              <Edit size={18} />
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    isLoading ? (
      <Skeleton skelotonFor="account" />
    ) : (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r flex from-primary to-primary-content p-6 text-white">
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold">My Profile</h1>
                <p className="text-primary-100">Manage your personal information</p>
              </div>
              <div className="ms-auto mt-3">
                <button
                  className="btn btn-primary shadow-lg shadow-gray-400"
                ><label htmlFor="my_modal_6" className="cursor-pointer">Log Out</label></button>
              </div>
            </div>

            <div>
              <input type="checkbox" id="my_modal_6" className="modal-toggle" />
              <div className="modal" role="dialog">
                <div className="modal-box">
                  <h3 className="text-lg font-bold">Logout Alert</h3>
                  <p className="pt-4">Are you sure to logout from Byte-cart</p>
                  <div className="flex justify-end gap-7">
                    <div className="modal-action">
                      <label htmlFor="my_modal_6" className="btn text-green-600">Cancel</label>
                    </div>
                    <div className="modal-action">
                      <label htmlFor="my_modal_6" className="btn text-red-600" onClick={() => router.push("/user/auth/logout")}>OK</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personal Information */}
                <div>
                  <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">
                    Personal Information
                  </h2>
                  {renderField('First Name', 'firstName', userData.firstName, <User size={18} className="text-gray-400" />)}
                  {renderField('Last Name', 'lastName', userData.lastName, <User size={18} className="text-gray-400" />)}
                  {renderField('Email', 'email', userData.email, <Mail size={18} className="text-gray-400" />)}
                  {renderField('Phone', 'phone', userData.phone, <Phone size={18} className="text-gray-400" />)}
                </div>

                {/* Address Information */}
                <div>
                  <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">
                    Address Information
                  </h2>
                  {renderField('Address Type', 'type', userData.address?.type, <Home size={18} className="text-gray-400" />, true)}
                  {renderField('Door No', 'doorNo', userData.address?.doorNo, <DoorClosed size={18} className="text-gray-400" />, true)}
                  {renderField('Street', 'street', userData.address?.street, <MapPin size={18} className="text-gray-400" />, true)}
                  {renderField('City', 'city', userData.address?.city, <MapPin size={18} className="text-gray-400" />, true)}
                  {renderField('State', 'state', userData.address?.state, <MapPin size={18} className="text-gray-400" />, true)}
                  {renderField('Country', 'country', userData.address?.country, <MapPin size={18} className="text-gray-400" />, true)}
                  {renderField('PIN Code', 'pinCode', userData.address?.pinCode, <MapPin size={18} className="text-gray-400" />, true)}
                </div>
              </div>

              {/* Password Change Section */}
              {changePass ? (
                <ChangePasswordCard 
                  setChangePass={setChangePass} 
                  userid={byteCartUser?.id}
                />
              ) : (
                <div className="mt-8 pt-6 border-t">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Security</h2>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Lock size={18} className="text-gray-400" />
                      <span className="ml-2 text-gray-700">Password</span>
                    </div>
                    <button className="text-primary hover:text-primary-dark font-medium cursor-pointer" onClick={() => setChangePass(prev => !prev)}>
                      Change Password
                    </button>
                  </div>
                </div>
              )}

              {/* Save Changes Button */}
              {hasChanges && (
                <div className="mt-8 flex justify-end space-x-4">
                  <button
                    onClick={discardChanges}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Discard Changes
                  </button>
                  <button
                    onClick={saveChanges}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark flex items-center"
                  >
                    <Save size={18} className="mr-2" />
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AccountPage;


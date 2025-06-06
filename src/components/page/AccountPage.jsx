'use client';
import { useContext, useEffect, useState } from 'react';
import { Edit, Mail, Phone, Home, MapPin, Lock, Check, X, User, Save, DoorClosed, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { context } from '@/context/AppContext';
import axios from 'axios';
import { toast } from 'sonner';
import Skeleton from '../ui/Skeloton';
import { useRouter } from 'next/navigation';

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
                <ChangePassword 
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

const ChangePassword = ({ setChangePass, userid }) => {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.oldPassword) {
      newErrors.oldPassword = 'Current password is required';
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/user/changepassword`, {
        userid, oldPass: formData.oldPassword, newPass: formData.newPassword
      });
      if (res.status === 200) {
        toast.success(res.data.message);
        setSuccess(true);
        setFormData({
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update password");
      setErrors({ submit: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-black">
      <div className="flex items-center justify-center mb-6">
        <Lock className="w-8 h-8 text-indigo-600" />
        <h2 className="ml-2 text-2xl font-bold text-gray-800">Change Password</h2>
      </div>

      {success ? (
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-green-800">Password changed successfully!</h3>
          <p className="text-green-600 mt-1">Your password has been updated.</p>
          <button
            onClick={() => setSuccess(false)}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Change Password Again
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.submit && (
            <div className="p-3 bg-red-50 text-red-600 rounded-md">
              {errors.submit}
            </div>
          )}

          <div>
            <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Current Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="oldPassword"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errors.oldPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('old')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
              </button>
            </div>
            {errors.oldPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.oldPassword}</p>
            )}
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword.new ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errors.newPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('new')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirm')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
          >
            {isSubmitting ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      )}
      {!success && <button
        className={`w-full py-2 px-4 mt-5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700`}
        onClick={() => setChangePass(false)}
      >
        Cancel
      </button>}
    </div>
  );
};

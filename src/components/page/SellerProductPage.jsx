"use client";

import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Trash2, Save, X, Link, Package, Loader2, Star, Trash2Icon } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { context } from '@/context/AppContext';

const SellerProductPage = ({ product, newProduct }) => {
  const { byteCartSeller } = useContext(context)
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    images: [],
    brand: '',
    stock: '',
    ratings: 0,
    status: true,
    tags: []
  });
  const [newTag, setNewTag] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUrlValid, setIsUrlValid] = useState(true);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        price: product.price || 0,
        description: product.description || '',
        category: product.category || '',
        images: product.images || [],
        brand: product.brand || '',
        stock: product.stock || 0,
        ratings: product.ratings || 0,
        status: product.status !== undefined ? product.status : true,
        tags: product.tags || []
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddImageUrl = () => {
    if (!newImageUrl.trim()) {
      toast.error('Please enter an image URL');
      return;
    }

    setIsUrlValid(true);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, newImageUrl.trim()]
    }));
    setNewImageUrl('');
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let res;
      if (newProduct) {
        res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/product`, { formData, sellerid: byteCartSeller?.id });
      } else {
        res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/product/${product._id}`, formData);
      }
      if (res.status === 200) {
        toast.success(res.data.message);
        router.push('/seller/dashboard');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update product');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProduct = async () => {
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/product/${product._id}`);
      if (res.status === 200) {
        toast.success(res.data.message);
        router.push('/seller/dashboard');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete product');
    }
  };

  const handleCancel = () => {
    router.push('/seller/dashboard');
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center h-150">
        <div className="text-center">
          <Package className="h-12 w-12 mx-auto text-gray-400" />
          <p className="mt-4 text-gray-600">Product not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Edit Product</h1>
        {!newProduct && <label htmlFor="delete-product" className="btn font-bold text-lg ms-auto">
          <Trash2Icon className="text-red-500" /> Delete
        </label>}
      </div>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="delete-product" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Byte-Cart Alert</h3>
          <p className="py-4">Are you sure to delete this product</p>
          <div className="modal-action">
            <label htmlFor="delete-product" className="btn">Close</label>
            <label htmlFor="delete-product" className="btn"  onClick={deleteProduct}>Delete</label>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">
              Basic Information
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Pricing & Inventory */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">
              Pricing & Inventory
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="status"
                id="status"
                checked={formData.status}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="status" className="ml-2 block text-sm text-gray-700">
                Product is active
              </label>
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Product Images</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {formData.images.map((img, index) => (
              <div key={index} className="relative group">
                <img
                  src={img}
                  alt={`Product preview ${index}`}
                  className="h-32 w-full object-contain rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-gray-500 hover:bg-red-500 text-white p-1 rounded-full transition-opacity md:opacity-0 md:group-hover:opacity-100 cursor-pointer"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))}

            <div className="flex flex-col justify-center space-y-2">
              <div className="flex">
                <input
                  type="text"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="Enter image URL"
                  className={`w-6/6 px-3 py-2 border ${isUrlValid ? 'border-gray-300' : 'border-red-500'} rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                <button
                  type="button"
                  onClick={handleAddImageUrl}
                  className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
                >
                  <Link className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Product Tags</h2>

          <div className="flex flex-wrap gap-2 mb-3">
            {formData.tags.map((tag, index) => (
              <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add new tag"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add
            </button>
          </div>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-5 w-5 cursor-pointer ${star <= formData.ratings ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                onClick={() => setFormData(prev => ({ ...prev, ratings: star }))}
              />
            ))}
            <span className="ml-2 text-sm text-gray-500">{formData.ratings} stars</span>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading || (!formData.name || !formData.images || !formData.description || !formData.category || !formData.price || !formData.stock || !formData.brand)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {newProduct ? "Adding..." : "Updating..."}
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                {newProduct ? "Add Product" : "Update Product"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SellerProductPage;
"use client";

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Edit2, Tag, Layers, Star, Loader2, Package, IndianRupee } from 'lucide-react';
import { useRouter } from 'next/navigation';

const SellerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getSellerProducts = async () => {
    try {
      const seller = await JSON.parse(localStorage.getItem("byteCartSeller"));
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/seller/products/${seller.id}`);
      if (res.status === 200) {
        setProducts(res.data.products || []);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSellerProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-150 p-8 flex justify-center items-center">
        <div className="flex flex-col items-center gap-2 text-gray-600">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span>Loading your products...</span>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="min-h-150 p-8 flex justify-center items-center">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Package className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-700">No Products Found</h2>
          <p className="text-gray-500 mt-2">You haven't added any products yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Products</h1>
          <button className="btn btn-primary ms-auto" onClick={() => router.push("/seller/addproduct")}>Add Product</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-48 object-contain"
                />
                <button
                  className="absolute top-2 right-2 bg-white cursor-pointer p-2 rounded-full shadow-md hover:bg-blue-200 transition-colors"
                  aria-label="Edit product"
                  onClick={() => router.push(`/seller/product/${product._id}`)}
                >
                  <Edit2 className="h-5 w-5 text-blue-600" />
                </button>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{product.name}</h3>
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    {product.category}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="ml-1 text-gray-700">{product.ratings || 'No ratings'}</span>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-gray-600">
                      <IndianRupee className="h-4 w-4" />
                      <span className="ml-1 font-medium">{product.price}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Layers className="h-4 w-4" />
                      <span className="ml-1">{product.stock} in stock</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex flex-wrap gap-2">
                    {product.tags?.map((tag, index) => (
                      <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
"use client";

import { ChevronLeft, ChevronRight, Star, ShoppingCart, Share2, PlusSquareIcon, MinusSquareIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import LikeButton from "../ui/LikeButton";
import { toast } from "sonner";
import { context } from "@/context/AppContext";
import axios from "axios";
import Loader from "../ui/Loader";

const ProductPage = ({ product }) => {
  const { byteCartUser, setNoOfCartItems } = useContext(context);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const images = product?.images || [];
  const ratingStars = Array(5).fill(0);

  useEffect(() => {
    const isLikedProduct = async () => {
      const user = await JSON.parse(localStorage.getItem("byteCartUser"));
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/wishlist/${user.id || "unknown"}/${product._id}`);
        if (res.status === 200)
          setIsLiked(res.data.liked);
      } catch (err) {
        toast.error(err.response?.data?.message || "Something went wrong");
      }
    };
    isLikedProduct();
  }, []);

  const addToCart = async () => {
    try {
      setIsLoading(true);
      if (!byteCartUser) {
        toast.error("You need to create an account or Login");
        return;
      } else {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/addtocart/${byteCartUser.id}`, {
          productid: product._id, quantity, amount: quantity * product.price
        });
        if (res.status === 201) {
          toast.success(res.data.message);
          setNoOfCartItems(prev => prev + quantity);
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add product");
    } finally {
      setIsLoading(false);
    }
  };

  const addToWishList = async () => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/product/addtowishlist`, {
        userid: byteCartUser?.id, productid: product._id
      });
      if (res.status === 200) {
        toast.success(res.data?.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add product");
    }
  };

  const removeFromWishList = async () => {
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/product/addtowishlist`, {
        data: { userid: byteCartUser?.id, productid: product._id },
        headers: { "Content-Type": "application/json" }
      });
      if (res.status === 200) {
        toast.success(res.data?.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add product");
    }
  };

  const shareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: "Check out this product",
        url: `/product/${product._id}`
      })
        .catch((err) => {
          toast.error("Failed to share product");
        })
    } else {
      toast.error("Share is not possible in this browser");
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev >= images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev <= 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Images */}
        <div className="w-full lg:w-1/2">
          <div className="relative bg-white rounded-xl shadow-md overflow-hidden">
            <div className="relative h-96 w-full">
              <img
                src={images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-contain p-4"
              />

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700 cursor-pointer" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
              >
                <ChevronRight className="w-6 h-6 text-gray-700 cursor-pointer" />
              </button>
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="flex gap-2 p-4 overflow-x-auto">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 ${currentImageIndex === index ? 'border-primary' : 'border-transparent'}`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-1/2">
          <div className="bg-white rounded-xl shadow-md p-6 h-full">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-sm text-gray-500">{product.category}</span>
                <h1 className="text-3xl font-bold text-gray-900 mt-1">{product.name}</h1>
                <span className="text-sm text-gray-500">Brand: {product.barand}</span>
              </div>
              <LikeButton
                className={`${isLiked ? "fill-red-500 text-red-500" : "text-gray-500"}`}
                onClick={() => {
                  if (!isLiked) {
                    byteCartUser && addToWishList();
                    setIsLiked(true);
                  } else {
                    byteCartUser && removeFromWishList();
                    setIsLiked(false);
                  }
                }} />
            </div>

            {/* Rating */}
            <div className="flex items-center mt-3">
              <div className="flex">
                {ratingStars.map((_, idx) => (
                  <Star
                    key={idx}
                    className={`w-5 h-5 ${idx < product.ratings ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500 ml-2">
                ({product.reviews?.length || 0} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mt-4">
              <span className="text-3xl font-bold text-gray-900">
                ₹{product.price.toFixed(2)}
              </span>
              {product.stock > 0 ? (
                <span className="ml-2 text-sm text-green-600">In Stock ({product.stock} available)</span>
              ) : (
                <span className="ml-2 text-sm text-red-600">Out of Stock</span>
              )}
            </div>

            {/* Description */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900">Description</h3>
              <p className="mt-2 text-gray-600">{product.description}</p>
            </div>

            {/* Quantity and Actions */}
            <div className="mt-8">
              {product.stock > 0 && <div className="flex items-center gap-4 mb-6">
                <span className="text-gray-700">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="px-3 py-1 hover:bg-gray-100"
                  >
                    <MinusSquareIcon className="text-red-500 cursor-pointer" />
                  </button>
                  <span className="px-4 py-1 text-black">{quantity}</span>
                  <button
                    onClick={() => {
                      if (quantity < product?.stock) {
                        setQuantity((prev) => prev + 1)
                      } else {
                        toast.error(`You reach the max avalibale stock ${product.stock}`);
                      }
                    }}
                    className="px-3 py-1 text-lg hover:bg-gray-100"
                  >
                    <PlusSquareIcon className="text-green-500 cursor-pointer" />
                  </button>
                </div>
              </div>}

              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-md font-medium flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50" onClick={addToCart} disabled={product.stock <= 0 || loading}>
                  <ShoppingCart className="w-5 h-5" />
                  {loading ? <Loader /> : "Add to Cart"}
                </button>
                <button className="flex-1 border border-primary text-primary hover:bg-primary/10 py-3 px-6 rounded-md font-medium flex items-center justify-center gap-2 cursor-pointer" onClick={shareProduct}>
                  <Share2 className="w-5 h-5" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section - Would need to fetch reviews separately */}
      {product.reviews?.length > 0 && (
        <div className="mt-12 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
          <div className="space-y-6">
            {product.reviews.map((review) => (
              <div key={review._id} className="border-b pb-4">
                <div className="flex items-center">
                  <div className="flex">
                    {ratingStars.map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-4 h-4 ${idx < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">{review.userName}</span>
                </div>
                <p className="mt-2 text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
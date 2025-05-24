"use client";

import { ProductType } from "@/Types/types";
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";
import { useState } from "react";

const ProductPage = ({ product }: ProductType) => {

  const noOfImages = product.images.length;
  const [imageNo, setImageNo] = useState(0);

  return (
    <div className="flex justify-center pt-30">
      <div className="card w-5/6 sm:w-1/2">
        <figure>
          <img
            src={product.images[imageNo % noOfImages]}
            alt={product.name}
            className="h-100 object-contain rounded-2xl"
          />
        </figure>
        <div className="flex justify-center gap-50 mt-3">
          <ChevronLeftCircle
            className="size-12 cursor-pointer"
            onClick={() => setImageNo(prev => prev - 1)}
          />
          <ChevronRightCircle
            className="size-12 cursor-pointer"
            onClick={() => setImageNo(prev => prev + 1)}
          />
        </div>
        <div className="card-body">
          <h2 className="card-title">{product.name}</h2>
          <p>{product.description}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
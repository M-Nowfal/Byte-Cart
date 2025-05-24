import { ProductType } from "@/Types/types";
import Link from "next/link";

const ProductCard = ({ product }: ProductType) => {

  return (
    <div className="card bg-gray-700 shadow shadow-base-300">
      <Link href={`/product/${product._id}`}>
        <figure>
          <img
            src={product.images[1]}
            alt={product.name} 
            className="w-full rounded"
          />
        </figure>
      </Link>
        <div className="card-body">
          <h2 className="card-title">{product.name}</h2>
          <p>{product.description}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Add to Cart</button>
          </div>
        </div>
    </div>
  );
}

export default ProductCard;
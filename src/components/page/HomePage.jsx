"use client";

import { useContext, useEffect, useState } from "react";
import Skeloton from "../ui/Skeloton";
import { context } from "@/context/AppContext";
import axios from "axios";
import { toast } from "sonner";
import ProductCard from "../cards/ProductCard";

const HomePage = () => {

  const { isLoading, setIsLoading } = useContext(context);
  const [isRequestSend, setIsRequestSend] = useState(false);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/product`);
      setProducts(res?.data?.products);
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    products?.length === 0 && getProducts();
  }, []);

  return (
    !isLoading ? (
      <div className="flex flex-col items-center gap-5 mt-5">
        {products?.map(product => (
          <ProductCard 
            key={product._id} 
            props={product} 
            isRequestSend={isRequestSend}
            setIsRequestSend={setIsRequestSend}
          />
        ))}
      </div>
    ) : (
      <Skeloton skelotonFor="Home" />
    )
  );
}

export default HomePage;
"use client";

import { AppContext } from "@/context/AppContext";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { toast } from "sonner";

const HomePage = () => {

  const [products, setProducts] = useState<Array<object>>([]);
  const { isLoading, setIsLoading } = useContext(AppContext);

  const getProducts = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
      if (res?.data?.status) {
        setProducts(res.data.products);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (err) {
      toast.error("Somethig went wrong! please try again later");
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log("Something went wrong", err);
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    products.length === 0 && getProducts();
  }, []);

  return (
    !isLoading ? (
      <div className="container">
        <div>Home Page</div>
      </div>
    ) : (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  );
}

export default HomePage;
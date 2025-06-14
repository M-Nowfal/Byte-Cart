"use client";

import { createContext, useEffect, useState } from "react";

export const context = createContext();

const AppContext = ({ children }) => {

  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [byteCartUser, setByteCartUser] = useState(null);
  const [byteCartSeller, setByteCartSeller] = useState(null);
  const [noOfCartItems ,setNoOfCartItems] = useState(0);
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);

  useEffect(() => {
    async function getStoredUser() {
      const user = await JSON.parse(localStorage.getItem("byteCartUser")) || null;
      setByteCartUser(user);
      const seller = await JSON.parse(localStorage.getItem("byteCartSeller")) || null;
      setByteCartSeller(seller);
    }
    getStoredUser();
  }, []);

  const contextValues = {
    isDarkTheme, setIsDarkTheme,
    isLoading, setIsLoading,
    byteCartUser, setByteCartUser,
    noOfCartItems, setNoOfCartItems,
    byteCartSeller, setByteCartSeller,
    products, setProducts,
    filterProducts, setFilterProducts
  };

  return (
    <context.Provider value={contextValues}>
      {children}
    </context.Provider>
  );
}

export default AppContext;
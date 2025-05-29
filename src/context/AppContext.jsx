"use client";

import { createContext, useEffect, useState } from "react";

export const context = createContext();

const AppContext = ({ children }) => {

  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [byteCartUser, setByteCartUser] = useState(null);
  const [noOfCartItems ,setNoOfCartItems] = useState(0);

  useEffect(() => {
    async function getStoredUser() {
      const user = await JSON.parse(localStorage.getItem("byteCartUser")) || null;
      setByteCartUser(user);
    }
    getStoredUser();
  }, []);

  const contextValues = {
    isDarkTheme, setIsDarkTheme,
    isLoading, setIsLoading,
    byteCartUser, setByteCartUser,
    noOfCartItems, setNoOfCartItems
  };

  return (
    <context.Provider value={contextValues}>
      {children}
    </context.Provider>
  );
}

export default AppContext;
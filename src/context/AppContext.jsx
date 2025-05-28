"use client";

import { createContext, useEffect, useState } from "react";

export const context = createContext();

const AppContext = ({ children }) => {

  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [byteCartUser, setByteCartUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("byteCartUser") || null;
    setByteCartUser(user?.name);
  }, []);

  const contextValues = {
    isDarkTheme, setIsDarkTheme,
    isLoading, setIsLoading,
    byteCartUser, setByteCartUser
  };

  return (
    <context.Provider value={contextValues}>
      {children}
    </context.Provider>
  );
}

export default AppContext;
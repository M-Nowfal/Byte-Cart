"use client";

import { createContext, ReactNode, useState } from "react";

export const AppContext = createContext<any>(null);

export default function ContextProvider({ children }: { children: ReactNode }) {

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const contextValues = {
    isLoading, setIsLoading
  };

  return (
    <AppContext.Provider value={contextValues} >
      {children}
    </AppContext.Provider>
  );
}
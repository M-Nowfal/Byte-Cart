import ContextProvider from "@/context/AppContext";
import { ReactNode } from "react";
import { Toaster } from "sonner";

const App = ({ children }: { children: ReactNode }) => {
  return (
    <ContextProvider>
      <Toaster richColors position="top-center" swipeDirections={["left", "right"]} duration={3000} />
      {children}
    </ContextProvider>
  );
}

export default App;
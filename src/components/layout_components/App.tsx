import ContextProvider from "@/context/AppContext";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const App = ({ children }: { children: ReactNode }) => {
  return (
    <ContextProvider>
      <Toaster richColors position="top-center" swipeDirections={["left", "right"]} duration={3000} />
      <Header />
      <Sidebar />
      {children}
      <Footer />
    </ContextProvider>
  );
}

export default App;
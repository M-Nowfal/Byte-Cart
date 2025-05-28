import AppContext from "@/context/AppContext";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { Toaster } from "sonner";

const Main = ({ children }) => {
  return (
    <AppContext>
      <Toaster richColors position="top-center" swipeDirections={["left", "right"]}/>
      <Header />
      <Sidebar />
      {children}
      <Footer />
    </AppContext>
  );
}

export default Main;
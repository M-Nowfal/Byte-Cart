import CartPage from "@/components/page_components/CartPage";
import axios from "axios";

export const metadata = {
  title: "Byte-Cart User Cart",
  description: "Byte Cart user cart page"
}

export default async function Page({ params }: { params: { user_id: string } }) {
  try {
    const { user_id } = await params;
    const cartProducts = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cart/${user_id}`);
    return <CartPage products={cartProducts} />
  } catch (err) {
    if (err instanceof Error) {
      console.log("Error while fetching Cart items", err.message);
    } else {
      console.log("Error while fetching Cart items", err);
    }
  }
}
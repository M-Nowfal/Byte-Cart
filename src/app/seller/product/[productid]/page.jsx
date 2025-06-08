import SellerProductPage from "@/components/page/SellerProductPage";
import axios from "axios";

export async function generateMetadata({ params }) {
  try {
    const { productid } = await params;
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/product/${productid}`);
    const product = res.data;
    return {
      title: product?.name?.slice(0, 12) || "Byte-Cart product",
      description: product?.description?.slice(0, 50) || "Byte Cart single product view page" 
    }
  } catch (err) {
    console.log("Error while fetching the product", err);
  }
}

export default async function Product({ params }) {
  try {
    const { productid } = await params;
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/product/${productid}`);
    const product = res.data?.product;
    return (
      <SellerProductPage product={product} />
    );
  } catch (err) {
    console.log("Error while fetching the products", err);
  }
}
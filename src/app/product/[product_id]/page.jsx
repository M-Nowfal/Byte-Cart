import ProductPage from "@/components/page/ProductPage";
import axios from "axios";

export default async function Product({ params }) {
  try {
    const { product_id } = await params;
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/product/${product_id}`);
    const product = res.data;
    return (
      <ProductPage product={product} />
    );
  } catch (err) {
    console.log("Error while fetching the products", err);
  }
}
import ProductPage from "@/components/page_components/ProductPage";
import axios from "axios";

interface Params {
  params: { 
    product_id: string 
  }
}

export async function generateMetadata({ params }: Params){
  const { product_id } = await params;
  try {
    const product = (await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${product_id}`))?.data?.product;
    return {
      title: product.name,
      description: product.description
    }
  } catch (err) {
    console.log(err);
  }
}

export default async function Page({ params }: Params) {
  try {
    const { product_id } = await params;
    const product: any = (await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${product_id}`))?.data?.product;
    return <ProductPage product={product} />
  } catch (err) {
    console.log(err);
  }
}
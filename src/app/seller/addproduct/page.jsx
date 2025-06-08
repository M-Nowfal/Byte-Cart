import SellerProductPage from "@/components/page/SellerProductPage";

export const metadata = {
  title: "Byte-Cart Add Product",
  description: "Byte Cart add product page"
};

export default function AddProduct() {
  const product = {
    name: '',
    price: '',
    description: '',
    category: '',
    images: [],
    brand: '',
    stock: '',
    ratings: 0,
    status: true,
    tags: []
  }
  return (
    <SellerProductPage product={product} newProduct={true} />
  );
}
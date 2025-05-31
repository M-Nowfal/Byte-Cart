import OrderSummaryPage from "@/components/page/OrderSummaryPage";

export const metadata = {
  title: "Byte-Cart OrderSummary",
  description: "Byte Cart order summary page"
};

export default async function ordersummary({ params }) {
  const { slug } = await params;
  const [productid, quantity] = slug;
  return (
    <OrderSummaryPage productid={productid} quantity={quantity} />
  );
}
import OrderSummaryPage from "@/components/page/OrderSummaryPage";

export const metadata = {
  title: "Byte-Cart Cart OrderSummary",
  description: "Byte Cart cart ordersummary page"
};

export default async function CartOrder({ params }) {
  const { cartid } = await params;
  return (
    <OrderSummaryPage cartid={cartid} />
  ); 
}
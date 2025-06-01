import PaymentPage from "@/components/page/PaymentPage";

export const metadata = {
  title: "Byte-Cart Payment",
  description: "Byte Cart payment page"
};

export default async function OrderPaymentPage({ params }) {
  const { amount } = await params;
  return (
    <PaymentPage amount={amount} />
  );
}
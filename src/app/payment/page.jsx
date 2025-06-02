import PaymentPage from "@/components/page/PaymentPage";

export const metadata = {
  title: "Byte-Cart Payment",
  description: "Byte Cart payment page"
};

export default async function OrderPaymentPage() {
  return (
    <PaymentPage />
  );
}
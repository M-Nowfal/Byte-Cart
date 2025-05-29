import CartPage from "@/components/page/CartPage";

export const metadata = {
  title: "Byte-Cart User Cart",
  description: "Byte Cart user cart page"
};

export default async function UserCartPage({ params }) {
  const { userid } = await params;
  return (
    <CartPage id={userid} />
  );
}
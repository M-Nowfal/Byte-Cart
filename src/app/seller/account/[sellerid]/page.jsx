import SellerAccountPage from "@/components/page/SellerAccountPage";

export const metadata = {
  title: "Byte-Cart Seller Account",
  description: "Byte Cart seller account profile page"
};

export default async function AccountPage({ params }) {
  const { sellerid } = await params;
  return (
    <SellerAccountPage sellerid={sellerid} />
  );
}
import AccountPage from "@/components/page/AccountPage";

export const metadata = {
  title: "Byte-Cart User Account",
  description: "Byte Cart user account profile page"
};

export default async function UserAccountPage({ params }) {
  const { id } = await params;
  return (
    <AccountPage id={id} />
  );
}
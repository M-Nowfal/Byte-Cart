import AccountPage from "@/components/page/AccountPage";

export default async function UserAccountPage({ params }) {
  const { id } = await params;
  return (
    <AccountPage id={id} />
  );
}
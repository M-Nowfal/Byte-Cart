import UserSignOut from "@/components/auth/user/UserSignOut";

export const metadata = {
  title: "Byte-Cart User Signout",
  description: "Byte Cart user signout page, user can delete their account"
};

export default async function UserSignOutPage() {
  return (
    <UserSignOut />
  );
}
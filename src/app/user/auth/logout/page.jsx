import UserLogout from "@/components/auth/user/UserLogout";

export const metadata = {
  title: "Byte-Cart User Logout",
  description: "Byte Cart user logout page"
};

export default async function UserLogoutPage() {
  return (
    <UserLogout />
  );
}
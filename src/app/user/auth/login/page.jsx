import UserLogin from "@/components/auth/user/UserLogin";

export const metadata = {
  title: "Byte-Cart User Login",
  description: "Byte Cart user login page, existing user can login to their account"
};

export default async function UserLoginPage() {
  return (
    <UserLogin />
  );
}
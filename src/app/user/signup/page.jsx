import UserSignUp from "@/components/auth/user/UserSignUp";

export const metadata = {
  title: "Byte-Cart User Signup",
  description: "Byte Cart user signup page, new user can signup to create an account"
};

export default async function UserSignUpPage() {
  return (
    <UserSignUp />
  );
}
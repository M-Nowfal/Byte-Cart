import UserForgotPass from "@/components/auth/user/UserForgotPass";

export const metadata = {
  title: "Byte-Cart User ForgotPassword",
  description: "Byte Cart user ForgotPassword page, user can change their password"
};

export default async function UserForgotPasswordPage() {
  return (
    <UserForgotPass />
  );
}
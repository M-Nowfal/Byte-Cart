import OtpVerificationPage from "@/components/page_components/OtpVerificationPage";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Byte-Cart OTP Verification",
  description: "Byte Cart OTP verification Page"
};

export default async function Page({ params }: any) {
  const { role } = await params;
  if (role === "user" || role === "seller" || role === "admin") {
    return <OtpVerificationPage />
  } else {
    redirect("/page_not_found");
  }
}
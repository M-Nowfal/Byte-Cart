import OtpVerificationPage from "@/components/page_components/OtpVerificationPage";
import { redirect } from "next/navigation";

interface Params {
  params: {
    role: 'user' | 'seller' | 'admin'
  }
}

export const metadata = {
  title: "Byte-Cart OTP Verification",
  description: "Byte Cart OTP verification Page"
};

export default async function Page({ params }: Params) {
  const { role } = await params;
  if (role === "user" || role === "seller" || role === "admin") {
    return <OtpVerificationPage />
  } else {
    redirect("/not_found");
  }
}
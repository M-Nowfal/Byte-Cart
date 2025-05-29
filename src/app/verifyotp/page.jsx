import VerifyOtpPage from "@/components/page/verifyOtpPage";
import Loader from "@/components/ui/Loader";
import { Suspense } from "react";

export const metadata = {
  title: "Byte-Cart OTP verification",
  description: "Byte Cart OTP verification page for authentication"
};

export default async function VerifyOtp() {
  return (
    <Suspense fallback={<Loader />}>
      <VerifyOtpPage />
    </Suspense>
  );
}
import VerifyOtpPage from "@/components/page/verifyOtpPage";
import Loader from "@/components/ui/Loader";
import { Suspense } from "react";

export default async function VerifyOtp({ params }) {
  return (
    <Suspense fallback={<Loader />}>
      <VerifyOtpPage />
    </Suspense>
  );
}
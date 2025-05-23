import SellerLogin from "@/components/seller_components/SellerLogin";
import SellerLogout from "@/components/seller_components/SellerLogout";
import SellerSignIn from "@/components/seller_components/SellerSignIn";
import SellerSignOut from "@/components/seller_components/SellerSignOut";
import { redirect } from "next/navigation";

interface Params {
  params: {
    auth: string
  }
}

export async function generateMetadata({ params }: Params) {
  const { auth } = await params;
  return {
    title: `Byte-Cart Seller ${auth}`,
    description: `Byte Cart Seller ${auth} Page`
  }
}

export default async function ({ params }: Params) {
  const { auth } = await params;
  switch (auth) {
    case "login":
      return <SellerLogin />
    case "logout":
      return <SellerLogout />
    case "signin":
      return <SellerSignIn />
    case "signout":
      return <SellerSignOut />
    default:
      redirect("/page_not_found");
  }
}
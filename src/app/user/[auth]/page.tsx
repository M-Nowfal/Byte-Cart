import UserLogin from "@/components/user_components/UserLogin";
import UserLogout from "@/components/user_components/UserLogout";
import UserSignIn from "@/components/user_components/UserSignIn";
import UserSignOut from "@/components/user_components/UserSignOut";
import { redirect } from "next/navigation";

interface Params {
  params: {
    auth: string
  }
}

export async function generateMetadata({ params }: Params) {
  const { auth } = await params;
  return {
    title: `Byte-Cart User ${auth}`,
    description: `Byte Cart User ${auth} Page`
  }
}

export default async function ({ params }: Params) {
  const { auth } = await params;
  switch (auth) {
    case "login":
      return <UserLogin />
    case "logout":
      return <UserLogout />
    case "signin":
      return <UserSignIn />
    case "signout":
      return <UserSignOut />
    default:
      redirect("/page_not_found");
  }
}
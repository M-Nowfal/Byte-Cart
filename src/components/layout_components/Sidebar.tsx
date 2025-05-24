import Link from "next/link";
import { CircleX } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-gray-800 text-base-content min-h-full w-80 p-4 shadow-lg shadow-gary-200 rounded text-lg">
          <div className="flex justify-end">
            <h2 className="me-auto text-2xl font-extrabold text-green-600">Account</h2>
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay">
              <CircleX className="cursor-pointer text-red-400" />
            </label>
          </div>
          <div className="mb-5">
            <h2 className="text-2xl font-bold my-5">Shop by Category</h2>
            <li><Link href={`/`}>Mobile</Link></li>
            <li><Link href={`/`}>Computer</Link></li>
            <li><Link href={`/`}>Dress</Link></li>
            <li><Link href={`/`}>Others</Link></li>
          </div>
          <hr />
          <div className="mb-5">
            <h2 className="text-2xl font-bold my-5">Cart & Orders</h2>
            <li><Link href={`/cart/userid`}>Cart</Link></li>
            <li><Link href={`/orders/user`}>Orders</Link></li>
          </div>
          <hr />
          <div className="mb-5">
            <h2 className="text-2xl font-bold my-5">Help & Settings</h2>
            <li><Link href={`/account/user`}>Your Account</Link></li>
            <li><Link href={`/customer_service/user`}>Customer Service</Link></li>
            <li><Link href={`/auth/user/signout`}>Sign Out</Link></li>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;

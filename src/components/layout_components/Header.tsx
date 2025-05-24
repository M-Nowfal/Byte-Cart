import { Menu, Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <div className="navbar bg-gray-800 fixed z-1 shadow shadow-gray-900">
      <div className="w-fit">
        <label htmlFor="my-drawer">
          <Menu className="size-8 m-3 cursor-pointer text-cyan-600" />
        </label>
      </div>
      <div className="flex-1">
        <Link href={"/"} className="btn btn-ghost text-xl text-amber-600">Byte-Cart</Link>
      </div>
      <div>
        <label className="input border border-gray-400 bg-gray-800">
          <Search className="text-gray-500" />
          <input type="search" className="w-25 sm:w-75 text-white" required placeholder="Search" />
        </label>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <ShoppingCart className="text-amber-400" />
              <span className="badge badge-xs indicator-item text-orange-600">8</span>
            </div>
          </div>
          <div 
            tabIndex={0}
            className="card card-compact dropdown-content bg-gray-700 z-1 mt-6 w-52 shadow-md shadow-base-300">
            <div className="card-body">
              <span className="text-lg font-bold">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <User className="mt-2 ms-2 text-blue-400" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-gray-700 rounded-box z-1 mt-6 w-52 p-2 shadow-md shadow-base-300">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
import React from "react";
import { MenuIcon, BellIcon, UserIcon } from "lucide-react";
interface HeaderProps {
  toggleSidebar: () => void;
}
const Header: React.FC<HeaderProps> = ({
  toggleSidebar
}) => {
  return <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <button onClick={toggleSidebar} className="text-gray-500 focus:outline-none focus:text-gray-700 md:hidden">
            <MenuIcon size={20} />
          </button>
          <h1 className="text-xl font-semibold text-gray-800 ml-4">
            Farewell Information Management System
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-500 focus:outline-none focus:text-gray-700">
            <BellIcon size={20} />
          </button>
          <div className="relative">
            <button className="flex items-center text-gray-700 focus:outline-none">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <UserIcon size={18} className="text-gray-600" />
              </div>
              <span className="ml-2 text-sm font-medium hidden md:block">
                Admin User
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>;
};
export default Header;
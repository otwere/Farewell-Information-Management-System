import React from "react";
import { UserCircleIcon, Settings2Icon, BellIcon, LogOutIcon, CheckCircleIcon, XCircleIcon, MinusCircleIcon, CircleIcon } from "lucide-react";
import { useUser } from "../../contexts/UserContext";
interface UserProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}
const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({
  isOpen,
  onClose
}) => {
  const {
    user,
    logout,
    updateStatus
  } = useUser();
  if (!user || !isOpen) return null;
  const statusOptions = [{
    value: "online",
    label: "Online",
    icon: CheckCircleIcon,
    color: "text-green-500"
  }, {
    value: "busy",
    label: "Busy",
    icon: XCircleIcon,
    color: "text-red-500"
  }, {
    value: "away",
    label: "Away",
    icon: MinusCircleIcon,
    color: "text-yellow-500"
  }, {
    value: "offline",
    label: "Offline",
    icon: CircleIcon,
    color: "text-gray-500"
  }];
  return <>
      <div className="fixed inset-0" onClick={onClose} />
      <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="relative">
              {user.avatar ? <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full" /> : <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <UserCircleIcon size={32} className="text-gray-500" />
                </div>}
              <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white
                ${user.status === "online" ? "bg-green-500" : user.status === "busy" ? "bg-red-500" : user.status === "away" ? "bg-yellow-500" : "bg-gray-500"}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.name}
              </p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
              <p className="text-xs text-gray-500 truncate">{user.role}</p>
            </div>
          </div>
        </div>
        <div className="px-2 py-2 border-b border-gray-100">
          <p className="px-2 text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
            Set Status
          </p>
          {statusOptions.map(status => <button key={status.value} onClick={() => updateStatus(status.value as any)} className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
              <status.icon size={18} className={status.color + " mr-2"} />
              {status.label}
              {user.status === status.value && <CheckCircleIcon size={16} className="ml-auto text-green-500" />}
            </button>)}
        </div>
        <div className="px-2 py-2">
          <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
            <Settings2Icon size={18} className="mr-2" />
            Settings
          </button>
          <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
            <BellIcon size={18} className="mr-2" />
            Notifications
          </button>
          <button onClick={logout} className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md">
            <LogOutIcon size={18} className="mr-2" />
            Sign out
          </button>
        </div>
      </div>
    </>;
};
export default UserProfileDropdown;
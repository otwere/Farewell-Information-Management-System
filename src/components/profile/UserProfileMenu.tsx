import React, { useState } from "react";
import { UserCircleIcon, Settings2Icon, LogOutIcon, CheckCircleIcon, XCircleIcon, MinusCircleIcon, CircleIcon, ChevronRightIcon, KeyIcon, PaletteIcon, BellRingIcon, ClockIcon, ShieldIcon, GlobeIcon, BookOpenIcon, BoxIcon } from "lucide-react";
import { useUser } from "../../contexts/UserContext";
interface UserProfileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}
const UserProfileMenu: React.FC<UserProfileMenuProps> = ({
  isOpen,
  onClose
}) => {
  const {
    user,
    logout,
    updateStatus
  } = useUser();
  const [activeTab, setActiveTab] = useState<"profile" | "activity">("profile");
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
  const menuSections = [{
    title: "Account",
    items: [{
      icon: UserCircleIcon,
      label: "Profile Settings",
      onClick: () => console.log("Profile settings clicked"),
      color: "text-blue-600",
      badge: "New"
    }, {
      icon: KeyIcon,
      label: "Security",
      onClick: () => console.log("Security clicked"),
      color: "text-indigo-600"
    }, {
      icon: GlobeIcon,
      label: "Language & Region",
      onClick: () => console.log("Language clicked"),
      color: "text-green-600"
    }]
  }, {
    title: "Preferences",
    items: [{
      icon: BellRingIcon,
      label: "Notifications",
      onClick: () => console.log("Notifications clicked"),
      color: "text-amber-600"
    }, {
      icon: PaletteIcon,
      label: "Appearance",
      onClick: () => console.log("Appearance clicked"),
      color: "text-purple-600"
    }, {
      icon: BoxIcon,
      label: "Devices",
      onClick: () => console.log("Devices clicked"),
      color: "text-cyan-600"
    }]
  }];
  const recentActivity = [{
    id: 1,
    action: "Updated funeral service details",
    timestamp: "2 hours ago",
    icon: BookOpenIcon,
    color: "text-blue-500"
  }, {
    id: 2,
    action: "Generated gate pass",
    timestamp: "4 hours ago",
    icon: ShieldIcon,
    color: "text-green-500"
  }, {
    id: 3,
    action: "Added new inventory items",
    timestamp: "Yesterday",
    icon: Settings2Icon,
    color: "text-purple-500"
  }];
  const activeSessions = [{
    id: 1,
    device: "Windows PC - Chrome",
    location: "New York, USA",
    lastActive: "Active now",
    current: true
  }, {
    id: 2,
    device: "iPhone 13 - Safari",
    location: "New York, USA",
    lastActive: "3 hours ago",
    current: false
  }];
  return <>
      <div className="fixed inset-0" onClick={onClose} />
      <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="relative">
              {user.avatar ? <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-500 ring-offset-2" /> : <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center ring-2 ring-blue-500 ring-offset-2">
                  <span className="text-2xl font-bold text-white">
                    {user.name.charAt(0)}
                  </span>
                </div>}
              <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white
                  ${user.status === "online" ? "bg-green-500" : user.status === "busy" ? "bg-red-500" : user.status === "away" ? "bg-yellow-500" : "bg-gray-500"}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-lg font-semibold text-gray-900 truncate">
                {user.name}
              </p>
              <p className="text-sm text-gray-500 truncate">{user.email}</p>
              <p className="text-sm text-gray-500 truncate flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2" />
                {user.role}
              </p>
            </div>
          </div>
          <div className="mt-4 flex space-x-2">
            <button onClick={() => setActiveTab("profile")} className={`flex-1 py-1 px-3 rounded-md text-sm font-medium transition-colors ${activeTab === "profile" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}>
              Profile
            </button>
            <button onClick={() => setActiveTab("activity")} className={`flex-1 py-1 px-3 rounded-md text-sm font-medium transition-colors ${activeTab === "activity" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}>
              Activity
            </button>
          </div>
        </div>
        {activeTab === "profile" ? <>
            <div className="px-2 py-2 border-b border-gray-100">
              <p className="px-2 text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                Set Status
              </p>
              {statusOptions.map(status => <button key={status.value} onClick={() => updateStatus(status.value as "online" | "busy" | "away" | "offline")} className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                  <status.icon size={18} className={status.color + " mr-2"} />
                  {status.label}
                  {user.status === status.value && <CheckCircleIcon size={16} className="ml-auto text-green-500" />}
                </button>)}
            </div>
            {menuSections.map(section => <div key={section.title} className="px-2 py-2 border-b border-gray-100">
                <p className="px-2 text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                  {section.title}
                </p>
                {section.items.map(item => <button key={item.label} onClick={item.onClick} className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                    <item.icon size={18} className={`${item.color} mr-2`} />
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-600 rounded-full">
                        {item.badge}
                      </span>}
                    <ChevronRightIcon size={16} className="ml-2 text-gray-400" />
                  </button>)}
              </div>)}
          </> : <>
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                Recent Activity
              </p>
              <div className="space-y-3">
                {recentActivity.map(activity => <div key={activity.id} className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-md transition-colors">
                    <activity.icon size={18} className={`${activity.color} mt-0.5`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500 flex items-center">
                        <ClockIcon size={12} className="mr-1" />
                        {activity.timestamp}
                      </p>
                    </div>
                  </div>)}
              </div>
            </div>
            <div className="px-4 py-2">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                Active Sessions
              </p>
              <div className="space-y-3">
                {activeSessions.map(session => <div key={session.id} className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-md transition-colors">
                    <CircleIcon size={18} className={session.current ? "text-green-500" : "text-gray-400"} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 flex items-center">
                        {session.device}
                        {session.current && <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-green-100 text-green-600 rounded-full">
                            Current
                          </span>}
                      </p>
                      <p className="text-xs text-gray-500">
                        {session.location}
                      </p>
                      <p className="text-xs text-gray-500">
                        {session.lastActive}
                      </p>
                    </div>
                    {!session.current && <button className="text-xs text-red-600 hover:text-red-700">
                        End Session
                      </button>}
                  </div>)}
              </div>
            </div>
          </>}
        <div className="px-2 py-2">
          <button onClick={logout} className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors">
            <LogOutIcon size={18} className="mr-2" />
            Sign out
          </button>
        </div>
      </div>
    </>;
};
export default UserProfileMenu;
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HomeIcon, UserIcon, CalendarIcon, HeartPulseIcon, UsersIcon, DollarSignIcon, PackageIcon, ClipboardListIcon, ShieldIcon, BarChartIcon, Settings2Icon, ChevronRightIcon, SearchIcon, BuildingIcon, UserCircleIcon, MenuIcon, XIcon, TruckIcon } from "lucide-react";
interface MenuItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  path?: string;
  children?: MenuItem[];
  badge?: {
    count: number;
    variant: "default" | "warning" | "danger" | "success";
  };
}
interface Workspace {
  id: string;
  name: string;
  icon: React.ReactNode;
}
interface UserProfile {
  name: string;
  role: string;
  avatar?: string;
  status: "online" | "busy" | "away" | "offline";
}
const workspaces: Workspace[] = [{
  id: "main",
  name: "Main Branch",
  icon: <BuildingIcon size={20} />
}, {
  id: "north",
  name: "North Branch",
  icon: <BuildingIcon size={20} />
}, {
  id: "south",
  name: "South Branch",
  icon: <BuildingIcon size={20} />
}];
const userProfile: UserProfile = {
  name: "John Doe",
  role: "Administrator",
  status: "online"
};
const SearchBar: React.FC = () => {
  return <div className="relative">
      <SearchIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input type="text" placeholder="Quick search..." className="w-full bg-gray-700 text-gray-200 pl-10 pr-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-600 transition-colors" />
    </div>;
};
const WorkspaceSwitcher: React.FC<{
  workspaces: Workspace[];
}> = ({
  workspaces
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(workspaces[0]);
  return <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center w-full p-2 rounded-md hover:bg-gray-700 transition-colors">
        <div className="flex items-center flex-1">
          <div className="bg-gray-600 p-1.5 rounded-md mr-2">
            {selected.icon}
          </div>
          <span className="text-sm font-medium text-gray-200">
            {selected.name}
          </span>
        </div>
        <ChevronRightIcon size={18} className={`text-gray-400 transition-transform ${isOpen ? "rotate-90" : ""}`} />
      </button>
      {isOpen && <div className="absolute top-full left-0 w-full mt-1 bg-gray-800 rounded-md shadow-lg py-1 z-50">
          {workspaces.map(workspace => <button key={workspace.id} onClick={() => {
        setSelected(workspace);
        setIsOpen(false);
      }} className="flex items-center w-full px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
              <div className="bg-gray-600 p-1 rounded-md mr-2">
                {workspace.icon}
              </div>
              {workspace.name}
            </button>)}
        </div>}
    </div>;
};
const UserStatus: React.FC<{
  profile: UserProfile;
}> = ({
  profile
}) => {
  const statusColors = {
    online: "bg-green-500",
    busy: "bg-red-500",
    away: "bg-yellow-500",
    offline: "bg-gray-500"
  };
  return <div className="flex items-center p-4 border-t border-gray-700">
      <div className="relative">
        {profile.avatar ? <img src={profile.avatar} alt={profile.name} className="w-10 h-10 rounded-full" /> : <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
            <UserCircleIcon size={24} className="text-gray-300" />
          </div>}
        <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-800 ${statusColors[profile.status]}`} />
      </div>
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-200">{profile.name}</p>
        <p className="text-xs text-gray-400">{profile.role}</p>
      </div>
    </div>;
};
const SidebarItem: React.FC<{
  item: MenuItem;
  collapsed: boolean;
  isActive: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
  depth?: number;
}> = ({
  item,
  collapsed,
  isActive,
  isOpen,
  onToggle,
  depth = 0
}) => {
  const hasChildren = item.children && item.children.length > 0;
  const itemClasses = `
    flex items-center justify-between w-full
    ${depth > 0 ? "pl-8" : ""}
    ${isActive ? "bg-blue-600 text-white hover:bg-blue-700" : "text-gray-300 hover:bg-gray-700/50 hover:text-white"}
    transition-all duration-200 ease-in-out rounded-md cursor-pointer
    ${collapsed ? "px-2 py-2" : "px-4 py-2.5"}
    relative group
  `;
  const iconWrapperClasses = `
    ${collapsed ? "w-8 h-8 flex items-center justify-center" : ""}
    transition-transform duration-200 ease-in-out
    ${isActive ? "text-white" : "text-gray-400 group-hover:text-white"}
  `;
  const content = <div className={itemClasses} onClick={onToggle}>
      <div className="flex items-center min-w-0 space-x-3">
        <span className={iconWrapperClasses}>{item.icon}</span>
        {!collapsed && <span className="font-medium truncate text-sm">{item.title}</span>}
      </div>
      {!collapsed && hasChildren && <ChevronRightIcon size={16} className={`transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`} />}
      {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-400 rounded-r-full" />}
    </div>;
  return <div className="space-y-0.5">
      {item.path ? <Link to={item.path}>{content}</Link> : content}
      {hasChildren && isOpen && !collapsed && <div className={`ml-4 pl-4 border-l border-gray-700/50 space-y-0.5 
            animate-in slide-in-from-left-5 duration-200`}>
          {item.children?.map(child => <SidebarItem key={child.id} item={child} collapsed={collapsed} isActive={false} depth={depth + 1} />)}
        </div>}
    </div>;
};
interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}
const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onToggle
}) => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const menuItems: MenuItem[] = [{
    id: "dashboard",
    title: "Dashboard",
    icon: <HomeIcon size={20} />,
    path: "/"
  }, {
    id: "records",
    title: "Records & Services",
    icon: <UserIcon size={20} />,
    children: [{
      id: "deceased-records",
      title: "Deceased Records",
      icon: <UserIcon size={20} />,
      path: "/deceased-records"
    }, {
      id: "funeral-services",
      title: "Funeral Services",
      icon: <CalendarIcon size={20} />,
      path: "/funeral-management"
    }, {
      id: "embalming",
      title: "Embalming",
      icon: <HeartPulseIcon size={20} />,
      path: "/embalment-tracking"
    }]
  }, {
    id: "clients",
    title: "Client Management",
    icon: <UsersIcon size={20} />,
    children: [{
      id: "family-records",
      title: "Family Records",
      icon: <UsersIcon size={20} />,
      path: "/family-management"
    }, {
      id: "finance",
      title: "Finance & Billing",
      icon: <DollarSignIcon size={20} />,
      path: "/finance-billing"
    }]
  }, {
    id: "operations",
    title: "Operations",
    icon: <Settings2Icon size={20} />,
    children: [{
      id: "inventory",
      title: "Inventory",
      icon: <PackageIcon size={20} />,
      path: "/inventory-management"
    }, {
      id: "transport",
      title: "Transport Services",
      icon: <TruckIcon size={20} />,
      path: "/transport-services"
    }, {
      id: "staff",
      title: "Staff",
      icon: <ClipboardListIcon size={20} />,
      path: "/staff-management"
    }]
  }, {
    id: "admin",
    title: "Administration",
    icon: <ShieldIcon size={20} />,
    children: [{
      id: "security",
      title: "Security",
      icon: <ShieldIcon size={20} />,
      path: "/security-access"
    }, {
      id: "reports",
      title: "Reports",
      icon: <BarChartIcon size={20} />,
      path: "/reports"
    }]
  }];
  const toggleMenu = (menuId: string) => {
    setOpenMenus(prev => prev.includes(menuId) ? prev.filter(id => id !== menuId) : [...prev, menuId]);
  };
  const isMenuOpen = (menuId: string) => openMenus.includes(menuId);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "b") {
        onToggle();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onToggle]);
  return <>
      {isMobileOpen && <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 md:hidden" onClick={() => setIsMobileOpen(false)} />}
      <aside className={`
          ${collapsed ? "w-20" : "w-64"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          bg-gradient-to-b from-gray-800 to-gray-900
          transition-all duration-300 ease-in-out
          flex flex-col fixed h-full z-50 md:relative
          border-r border-gray-700/50
          shadow-xl
        `}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700/50 bg-gradient-to-r from-gray-800 to-gray-900">
          {!collapsed && <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="text-white font-semibold text-lg">Memories Farewell</span>
            </div>}
          {collapsed && <div className="w-8 h-8 mx-auto bg-gradient-to-tr from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>}
        </div>
        {!collapsed && <div className="p-4">
            <WorkspaceSwitcher workspaces={workspaces} />
          </div>}
        {!collapsed && <div className="px-4 mb-4">
            <SearchBar />
          </div>}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          <div className="space-y-1">
            {menuItems.map(item => <SidebarItem key={item.id} item={item} collapsed={collapsed} isActive={location.pathname === item.path} isOpen={isMenuOpen(item.id)} onToggle={() => toggleMenu(item.id)} />)}
          </div>
        </nav>
        {!collapsed ? <UserStatus profile={userProfile} /> : <div className="p-4 border-t border-gray-700">
            <div className="relative mx-auto w-10 h-10">
              <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                <UserCircleIcon size={24} className="text-gray-300" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-800 bg-green-500" />
            </div>
          </div>}
        <button onClick={onToggle} className="hidden md:flex items-center justify-center h-12 border-t border-gray-700 text-gray-400 hover:text-white hover:bg-gray-700">
          <ChevronRightIcon size={20} className={`transform transition-transform ${collapsed ? "" : "rotate-180"}`} />
        </button>
      </aside>
      <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="fixed bottom-4 right-4 md:hidden bg-blue-500 text-white p-3 rounded-full shadow-lg">
        {isMobileOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
      </button>
    </>;
};
export default Sidebar;
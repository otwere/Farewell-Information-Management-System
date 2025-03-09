import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRightIcon, UserCircleIcon, XIcon, MenuIcon } from "lucide-react";
interface Workspace {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface MenuItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  path?: string;
  children?: {
    id: string;
    icon: React.ReactNode;
    title: string;
    path?: string;
  }[];
  hasSubMenu?: boolean;
}
interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

interface UserProfile {
  name: string;
  role: string;
  status: "online" | "busy" | "away" | "offline";
}
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
    ${depth > 0 ? "pl-10" : ""}
    ${isActive ? "bg-gradient-to-r from-blue-600/90 to-blue-500/90 text-white hover:from-blue-600 hover:to-blue-500" : "text-gray-300 hover:bg-white/5"}
    transition-all duration-200 ease-in-out rounded-lg cursor-pointer
    ${collapsed ? "px-2.5 py-2" : "px-3 py-2.5"}
    relative group
  `;
  const iconWrapperClasses = `
    ${collapsed ? "w-8 h-8" : "w-8 h-8"}
    flex items-center justify-center rounded-lg
    transition-all duration-200 ease-in-out
    ${isActive ? "bg-white/10 text-white" : "text-gray-400 group-hover:text-white"}
  `;
  const content = <div className={itemClasses} onClick={onToggle}>
      <div className="flex items-center min-w-0 space-x-3">
        <span className={iconWrapperClasses}>{item.icon}</span>
        {!collapsed && <span className="font-medium truncate text-sm tracking-wide">
            {item.title}
          </span>}
      </div>
      {!collapsed && hasChildren && <ChevronRightIcon size={16} className={`transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`} />}
    </div>;
  return <div className="space-y-1">
      {item.path ? <Link to={item.path}>{content}</Link> : content}
      {hasChildren && isOpen && !collapsed && <div className="ml-4 pl-4 border-l border-gray-700/50 space-y-1 animate-in slide-in-from-left-5">
          {item.children?.map(child => <SidebarItem key={child.id} item={child} collapsed={collapsed} isActive={false} depth={depth + 1} />)}
        </div>}
    </div>;
};
const WorkspaceSwitcher: React.FC<{
  workspaces: Workspace[];
  collapsed: boolean;
}> = ({
  workspaces,
  collapsed
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(workspaces[0]);
  if (collapsed) {
    return <div className="px-2">
        <div className="w-10 h-10 bg-gray-700/50 rounded-lg flex items-center justify-center">
          {selected.icon}
        </div>
      </div>;
  }
  return <div className="relative px-3">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center w-full p-2 rounded-lg hover:bg-gray-700/50 transition-colors group">
        <div className="flex items-center flex-1 min-w-0">
          <div className="bg-gray-700/50 p-2 rounded-lg mr-3 group-hover:bg-gray-600/50 transition-colors">
            {selected.icon}
          </div>
          <div className="truncate">
            <p className="text-sm font-medium text-gray-200 truncate">
              {selected.name}
            </p>
            <p className="text-xs text-gray-400">Switch workspace</p>
          </div>
        </div>
        <ChevronRightIcon size={18} className={`text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`} />
      </button>
      {isOpen && <div className="absolute top-full left-0 w-full mt-1 bg-gray-800/95 rounded-lg shadow-lg py-1 z-50 backdrop-blur-sm border border-gray-700/50">
          {workspaces.map(workspace => <button key={workspace.id} onClick={() => {
        setSelected(workspace);
        setIsOpen(false);
      }} className="flex items-center w-full px-3 py-2 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-white">
              <div className="bg-gray-700/50 p-1.5 rounded-lg mr-2">
                {workspace.icon}
              </div>
              {workspace.name}
            </button>)}
        </div>}
    </div>;
};
const UserStatus: React.FC<{
  profile: UserProfile;
  collapsed: boolean;
}> = ({
  profile,
  collapsed
}) => {
  const statusColors = {
    online: "bg-green-500",
    busy: "bg-red-500",
    away: "bg-yellow-500",
    offline: "bg-gray-500"
  };
  if (collapsed) {
    return <div className="p-2 border-t border-gray-700/50">
        <div className="relative">
          <div className="w-10 h-10 rounded-lg bg-gray-700/50 flex items-center justify-center">
            <UserCircleIcon size={24} className="text-gray-300" />
          </div>
          <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-800 ${statusColors[profile.status]}`} />
        </div>
      </div>;
  }
  return <div className="p-3 border-t border-gray-700/50">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-lg bg-gray-700/50 flex items-center justify-center">
            <UserCircleIcon size={24} className="text-gray-300" />
          </div>
          <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-800 ${statusColors[profile.status]}`} />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-200 truncate">
            {profile.name}
          </p>
          <p className="text-xs text-gray-400 truncate">{profile.role}</p>
        </div>
      </div>
    </div>;
};
const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onToggle
}) => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [workspaces] = useState<Workspace[]>([]);
  const [userProfile] = useState<UserProfile>({
    name: "",
    role: "",
    status: "offline"
  });
  const [menuItems] = useState<MenuItem[]>([]);
  const toggleMenu = (menu: string) => {
    setOpenMenus(prev => prev.includes(menu) ? prev.filter(item => item !== menu) : [...prev, menu]);
  };
  const isMenuOpen = (menu: string) => openMenus.includes(menu);
  return <>
      <aside className={`
          ${collapsed ? "w-[4.5rem]" : "w-64"}
          bg-gray-800/95 backdrop-blur-md
          transition-all duration-300 ease-in-out
          flex flex-col fixed h-full z-50 md:relative
          border-r border-gray-700/50
        `}>
        {/* Logo Section */}
        <div className="flex items-center h-16 px-3 border-b border-gray-700/50">
          {!collapsed ? <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="text-white font-semibold text-lg">Memories Farewell</span>
            </div> : <div className="w-10 h-10 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>}
        </div>
        <div className="flex-1 flex flex-col min-h-0">
          {/* Workspace Switcher */}
          <div className="p-3">
            <WorkspaceSwitcher workspaces={workspaces} collapsed={collapsed} />
          </div>
          {/* Navigation */}
          <div className="flex-1 overflow-y-auto py-3 px-3">
            <nav className="space-y-1">
              {menuItems.map(item => <SidebarItem key={item.id} item={item} collapsed={collapsed} isActive={location.pathname === item.path} isOpen={isMenuOpen(item.id)} onToggle={() => toggleMenu(item.id)} />)}
            </nav>
          </div>
          {/* User Profile */}
          <UserStatus profile={userProfile} collapsed={collapsed} />
          {/* Collapse Button */}
          <button onClick={onToggle} className="hidden md:flex items-center justify-center h-12 border-t border-gray-700/50 text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors">
            <ChevronRightIcon size={20} className={`transform transition-transform ${collapsed ? "" : "rotate-180"}`} />
          </button>
        </div>
      </aside>
      {/* Mobile Menu Button */}
      <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="fixed bottom-4 right-4 md:hidden bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50">
        {isMobileOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
      </button>
    </>;
};
export default Sidebar;
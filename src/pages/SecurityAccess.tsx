import React, { useState } from "react";
import { UsersIcon, ShieldIcon, KeyIcon, ActivityIcon, AlertCircleIcon, UserPlusIcon, SearchIcon, FilterIcon, LockIcon, SmartphoneIcon } from "lucide-react";
import { Card, CardHeader, CardContent } from "../components/common/Card";
const SecurityAccess = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const users = [{
    id: "USR001",
    name: "John Smith",
    email: "john.smith@example.com",
    role: "Administrator",
    status: "Active",
    lastLogin: "2023-12-14 09:30 AM",
    twoFactorEnabled: true
  }, {
    id: "USR002",
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    role: "Manager",
    status: "Active",
    lastLogin: "2023-12-14 10:15 AM",
    twoFactorEnabled: false
  }, {
    id: "USR003",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    role: "Staff",
    status: "Inactive",
    lastLogin: "2023-12-13 02:45 PM",
    twoFactorEnabled: true
  }];
  const accessLogs = [{
    id: "LOG001",
    user: "John Smith",
    action: "Login",
    timestamp: "2023-12-14 09:30:15",
    status: "Success",
    ipAddress: "192.168.1.100"
  }, {
    id: "LOG002",
    user: "Sarah Wilson",
    action: "Password Change",
    timestamp: "2023-12-14 10:15:22",
    status: "Success",
    ipAddress: "192.168.1.101"
  }, {
    id: "LOG003",
    user: "Unknown",
    action: "Login",
    timestamp: "2023-12-14 08:45:30",
    status: "Failed",
    ipAddress: "192.168.1.150"
  }];
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Security & Access
          </h1>
          <p className="text-gray-600 mt-1">
            Manage system access, roles, and permissions
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
          <UserPlusIcon size={18} className="mr-1" />
          Add User
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent>
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full p-3 mr-4">
                <UsersIcon size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Users</p>
                <p className="text-2xl font-semibold">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="flex items-center">
              <div className="bg-red-100 rounded-full p-3 mr-4">
                <AlertCircleIcon size={20} className="text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Security Alerts</p>
                <p className="text-2xl font-semibold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="flex items-center">
              <div className="bg-green-100 rounded-full p-3 mr-4">
                <ShieldIcon size={20} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">2FA Enabled</p>
                <p className="text-2xl font-semibold">18</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="flex items-center">
              <div className="bg-yellow-100 rounded-full p-3 mr-4">
                <ActivityIcon size={20} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Failed Logins</p>
                <p className="text-2xl font-semibold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between mb-4 space-y-4 md:space-y-0">
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon size={18} className="text-gray-400" />
              </div>
              <input type="text" placeholder="Search users..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <div className="flex space-x-2">
              <select className="border border-gray-300 rounded-md px-4 py-2" value={selectedRole} onChange={e => setSelectedRole(e.target.value)}>
                <option value="all">All Roles</option>
                <option value="administrator">Administrator</option>
                <option value="manager">Manager</option>
                <option value="staff">Staff</option>
              </select>
              <button className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-md flex items-center">
                <FilterIcon size={18} className="mr-1" />
                Filter
              </button>
            </div>
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  2FA
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map(user => <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.twoFactorEnabled ? <span className="text-green-600 flex items-center">
                        <SmartphoneIcon size={16} className="mr-1" />
                        Enabled
                      </span> : <span className="text-gray-500 flex items-center">
                        <LockIcon size={16} className="mr-1" />
                        Disabled
                      </span>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Disable
                    </button>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </Card>
      <Card>
        <CardHeader>
          <h3 className="text-lg font-medium text-gray-900">
            Recent Access Logs
          </h3>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IP Address
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {accessLogs.map(log => <tr key={log.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.timestamp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.user}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.action}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${log.status === "Success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.ipAddress}
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </Card>
    </div>;
};
export default SecurityAccess;
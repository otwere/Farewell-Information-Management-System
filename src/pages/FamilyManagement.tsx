import React, { useState } from "react";
import { UsersIcon, PhoneIcon, MailIcon, FileTextIcon, MessageSquareIcon, ClipboardCheckIcon, SearchIcon, PlusIcon } from "lucide-react";
const FamilyManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // Sample data - would come from API in real application
  const familyRecords = [{
    id: "F001",
    deceased: "John Smith",
    nextOfKin: "Mary Smith",
    relationship: "Wife",
    phone: "+1 (555) 123-4567",
    email: "mary.smith@email.com",
    status: "Active",
    lastContact: "2023-12-14"
  }
  // ... more records
  ];
  const recentCommunications = [{
    id: "C001",
    family: "Smith Family",
    type: "Phone Call",
    date: "2023-12-14",
    summary: "Discussed funeral arrangements",
    staff: "Jane Wilson"
  }, {
    id: "C002",
    family: "Johnson Family",
    type: "Email",
    date: "2023-12-13",
    summary: "Sent service confirmation",
    staff: "Mike Brown"
  }];
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Family Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage family communications and records
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
          <PlusIcon size={18} className="mr-1" />
          New Contact
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search and filters */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon size={18} className="text-gray-400" />
                </div>
                <input type="text" placeholder="Search families..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>
              <div className="mt-4 md:mt-0 flex space-x-2">
                <button className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  Filter
                </button>
                <button className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  Export
                </button>
              </div>
            </div>
          </div>
          {/* Family records table */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Next of Kin
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Deceased
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact Info
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {familyRecords.map(record => <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {record.nextOfKin}
                            </div>
                            <div className="text-sm text-gray-500">
                              {record.relationship}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.deceased}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {record.phone}
                        </div>
                        <div className="text-sm text-gray-500">
                          {record.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          View
                        </button>
                        <button className="text-blue-600 hover:text-blue-900">
                          Contact
                        </button>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Communications */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Recent Communications
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {recentCommunications.map(comm => <div key={comm.id} className="flex space-x-4">
                    <div className={`rounded-full p-2 ${comm.type === "Phone Call" ? "bg-green-100" : "bg-blue-100"}`}>
                      {comm.type === "Phone Call" ? <PhoneIcon size={16} className="text-green-600" /> : <MailIcon size={16} className="text-blue-600" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {comm.family}
                      </p>
                      <p className="text-sm text-gray-500">{comm.summary}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {comm.date} • {comm.staff}
                      </p>
                    </div>
                  </div>)}
              </div>
            </div>
          </div>
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Quick Actions
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md flex items-center">
                  <MessageSquareIcon size={18} className="mr-2" />
                  New Communication
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md flex items-center">
                  <FileTextIcon size={18} className="mr-2" />
                  Generate Report
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md flex items-center">
                  <ClipboardCheckIcon size={18} className="mr-2" />
                  Schedule Follow-up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default FamilyManagement;
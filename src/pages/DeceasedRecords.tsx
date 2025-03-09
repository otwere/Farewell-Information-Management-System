import React, { useState } from "react";
import { SearchIcon, PlusIcon, FilterIcon, DownloadIcon } from "lucide-react";
import NewDeceasedRecordForm from "../components/deceased/NewDeceasedRecordForm";
const DeceasedRecords = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewRecordForm, setShowNewRecordForm] = useState(false);
  const deceasedRecords = [{
    id: "D-2023-001",
    name: "John Smith",
    age: 72,
    gender: "Male",
    dateOfDeath: "2023-12-14",
    causeOfDeath: "Natural causes",
    status: "Embalmed"
  }, {
    id: "D-2023-002",
    name: "Sarah Johnson",
    age: 65,
    gender: "Female",
    dateOfDeath: "2023-12-13",
    causeOfDeath: "Heart failure",
    status: "Awaiting Burial"
  }, {
    id: "D-2023-003",
    name: "Michael Brown",
    age: 58,
    gender: "Male",
    dateOfDeath: "2023-12-12",
    causeOfDeath: "Cancer",
    status: "Released"
  }];
  const filteredRecords = deceasedRecords.filter(record => record.name.toLowerCase().includes(searchTerm.toLowerCase()) || record.id.toLowerCase().includes(searchTerm.toLowerCase()));
  const handleNewRecord = (data: any) => {
    console.log("New Record Data:", data);
    setShowNewRecordForm(false);
  };
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Deceased Records</h1>
          <p className="text-gray-600 mt-1">
            Manage and view all deceased records
          </p>
        </div>
        <button onClick={() => setShowNewRecordForm(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
          <PlusIcon size={18} className="mr-1" />
          New Record
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row justify-between mb-4 space-y-3 md:space-y-0">
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon size={18} className="text-gray-400" />
            </div>
            <input type="text" placeholder="Search records..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
          <div className="flex space-x-2">
            <button className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-md flex items-center">
              <FilterIcon size={18} className="mr-1" />
              Filter
            </button>
            <button className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-md flex items-center">
              <DownloadIcon size={18} className="mr-1" />
              Export
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Age
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gender
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date of Death
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cause of Death
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
              {filteredRecords.map(record => <tr key={record.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {record.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.age}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.gender}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.dateOfDeath}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.causeOfDeath}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${record.status === "Embalmed" ? "bg-blue-100 text-blue-800" : record.status === "Awaiting Burial" ? "bg-yellow-100 text-yellow-800" : record.status === "Released" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-800 mr-3">
                      View
                    </button>
                    <button className="text-blue-600 hover:text-blue-800">
                      Edit
                    </button>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-medium">{filteredRecords.length}</span> of{" "}
            <span className="font-medium">{deceasedRecords.length}</span>{" "}
            records
          </div>
          <div className="flex space-x-2">
            <button className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-md text-sm">
              Previous
            </button>
            <button className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-md text-sm">
              Next
            </button>
          </div>
        </div>
      </div>
      {showNewRecordForm && <NewDeceasedRecordForm onClose={() => setShowNewRecordForm(false)} onSubmit={handleNewRecord} />}
    </div>;
};
export default DeceasedRecords;
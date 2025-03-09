import React, { useState } from "react";
import { HeartPulseIcon, ThermometerIcon, ClockIcon, AlertCircleIcon, BeakerIcon, CheckCircleIcon, ListIcon } from "lucide-react";
import EmbalmentCaseModal from "../components/embalming/EmbalmentCaseModal";
const EmbalmentTracking = () => {
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const handleUpdateStatus = (status: string) => {
    console.log("Updating status to:", status);
    // Implementation for updating status
  };
  const handleAddNote = (note: string) => {
    console.log("Adding note:", note);
    // Implementation for adding note
  };
  const embalmentCases = [{
    id: "E001",
    deceased: "John Smith",
    startTime: "2023-12-14 09:00 AM",
    status: "In Progress",
    assignedTo: "Dr. Sarah Wilson",
    temperature: "35°F",
    chemicalsUsed: ["Formaldehyde 30%", "Methanol 10%"],
    notes: "Standard procedure in progress"
  }
  // ... more cases
  ];
  const refrigerationUnits = [{
    id: "R001",
    name: "Unit 1",
    temperature: "35°F",
    status: "Operational",
    occupancy: "4/6",
    lastChecked: "1 hour ago"
  }, {
    id: "R002",
    name: "Unit 2",
    temperature: "36°F",
    status: "Operational",
    occupancy: "3/6",
    lastChecked: "2 hours ago"
  }];
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Embalming Tracking
          </h1>
          <p className="text-gray-600 mt-1">
            Monitor embalming processes and preservation
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-full p-3 mr-4">
                  <HeartPulseIcon size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Active Cases</p>
                  <p className="text-xl font-semibold">5</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center">
                <div className="bg-green-100 rounded-full p-3 mr-4">
                  <CheckCircleIcon size={20} className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Completed Today</p>
                  <p className="text-xl font-semibold">3</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center">
                <div className="bg-yellow-100 rounded-full p-3 mr-4">
                  <ClockIcon size={20} className="text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pending</p>
                  <p className="text-xl font-semibold">2</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Active Cases
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Case ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Deceased
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Start Time
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
                  {embalmentCases.map(case_ => <tr key={case_.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {case_.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {case_.deceased}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {case_.startTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          {case_.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button onClick={() => setSelectedCase(case_.id)} className="text-blue-600 hover:text-blue-900 inline-flex items-center">
                          View Details
                        </button>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Refrigeration Units
              </h2>
            </div>
            <div className="p-6 space-y-4">
              {refrigerationUnits.map(unit => <div key={unit.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm font-medium text-gray-900">
                      {unit.name}
                    </h3>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${unit.status === "Operational" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                      {unit.status}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <ThermometerIcon size={16} className="text-gray-400 mr-2" />
                      <span className="text-gray-500">
                        Temperature: {unit.temperature}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <ListIcon size={16} className="text-gray-400 mr-2" />
                      <span className="text-gray-500">
                        Occupancy: {unit.occupancy}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <ClockIcon size={16} className="text-gray-400 mr-2" />
                      <span className="text-gray-500">
                        Last checked: {unit.lastChecked}
                      </span>
                    </div>
                  </div>
                </div>)}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Chemical Inventory
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BeakerIcon size={16} className="text-gray-400 mr-2" />
                    <span className="text-sm text-gray-700">
                      Formaldehyde 30%
                    </span>
                  </div>
                  <span className="text-sm font-medium text-green-600">
                    85%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BeakerIcon size={16} className="text-gray-400 mr-2" />
                    <span className="text-sm text-gray-700">Methanol 10%</span>
                  </div>
                  <span className="text-sm font-medium text-yellow-600">
                    45%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BeakerIcon size={16} className="text-gray-400 mr-2" />
                    <span className="text-sm text-gray-700">Phenol 85%</span>
                  </div>
                  <span className="text-sm font-medium text-red-600">15%</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button className="w-full px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md">
                  View Full Inventory
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {selectedCase && <EmbalmentCaseModal onClose={() => setSelectedCase(null)} caseData={embalmentCases.find(c => c.id === selectedCase)!} onUpdateStatus={handleUpdateStatus} onAddNote={handleAddNote} />}
    </div>;
};
export default EmbalmentTracking;
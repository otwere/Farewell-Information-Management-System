import { Link } from "react-router-dom";
import StatCard from "../components/StatCard";
import SystemAlerts from "../components/dashboard/SystemAlerts";
import {
  UserIcon,
  CalendarIcon,
  ClipboardListIcon,
  AlertCircleIcon,
  ArrowRightIcon,
} from "lucide-react";
const Dashboard = () => {
  // Recent deceased data (normally would come from an API)
  const recentDeceased = [
    {
      id: "D-2023-001",
      name: "John Smith",
      dateOfDeath: "2023-06-12",
      status: "Embalmed",
    },
    {
      id: "D-2023-002",
      name: "Sarah Johnson",
      dateOfDeath: "2023-06-10",
      status: "Awaiting Burial",
    },
    {
      id: "D-2023-003",
      name: "Michael Brown",
      dateOfDeath: "2023-06-09",
      status: "Released",
    },
    {
      id: "D-2023-004",
      name: "Emily Davis",
      dateOfDeath: "2023-06-08",
      status: "Cremated",
    },
  ];

  // Upcoming funerals data (normally would come from an API)
  const upcomingFunerals = [
    {
      id: "F-2023-001",
      deceased: "Robert Wilson",
      date: "2023-06-15",
      time: "10:00 AM",
      location: "Green Hills Cemetery",
    },
    {
      id: "F-2023-002",
      deceased: "Sarah Johnson",
      date: "2023-06-16",
      time: "2:00 PM",
      location: "Peaceful Gardens",
    },
    {
      id: "F-2023-003",
      deceased: "Thomas Clark",
      date: "2023-06-18",
      time: "11:30 AM",
      location: "Memorial Park",
    },
  ];
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome to the Farewell Information Management System
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Deceased"
          value={124}
          icon={<UserIcon size={20} className="text-blue-600" />}
          color="bg-blue-100"
        />
        <StatCard
          title="Upcoming Funerals"
          value={8}
          icon={<CalendarIcon size={20} className="text-green-600" />}
          color="bg-green-100"
        />
        <StatCard
          title="Pending Tasks"
          value={12}
          icon={<ClipboardListIcon size={20} className="text-amber-600" />}
          color="bg-amber-100"
        />
        <StatCard
          title="Critical Alerts"
          value={3}
          icon={<AlertCircleIcon size={20} className="text-red-600" />}
          color="bg-red-100"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Recent Deceased
            </h2>
            <Link
              to="/deceased-records"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center"
            >
              View all records
              <ArrowRightIcon size={16} className="ml-1" />
            </Link>
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
                    Date of Death
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentDeceased.map((record) => (
                  <tr key={record.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {record.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.dateOfDeath}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${record.status === "Embalmed" ? "bg-blue-100 text-blue-800" : record.status === "Awaiting Burial" ? "bg-yellow-100 text-yellow-800" : record.status === "Released" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                      >
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Upcoming Funerals
            </h2>
            <Link
              to="/funeral-management"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center"
            >
              View all services
              <ArrowRightIcon size={16} className="ml-1" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deceased
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {upcomingFunerals.map((funeral) => (
                  <tr key={funeral.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {funeral.deceased}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {funeral.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {funeral.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {funeral.location}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <SystemAlerts />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;

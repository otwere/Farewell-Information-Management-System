import React, { useState, memo } from "react";
import { CalendarIcon, PlusIcon, SearchIcon, ClockIcon, MapPinIcon, CheckCircleIcon, FileTextIcon } from "lucide-react";
import CalendarView from "../components/funeral/CalendarView";
import NewServiceForm from "../components/funeral/NewServiceForm";
import VenueViewModal from "../components/funeral/VenueViewModal";
import GenerateReportForm from "../components/finance/GenerateReportForm";
const FuneralManagement = () => {
  const [selectedView, setSelectedView] = useState("calendar");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showNewServiceForm, setShowNewServiceForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showVenueModal, setShowVenueModal] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);
  const funeralServices = [{
    id: "F001",
    deceased: "John Smith",
    date: "2023-12-15",
    time: "10:00 AM",
    location: "Green Hills Cemetery",
    type: "Traditional Burial",
    status: "Confirmed",
    package: "Premium Package",
    attendees: 150
  }];
  const servicePackages = [{
    id: "P001",
    name: "Basic Package",
    price: "$2,500",
    includes: ["Basic casket", "Memorial service", "Transportation", "Documentation"]
  }, {
    id: "P002",
    name: "Premium Package",
    price: "$4,500",
    includes: ["Premium casket", "Memorial service", "Transportation", "Documentation", "Flowers", "Catering"]
  }];
  const calendarEvents = [{
    id: "1",
    title: "Memorial Service - John Smith",
    start: "2024-01-15T10:00:00",
    end: "2024-01-15T12:00:00",
    type: "memorial",
    status: "confirmed"
  }, {
    id: "2",
    title: "Funeral Service - Sarah Johnson",
    start: "2024-01-16T14:00:00",
    end: "2024-01-16T16:00:00",
    type: "funeral",
    status: "confirmed"
  }];
  const availableStaff = [{
    id: "S1",
    name: "Dr. James Wilson",
    role: "Funeral Director",
    available: true
  }, {
    id: "S2",
    name: "Mary Johnson",
    role: "Assistant Director",
    available: true
  }, {
    id: "S3",
    name: "Robert Brown",
    role: "Coordinator",
    available: false
  }];
  const availableResources = [{
    id: "R1",
    name: "Main Chapel",
    type: "venue",
    available: true
  }, {
    id: "R2",
    name: "Hearse Vehicle",
    type: "transport",
    available: true
  }];
  const handleEventClick = (clickInfo: any) => {
    setSelectedEvent(clickInfo.event);
  };
  const handleSelectSlot = (selectInfo: any) => {
    setShowNewServiceForm(true);
  };
  const handleNewService = (data: any) => {
    console.log("New service data:", data);
    setShowNewServiceForm(false);
  };
  const handleGenerateReport = (data: any) => {
    console.log("Generate Report:", data);
    setShowReportForm(false);
  };
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Funeral Management
          </h1>
          <p className="text-gray-600 mt-1">
            Schedule and manage funeral services
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
          <PlusIcon size={18} className="mr-1" />
          New Service
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full p-3 mr-4">
                <CalendarIcon size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Upcoming Services</p>
                <p className="text-xl font-semibold">8</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center">
              <div className="bg-green-100 rounded-full p-3 mr-4">
                <CheckCircleIcon size={20} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Confirmed</p>
                <p className="text-xl font-semibold">12</p>
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
                <p className="text-xl font-semibold">3</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center">
              <div className="bg-purple-100 rounded-full p-3 mr-4">
                <FileTextIcon size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Services</p>
                <p className="text-xl font-semibold">156</p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button onClick={() => setSelectedView("calendar")} className={`py-4 px-6 border-b-2 font-medium text-sm ${selectedView === "calendar" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}>
                  Calendar View
                </button>
                <button onClick={() => setSelectedView("list")} className={`py-4 px-6 border-b-2 font-medium text-sm ${selectedView === "list" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}>
                  List View
                </button>
              </nav>
            </div>
            <div className="p-6">
              {selectedView === "calendar" ? <CalendarView events={calendarEvents} onEventClick={handleEventClick} onSelectSlot={handleSelectSlot} /> : <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Service
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date & Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Location
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
                      {funeralServices.map(service => <tr key={service.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {service.deceased}
                            </div>
                            <div className="text-sm text-gray-500">
                              {service.type}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {service.date}
                            </div>
                            <div className="text-sm text-gray-500">
                              {service.time}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {service.location}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {service.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button className="text-blue-600 hover:text-blue-900">
                              Edit
                            </button>
                            <span className="mx-2">|</span>
                            <button className="text-blue-600 hover:text-blue-900">
                              View
                            </button>
                          </td>
                        </tr>)}
                    </tbody>
                  </table>
                </div>}
            </div>
          </div>
        </div>
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Service Packages
            </h3>
            <div className="space-y-4">
              {servicePackages.map(pkg => <div key={pkg.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-sm font-medium text-gray-900">
                      {pkg.name}
                    </h4>
                    <span className="text-sm font-semibold text-gray-900">
                      {pkg.price}
                    </span>
                  </div>
                  <ul className="text-sm text-gray-500">
                    {pkg.includes.map((item, index) => <li key={index} className="flex items-center">
                        <CheckCircleIcon size={16} className="text-green-500 mr-2" />
                        {item}
                      </li>)}
                  </ul>
                </div>)}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button onClick={() => setShowNewServiceForm(true)} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center">
                <CalendarIcon size={18} className="mr-2" />
                Schedule Service
              </button>
              <button onClick={() => setShowVenueModal(true)} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center">
                <MapPinIcon size={18} className="mr-2" />
                View Venues
              </button>
              <button onClick={() => setShowReportForm(true)} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center">
                <FileTextIcon size={18} className="mr-2" />
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
      {showNewServiceForm && <NewServiceForm onClose={() => setShowNewServiceForm(false)} onSubmit={handleNewService} availableStaff={availableStaff} availableResources={availableResources} />}
      {showVenueModal && <VenueViewModal onClose={() => setShowVenueModal(false)} />}
      {showReportForm && <GenerateReportForm onClose={() => setShowReportForm(false)} onSubmit={handleGenerateReport} />}
    </div>;
};
export default FuneralManagement;
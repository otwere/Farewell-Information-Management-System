import React, { useState } from "react";
import { TruckIcon, MapIcon, CalendarIcon, UserIcon, AlertCircleIcon, SearchIcon, FilterIcon, PlusIcon, ClockIcon, GaugeIcon, WrenchIcon, CarIcon } from "lucide-react";
import { Card, CardHeader, CardContent } from "../components/common/Card";
import VehicleDetailsModal from "../components/transport/VehicleDetailsModal";
import TripScheduleForm from "../components/transport/TripScheduleForm";
import ScheduleTripForm from "../components/transport/ScheduleTripForm";
import ActiveTripModal from "../components/transport/ActiveTripModal";
import MaintenanceScheduleModal from "../components/transport/MaintenanceScheduleModal";
import { toast } from "sonner";
const TransportServices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showVehicleDetails, setShowVehicleDetails] = useState(false);
  const [showTripSchedule, setShowTripSchedule] = useState(false);
  const [showScheduleTrip, setShowScheduleTrip] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [selectedTrip, setSelectedTrip] = useState<any>(null);
  const [selectedMaintenance, setSelectedMaintenance] = useState<any>(null);
  const vehicles = [{
    id: "VEH001",
    name: "Mercedes Sprinter",
    type: "Hearse",
    registrationNumber: "MH-01-AB-1234",
    status: "Active",
    driver: "John Smith",
    location: "En Route",
    nextService: "2024-01-15",
    fuelLevel: "75%",
    lastMaintenance: "2023-11-20",
    make: "Mercedes-Benz",
    model: "Sprinter",
    year: "2021",
    mileage: 45000
  }, {
    id: "VEH002",
    name: "Cadillac XTS",
    type: "Limousine",
    registrationNumber: "MH-01-CD-5678",
    status: "Available",
    driver: "Sarah Wilson",
    location: "Garage",
    nextService: "2024-02-01",
    fuelLevel: "90%",
    lastMaintenance: "2023-12-01",
    make: "Cadillac",
    model: "XTS",
    year: "2022",
    mileage: 32000
  }, {
    id: "VEH003",
    name: "Ford Transit",
    type: "Transport Van",
    registrationNumber: "MH-01-EF-9012",
    status: "Maintenance",
    driver: "Unassigned",
    location: "Service Center",
    nextService: "2023-12-18",
    fuelLevel: "45%",
    lastMaintenance: "2023-12-15",
    make: "Ford",
    model: "Transit",
    year: "2020",
    mileage: 58000
  }];
  const activeTrips = [{
    id: "TRIP001",
    vehicle: "Mercedes Sprinter",
    driver: "John Smith",
    type: "Funeral Service",
    startTime: "09:30 AM",
    status: "In Progress",
    destination: "St. Mary's Church",
    eta: "10:15 AM"
  }];
  const upcomingMaintenance = [{
    id: "MAINT001",
    vehicle: "Ford Transit",
    type: "Routine Service",
    date: "2023-12-18",
    status: "Scheduled",
    notes: "Oil change and brake inspection"
  }];
  const handleVehicleUpdate = (updatedData: any) => {
    console.log("Updating vehicle:", updatedData);
    // Implementation for updating vehicle
  };
  const handleScheduleTrip = async (tripData: any) => {
    try {
      console.log("Scheduling trip:", tripData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Trip scheduled successfully");
      setShowScheduleTrip(false);
    } catch (error) {
      toast.error("Failed to schedule trip");
      console.error("Error scheduling trip:", error);
    }
  };
  const handleTripStatusUpdate = (tripId: string, status: string) => {
    console.log("Updating trip status:", tripId, status);
    toast.success("Trip status updated successfully");
  };
  const handleMaintenanceUpdate = (maintenanceId: string, data: any) => {
    console.log("Updating maintenance:", maintenanceId, data);
    toast.success("Maintenance schedule updated successfully");
  };
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Transport Services
          </h1>
          <p className="text-gray-600 mt-1">
            Manage fleet, trips, and maintenance
          </p>
        </div>
        <button onClick={() => setShowScheduleTrip(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
          <PlusIcon size={18} className="mr-1" />
          Schedule Trip
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent>
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full p-3 mr-4">
                <CarIcon size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Vehicles</p>
                <p className="text-2xl font-semibold">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="flex items-center">
              <div className="bg-green-100 rounded-full p-3 mr-4">
                <MapIcon size={20} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Trips</p>
                <p className="text-2xl font-semibold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="flex items-center">
              <div className="bg-yellow-100 rounded-full p-3 mr-4">
                <WrenchIcon size={20} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Maintenance Due</p>
                <p className="text-2xl font-semibold">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="flex items-center">
              <div className="bg-purple-100 rounded-full p-3 mr-4">
                <UserIcon size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Drivers</p>
                <p className="text-2xl font-semibold">6</p>
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
              <input type="text" placeholder="Search vehicles..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <div className="flex space-x-2">
              <select className="border border-gray-300 rounded-md px-4 py-2" value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)}>
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="maintenance">Maintenance</option>
                <option value="available">Available</option>
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
                  Vehicle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reg. Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Driver
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fuel Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vehicles.map(vehicle => <tr key={vehicle.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {vehicle.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {vehicle.type}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {vehicle.registrationNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${vehicle.status === "Active" ? "bg-green-100 text-green-800" : vehicle.status === "Maintenance" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"}`}>
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {vehicle.driver}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {vehicle.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 rounded-full h-2" style={{
                    width: vehicle.fuelLevel
                  }}></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button onClick={() => {
                  setSelectedVehicle(vehicle);
                  setShowVehicleDetails(true);
                }} className="text-blue-600 hover:text-blue-900 mr-3">
                      View
                    </button>
                    <button onClick={() => {
                  setSelectedVehicle(vehicle);
                  setShowTripSchedule(true);
                }} className="text-blue-600 hover:text-blue-900">
                      Schedule
                    </button>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium text-gray-900">Active Trips</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeTrips.map(trip => <div key={trip.id} className="border rounded-lg p-4 space-y-2 hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedTrip(trip)}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">
                        {trip.vehicle}
                      </p>
                      <p className="text-sm text-gray-500">{trip.type}</p>
                    </div>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {trip.status}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <ClockIcon size={16} className="mr-1" />
                    Started: {trip.startTime}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapIcon size={16} className="mr-1" />
                    Destination: {trip.destination}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <UserIcon size={16} className="mr-1" />
                    Driver: {trip.driver}
                  </div>
                </div>)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium text-gray-900">
              Upcoming Maintenance
            </h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingMaintenance.map(maintenance => <div key={maintenance.id} className="border rounded-lg p-4 space-y-2 hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedMaintenance(maintenance)}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">
                        {maintenance.vehicle}
                      </p>
                      <p className="text-sm text-gray-500">
                        {maintenance.type}
                      </p>
                    </div>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      {maintenance.status}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <CalendarIcon size={16} className="mr-1" />
                    Date: {maintenance.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <AlertCircleIcon size={16} className="mr-1" />
                    Notes: {maintenance.notes}
                  </div>
                </div>)}
            </div>
          </CardContent>
        </Card>
      </div>
      {selectedTrip && <ActiveTripModal trip={selectedTrip} isOpen={!!selectedTrip} onClose={() => setSelectedTrip(null)} onUpdateStatus={handleTripStatusUpdate} />}
      {selectedMaintenance && <MaintenanceScheduleModal maintenance={selectedMaintenance} isOpen={!!selectedMaintenance} onClose={() => setSelectedMaintenance(null)} onUpdateMaintenance={handleMaintenanceUpdate} />}
      {showVehicleDetails && selectedVehicle && <VehicleDetailsModal vehicle={selectedVehicle} onClose={() => {
      setShowVehicleDetails(false);
      setSelectedVehicle(null);
    }} onUpdate={handleVehicleUpdate} />}
      {showTripSchedule && <TripScheduleForm onClose={() => setShowTripSchedule(false)} onSubmit={handleScheduleTrip} availableVehicles={vehicles.filter(v => v.status === "Available" || v.status === "Active")} availableDrivers={[{
      id: "D1",
      name: "John Smith"
    }, {
      id: "D2",
      name: "Sarah Wilson"
    }, {
      id: "D3",
      name: "Michael Brown"
    }]} />}
      {showScheduleTrip && <ScheduleTripForm isOpen={showScheduleTrip} onClose={() => setShowScheduleTrip(false)} onSubmit={handleScheduleTrip} availableVehicles={vehicles.filter(v => v.status === "Available" || v.status === "Active")} availableDrivers={[{
      id: "D1",
      name: "John Smith"
    }, {
      id: "D2",
      name: "Sarah Wilson"
    }, {
      id: "D3",
      name: "Michael Brown"
    }]} />}
    </div>;
};
export default TransportServices;
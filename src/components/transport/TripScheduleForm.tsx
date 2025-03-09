import React, { useState } from "react";
import { XIcon, MapPinIcon, ClockIcon, UserIcon, TruckIcon, CalendarIcon } from "lucide-react";
interface TripScheduleFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
  availableVehicles: any[];
  availableDrivers: any[];
}
const TripScheduleForm: React.FC<TripScheduleFormProps> = ({
  onClose,
  onSubmit,
  availableVehicles,
  availableDrivers
}) => {
  const [formData, setFormData] = useState({
    tripType: "",
    date: "",
    startTime: "",
    endTime: "",
    pickupLocation: "",
    dropoffLocation: "",
    vehicle: "",
    driver: "",
    notes: "",
    estimatedDistance: "",
    purpose: ""
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  return <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Schedule Trip</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <XIcon size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Trip Type
                </label>
                <select required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.tripType} onChange={e => setFormData({
                ...formData,
                tripType: e.target.value
              })}>
                  <option value="">Select Type</option>
                  <option value="funeral">Funeral Service</option>
                  <option value="body_transport">Body Transport</option>
                  <option value="maintenance">Maintenance Run</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input type="date" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.date} onChange={e => setFormData({
                ...formData,
                date: e.target.value
              })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Start Time
                </label>
                <input type="time" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.startTime} onChange={e => setFormData({
                ...formData,
                startTime: e.target.value
              })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  End Time
                </label>
                <input type="time" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.endTime} onChange={e => setFormData({
                ...formData,
                endTime: e.target.value
              })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pickup Location
                </label>
                <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.pickupLocation} onChange={e => setFormData({
                ...formData,
                pickupLocation: e.target.value
              })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Dropoff Location
                </label>
                <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.dropoffLocation} onChange={e => setFormData({
                ...formData,
                dropoffLocation: e.target.value
              })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Vehicle
                </label>
                <select required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.vehicle} onChange={e => setFormData({
                ...formData,
                vehicle: e.target.value
              })}>
                  <option value="">Select Vehicle</option>
                  {availableVehicles.map(vehicle => <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.name} ({vehicle.registrationNumber})
                    </option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Driver
                </label>
                <select required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.driver} onChange={e => setFormData({
                ...formData,
                driver: e.target.value
              })}>
                  <option value="">Select Driver</option>
                  {availableDrivers.map(driver => <option key={driver.id} value={driver.id}>
                      {driver.name}
                    </option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Notes
              </label>
              <textarea rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.notes} onChange={e => setFormData({
              ...formData,
              notes: e.target.value
            })} />
            </div>
            <div className="flex justify-end space-x-4">
              <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Schedule Trip
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>;
};
export default TripScheduleForm;
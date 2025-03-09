import React, { useState } from "react";
import { toast } from "sonner";
import { XIcon, MapPinIcon, ClockIcon, UserIcon, TruckIcon, CalendarIcon, AlertCircleIcon } from "lucide-react";
import Modal from "../common/Modal";
interface ScheduleTripFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TripFormData) => void;
  availableVehicles: Vehicle[];
  availableDrivers: Driver[];
}
interface Vehicle {
  id: string;
  name: string;
  registrationNumber: string;
  type: string;
  status: string;
}
interface Driver {
  id: string;
  name: string;
}
export interface TripFormData {
  tripType: string;
  date: string;
  startTime: string;
  endTime: string;
  pickupLocation: string;
  dropoffLocation: string;
  vehicle: string;
  driver: string;
  notes: string;
  estimatedDistance: string;
  purpose: string;
}
const ScheduleTripForm: React.FC<ScheduleTripFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  availableVehicles,
  availableDrivers
}) => {
  const [formData, setFormData] = useState<TripFormData>({
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
  const [errors, setErrors] = useState<Partial<TripFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const validateForm = (): boolean => {
    const newErrors: Partial<TripFormData> = {};
    if (!formData.tripType) newErrors.tripType = "Trip type is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.startTime) newErrors.startTime = "Start time is required";
    if (!formData.endTime) newErrors.endTime = "End time is required";
    if (!formData.pickupLocation) newErrors.pickupLocation = "Pickup location is required";
    if (!formData.dropoffLocation) newErrors.dropoffLocation = "Dropoff location is required";
    if (!formData.vehicle) newErrors.vehicle = "Vehicle is required";
    if (!formData.driver) newErrors.driver = "Driver is required";
    // Validate time logic
    if (formData.startTime && formData.endTime) {
      const start = new Date(`${formData.date}T${formData.startTime}`);
      const end = new Date(`${formData.date}T${formData.endTime}`);
      if (end <= start) {
        newErrors.endTime = "End time must be after start time";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly");
      return;
    }
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      toast.success("Trip scheduled successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to schedule trip");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleInputChange = (field: keyof TripFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };
  return <Modal isOpen={isOpen} onClose={onClose} title="Schedule New Trip" maxWidth="max-w-3xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Trip Type <span className="text-red-500">*</span>
            </label>
            <select className={`mt-1 block w-full rounded-md border ${errors.tripType ? "border-red-500" : "border-gray-300"} shadow-sm p-2`} value={formData.tripType} onChange={e => handleInputChange("tripType", e.target.value)}>
              <option value="">Select Type</option>
              <option value="funeral">Funeral Service</option>
              <option value="body_transport">Body Transport</option>
              <option value="maintenance">Maintenance Run</option>
              <option value="other">Other</option>
            </select>
            {errors.tripType && <p className="mt-1 text-sm text-red-500">{errors.tripType}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Purpose
            </label>
            <input type="text" className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2" value={formData.purpose} onChange={e => handleInputChange("purpose", e.target.value)} placeholder="Brief description of trip purpose" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date <span className="text-red-500">*</span>
            </label>
            <input type="date" className={`mt-1 block w-full rounded-md border ${errors.date ? "border-red-500" : "border-gray-300"} shadow-sm p-2`} value={formData.date} onChange={e => handleInputChange("date", e.target.value)} min={new Date().toISOString().split("T")[0]} />
            {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Start Time <span className="text-red-500">*</span>
              </label>
              <input type="time" className={`mt-1 block w-full rounded-md border ${errors.startTime ? "border-red-500" : "border-gray-300"} shadow-sm p-2`} value={formData.startTime} onChange={e => handleInputChange("startTime", e.target.value)} />
              {errors.startTime && <p className="mt-1 text-sm text-red-500">{errors.startTime}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                End Time <span className="text-red-500">*</span>
              </label>
              <input type="time" className={`mt-1 block w-full rounded-md border ${errors.endTime ? "border-red-500" : "border-gray-300"} shadow-sm p-2`} value={formData.endTime} onChange={e => handleInputChange("endTime", e.target.value)} />
              {errors.endTime && <p className="mt-1 text-sm text-red-500">{errors.endTime}</p>}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pickup Location <span className="text-red-500">*</span>
            </label>
            <input type="text" className={`mt-1 block w-full rounded-md border ${errors.pickupLocation ? "border-red-500" : "border-gray-300"} shadow-sm p-2`} value={formData.pickupLocation} onChange={e => handleInputChange("pickupLocation", e.target.value)} placeholder="Enter pickup address" />
            {errors.pickupLocation && <p className="mt-1 text-sm text-red-500">
                {errors.pickupLocation}
              </p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Dropoff Location <span className="text-red-500">*</span>
            </label>
            <input type="text" className={`mt-1 block w-full rounded-md border ${errors.dropoffLocation ? "border-red-500" : "border-gray-300"} shadow-sm p-2`} value={formData.dropoffLocation} onChange={e => handleInputChange("dropoffLocation", e.target.value)} placeholder="Enter destination address" />
            {errors.dropoffLocation && <p className="mt-1 text-sm text-red-500">
                {errors.dropoffLocation}
              </p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Vehicle <span className="text-red-500">*</span>
            </label>
            <select className={`mt-1 block w-full rounded-md border ${errors.vehicle ? "border-red-500" : "border-gray-300"} shadow-sm p-2`} value={formData.vehicle} onChange={e => handleInputChange("vehicle", e.target.value)}>
              <option value="">Select Vehicle</option>
              {availableVehicles.map(vehicle => <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.name} - {vehicle.registrationNumber}
                </option>)}
            </select>
            {errors.vehicle && <p className="mt-1 text-sm text-red-500">{errors.vehicle}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Driver <span className="text-red-500">*</span>
            </label>
            <select className={`mt-1 block w-full rounded-md border ${errors.driver ? "border-red-500" : "border-gray-300"} shadow-sm p-2`} value={formData.driver} onChange={e => handleInputChange("driver", e.target.value)}>
              <option value="">Select Driver</option>
              {availableDrivers.map(driver => <option key={driver.id} value={driver.id}>
                  {driver.name}
                </option>)}
            </select>
            {errors.driver && <p className="mt-1 text-sm text-red-500">{errors.driver}</p>}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Additional Notes
          </label>
          <textarea rows={3} className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2" value={formData.notes} onChange={e => handleInputChange("notes", e.target.value)} placeholder="Any special instructions or requirements..." />
        </div>
        <div className="flex justify-end space-x-4">
          <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50" disabled={isSubmitting}>
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center" disabled={isSubmitting}>
            {isSubmitting ? <>
                <span className="animate-spin mr-2">⌛</span>
                Scheduling...
              </> : "Schedule Trip"}
          </button>
        </div>
      </form>
    </Modal>;
};
export default ScheduleTripForm;
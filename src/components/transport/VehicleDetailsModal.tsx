import React, { useState } from "react";
import { XIcon, SaveIcon, AlertCircleIcon, FileTextIcon } from "lucide-react";
interface VehicleDetailsModalProps {
  vehicle: any;
  onClose: () => void;
  onUpdate: (data: any) => void;
}
const VehicleDetailsModal: React.FC<VehicleDetailsModalProps> = ({
  vehicle,
  onClose,
  onUpdate
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [vehicleData, setVehicleData] = useState(vehicle);
  const handleSave = () => {
    onUpdate(vehicleData);
    setIsEditing(false);
  };
  return <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Vehicle Details
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <XIcon size={24} />
            </button>
          </div>
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Basic Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Vehicle Name
                  </label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={vehicleData.name} disabled={!isEditing} onChange={e => setVehicleData({
                  ...vehicleData,
                  name: e.target.value
                })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Registration Number
                  </label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={vehicleData.registrationNumber} disabled={!isEditing} onChange={e => setVehicleData({
                  ...vehicleData,
                  registrationNumber: e.target.value
                })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Type
                  </label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={vehicleData.type} disabled={!isEditing} onChange={e => setVehicleData({
                  ...vehicleData,
                  type: e.target.value
                })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={vehicleData.status} disabled={!isEditing} onChange={e => setVehicleData({
                  ...vehicleData,
                  status: e.target.value
                })}>
                    <option value="Active">Active</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Out of Service">Out of Service</option>
                  </select>
                </div>
              </div>
            </div>
            {/* Technical Details */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Technical Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Make
                  </label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={vehicleData.make} disabled={!isEditing} onChange={e => setVehicleData({
                  ...vehicleData,
                  make: e.target.value
                })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Model
                  </label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={vehicleData.model} disabled={!isEditing} onChange={e => setVehicleData({
                  ...vehicleData,
                  model: e.target.value
                })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Year
                  </label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={vehicleData.year} disabled={!isEditing} onChange={e => setVehicleData({
                  ...vehicleData,
                  year: e.target.value
                })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Mileage
                  </label>
                  <input type="number" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={vehicleData.mileage} disabled={!isEditing} onChange={e => setVehicleData({
                  ...vehicleData,
                  mileage: parseInt(e.target.value)
                })} />
                </div>
              </div>
            </div>
            {/* Maintenance Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Maintenance Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last Service Date
                  </label>
                  <input type="date" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={vehicleData.lastMaintenance} disabled={!isEditing} onChange={e => setVehicleData({
                  ...vehicleData,
                  lastMaintenance: e.target.value
                })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Next Service Due
                  </label>
                  <input type="date" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={vehicleData.nextService} disabled={!isEditing} onChange={e => setVehicleData({
                  ...vehicleData,
                  nextService: e.target.value
                })} />
                </div>
              </div>
            </div>
            {/* Actions */}
            <div className="flex justify-end space-x-4">
              {isEditing ? <>
                  <button onClick={() => setIsEditing(false)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                    Cancel
                  </button>
                  <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
                    <SaveIcon size={18} className="mr-2" />
                    Save Changes
                  </button>
                </> : <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Edit Details
                </button>}
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default VehicleDetailsModal;
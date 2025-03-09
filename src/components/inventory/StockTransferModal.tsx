import React, { useState } from "react";
import { XIcon, ArrowRightIcon } from "lucide-react";
interface StockTransferModalProps {
  itemId: string;
  itemName: string;
  currentLocation: string;
  currentQuantity: number;
  unit: string;
  availableLocations: string[];
  onClose: () => void;
  onTransfer: (data: {
    quantity: number;
    fromLocation: string;
    toLocation: string;
    notes: string;
  }) => void;
}
const StockTransferModal: React.FC<StockTransferModalProps> = ({
  itemId,
  itemName,
  currentLocation,
  currentQuantity,
  unit,
  availableLocations,
  onClose,
  onTransfer
}) => {
  const [formData, setFormData] = useState({
    quantity: 1,
    toLocation: "",
    notes: ""
  });
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});
  const validateForm = () => {
    const newErrors: {
      [key: string]: string;
    } = {};
    if (formData.quantity <= 0) newErrors.quantity = "Quantity must be greater than 0";
    if (formData.quantity > currentQuantity) newErrors.quantity = "Cannot transfer more than available quantity";
    if (!formData.toLocation) newErrors.toLocation = "Select a destination";
    if (formData.toLocation === currentLocation) newErrors.toLocation = "Cannot transfer to the same location";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onTransfer({
        quantity: formData.quantity,
        fromLocation: currentLocation,
        toLocation: formData.toLocation,
        notes: formData.notes
      });
    }
  };
  return <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Transfer Stock</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <XIcon size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Item
              </label>
              <p className="text-gray-900 font-medium">{itemName}</p>
              <p className="text-sm text-gray-500">ID: {itemId}</p>
            </div>
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
              <div>
                <p className="text-sm text-gray-500">From</p>
                <p className="font-medium">{currentLocation}</p>
              </div>
              <ArrowRightIcon size={20} className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">To</p>
                <select className={`mt-1 block w-full border ${errors.toLocation ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm p-2`} value={formData.toLocation} onChange={e => setFormData({
                ...formData,
                toLocation: e.target.value
              })}>
                  <option value="">Select location</option>
                  {availableLocations.filter(loc => loc !== currentLocation).map(location => <option key={location} value={location}>
                        {location}
                      </option>)}
                </select>
                {errors.toLocation && <p className="text-red-500 text-xs mt-1">
                    {errors.toLocation}
                  </p>}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity to Transfer
              </label>
              <div className="flex items-center">
                <input type="number" min="1" max={currentQuantity} className={`block w-full border ${errors.quantity ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm p-2`} value={formData.quantity} onChange={e => setFormData({
                ...formData,
                quantity: parseInt(e.target.value)
              })} />
                <span className="ml-2 text-gray-500">{unit}</span>
              </div>
              {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>}
              <p className="text-sm text-gray-500 mt-1">
                Available: {currentQuantity} {unit}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea rows={3} className="block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Add any transfer notes..." value={formData.notes} onChange={e => setFormData({
              ...formData,
              notes: e.target.value
            })} />
            </div>
            <div className="flex justify-end space-x-4">
              <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Transfer Stock
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>;
};
export default StockTransferModal;
import React, { useState } from "react";
import { XIcon, PackageIcon, ImageIcon, AlertCircleIcon, BuildingIcon, MapPinIcon, DollarSignIcon, TrashIcon } from "lucide-react";
interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  reorderPoint: number;
  supplier: string;
  location: string;
  expiryDate: string | null;
  lastUpdated: string;
  description?: string;
  image?: string;
  costPrice?: number;
  sellingPrice?: number;
}
interface EditItemFormProps {
  item: InventoryItem;
  onClose: () => void;
  onSubmit: (data: any) => void;
  onDelete: () => void;
}
const EditItemForm: React.FC<EditItemFormProps> = ({
  item,
  onClose,
  onSubmit,
  onDelete
}) => {
  const [formData, setFormData] = useState({
    ...item
  });
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const validateForm = () => {
    const newErrors: {
      [key: string]: string;
    } = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.quantity) newErrors.quantity = "Quantity is required";
    if (!formData.unit) newErrors.unit = "Unit is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (formData.costPrice && formData.costPrice <= 0) newErrors.costPrice = "Cost price must be greater than 0";
    if (formData.sellingPrice && formData.sellingPrice <= 0) newErrors.sellingPrice = "Selling price must be greater than 0";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      onClose();
    }
  };
  return <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Edit Item</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <XIcon size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <PackageIcon size={20} className="mr-2" />
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Item Name*
                  </label>
                  <input type="text" className={`mt-1 block w-full border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm p-2`} value={formData.name} onChange={e => setFormData({
                  ...formData,
                  name: e.target.value
                })} />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Category*
                  </label>
                  <input type="text" className={`mt-1 block w-full border ${errors.category ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm p-2`} value={formData.category} onChange={e => setFormData({
                  ...formData,
                  category: e.target.value
                })} />
                  {errors.category && <p className="text-red-500 text-xs mt-1">
                      {errors.category}
                    </p>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.description || ""} onChange={e => setFormData({
                  ...formData,
                  description: e.target.value
                })} />
                </div>
              </div>
            </div>
            {/* Stock Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <AlertCircleIcon size={20} className="mr-2" />
                Stock Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Current Quantity*
                  </label>
                  <input type="number" className={`mt-1 block w-full border ${errors.quantity ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm p-2`} value={formData.quantity} onChange={e => setFormData({
                  ...formData,
                  quantity: parseInt(e.target.value)
                })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Unit*
                  </label>
                  <input type="text" className={`mt-1 block w-full border ${errors.unit ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm p-2`} value={formData.unit} onChange={e => setFormData({
                  ...formData,
                  unit: e.target.value
                })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Reorder Point
                  </label>
                  <input type="number" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.reorderPoint} onChange={e => setFormData({
                  ...formData,
                  reorderPoint: parseInt(e.target.value)
                })} />
                </div>
              </div>
            </div>
            {/* Pricing */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <DollarSignIcon size={20} className="mr-2" />
                Pricing
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Cost Price
                  </label>
                  <input type="number" step="0.01" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.costPrice || ""} onChange={e => setFormData({
                  ...formData,
                  costPrice: parseFloat(e.target.value)
                })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Selling Price
                  </label>
                  <input type="number" step="0.01" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.sellingPrice || ""} onChange={e => setFormData({
                  ...formData,
                  sellingPrice: parseFloat(e.target.value)
                })} />
                </div>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="flex justify-between">
              <button type="button" onClick={() => setShowDeleteConfirm(true)} className="px-4 py-2 text-red-600 hover:text-red-700 flex items-center">
                <TrashIcon size={18} className="mr-1" />
                Delete Item
              </button>
              <div className="space-x-4">
                <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Save Changes
                </button>
              </div>
            </div>
          </form>
          {/* Delete Confirmation Modal */}
          {showDeleteConfirm && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg max-w-sm mx-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Confirm Delete
                </h3>
                <p className="text-gray-500 mb-4">
                  Are you sure you want to delete this item? This action cannot
                  be undone.
                </p>
                <div className="flex justify-end space-x-4">
                  <button onClick={() => setShowDeleteConfirm(false)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                    Cancel
                  </button>
                  <button onClick={onDelete} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                    Delete
                  </button>
                </div>
              </div>
            </div>}
        </div>
      </div>
    </div>;
};
export default EditItemForm;
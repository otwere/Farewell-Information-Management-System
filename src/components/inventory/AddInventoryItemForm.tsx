import React, { useState } from "react";
import { XIcon, PackageIcon, ImageIcon, AlertCircleIcon, BuildingIcon, MapPinIcon, DollarSignIcon } from "lucide-react";
interface AddInventoryItemFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}
const itemCategories = ["Chemicals", "Caskets", "Urns", "Clothing", "Equipment", "Supplies", "Other"];
const locations = ["Storage A", "Storage B", "Storage C", "Showroom A", "Showroom B", "Cold Storage"];
const suppliers = [{
  id: "SUP001",
  name: "ChemCorp Inc.",
  category: "Chemicals"
}, {
  id: "SUP002",
  name: "Final Rest Supplies",
  category: "Caskets"
}, {
  id: "SUP003",
  name: "Memorial Crafts",
  category: "Urns"
}];
const AddInventoryItemForm: React.FC<AddInventoryItemFormProps> = ({
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    sku: "",
    quantity: 0,
    unit: "",
    reorderPoint: 0,
    supplierId: "",
    location: "",
    costPrice: 0,
    sellingPrice: 0,
    expiryDate: "",
    notes: "",
    image: null as File | null
  });
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const validateForm = () => {
    const newErrors: {
      [key: string]: string;
    } = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.quantity) newErrors.quantity = "Quantity is required";
    if (!formData.unit) newErrors.unit = "Unit is required";
    if (!formData.supplierId) newErrors.supplierId = "Supplier is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (formData.costPrice <= 0) newErrors.costPrice = "Cost price is required";
    if (formData.sellingPrice <= 0) newErrors.sellingPrice = "Selling price is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        image: file
      });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };
  return <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Add New Item</h2>
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
                  <select className={`mt-1 block w-full border ${errors.category ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm p-2`} value={formData.category} onChange={e => setFormData({
                  ...formData,
                  category: e.target.value
                })}>
                    <option value="">Select category</option>
                    {itemCategories.map(category => <option key={category} value={category}>
                        {category}
                      </option>)}
                  </select>
                  {errors.category && <p className="text-red-500 text-xs mt-1">
                      {errors.category}
                    </p>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.description} onChange={e => setFormData({
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
                    Quantity*
                  </label>
                  <input type="number" min="0" className={`mt-1 block w-full border ${errors.quantity ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm p-2`} value={formData.quantity} onChange={e => setFormData({
                  ...formData,
                  quantity: parseInt(e.target.value)
                })} />
                  {errors.quantity && <p className="text-red-500 text-xs mt-1">
                      {errors.quantity}
                    </p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Unit*
                  </label>
                  <input type="text" placeholder="e.g., pieces, liters, boxes" className={`mt-1 block w-full border ${errors.unit ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm p-2`} value={formData.unit} onChange={e => setFormData({
                  ...formData,
                  unit: e.target.value
                })} />
                  {errors.unit && <p className="text-red-500 text-xs mt-1">{errors.unit}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Reorder Point
                  </label>
                  <input type="number" min="0" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.reorderPoint} onChange={e => setFormData({
                  ...formData,
                  reorderPoint: parseInt(e.target.value)
                })} />
                </div>
              </div>
            </div>
            {/* Supplier and Location */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <BuildingIcon size={20} className="mr-2" />
                Supplier and Location
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Supplier*
                  </label>
                  <select className={`mt-1 block w-full border ${errors.supplierId ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm p-2`} value={formData.supplierId} onChange={e => setFormData({
                  ...formData,
                  supplierId: e.target.value
                })}>
                    <option value="">Select supplier</option>
                    {suppliers.map(supplier => <option key={supplier.id} value={supplier.id}>
                        {supplier.name} - {supplier.category}
                      </option>)}
                  </select>
                  {errors.supplierId && <p className="text-red-500 text-xs mt-1">
                      {errors.supplierId}
                    </p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Location*
                  </label>
                  <select className={`mt-1 block w-full border ${errors.location ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm p-2`} value={formData.location} onChange={e => setFormData({
                  ...formData,
                  location: e.target.value
                })}>
                    <option value="">Select location</option>
                    {locations.map(location => <option key={location} value={location}>
                        {location}
                      </option>)}
                  </select>
                  {errors.location && <p className="text-red-500 text-xs mt-1">
                      {errors.location}
                    </p>}
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
                    Cost Price*
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">
                      $
                    </span>
                    <input type="number" min="0" step="0.01" className={`mt-1 block w-full border ${errors.costPrice ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm p-2 pl-8`} value={formData.costPrice} onChange={e => setFormData({
                    ...formData,
                    costPrice: parseFloat(e.target.value)
                  })} />
                  </div>
                  {errors.costPrice && <p className="text-red-500 text-xs mt-1">
                      {errors.costPrice}
                    </p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Selling Price*
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">
                      $
                    </span>
                    <input type="number" min="0" step="0.01" className={`mt-1 block w-full border ${errors.sellingPrice ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm p-2 pl-8`} value={formData.sellingPrice} onChange={e => setFormData({
                    ...formData,
                    sellingPrice: parseFloat(e.target.value)
                  })} />
                  </div>
                  {errors.sellingPrice && <p className="text-red-500 text-xs mt-1">
                      {errors.sellingPrice}
                    </p>}
                </div>
              </div>
            </div>
            {/* Additional Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <ImageIcon size={20} className="mr-2" />
                Additional Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Expiry Date
                  </label>
                  <input type="date" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.expiryDate} onChange={e => setFormData({
                  ...formData,
                  expiryDate: e.target.value
                })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Item Image
                  </label>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="mt-1 block w-full" />
                  {imagePreview && <div className="mt-2">
                      <img src={imagePreview} alt="Preview" className="h-32 w-32 object-cover rounded-md" />
                    </div>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Notes
                  </label>
                  <textarea rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.notes} onChange={e => setFormData({
                  ...formData,
                  notes: e.target.value
                })} />
                </div>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Add Item
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>;
};
export default AddInventoryItemForm;
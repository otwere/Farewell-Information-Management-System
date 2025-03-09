import React, { useState } from "react";
import { XIcon, SaveIcon, PlusIcon } from "lucide-react";
import { toast } from "sonner";
import Modal from "../common/Modal";
interface AddPartFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (part: PartFormData) => void;
}
interface PartFormData {
  name: string;
  quantity: number;
  unitCost: number;
  supplier?: string;
  partNumber?: string;
  notes?: string;
}
const AddPartForm: React.FC<AddPartFormProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState<PartFormData>({
    name: "",
    quantity: 1,
    unitCost: 0,
    supplier: "",
    partNumber: "",
    notes: ""
  });
  const [errors, setErrors] = useState<Partial<PartFormData>>({});
  const validateForm = (): boolean => {
    const newErrors: Partial<PartFormData> = {};
    if (!formData.name) newErrors.name = "Part name is required";
    if (formData.quantity <= 0) newErrors.quantity = "Quantity must be greater than 0";
    if (formData.unitCost <= 0) newErrors.unitCost = "Unit cost must be greater than 0";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly");
      return;
    }
    onSubmit(formData);
    setFormData({
      name: "",
      quantity: 1,
      unitCost: 0,
      supplier: "",
      partNumber: "",
      notes: ""
    });
  };
  return <Modal isOpen={isOpen} onClose={onClose} title="Add New Part">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Part Name <span className="text-red-500">*</span>
            </label>
            <input type="text" className={`mt-1 block w-full rounded-md border ${errors.name ? "border-red-500" : "border-gray-300"} shadow-sm p-2`} value={formData.name} onChange={e => setFormData({
            ...formData,
            name: e.target.value
          })} placeholder="Enter part name" />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Part Number
            </label>
            <input type="text" className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2" value={formData.partNumber} onChange={e => setFormData({
            ...formData,
            partNumber: e.target.value
          })} placeholder="Enter part number" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Quantity <span className="text-red-500">*</span>
            </label>
            <input type="number" min="1" className={`mt-1 block w-full rounded-md border ${errors.quantity ? "border-red-500" : "border-gray-300"} shadow-sm p-2`} value={formData.quantity} onChange={e => setFormData({
            ...formData,
            quantity: Number(e.target.value)
          })} />
            {errors.quantity && <p className="mt-1 text-sm text-red-500">{errors.quantity}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Unit Cost <span className="text-red-500">*</span>
            </label>
            <div className="relative mt-1">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                $
              </span>
              <input type="number" min="0" step="0.01" className={`pl-7 block w-full rounded-md border ${errors.unitCost ? "border-red-500" : "border-gray-300"} shadow-sm p-2`} value={formData.unitCost} onChange={e => setFormData({
              ...formData,
              unitCost: Number(e.target.value)
            })} />
            </div>
            {errors.unitCost && <p className="mt-1 text-sm text-red-500">{errors.unitCost}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Supplier
            </label>
            <input type="text" className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2" value={formData.supplier} onChange={e => setFormData({
            ...formData,
            supplier: e.target.value
          })} placeholder="Enter supplier name" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Notes
          </label>
          <textarea rows={3} className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2" value={formData.notes} onChange={e => setFormData({
          ...formData,
          notes: e.target.value
        })} placeholder="Any additional notes about the part..." />
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
            <PlusIcon size={18} className="mr-2" />
            Add Part
          </button>
        </div>
      </form>
    </Modal>;
};
export default AddPartForm;
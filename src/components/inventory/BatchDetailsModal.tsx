import React, { useState } from "react";
import { format } from "date-fns";
import { XIcon, SaveIcon } from "lucide-react";
import { toast } from "sonner";
interface BatchDetailsModalProps {
  batch: any; // Using the Batch interface from BatchManagementModal
  onClose: () => void;
  onUpdate: (batchId: string, data: any) => void;
}
const BatchDetailsModal: React.FC<BatchDetailsModalProps> = ({
  batch,
  onClose,
  onUpdate
}) => {
  const [editedBatch, setEditedBatch] = useState(batch);
  const [isEditing, setIsEditing] = useState(false);
  const handleSave = () => {
    try {
      onUpdate(batch.id, editedBatch);
      setIsEditing(false);
      toast.success("Batch updated successfully");
    } catch (error) {
      toast.error("Failed to update batch");
    }
  };
  return <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Batch Details</h2>
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
                    Batch Number
                  </label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={editedBatch.number} disabled={!isEditing} onChange={e => setEditedBatch({
                  ...editedBatch,
                  number: e.target.value
                })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Quantity
                  </label>
                  <input type="number" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={editedBatch.quantity} disabled={!isEditing} onChange={e => setEditedBatch({
                  ...editedBatch,
                  quantity: parseInt(e.target.value)
                })} />
                </div>
              </div>
            </div>
            {/* Dates */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Dates</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Manufacturing Date
                  </label>
                  <input type="date" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={editedBatch.manufacturingDate} disabled={!isEditing} onChange={e => setEditedBatch({
                  ...editedBatch,
                  manufacturingDate: e.target.value
                })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Expiry Date
                  </label>
                  <input type="date" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={editedBatch.expiryDate} disabled={!isEditing} onChange={e => setEditedBatch({
                  ...editedBatch,
                  expiryDate: e.target.value
                })} />
                </div>
              </div>
            </div>
            {/* Additional Details */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Additional Details
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={editedBatch.location} disabled={!isEditing} onChange={e => setEditedBatch({
                  ...editedBatch,
                  location: e.target.value
                })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Notes
                  </label>
                  <textarea rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={editedBatch.notes || ""} disabled={!isEditing} onChange={e => setEditedBatch({
                  ...editedBatch,
                  notes: e.target.value
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
export default BatchDetailsModal;
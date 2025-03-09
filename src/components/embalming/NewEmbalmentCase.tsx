import React, { useState } from "react";
import { XIcon, PlusIcon } from "lucide-react";
interface NewEmbalmentCaseProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}
const NewEmbalmentCase: React.FC<NewEmbalmentCaseProps> = ({
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    deceasedName: "",
    dateOfDeath: "",
    causeOfDeath: "",
    assignedTo: "",
    specialInstructions: "",
    chemicalPreferences: []
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  return <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 w-full max-w-2xl">
        <div className="bg-white rounded-lg shadow-xl">
          <div className="flex justify-between items-center p-6 border-b">
            <h3 className="text-xl font-semibold text-gray-900">
              New Embalming Case
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <XIcon size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="deceasedName">
                  Deceased Name
                </label>
                <input type="text" id="deceasedName" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" value={formData.deceasedName} onChange={e => setFormData({
                ...formData,
                deceasedName: e.target.value
              })} required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="dateOfDeath">
                    Date of Death
                  </label>
                  <input type="datetime-local" id="dateOfDeath" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" value={formData.dateOfDeath} onChange={e => setFormData({
                  ...formData,
                  dateOfDeath: e.target.value
                })} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="assignedTo">
                    Assign To
                  </label>
                  <select id="assignedTo" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" value={formData.assignedTo} onChange={e => setFormData({
                  ...formData,
                  assignedTo: e.target.value
                })} required>
                    <option value="">Select Embalmer</option>
                    <option value="Dr. Sarah Wilson">Dr. Sarah Wilson</option>
                    <option value="Dr. James Moore">Dr. James Moore</option>
                    <option value="Dr. Emily Chen">Dr. Emily Chen</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="causeOfDeath">
                  Cause of Death
                </label>
                <input type="text" id="causeOfDeath" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" value={formData.causeOfDeath} onChange={e => setFormData({
                ...formData,
                causeOfDeath: e.target.value
              })} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="specialInstructions">
                  Special Instructions
                </label>
                <textarea id="specialInstructions" rows={3} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" value={formData.specialInstructions} onChange={e => setFormData({
                ...formData,
                specialInstructions: e.target.value
              })} />
              </div>
            </div>
            <div className="flex justify-end space-x-3 pt-6 border-t">
              <button type="button" onClick={onClose} className="px-4 py-2 border rounded-md hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
                <PlusIcon size={18} className="mr-1" />
                Create Case
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>;
};
export default NewEmbalmentCase;
import React, { useState } from "react";
import { XIcon, PlusIcon, CheckCircleIcon, XCircleIcon } from "lucide-react";
import { toast } from "sonner";
interface BatchQualityControlProps {
  batch: any; // Using the Batch interface from BatchManagementModal
  onClose: () => void;
  onUpdate: (data: any) => void;
}
const BatchQualityControl: React.FC<BatchQualityControlProps> = ({
  batch,
  onClose,
  onUpdate
}) => {
  const [newCheck, setNewCheck] = useState({
    notes: "",
    status: "passed" as "passed" | "failed"
  });
  const handleAddCheck = () => {
    const updatedBatch = {
      ...batch,
      qualityChecks: [...batch.qualityChecks, {
        id: `qc-${Date.now()}`,
        date: new Date().toISOString(),
        performedBy: "Current User",
        // In a real app, get from auth context
        ...newCheck
      }]
    };
    try {
      onUpdate(updatedBatch);
      setNewCheck({
        notes: "",
        status: "passed"
      });
      toast.success("Quality check added successfully");
    } catch (error) {
      toast.error("Failed to add quality check");
    }
  };
  return <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Quality Control
              </h2>
              <p className="text-gray-600">Batch: {batch.number}</p>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <XIcon size={24} />
            </button>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Quality Check History
            </h3>
            <div className="space-y-4">
              {batch.qualityChecks.map((check: any) => <div key={check.id} className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      {check.status === "passed" ? <CheckCircleIcon size={20} className="text-green-500 mr-2" /> : <XCircleIcon size={20} className="text-red-500 mr-2" />}
                      <div>
                        <p className="font-medium text-gray-900">
                          {check.status.charAt(0).toUpperCase() + check.status.slice(1)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(check.date).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">
                      By: {check.performedBy}
                    </p>
                  </div>
                  {check.notes && <p className="mt-2 text-sm text-gray-600">{check.notes}</p>}
                </div>)}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Add Quality Check
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input type="radio" checked={newCheck.status === "passed"} onChange={() => setNewCheck({
                    ...newCheck,
                    status: "passed"
                  })} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                    <span className="ml-2 text-sm text-gray-700">Passed</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" checked={newCheck.status === "failed"} onChange={() => setNewCheck({
                    ...newCheck,
                    status: "failed"
                  })} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                    <span className="ml-2 text-sm text-gray-700">Failed</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={newCheck.notes} onChange={e => setNewCheck({
                ...newCheck,
                notes: e.target.value
              })} placeholder="Enter quality check notes..." />
              </div>
              <button type="button" onClick={handleAddCheck} className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                <PlusIcon size={18} className="mr-2" />
                Add Quality Check
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default BatchQualityControl;
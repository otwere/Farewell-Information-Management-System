import React, { useState } from "react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { XIcon, AlertCircleIcon, PlusIcon, TrashIcon, SearchIcon, FilterIcon, SplitIcon, MergeIcon, PrinterIcon, ClipboardIcon } from "lucide-react";
import { toast } from "sonner";
import BatchDetailsModal from "./BatchDetailsModal";
import BatchMovementHistory from "./BatchMovementHistory";
import BatchQualityControl from "./BatchQualityControl";
const batchSchema = z.object({
  number: z.string().min(1, "Batch number is required"),
  quantity: z.number().min(0, "Quantity must be positive"),
  manufacturingDate: z.string().min(1, "Manufacturing date is required"),
  expiryDate: z.string().min(1, "Expiry date is required"),
  location: z.string().min(1, "Location is required"),
  supplier: z.string().min(1, "Supplier is required"),
  cost: z.number().min(0, "Cost must be positive"),
  qualityGrade: z.enum(["A", "B", "C"]),
  notes: z.string().optional()
});
type BatchFormData = z.infer<typeof batchSchema>;
interface Batch extends BatchFormData {
  id: string;
  status: "active" | "expired" | "depleted" | "quarantine";
  createdAt: string;
  updatedAt: string;
  movements: BatchMovement[];
  qualityChecks: QualityCheck[];
}
interface BatchMovement {
  id: string;
  type: "in" | "out" | "transfer" | "adjustment";
  quantity: number;
  date: string;
  location: string;
  performedBy: string;
  notes?: string;
}
interface QualityCheck {
  id: string;
  date: string;
  performedBy: string;
  status: "passed" | "failed";
  notes: string;
}
interface BatchManagementModalProps {
  itemId: string;
  itemName: string;
  batches: Batch[];
  onClose: () => void;
  onAddBatch: (batch: Omit<Batch, "id" | "status">) => void;
  onDeleteBatch: (batchId: string) => void;
  onUpdateBatch: (batchId: string, data: Partial<Batch>) => void;
  onMergeBatches: (batchIds: string[]) => void;
  onSplitBatch: (batchId: string, quantities: number[]) => void;
}
const BatchManagementModal: React.FC<BatchManagementModalProps> = ({
  itemId,
  itemName,
  batches,
  onClose,
  onAddBatch,
  onDeleteBatch,
  onUpdateBatch,
  onMergeBatches,
  onSplitBatch
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showMovementHistory, setShowMovementHistory] = useState(false);
  const [showQualityControl, setShowQualityControl] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<Batch["status"] | "all">("all");
  const [selectedBatches, setSelectedBatches] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors
    }
  } = useForm<BatchFormData>({
    resolver: zodResolver(batchSchema)
  });
  const filteredBatches = batches.filter(batch => {
    const matchesSearch = batch.number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || batch.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  const handleAddNewBatch = (data: BatchFormData) => {
    try {
      onAddBatch({
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        movements: [],
        qualityChecks: []
      });
      setShowAddForm(false);
      reset();
      toast.success("Batch added successfully");
    } catch (error) {
      toast.error("Failed to add batch");
    }
  };
  const handleMergeBatches = () => {
    if (selectedBatches.length < 2) {
      toast.error("Select at least 2 batches to merge");
      return;
    }
    try {
      onMergeBatches(selectedBatches);
      setSelectedBatches([]);
      toast.success("Batches merged successfully");
    } catch (error) {
      toast.error("Failed to merge batches");
    }
  };
  const handleSplitBatch = (batchId: string, quantities: number[]) => {
    try {
      onSplitBatch(batchId, quantities);
      toast.success("Batch split successfully");
    } catch (error) {
      toast.error("Failed to split batch");
    }
  };
  const handleDeleteConfirmation = (batchId: string) => {
    if (window.confirm("Are you sure you want to delete this batch?")) {
      onDeleteBatch(batchId);
      toast.success("Batch deleted successfully");
    }
  };
  const handleBatchSelection = (batchId: string) => {
    setSelectedBatches(prev => prev.includes(batchId) ? prev.filter(id => id !== batchId) : [...prev, batchId]);
  };
  return <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Batch Management
              </h2>
              <p className="text-gray-600">{itemName}</p>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <XIcon size={24} />
            </button>
          </div>
          <div className="flex justify-between items-center mb-4 space-x-4">
            <div className="flex-1 flex space-x-4">
              <div className="relative flex-1">
                <SearchIcon size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search batches..." className="pl-10 pr-4 py-2 w-full border rounded-md" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>
              <select className="border rounded-md px-3 py-2" value={statusFilter} onChange={e => setStatusFilter(e.target.value as Batch["status"])}>
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
                <option value="depleted">Depleted</option>
                <option value="quarantine">Quarantine</option>
              </select>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => setShowAddForm(true)} className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                <PlusIcon size={16} className="mr-2" />
                Add Batch
              </button>
              <button onClick={handleMergeBatches} disabled={selectedBatches.length < 2} className="flex items-center px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-gray-400">
                <MergeIcon size={16} className="mr-2" />
                Merge Selected
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input type="checkbox" onChange={e => setSelectedBatches(e.target.checked ? batches.map(b => b.id) : [])} checked={selectedBatches.length === batches.length && batches.length > 0} />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Batch Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expiry Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quality Grade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBatches.map(batch => <tr key={batch.id} className={`hover:bg-gray-50 ${selectedBatches.includes(batch.id) ? "bg-blue-50" : "bg-white"}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input type="checkbox" checked={selectedBatches.includes(batch.id)} onChange={() => handleBatchSelection(batch.id)} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {batch.number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {batch.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${batch.status === "active" ? "bg-green-100 text-green-800" : batch.status === "expired" ? "bg-red-100 text-red-800" : batch.status === "quarantine" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800"}`}>
                        {batch.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {format(new Date(batch.expiryDate), "MMM dd, yyyy")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {batch.qualityGrade}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button onClick={() => {
                      setSelectedBatch(batch);
                      setShowDetailsModal(true);
                    }} className="text-blue-600 hover:text-blue-900" title="View Details">
                          <ClipboardIcon size={16} />
                        </button>
                        <button onClick={() => {
                      setSelectedBatch(batch);
                      setShowMovementHistory(true);
                    }} className="text-green-600 hover:text-green-900" title="Movement History">
                          <FilterIcon size={16} />
                        </button>
                        <button onClick={() => {
                      setSelectedBatch(batch);
                      setShowQualityControl(true);
                    }} className="text-purple-600 hover:text-purple-900" title="Quality Control">
                          <AlertCircleIcon size={16} />
                        </button>
                        <button onClick={() => handleDeleteConfirmation(batch.id)} className="text-red-600 hover:text-red-900" title="Delete">
                          <TrashIcon size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showDetailsModal && selectedBatch && <BatchDetailsModal batch={selectedBatch} onClose={() => {
      setShowDetailsModal(false);
      setSelectedBatch(null);
    }} onUpdate={onUpdateBatch} />}
      {showMovementHistory && selectedBatch && <BatchMovementHistory batch={selectedBatch} onClose={() => {
      setShowMovementHistory(false);
      setSelectedBatch(null);
    }} />}
      {showQualityControl && selectedBatch && <BatchQualityControl batch={selectedBatch} onClose={() => {
      setShowQualityControl(false);
      setSelectedBatch(null);
    }} onUpdate={data => onUpdateBatch(selectedBatch.id, data)} />}
    </div>;
};
export default BatchManagementModal;
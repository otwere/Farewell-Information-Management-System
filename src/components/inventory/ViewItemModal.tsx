import React, { useState } from "react";
import { toast } from "sonner";
import { XIcon, ArrowRightIcon, AlertCircleIcon, ClockIcon, PackageIcon, MapPinIcon, PrinterIcon, QrCodeIcon, HistoryIcon } from "lucide-react";
import QRCode from "react-qr-code";
import EditItemForm from "./EditItemForm";
import BatchManagementModal from "./BatchManagementModal";
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
interface ViewItemModalProps {
  item: InventoryItem;
  onClose: () => void;
  onEdit: (data: InventoryItem) => void;
  onPrint: () => void;
  onTransfer: () => void;
}
const ViewItemModal: React.FC<ViewItemModalProps> = ({
  item,
  onClose,
  onEdit,
  onPrint,
  onTransfer
}) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [showBatchManagement, setShowBatchManagement] = useState(false);
  interface LocalBatch {
    id: string;
    status: "active";
  }
  const [batches, setBatches] = useState<LocalBatch[]>([]);
  const purchaseOrders = [{
    id: "PO-2023-001",
    date: "2023-12-10",
    quantity: 50,
    status: "Received"
  }, {
    id: "PO-2023-002",
    date: "2023-12-14",
    quantity: 30,
    status: "Pending"
  }];
  
  const stockMovements = [{
    type: "in",
    quantity: 50,
    date: "2023-12-10",
    reference: "PO-2023-001"
  }, {
    type: "out",
    quantity: -20,
    date: "2023-12-12",
    reference: "REQ-2023-001"
  }, {
    type: "transfer",
    quantity: -10,
    date: "2023-12-13",
    reference: "TRF-2023-001"
  }, {
    type: "in",
    quantity: 30,
    date: "2023-12-14",
    reference: "PO-2023-002"
  }];
  const handleEdit = (editedData: InventoryItem) => {
    try {
      onEdit(editedData);
      setShowEditForm(false);
      setSelectedItem(null);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };
  const handleDeleteItem = (item: InventoryItem) => {
    console.log("Deleting item:", item);
    onClose();
  };
  const handleAddBatch = (batchData: Omit<LocalBatch, "id" | "status">) => {
    try {
      const newBatch = {
        ...batchData,
        id: `BAT${Date.now()}`,
        status: "active" as const
      };
      setBatches([...batches, newBatch]);
      toast.success("Batch added successfully");
    } catch (error) {
      toast.error("Failed to add batch");
    }
  };
  const handleDeleteBatch = (batchId: string) => {
    try {
      setBatches(batches.filter(batch => batch.id !== batchId));
      toast.success("Batch deleted successfully");
    } catch (error) {
      toast.error("Failed to delete batch");
    }
  };
  return <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Item Details</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <XIcon size={24} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500">ID: {item.id}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {item.category}
                  </span>
                </div>
                {item.description && <p className="text-gray-600 mb-4">{item.description}</p>}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Current Stock</p>
                    <p className="text-lg font-medium">
                      {item.quantity} {item.unit}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Reorder Point</p>
                    <p className="text-lg font-medium">
                      {item.reorderPoint} {item.unit}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-lg font-medium">{item.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Supplier</p>
                    <p className="text-lg font-medium">{item.supplier}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <HistoryIcon size={20} className="mr-2" />
                  Stock Movement History
                </h3>
                <div className="space-y-3">
                  {stockMovements.map((movement, index) => <div key={index} className="flex items-center justify-between border-b border-gray-200 pb-2">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${movement.type === "in" ? "bg-green-100 text-green-600" : movement.type === "out" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"}`}>
                          <ArrowRightIcon size={16} className={movement.type === "out" ? "transform rotate-180" : ""} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {movement.type === "in" ? "Stock In" : movement.type === "out" ? "Stock Out" : "Transfer"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {movement.reference}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${movement.type === "in" ? "text-green-600" : movement.type === "out" ? "text-red-600" : "text-blue-600"}`}>
                          {movement.quantity > 0 ? "+" : ""}
                          {movement.quantity} {item.unit}
                        </p>
                        <p className="text-xs text-gray-500">{movement.date}</p>
                      </div>
                    </div>)}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <HistoryIcon size={20} className="mr-2" />
                  Stock Level History
                </h3>
                <div className="text-gray-500 text-center py-8">
                  Stock level history visualization is not available at the
                  moment.
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Related Purchase Orders
                </h3>
                <div className="space-y-3">
                  {purchaseOrders.map(po => <div key={po.id} className="flex items-center justify-between border-b border-gray-200 pb-2">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {po.id}
                        </p>
                        <p className="text-xs text-gray-500">{po.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {po.quantity} {item.unit}
                        </p>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${po.status === "Received" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                          {po.status}
                        </span>
                      </div>
                    </div>)}
                </div>
              </div>
            </div>
            <div className="space-y-6">
              {item.image && <div className="bg-gray-50 p-4 rounded-lg">
                  <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-lg" />
                </div>}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                  <QrCodeIcon size={16} className="mr-2" />
                  Item QR Code
                </h3>
                <div className="bg-white p-3 rounded-lg">
                  <QRCode value={`INV-${item.id}`} size={128} style={{
                  height: "auto",
                  maxWidth: "100%",
                  width: "100%"
                }} />
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <button onClick={() => { setSelectedItem(item); setShowEditForm(true); }} className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center">
                    <PackageIcon size={16} className="mr-2" />
                    Edit Item
                  </button>
                  <button onClick={() => { setSelectedItem(item); onTransfer(); }} className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center">
                    <MapPinIcon size={16} className="mr-2" />
                    Transfer Location
                  </button>
                  <button onClick={onPrint} className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center">
                    <PrinterIcon size={16} className="mr-2" />
                    Print Label
                  </button>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Additional Details
                </h3>
                <div className="space-y-2">
                  {item.costPrice && <div>
                      <p className="text-sm text-gray-500">Cost Price</p>
                      <p className="text-sm font-medium">
                        ${item.costPrice.toFixed(2)}
                      </p>
                    </div>}
                  {item.sellingPrice && <div>
                      <p className="text-sm text-gray-500">Selling Price</p>
                      <p className="text-sm font-medium">
                        ${item.sellingPrice.toFixed(2)}
                      </p>
                    </div>}
                  {item.expiryDate && <div>
                      <p className="text-sm text-gray-500">Expiry Date</p>
                      <p className="text-sm font-medium">{item.expiryDate}</p>
                    </div>}
                  <div>
                    <p className="text-sm text-gray-500">Last Updated</p>
                    <p className="text-sm font-medium">{item.lastUpdated}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Stock Alerts
                </h3>
                {item.quantity <= item.reorderPoint && <div className="flex items-center text-red-600 bg-red-50 p-2 rounded">
                    <AlertCircleIcon size={16} className="mr-2" />
                    <span className="text-sm">
                      Stock below reorder point ({item.reorderPoint} {item.unit}
                      )
                    </span>
                  </div>}
                {item.expiryDate && <div className="flex items-center text-yellow-600 bg-yellow-50 p-2 rounded mt-2">
                    <ClockIcon size={16} className="mr-2" />
                    <span className="text-sm">
                      Expires on{" "}
                      {new Date(item.expiryDate).toLocaleDateString()}
                    </span>
                  </div>}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showEditForm && selectedItem && <EditItemForm item={selectedItem} onClose={() => {
      setShowEditForm(false);
      setSelectedItem(null);
    }} onSubmit={handleEdit} onDelete={() => handleDeleteItem(selectedItem)} />}
      {showBatchManagement && selectedItem && <BatchManagementModal itemId={selectedItem.id} itemName={selectedItem.name} batches={batches} onClose={() => {
      setShowBatchManagement(false);
      setSelectedItem(null);
    }} onAddBatch={handleAddBatch} onDeleteBatch={handleDeleteBatch} />}
    </div>;
};
export default ViewItemModal;
import React, { useState } from "react";
import { PackageIcon, PlusIcon, SearchIcon, FilterIcon, DownloadIcon, AlertCircleIcon, BoxIcon, TruckIcon, BarChart2Icon } from "lucide-react";
import { Card, CardHeader, CardContent } from "../components/common/Card";
import AddInventoryItemForm from "../components/inventory/AddInventoryItemForm";
import ViewItemModal from "../components/inventory/ViewItemModal";
import EditItemForm from "../components/inventory/EditItemForm";
import StockTransferModal from "../components/inventory/StockTransferModal";
import StockMovementModal from "../components/inventory/StockMovementModal";
import BatchManagementModal from "../components/inventory/BatchManagementModal";
import InventoryAnalyticsModal from "../components/inventory/InventoryAnalyticsModal";
const InventoryManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAddItemForm, setShowAddItemForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showStockMovement, setShowStockMovement] = useState(false);
  const [showBatchManagement, setShowBatchManagement] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const inventoryItems = [{
    id: "INV001",
    name: "Embalming Fluid",
    category: "Chemicals",
    quantity: 50,
    unit: "liters",
    reorderPoint: 20,
    supplier: "ChemCorp Inc.",
    location: "Storage A",
    expiryDate: "2024-06-15",
    lastUpdated: "2023-12-14"
  }, {
    id: "INV002",
    name: "Standard Casket",
    category: "Caskets",
    quantity: 15,
    unit: "pieces",
    reorderPoint: 5,
    supplier: "Final Rest Supplies",
    location: "Showroom B",
    expiryDate: null,
    lastUpdated: "2023-12-13"
  }, {
    id: "INV003",
    name: "Urns - Classic",
    category: "Urns",
    quantity: 30,
    unit: "pieces",
    reorderPoint: 10,
    supplier: "Memorial Crafts",
    location: "Storage C",
    expiryDate: null,
    lastUpdated: "2023-12-12"
  }];
  const suppliers = [{
    id: "SUP001",
    name: "ChemCorp Inc.",
    contact: "John Wilson",
    phone: "+1 (555) 234-5678",
    email: "supplies@chemcorp.com",
    status: "Active"
  }];
  const purchaseOrders = [{
    id: "PO001",
    supplier: "ChemCorp Inc.",
    date: "2023-12-10",
    status: "Pending",
    total: 2500.0,
    items: [{
      name: "Embalming Fluid",
      quantity: 20,
      price: 125.0
    }]
  }];
  const lowStockItems = inventoryItems.filter(item => item.quantity <= item.reorderPoint);
  const analyticsData = {
    stockTrend: [{
      date: "2023-07",
      level: 150
    }, {
      date: "2023-08",
      level: 165
    }, {
      date: "2023-09",
      level: 145
    }, {
      date: "2023-10",
      level: 180
    }, {
      date: "2023-11",
      level: 160
    }, {
      date: "2023-12",
      level: 175
    }],
    categoryDistribution: [{
      name: "Chemicals",
      value: 35
    }, {
      name: "Caskets",
      value: 25
    }, {
      name: "Urns",
      value: 20
    }, {
      name: "Equipment",
      value: 15
    }, {
      name: "Supplies",
      value: 5
    }],
    monthlyConsumption: [{
      month: "Jul",
      quantity: 45
    }, {
      month: "Aug",
      quantity: 52
    }, {
      month: "Sep",
      quantity: 48
    }, {
      month: "Oct",
      quantity: 51
    }, {
      month: "Nov",
      quantity: 54
    }, {
      month: "Dec",
      quantity: 49
    }],
    valueAnalysis: {
      totalValue: 124500,
      averageValue: 520,
      highestValue: 2500,
      lowestValue: 50
    }
  };
  const handleAddItem = (data: any) => {
    console.log("New item data:", data);
    // Implementation for adding new item
    setShowAddItemForm(false);
  };
  const handleViewItem = (item: any) => {
    setSelectedItem(item);
    setShowViewModal(true);
  };
  const handleEditItem = (item: any) => {
    setSelectedItem(item);
    setShowEditForm(true);
  };
  const handlePrintLabel = (item: any) => {
    console.log("Printing label for:", item.id);
    // Implementation for printing label
  };
  const handleTransferStock = (data: any) => {
    console.log("Transferring stock:", data);
    setShowTransferModal(false);
    // Implementation for stock transfer
  };
  const handleDeleteItem = (item: any) => {
    console.log("Deleting item:", item.id);
    // Implementation for item deletion
  };
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Inventory Management
          </h1>
          <p className="text-gray-600 mt-1">
            Track and manage inventory items, suppliers, and orders
          </p>
        </div>
        <button onClick={() => setShowAddItemForm(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
          <PlusIcon size={18} className="mr-1" />
          Add Item
        </button>
        <button onClick={() => setShowAnalytics(true)} className="ml-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center">
          <BarChart2Icon size={18} className="mr-1" />
          Analytics
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent>
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full p-3 mr-4">
                <PackageIcon size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Items</p>
                <p className="text-2xl font-semibold">247</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="flex items-center">
              <div className="bg-red-100 rounded-full p-3 mr-4">
                <AlertCircleIcon size={20} className="text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Low Stock</p>
                <p className="text-2xl font-semibold">{lowStockItems.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="flex items-center">
              <div className="bg-green-100 rounded-full p-3 mr-4">
                <TruckIcon size={20} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Orders</p>
                <p className="text-2xl font-semibold">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="flex items-center">
              <div className="bg-purple-100 rounded-full p-3 mr-4">
                <BarChart2Icon size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Value</p>
                <p className="text-2xl font-semibold">$124.5k</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between mb-4 space-y-4 md:space-y-0">
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon size={18} className="text-gray-400" />
              </div>
              <input type="text" placeholder="Search inventory..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <div className="flex space-x-2">
              <select className="border border-gray-300 rounded-md px-4 py-2" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                <option value="all">All Categories</option>
                <option value="chemicals">Chemicals</option>
                <option value="caskets">Caskets</option>
                <option value="urns">Urns</option>
              </select>
              <button className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-md flex items-center">
                <FilterIcon size={18} className="mr-1" />
                Filter
              </button>
              <button className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-md flex items-center">
                <DownloadIcon size={18} className="mr-1" />
                Export
              </button>
            </div>
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inventoryItems.map(item => <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {item.name}
                        </div>
                        <div className="text-sm text-gray-500">{item.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {item.quantity} {item.unit}
                    </div>
                    {item.quantity <= item.reorderPoint && <span className="text-xs text-red-600">Low Stock</span>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.lastUpdated}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button onClick={() => handleViewItem(item)} className="text-blue-600 hover:text-blue-900 mr-3">
                      View
                    </button>
                    <button onClick={() => handleEditItem(item)} className="text-blue-600 hover:text-blue-900 mr-3">
                      Edit
                    </button>
                    <button onClick={() => {
                  setSelectedItem(item);
                  setShowStockMovement(true);
                }} className="text-blue-600 hover:text-blue-900 mr-3">
                      Movement
                    </button>
                    <button onClick={() => {
                  setSelectedItem(item);
                  setShowBatchManagement(true);
                }} className="text-blue-600 hover:text-blue-900">
                      Batches
                    </button>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium text-gray-900">
              Low Stock Items
            </h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockItems.map(item => <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.quantity} {item.unit} remaining
                    </p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-900">
                    Order More
                  </button>
                </div>)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium text-gray-900">
              Recent Purchase Orders
            </h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {purchaseOrders.map(order => <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">
                      {order.supplier}
                    </p>
                    <p className="text-sm text-gray-500">
                      {order.date} - ${order.total.toFixed(2)}
                    </p>
                  </div>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}>
                    {order.status}
                  </span>
                </div>)}
            </div>
          </CardContent>
        </Card>
      </div>
      {showAddItemForm && <AddInventoryItemForm onClose={() => setShowAddItemForm(false)} onSubmit={handleAddItem} />}
      {showViewModal && selectedItem && <ViewItemModal item={selectedItem} onClose={() => {
      setShowViewModal(false);
      setSelectedItem(null);
    }} onEdit={() => {
      setShowViewModal(false);
      setShowEditForm(true);
    }} onPrint={() => handlePrintLabel(selectedItem)} onTransfer={() => {
      setShowViewModal(false);
      setShowTransferModal(true);
    }} />}
      {showEditForm && selectedItem && <EditItemForm item={selectedItem} onClose={() => {
      setShowEditForm(false);
      setSelectedItem(null);
    }} onSubmit={handleEdit} onDelete={() => handleDeleteItem(selectedItem)} />}
      {showTransferModal && selectedItem && <StockTransferModal itemId={selectedItem.id} itemName={selectedItem.name} currentLocation={selectedItem.location} currentQuantity={selectedItem.quantity} unit={selectedItem.unit} availableLocations={locations} onClose={() => {
      setShowTransferModal(false);
      setSelectedItem(null);
    }} onTransfer={handleTransferStock} />}
      {showStockMovement && selectedItem && <StockMovementModal itemId={selectedItem.id} itemName={selectedItem.name} movements={stockMovements} onClose={() => {
      setShowStockMovement(false);
      setSelectedItem(null);
    }} />}
      {showBatchManagement && selectedItem && <BatchManagementModal itemId={selectedItem.id} itemName={selectedItem.name} batches={batches} onClose={() => {
      setShowBatchManagement(false);
      setSelectedItem(null);
    }} onAddBatch={handleAddBatch} onDeleteBatch={handleDeleteBatch} />}
      {showAnalytics && <InventoryAnalyticsModal data={analyticsData} onClose={() => setShowAnalytics(false)} />}
    </div>;
};
export default InventoryManagement;
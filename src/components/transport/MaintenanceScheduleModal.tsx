import React, { useState } from "react";
import { toast } from "sonner";
import { WrenchIcon, CalendarIcon, ClockIcon, UserIcon, AlertCircleIcon, CheckCircleIcon, FileTextIcon, BellIcon, TruckIcon, ClipboardCheckIcon, TagIcon, AlertTriangleIcon, DollarSignIcon, BoxIcon, FileIcon, TrashIcon, PlusIcon, UploadIcon } from "lucide-react";
import Modal from "../common/Modal";
import AddPartForm from "./AddPartForm";
import AddTaskForm from "./AddTaskForm";
interface MaintenanceTask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  required: boolean;
  category: string;
  estimatedTime: string;
  assignedTo?: string;
}
interface PartUsage {
  id: string;
  name: string;
  quantity: number;
  unitCost: number;
  total: number;
}
interface ServiceProvider {
  id: string;
  name: string;
  type: string;
  contact: string;
  specialization: string;
}
interface MaintenanceDocument {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
  uploadedBy: string;
}
interface MaintenanceScheduleModalProps {
  maintenance: any;
  isOpen: boolean;
  onClose: () => void;
  onUpdateMaintenance: (maintenanceId: string, data: any) => void;
}
const MaintenanceScheduleModal: React.FC<MaintenanceScheduleModalProps> = ({
  maintenance,
  isOpen,
  onClose,
  onUpdateMaintenance
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [maintenanceData, setMaintenanceData] = useState(maintenance);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [tasks, setTasks] = useState<MaintenanceTask[]>([{
    id: "1",
    title: "Oil Change",
    description: "Complete oil change with filter replacement",
    completed: false,
    required: true,
    category: "Routine",
    estimatedTime: "1 hour",
    assignedTo: "John Smith"
  }, {
    id: "2",
    title: "Brake Inspection",
    description: "Check brake pads and rotors",
    completed: false,
    required: true,
    category: "Safety",
    estimatedTime: "45 minutes",
    assignedTo: "Mike Johnson"
  }]);
  const [parts, setParts] = useState<PartUsage[]>([{
    id: "P1",
    name: "Oil Filter",
    quantity: 1,
    unitCost: 15.99,
    total: 15.99
  }, {
    id: "P2",
    name: "Engine Oil (5W-30)",
    quantity: 5,
    unitCost: 8.99,
    total: 44.95
  }]);
  const [documents, setDocuments] = useState<MaintenanceDocument[]>([{
    id: "D1",
    name: "Service Manual.pdf",
    type: "PDF",
    size: "2.5 MB",
    uploadedAt: "2023-12-15",
    uploadedBy: "John Smith"
  }]);
  const serviceProviders: ServiceProvider[] = [{
    id: "SP1",
    name: "AutoCare Services",
    type: "External",
    contact: "+1 (555) 123-4567",
    specialization: "General Maintenance"
  }, {
    id: "SP2",
    name: "Brake Specialists Inc.",
    type: "External",
    contact: "+1 (555) 234-5678",
    specialization: "Brake Systems"
  }];
  const [showAddPartForm, setShowAddPartForm] = useState(false);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const handleStatusUpdate = () => {
    setShowConfirmation(true);
  };
  const handleTaskToggle = (taskId: string) => {
    setTasks(currentTasks => currentTasks.map(task => task.id === taskId ? {
      ...task,
      completed: !task.completed
    } : task));
    const updatedTasks = tasks.map(task => task.id === taskId ? {
      ...task,
      completed: !task.completed
    } : task);
    const completedRequired = updatedTasks.filter(task => task.required && task.completed).length;
    const totalRequired = updatedTasks.filter(task => task.required).length;
    if (completedRequired === totalRequired) {
      toast.success("All required tasks completed!");
      setMaintenanceData({
        ...maintenanceData,
        status: "Completed"
      });
    }
  };
  const handleAddPart = (newPart: Partial<PartUsage>) => {
    if (newPart.name && newPart.quantity && newPart.unitCost && typeof newPart.quantity === "number" && typeof newPart.unitCost === "number") {
      const total = newPart.quantity * newPart.unitCost;
      setParts([...parts, {
        id: `P${parts.length + 1}`,
        name: newPart.name,
        quantity: newPart.quantity,
        unitCost: newPart.unitCost,
        total
      }]);
    }
  };
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const newDocument: MaintenanceDocument = {
        id: `D${documents.length + 1}`,
        name: file.name,
        type: file.type.split("/")[1].toUpperCase(),
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        uploadedAt: new Date().toISOString().split("T")[0],
        uploadedBy: "Current User"
      };
      setDocuments([...documents, newDocument]);
      toast.success("Document uploaded successfully");
    }
  };
  const calculateTotalCost = () => {
    return parts.reduce((total, part) => total + part.total, 0);
  };
  const getCompletionPercentage = () => {
    const completed = tasks.filter(task => task.completed).length;
    return Math.round(completed / tasks.length * 100);
  };
  const handleAddPartSubmit = (newPart: any) => {
    const total = newPart.quantity * newPart.unitCost;
    const partWithTotal = {
      ...newPart,
      id: `P${parts.length + 1}`,
      total
    };
    setParts([...parts, partWithTotal]);
    setShowAddPartForm(false);
    toast.success("Part added successfully");
  };
  const handleAddTask = (newTask: MaintenanceTask) => {
    setTasks([...tasks, newTask]);
    toast.success("Task added successfully");
  };
  return <Modal isOpen={isOpen} onClose={onClose} title="Maintenance Schedule" maxWidth="max-w-5xl">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <WrenchIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium">{maintenanceData.status}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <ClipboardCheckIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Completion</p>
                <p className="font-medium">{getCompletionPercentage()}%</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSignIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Cost</p>
                <p className="font-medium">
                  ${calculateTotalCost().toFixed(2)}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <CalendarIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Due Date</p>
                <p className="font-medium">{maintenanceData.date}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border-b border-gray-200">
          <nav className="flex space-x-4">
            {["overview", "tasks", "parts", "documents"].map(tab => <button key={tab} onClick={() => setActiveTab(tab)} className={`px-3 py-2 text-sm font-medium border-b-2 ${activeTab === tab ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>)}
          </nav>
        </div>
        {activeTab === "overview" && <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Maintenance Details
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Vehicle
                  </label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={maintenanceData.vehicle} onChange={e => setMaintenanceData({
                ...maintenanceData,
                vehicle: e.target.value
              })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Type
                  </label>
                  <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={maintenanceData.type} onChange={e => setMaintenanceData({
                ...maintenanceData,
                type: e.target.value
              })}>
                    <option value="routine">Routine Service</option>
                    <option value="repair">Repair</option>
                    <option value="inspection">Inspection</option>
                    <option value="emergency">Emergency</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Priority
                  </label>
                  <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={maintenanceData.priority || "medium"} onChange={e => setMaintenanceData({
                ...maintenanceData,
                priority: e.target.value
              })}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Service Provider
                  </label>
                  <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={maintenanceData.serviceProvider} onChange={e => setMaintenanceData({
                ...maintenanceData,
                serviceProvider: e.target.value
              })}>
                    {serviceProviders.map(provider => <option key={provider.id} value={provider.id}>
                        {provider.name} - {provider.specialization}
                      </option>)}
                  </select>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Notes</h3>
              <textarea rows={4} className="w-full border border-gray-300 rounded-md shadow-sm p-2" value={maintenanceData.notes} onChange={e => setMaintenanceData({
            ...maintenanceData,
            notes: e.target.value
          })} placeholder="Enter maintenance notes..." />
            </div>
          </div>}
        {activeTab === "tasks" && <div className="space-y-4">
            <button onClick={() => setShowAddTaskForm(true)} className="flex items-center text-blue-600 hover:text-blue-700">
              <PlusIcon className="h-4 w-4 mr-1" />
              Add Task
            </button>
            <div className="space-y-4">
              {tasks.map(task => <div key={task.id} className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" checked={task.completed} onChange={() => handleTaskToggle(task.id)} className="h-4 w-4 text-blue-600 rounded" />
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {task.title}
                          {task.required && <span className="ml-2 text-red-500 text-sm">*</span>}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {task.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{task.estimatedTime}</span>
                      <span>{task.category}</span>
                      <span>{task.assignedTo}</span>
                    </div>
                  </div>
                </div>)}
            </div>
            {showAddTaskForm && <AddTaskForm isOpen={showAddTaskForm} onClose={() => setShowAddTaskForm(false)} onSubmit={handleAddTask} availableStaff={["John Smith", "Mike Johnson", "Sarah Wilson"]} />}
          </div>}
        {activeTab === "parts" && <div className="space-y-4">
            <button onClick={() => setShowAddPartForm(true)} className="flex items-center text-blue-600 hover:text-blue-700">
              <PlusIcon className="h-4 w-4 mr-1" />
              Add Part
            </button>
            <div className="bg-white rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Part Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Unit Cost
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {parts.map(part => <tr key={part.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {part.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {part.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        ${part.unitCost.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        ${part.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="text-red-600 hover:text-red-700">
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>)}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td colSpan={3} className="px-6 py-4 text-right font-medium">
                      Total Cost:
                    </td>
                    <td className="px-6 py-4 font-medium">
                      ${calculateTotalCost().toFixed(2)}
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
            {showAddPartForm && <AddPartForm isOpen={showAddPartForm} onClose={() => setShowAddPartForm(false)} onSubmit={handleAddPartSubmit} />}
          </div>}
        {activeTab === "documents" && <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer">
                <UploadIcon className="h-4 w-4 mr-2" />
                Upload Document
                <input type="file" className="hidden" onChange={handleFileUpload} />
              </label>
            </div>
            <div className="bg-white rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Size
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Uploaded
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {documents.map(doc => <tr key={doc.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FileIcon className="h-4 w-4 text-gray-400 mr-2" />
                          {doc.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {doc.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {doc.size}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm text-gray-900">
                            {doc.uploadedAt}
                          </div>
                          <div className="text-sm text-gray-500">
                            {doc.uploadedBy}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-700 mr-2">
                          Download
                        </button>
                        <button className="text-red-600 hover:text-red-700">
                          Delete
                        </button>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </div>}
        <div className="flex justify-end space-x-4 mt-6">
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            Cancel
          </button>
          <button onClick={handleStatusUpdate} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
            <CheckCircleIcon className="h-4 w-4 mr-2" />
            Update Maintenance
          </button>
        </div>
      </div>
    </Modal>;
};
export default MaintenanceScheduleModal;
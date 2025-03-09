import React, { useState } from "react";
import { XIcon, SaveIcon, ClockIcon, UserIcon, TagIcon } from "lucide-react";
import { toast } from "sonner";
import Modal from "../common/Modal";
interface AddTaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: MaintenanceTask) => void;
  availableStaff?: string[];
}
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
const AddTaskForm: React.FC<AddTaskFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  availableStaff = []
}) => {
  const [formData, setFormData] = useState<MaintenanceTask>({
    id: `T${Date.now()}`,
    title: "",
    description: "",
    completed: false,
    required: false,
    category: "routine",
    estimatedTime: "1 hour",
    assignedTo: ""
  });
  const [errors, setErrors] = useState<Partial<MaintenanceTask>>({});
  const categories = [{
    value: "routine",
    label: "Routine"
  }, {
    value: "safety",
    label: "Safety"
  }, {
    value: "repair",
    label: "Repair"
  }, {
    value: "inspection",
    label: "Inspection"
  }];
  const timeEstimates = ["30 minutes", "1 hour", "2 hours", "3 hours", "4 hours", "6 hours", "8 hours"];
  const validateForm = (): boolean => {
    const newErrors: Partial<MaintenanceTask> = {};
    if (!formData.title) newErrors.title = "Task title is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.estimatedTime) newErrors.estimatedTime = "Time estimate is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }
    onSubmit(formData);
    toast.success("Task added successfully");
    onClose();
  };
  return <Modal isOpen={isOpen} onClose={onClose} title="Add New Task">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Task Title <span className="text-red-500">*</span>
          </label>
          <input type="text" className={`mt-1 block w-full rounded-md border ${errors.title ? "border-red-500" : "border-gray-300"} shadow-sm p-2`} value={formData.title} onChange={e => setFormData({
          ...formData,
          title: e.target.value
        })} placeholder="Enter task title" />
          {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea rows={3} className={`mt-1 block w-full rounded-md border ${errors.description ? "border-red-500" : "border-gray-300"} shadow-sm p-2`} value={formData.description} onChange={e => setFormData({
          ...formData,
          description: e.target.value
        })} placeholder="Enter task description" />
          {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category <span className="text-red-500">*</span>
            </label>
            <select className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2" value={formData.category} onChange={e => setFormData({
            ...formData,
            category: e.target.value
          })}>
              {categories.map(category => <option key={category.value} value={category.value}>
                  {category.label}
                </option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Estimated Time <span className="text-red-500">*</span>
            </label>
            <select className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2" value={formData.estimatedTime} onChange={e => setFormData({
            ...formData,
            estimatedTime: e.target.value
          })}>
              {timeEstimates.map(time => <option key={time} value={time}>
                  {time}
                </option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Assign To
            </label>
            <select className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2" value={formData.assignedTo} onChange={e => setFormData({
            ...formData,
            assignedTo: e.target.value
          })}>
              <option value="">Select staff member</option>
              {availableStaff.map(staff => <option key={staff} value={staff}>
                  {staff}
                </option>)}
            </select>
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm" checked={formData.required} onChange={e => setFormData({
              ...formData,
              required: e.target.checked
            })} />
              <span className="text-sm font-medium text-gray-700">
                Required Task
              </span>
            </label>
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
            <SaveIcon size={18} className="mr-2" />
            Add Task
          </button>
        </div>
      </form>
    </Modal>;
};
export default AddTaskForm;
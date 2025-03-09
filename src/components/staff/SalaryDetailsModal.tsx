import React, { useState } from "react";
import {
  XIcon,
  PlusIcon,
  TrashIcon,
  SaveIcon,
  DollarSignIcon,
} from "lucide-react";
interface SalaryComponent {
  name: string;
  amount: number;
  type: "allowance" | "deduction";
  frequency: "monthly" | "annual" | "one_time";
}
interface SalaryDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: {
    id: string;
    name: string;
    position: string;
    department: string;
    basicSalary: number;
    allowances: SalaryComponent[];
    deductions: SalaryComponent[];
  };
  onUpdate: (employeeId: string, data: any) => void;
}
const SalaryDetailsModal: React.FC<SalaryDetailsModalProps> = ({
  isOpen,
  onClose,
  employee,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [salaryData, setSalaryData] = useState({
    basicSalary: employee.basicSalary,
    allowances: [...employee.allowances],
    deductions: [...employee.deductions],
  });
  const [newComponent, setNewComponent] = useState<SalaryComponent>({
    name: "",
    amount: 0,
    type: "allowance",
    frequency: "monthly",
  });
  const calculateTotal = () => {
    const totalAllowances = salaryData.allowances.reduce(
      (sum, item) => sum + item.amount,
      0
    );
    const totalDeductions = salaryData.deductions.reduce(
      (sum, item) => sum + item.amount,
      0
    );
    return {
      gross: salaryData.basicSalary + totalAllowances,
      net: salaryData.basicSalary + totalAllowances - totalDeductions,
      totalAllowances,
      totalDeductions,
    };
  };
  const handleAddComponent = () => {
    if (newComponent.name && newComponent.amount > 0) {
      if (newComponent.type === "allowance") {
        setSalaryData({
          ...salaryData,
          allowances: [...salaryData.allowances, { ...newComponent }],
        });
      } else {
        setSalaryData({
          ...salaryData,
          deductions: [...salaryData.deductions, { ...newComponent }],
        });
      }
      setNewComponent({
        name: "",
        amount: 0,
        type: "allowance",
        frequency: "monthly",
      });
    }
  };
  const handleRemoveComponent = (
    index: number,
    type: "allowance" | "deduction"
  ) => {
    if (type === "allowance") {
      setSalaryData({
        ...salaryData,
        allowances: salaryData.allowances.filter((_, i) => i !== index),
      });
    } else {
      setSalaryData({
        ...salaryData,
        deductions: salaryData.deductions.filter((_, i) => i !== index),
      });
    }
  };
  const handleSave = () => {
    onUpdate(employee.id, salaryData);
    setIsEditing(false);
  };
  const totals = calculateTotal();
  return (
    <div
      className={`fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Salary Details
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <XIcon size={24} />
            </button>
          </div>
          {/* Employee Info */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Employee Name:</p>
                <p className="font-medium">{employee.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Position:</p>
                <p className="font-medium">{employee.position}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Department:</p>
                <p className="font-medium">{employee.department}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Employee ID:</p>
                <p className="font-medium">{employee.id}</p>
              </div>
            </div>
          </div>
          {/* Basic Salary */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Basic Salary
            </label>
            <input
              type="number"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={salaryData.basicSalary}
              onChange={(e) =>
                setSalaryData({
                  ...salaryData,
                  basicSalary: Number(e.target.value),
                })
              }
              disabled={!isEditing}
            />
          </div>
          {/* Allowances */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Allowances
            </h3>
            <div className="space-y-4">
              {salaryData.allowances.map((allowance, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium">{allowance.name}</p>
                    <p className="text-sm text-gray-600">
                      ${allowance.amount} ({allowance.frequency})
                    </p>
                  </div>
                  {isEditing && (
                    <button
                      onClick={() =>
                        handleRemoveComponent(index, "allowance")
                      }
                      className="text-red-600 hover:text-red-800"
                    >
                      <TrashIcon size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* Deductions */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Deductions
            </h3>
            <div className="space-y-4">
              {salaryData.deductions.map((deduction, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium">{deduction.name}</p>
                    <p className="text-sm text-gray-600">
                      ${deduction.amount} ({deduction.frequency})
                    </p>
                  </div>
                  {isEditing && (
                    <button
                      onClick={() =>
                        handleRemoveComponent(index, "deduction")
                      }
                      className="text-red-600 hover:text-red-800"
                    >
                      <TrashIcon size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* Add New Component Form */}
          {isEditing && (
            <div className="mb-6 bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Add New Component
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={newComponent.name}
                    onChange={(e) =>
                      setNewComponent({
                        ...newComponent,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Amount
                  </label>
                  <input
                    type="number"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={newComponent.amount}
                    onChange={(e) =>
                      setNewComponent({
                        ...newComponent,
                        amount: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Type
                  </label>
                  <select
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={newComponent.type}
                    onChange={(e) =>
                      setNewComponent({
                        ...newComponent,
                        type: e.target.value as "allowance" | "deduction",
                      })
                    }
                  >
                    <option value="allowance">Allowance</option>
                    <option value="deduction">Deduction</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Frequency
                  </label>
                  <select
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={newComponent.frequency}
                    onChange={(e) =>
                      setNewComponent({
                        ...newComponent,
                        frequency: e.target.value as
                          | "monthly"
                          | "annual"
                          | "one_time",
                      })
                    }
                  >
                    <option value="monthly">Monthly</option>
                    <option value="annual">Annual</option>
                    <option value="one_time">One Time</option>
                  </select>
                </div>
              </div>
              <button
                type="button"
                onClick={handleAddComponent}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
              >
                <PlusIcon size={18} className="mr-2" />
                Add Component
              </button>
            </div>
          )}
          {/* Summary */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Salary Summary
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Basic Salary:</span>
                <span className="font-medium">
                  ${salaryData.basicSalary.toFixed(2
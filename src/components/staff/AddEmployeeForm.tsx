import React, { useState } from "react";
import { XIcon, SaveIcon, UserIcon, MailIcon, PhoneIcon, BriefcaseIcon, CalendarIcon, ClockIcon, AwardIcon } from "lucide-react";
import { toast } from "sonner";
import Modal from "../common/Modal";
interface AddEmployeeFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (employee: Employee) => void;
}
export interface Employee {
  id: string;
  name: string;
  email: string;
  contact: string;
  role: string;
  department: string;
  status: "Active" | "Inactive";
  shift: string;
  joinDate: string;
  certifications: string[];
  address?: string;
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
  documents?: {
    type: string;
    number: string;
    expiryDate?: string;
  }[];
}
const AddEmployeeForm: React.FC<AddEmployeeFormProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState<Omit<Employee, "id">>({
    name: "",
    email: "",
    contact: "",
    role: "",
    department: "",
    status: "Active",
    shift: "",
    joinDate: "",
    certifications: [],
    address: "",
    emergencyContact: {
      name: "",
      relationship: "",
      phone: ""
    },
    documents: []
  });
  const [errors, setErrors] = useState<Partial<Employee>>({});
  const [newCertification, setNewCertification] = useState("");
  const departments = ["Technical", "Operations", "Administrative", "Management", "Support"];
  const roles = {
    Technical: ["Embalmer", "Mortuary Technician", "Crematorium Operator"],
    Operations: ["Funeral Director", "Service Coordinator", "Transport Manager"],
    Administrative: ["Administrator", "Receptionist", "Records Manager"],
    Management: ["General Manager", "Department Head", "Supervisor"],
    Support: ["Maintenance Staff", "Security Officer", "Cleaner"]
  };
  const shifts = ["Morning (8AM-4PM)", "Evening (4PM-12AM)", "Night (12AM-8AM)"];
  const validateForm = (): boolean => {
    const newErrors: Partial<Employee> = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.contact) newErrors.contact = "Contact number is required";
    if (!formData.role) newErrors.role = "Role is required";
    if (!formData.department) newErrors.department = "Department is required";
    if (!formData.shift) newErrors.shift = "Shift is required";
    if (!formData.joinDate) newErrors.joinDate = "Join date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }
    const newEmployee: Employee = {
      id: `EMP${Date.now()}`,
      ...formData
    };
    onSubmit(newEmployee);
    toast.success("Employee added successfully");
    onClose();
  };
  const handleAddCertification = () => {
    if (newCertification.trim()) {
      setFormData({
        ...formData,
        certifications: [...formData.certifications, newCertification.trim()]
      });
      setNewCertification("");
    }
  };
  const handleRemoveCertification = (index: number) => {
    setFormData({
      ...formData,
      certifications: formData.certifications.filter((_, i) => i !== index)
    });
  };
  return <Modal isOpen={isOpen} onClose={onClose} title="Add New Employee" maxWidth="max-w-4xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <h3 className="font-medium text-gray-900 flex items-center">
            <UserIcon size={18} className="mr-2" />
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input type="text" className={`mt-1 block w-full rounded-md border ${errors.name ? "border-red-500" : "border-gray-300"} shadow-sm p-2`} value={formData.name} onChange={e => setFormData({
              ...formData,
              name: e.target.value
            })} />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input type="email" className={`mt-1 block w-full rounded-md border ${errors.email ? "border-red-500" : "border-gray-300"} shadow-sm p-2`} value={formData.email} onChange={e => setFormData({
              ...formData,
              email: e.target.value
            })} />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contact Number <span className="text-red-500">*</span>
              </label>
              <input type="tel" className={`mt-1 block w-full rounded-md border ${errors.contact ? "border-red-500" : "border-gray-300"} shadow-sm p-2`} value={formData.contact} onChange={e => setFormData({
              ...formData,
              contact: e.target.value
            })} />
              {errors.contact && <p className="mt-1 text-sm text-red-500">{errors.contact}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input type="text" className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2" value={formData.address} onChange={e => setFormData({
              ...formData,
              address: e.target.value
            })} />
            </div>
          </div>
        </div>
        {/* Employment Details */}
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <h3 className="font-medium text-gray-900 flex items-center">
            <BriefcaseIcon size={18} className="mr-2" />
            Employment Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Department <span className="text-red-500">*</span>
              </label>
              <select className={`mt-1 block w-full rounded-md border ${errors.department ? "border-red-500" : "border-gray-300"} shadow-sm p-2`} value={formData.department} onChange={e => {
              setFormData({
                ...formData,
                department: e.target.value,
                role: "" // Reset role when department changes
              });
            }}>
                <option value="">Select Department</option>
                {departments.map(dept => <option key={dept} value={dept}>
                    {dept}
                  </option>)}
              </select>
              {errors.department && <p className="mt-1 text-sm text-red-500">{errors.department}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role <span className="text-red-500">*</span>
              </label>
              <select className={`mt-1 block w-full rounded-md border ${errors.role ? "border-red-500" : "border-gray-300"} shadow-sm p-2`} value={formData.role} onChange={e => setFormData({
              ...formData,
              role: e.target.value
            })} disabled={!formData.department}>
                <option value="">Select Role</option>
                {formData.department && roles[formData.department as keyof typeof roles].map(role => <option key={role} value={role}>
                        {role}
                      </option>)}
              </select>
              {errors.role && <p className="mt-1 text-sm text-red-500">{errors.role}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Shift <span className="text-red-500">*</span>
              </label>
              <select className={`mt-1 block w-full rounded-md border ${errors.shift ? "border-red-500" : "border-gray-300"} shadow-sm p-2`} value={formData.shift} onChange={e => setFormData({
              ...formData,
              shift: e.target.value
            })}>
                <option value="">Select Shift</option>
                {shifts.map(shift => <option key={shift} value={shift}>
                    {shift}
                  </option>)}
              </select>
              {errors.shift && <p className="mt-1 text-sm text-red-500">{errors.shift}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Join Date <span className="text-red-500">*</span>
              </label>
              <input type="date" className={`mt-1 block w-full rounded-md border ${errors.joinDate ? "border-red-500" : "border-gray-300"} shadow-sm p-2`} value={formData.joinDate} onChange={e => setFormData({
              ...formData,
              joinDate: e.target.value
            })} />
              {errors.joinDate && <p className="mt-1 text-sm text-red-500">{errors.joinDate}</p>}
            </div>
          </div>
        </div>
        {/* Certifications */}
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <h3 className="font-medium text-gray-900 flex items-center">
            <AwardIcon size={18} className="mr-2" />
            Certifications & Qualifications
          </h3>
          <div className="space-y-4">
            <div className="flex gap-2">
              <input type="text" className="flex-1 rounded-md border border-gray-300 shadow-sm p-2" value={newCertification} onChange={e => setNewCertification(e.target.value)} placeholder="Enter certification or qualification" />
              <button type="button" onClick={handleAddCertification} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Add
              </button>
            </div>
            <div className="space-y-2">
              {formData.certifications.map((cert, index) => <div key={index} className="flex items-center justify-between bg-white p-2 rounded-md border border-gray-200">
                  <span>{cert}</span>
                  <button type="button" onClick={() => handleRemoveCertification(index)} className="text-red-600 hover:text-red-800">
                    <XIcon size={16} />
                  </button>
                </div>)}
            </div>
          </div>
        </div>
        {/* Emergency Contact */}
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <h3 className="font-medium text-gray-900">Emergency Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input type="text" className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2" value={formData.emergencyContact?.name} onChange={e => setFormData({
              ...formData,
              emergencyContact: {
                ...formData.emergencyContact!,
                name: e.target.value
              }
            })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Relationship
              </label>
              <input type="text" className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2" value={formData.emergencyContact?.relationship} onChange={e => setFormData({
              ...formData,
              emergencyContact: {
                ...formData.emergencyContact!,
                relationship: e.target.value
              }
            })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input type="tel" className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2" value={formData.emergencyContact?.phone} onChange={e => setFormData({
              ...formData,
              emergencyContact: {
                ...formData.emergencyContact!,
                phone: e.target.value
              }
            })} />
            </div>
          </div>
        </div>
        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
            <SaveIcon size={18} className="mr-2" />
            Add Employee
          </button>
        </div>
      </form>
    </Modal>;
};
export default AddEmployeeForm;
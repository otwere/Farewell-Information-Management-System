import React, { useState } from "react";
import { XIcon, UserIcon, HeartPulseIcon, UsersIcon } from "lucide-react";
interface NewDeceasedRecordFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}
const NewDeceasedRecordForm: React.FC<NewDeceasedRecordFormProps> = ({
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      dateOfDeath: "",
      timeOfDeath: "",
      causeOfDeath: "",
      placeOfDeath: ""
    },
    nextOfKin: {
      name: "",
      relationship: "",
      phone: "",
      email: "",
      address: ""
    },
    serviceInfo: {
      serviceType: "",
      status: "Pending",
      location: "",
      specialInstructions: ""
    }
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  const handleInputChange = (section: "personalInfo" | "nextOfKin" | "serviceInfo", field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };
  return <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              New Deceased Record
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <XIcon size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <UserIcon size={20} className="text-gray-500" />
                <h3 className="text-lg font-medium text-gray-900">
                  Personal Information
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.personalInfo.firstName} onChange={e => handleInputChange("personalInfo", "firstName", e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.personalInfo.lastName} onChange={e => handleInputChange("personalInfo", "lastName", e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Age
                  </label>
                  <input type="number" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.personalInfo.age} onChange={e => handleInputChange("personalInfo", "age", e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <select required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.personalInfo.gender} onChange={e => handleInputChange("personalInfo", "gender", e.target.value)}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date of Death
                  </label>
                  <input type="date" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.personalInfo.dateOfDeath} onChange={e => handleInputChange("personalInfo", "dateOfDeath", e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Time of Death
                  </label>
                  <input type="time" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.personalInfo.timeOfDeath} onChange={e => handleInputChange("personalInfo", "timeOfDeath", e.target.value)} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Cause of Death
                  </label>
                  <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.personalInfo.causeOfDeath} onChange={e => handleInputChange("personalInfo", "causeOfDeath", e.target.value)} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Place of Death
                  </label>
                  <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.personalInfo.placeOfDeath} onChange={e => handleInputChange("personalInfo", "placeOfDeath", e.target.value)} />
                </div>
              </div>
            </div>
            {/* Next of Kin Information */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <UsersIcon size={20} className="text-gray-500" />
                <h3 className="text-lg font-medium text-gray-900">
                  Next of Kin Information
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.nextOfKin.name} onChange={e => handleInputChange("nextOfKin", "name", e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Relationship
                  </label>
                  <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.nextOfKin.relationship} onChange={e => handleInputChange("nextOfKin", "relationship", e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input type="tel" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.nextOfKin.phone} onChange={e => handleInputChange("nextOfKin", "phone", e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input type="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.nextOfKin.email} onChange={e => handleInputChange("nextOfKin", "email", e.target.value)} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <textarea required rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.nextOfKin.address} onChange={e => handleInputChange("nextOfKin", "address", e.target.value)} />
                </div>
              </div>
            </div>
            {/* Service Information */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <HeartPulseIcon size={20} className="text-gray-500" />
                <h3 className="text-lg font-medium text-gray-900">
                  Service Information
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Service Type
                  </label>
                  <select required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.serviceInfo.serviceType} onChange={e => handleInputChange("serviceInfo", "serviceType", e.target.value)}>
                    <option value="">Select Service Type</option>
                    <option value="Full Service">Full Service</option>
                    <option value="Memorial Service">Memorial Service</option>
                    <option value="Direct Cremation">Direct Cremation</option>
                    <option value="Direct Burial">Direct Burial</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.serviceInfo.location} onChange={e => handleInputChange("serviceInfo", "location", e.target.value)} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Special Instructions
                  </label>
                  <textarea rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.serviceInfo.specialInstructions} onChange={e => handleInputChange("serviceInfo", "specialInstructions", e.target.value)} />
                </div>
              </div>
            </div>
            {/* Form Actions */}
            <div className="flex justify-end space-x-4">
              <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Create Record
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>;
};
export default NewDeceasedRecordForm;
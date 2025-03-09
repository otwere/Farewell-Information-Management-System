import React, { useState } from "react";
import { XIcon, UserIcon, PhoneIcon, MapPinIcon } from "lucide-react";
interface NewFamilyContactFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}
const NewFamilyContactForm: React.FC<NewFamilyContactFormProps> = ({
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    basicInfo: {
      firstName: "",
      lastName: "",
      relationship: "",
      primaryContact: true
    },
    contactInfo: {
      phone: "",
      altPhone: "",
      email: "",
      address: "",
      preferredContact: "phone"
    },
    deceased: {
      name: "",
      relationship: "",
      dateOfDeath: ""
    },
    preferences: {
      language: "English",
      contactTime: "anytime",
      specialInstructions: ""
    }
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  const handleInputChange = (section: string, field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };
  return <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 w-full max-w-4xl">
        <div className="relative bg-white rounded-lg shadow-xl">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800">
              Add Family Contact
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <XIcon size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Basic Information */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <UserIcon size={20} className="text-gray-500" />
                <h3 className="text-lg font-medium text-gray-900">
                  Basic Information
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.basicInfo.firstName} onChange={e => handleInputChange("basicInfo", "firstName", e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.basicInfo.lastName} onChange={e => handleInputChange("basicInfo", "lastName", e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Relationship to Deceased
                  </label>
                  <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.basicInfo.relationship} onChange={e => handleInputChange("basicInfo", "relationship", e.target.value)} />
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" checked={formData.basicInfo.primaryContact} onChange={e => handleInputChange("basicInfo", "primaryContact", e.target.checked)} className="rounded text-blue-600" />
                  <label className="text-sm font-medium text-gray-700">
                    Primary Contact
                  </label>
                </div>
              </div>
            </div>
            {/* Contact Information */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <PhoneIcon size={20} className="text-gray-500" />
                <h3 className="text-lg font-medium text-gray-900">
                  Contact Information
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input type="tel" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.contactInfo.phone} onChange={e => handleInputChange("contactInfo", "phone", e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Alternative Phone
                  </label>
                  <input type="tel" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.contactInfo.altPhone} onChange={e => handleInputChange("contactInfo", "altPhone", e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input type="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.contactInfo.email} onChange={e => handleInputChange("contactInfo", "email", e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Preferred Contact Method
                  </label>
                  <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.contactInfo.preferredContact} onChange={e => handleInputChange("contactInfo", "preferredContact", e.target.value)}>
                    <option value="phone">Phone</option>
                    <option value="email">Email</option>
                    <option value="text">Text Message</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <textarea rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.contactInfo.address} onChange={e => handleInputChange("contactInfo", "address", e.target.value)} />
                </div>
              </div>
            </div>
            {/* Deceased Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                Deceased Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Deceased's Name
                  </label>
                  <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.deceased.name} onChange={e => handleInputChange("deceased", "name", e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date of Death
                  </label>
                  <input type="date" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.deceased.dateOfDeath} onChange={e => handleInputChange("deceased", "dateOfDeath", e.target.value)} />
                </div>
              </div>
            </div>
            {/* Preferences */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Preferences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Preferred Language
                  </label>
                  <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.preferences.language} onChange={e => handleInputChange("preferences", "language", e.target.value)}>
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Preferred Contact Time
                  </label>
                  <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.preferences.contactTime} onChange={e => handleInputChange("preferences", "contactTime", e.target.value)}>
                    <option value="anytime">Anytime</option>
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                    <option value="evening">Evening</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Special Instructions
                  </label>
                  <textarea rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.preferences.specialInstructions} onChange={e => handleInputChange("preferences", "specialInstructions", e.target.value)} />
                </div>
              </div>
            </div>
            {/* Form Actions */}
            <div className="flex justify-end space-x-4">
              <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Add Contact
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>;
};
export default NewFamilyContactForm;
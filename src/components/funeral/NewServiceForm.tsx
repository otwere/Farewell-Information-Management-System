import React, { useState, memo } from "react";
import { XIcon, CalendarIcon, ClockIcon, MapPinIcon, UsersIcon, FileTextIcon, PackageIcon, DollarSignIcon, AlertCircleIcon } from "lucide-react";
interface NewServiceFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
  availableStaff: Array<{
    id: string;
    name: string;
    role: string;
    available: boolean;
  }>;
  availableResources: Array<{
    id: string;
    name: string;
    type: string;
    available: boolean;
  }>;
}
const NewServiceForm: React.FC<NewServiceFormProps> = ({
  onClose,
  onSubmit,
  availableStaff,
  availableResources
}) => {
  const [formData, setFormData] = useState({
    serviceDetails: {
      type: "",
      date: "",
      startTime: "",
      endTime: "",
      location: "",
      expectedAttendees: ""
    },
    deceased: {
      name: "",
      dateOfDeath: "",
      religion: "",
      specialRequirements: ""
    },
    familyContact: {
      name: "",
      relationship: "",
      phone: "",
      email: ""
    },
    resources: {
      chapel: false,
      hearse: false,
      flowers: false,
      music: false,
      catering: false
    },
    assignedStaff: [] as string[],
    documents: [] as File[],
    notes: ""
  });
  const [selectedPackage, setSelectedPackage] = useState("");
  const [timeConflict, setTimeConflict] = useState(false);
  const servicePackages = [{
    id: "basic",
    name: "Basic Service",
    price: 2500,
    includes: ["Chapel service", "Basic casket", "Transportation"]
  }, {
    id: "standard",
    name: "Standard Service",
    price: 4500,
    includes: ["Chapel service", "Standard casket", "Transportation", "Flowers", "Basic catering"]
  }, {
    id: "premium",
    name: "Premium Service",
    price: 7500,
    includes: ["Chapel service", "Premium casket", "Transportation", "Luxury flowers", "Full catering", "Music service", "Photography"]
  }];
  const handleInputChange = (section: string, field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };
  const handleStaffToggle = (staffId: string) => {
    setFormData(prev => ({
      ...prev,
      assignedStaff: prev.assignedStaff.includes(staffId) ? prev.assignedStaff.filter(id => id !== staffId) : [...prev.assignedStaff, staffId]
    }));
  };
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setFormData(prev => ({
        ...prev,
        documents: [...prev.documents, ...Array.from(files)]
      }));
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add validation here
    onSubmit({
      ...formData,
      package: selectedPackage
    });
  };
  return <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 w-full max-w-4xl">
        <div className="relative bg-white rounded-lg shadow-xl">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800">
              Schedule New Service
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <XIcon size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Service Package Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center">
                <PackageIcon className="mr-2" size={20} />
                Select Service Package
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {servicePackages.map(pkg => <div key={pkg.id} className={`border rounded-lg p-4 cursor-pointer transition-colors ${selectedPackage === pkg.id ? "border-blue-500 bg-blue-50" : "hover:border-blue-300"}`} onClick={() => setSelectedPackage(pkg.id)}>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">{pkg.name}</h4>
                      <span className="text-blue-600 font-medium">
                        ${pkg.price}
                      </span>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {pkg.includes.map((item, index) => <li key={index} className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                          {item}
                        </li>)}
                    </ul>
                  </div>)}
              </div>
            </div>
            {/* Service Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center">
                <CalendarIcon className="mr-2" size={20} />
                Service Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Service Type
                  </label>
                  <select required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.serviceDetails.type} onChange={e => handleInputChange("serviceDetails", "type", e.target.value)}>
                    <option value="">Select Type</option>
                    <option value="funeral">Funeral Service</option>
                    <option value="memorial">Memorial Service</option>
                    <option value="graveside">Graveside Service</option>
                    <option value="viewing">Viewing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <input type="date" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.serviceDetails.date} onChange={e => handleInputChange("serviceDetails", "date", e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Start Time
                  </label>
                  <input type="time" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.serviceDetails.startTime} onChange={e => handleInputChange("serviceDetails", "startTime", e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    End Time
                  </label>
                  <input type="time" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.serviceDetails.endTime} onChange={e => handleInputChange("serviceDetails", "endTime", e.target.value)} />
                </div>
                {timeConflict && <div className="col-span-2">
                    <p className="text-red-500 text-sm flex items-center">
                      <AlertCircleIcon size={16} className="mr-1" />
                      This time slot conflicts with another service
                    </p>
                  </div>}
              </div>
            </div>
            {/* Deceased Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center">
                <FileTextIcon className="mr-2" size={20} />
                Deceased Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.deceased.name} onChange={e => handleInputChange("deceased", "name", e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date of Death
                  </label>
                  <input type="date" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.deceased.dateOfDeath} onChange={e => handleInputChange("deceased", "dateOfDeath", e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Religion
                  </label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.deceased.religion} onChange={e => handleInputChange("deceased", "religion", e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Special Requirements
                  </label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.deceased.specialRequirements} onChange={e => handleInputChange("deceased", "specialRequirements", e.target.value)} />
                </div>
              </div>
            </div>
            {/* Staff Assignment */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center">
                <UsersIcon className="mr-2" size={20} />
                Staff Assignment
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {availableStaff.map(staff => <div key={staff.id} className={`border rounded-lg p-4 cursor-pointer ${formData.assignedStaff.includes(staff.id) ? "border-blue-500 bg-blue-50" : staff.available ? "hover:border-blue-300" : "opacity-50 cursor-not-allowed"}`} onClick={() => {
                if (staff.available) {
                  handleStaffToggle(staff.id);
                }
              }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">
                          {staff.name}
                        </p>
                        <p className="text-sm text-gray-500">{staff.role}</p>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${staff.available ? "bg-green-500" : "bg-red-500"}`} />
                    </div>
                  </div>)}
              </div>
            </div>
            {/* Resource Allocation */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center">
                <PackageIcon className="mr-2" size={20} />
                Resources
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(formData.resources).map(([key, value]) => <label key={key} className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="checkbox" checked={value} onChange={e => handleInputChange("resources", key, e.target.checked)} className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4" />
                    <span className="text-gray-700 capitalize">
                      {key.replace("_", " ")}
                    </span>
                  </label>)}
              </div>
            </div>
            {/* Additional Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Additional Notes
              </label>
              <textarea rows={4} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.notes} onChange={e => setFormData(prev => ({
              ...prev,
              notes: e.target.value
            }))} />
            </div>
            {/* Form Actions */}
            <div className="flex justify-end space-x-4">
              <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Schedule Service
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>;
};
export default NewServiceForm;
import React, { useState } from "react";
import { XIcon, ChevronRightIcon, ChevronLeftIcon, CheckCircleIcon, AlertCircleIcon } from "lucide-react";
interface FormStep {
  title: string;
  description: string;
}
interface FormData {
  deceased: {
    name: string;
    age: string;
    timeOfDeath: string;
    causeOfDeath: string;
    specialInstructions: string;
    medicalHistory: string;
    weight: string;
    height: string;
  };
  assignedTo: string;
  priority: "normal" | "urgent" | "priority";
  estimatedDuration: string;
  refrigerationUnit: string;
  chemicalPreferences: string;
  specialRequirements: string;
  notes: string;
  contactPerson: {
    name: string;
    relationship: string;
    phone: string;
  };
}
interface NewEmbalmentCaseFormProps {
  onClose: () => void;
  onSubmit: (data: FormData) => void;
}
const formSteps: FormStep[] = [{
  title: "Deceased Information",
  description: "Enter the deceased's personal and medical information"
}, {
  title: "Process Details",
  description: "Specify embalming process requirements and assignments"
}, {
  title: "Contact Information",
  description: "Add emergency contact and additional notes"
}, {
  title: "Review & Confirm",
  description: "Review all information before submission"
}];
const NewEmbalmentCaseForm: React.FC<NewEmbalmentCaseFormProps> = ({
  onClose,
  onSubmit
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    deceased: {
      name: "",
      age: "",
      timeOfDeath: "",
      causeOfDeath: "",
      specialInstructions: "",
      medicalHistory: "",
      weight: "",
      height: ""
    },
    assignedTo: "",
    priority: "normal",
    estimatedDuration: "",
    refrigerationUnit: "",
    chemicalPreferences: "",
    specialRequirements: "",
    notes: "",
    contactPerson: {
      name: "",
      relationship: "",
      phone: ""
    }
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    switch (step) {
      case 0:
        if (!formData.deceased.name) newErrors.deceasedName = "Name is required";
        if (!formData.deceased.age) newErrors.deceasedAge = "Age is required";
        if (!formData.deceased.timeOfDeath) newErrors.timeOfDeath = "Time of death is required";
        break;
      case 1:
        if (!formData.assignedTo) newErrors.assignedTo = "Staff assignment is required";
        if (!formData.priority) newErrors.priority = "Priority level is required";
        break;
      case 2:
        if (!formData.contactPerson.name) newErrors.contactName = "Contact name is required";
        if (!formData.contactPerson.phone) newErrors.contactPhone = "Contact phone is required";
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, formSteps.length - 1));
    }
  };
  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      onSubmit(formData);
    }
  };
  const updateFormData = (path: string, value: string) => {
    setFormData(prev => {
      const newData = {
        ...prev
      };
      const keys = path.split(".");
      let current: any = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newData;
    });
    setTouched(prev => ({
      ...prev,
      [path]: true
    }));
  };
  const renderFormStep = () => {
    switch (currentStep) {
      case 0:
        return <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name*
                </label>
                <input type="text" className={`mt-1 block w-full rounded-md border ${errors.deceasedName && touched["deceased.name"] ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"} shadow-sm p-2`} value={formData.deceased.name} onChange={e => updateFormData("deceased.name", e.target.value)} />
                {errors.deceasedName && touched["deceased.name"] && <p className="mt-1 text-sm text-red-600">
                    {errors.deceasedName}
                  </p>}
              </div>
              {/* ... other deceased information fields ... */}
            </div>
          </div>;
      // ... cases for other steps ...
    }
  };
  return <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 w-full max-w-4xl">
        <div className="relative bg-white rounded-lg shadow-xl">
          <div className="flex justify-between items-center p-6 border-b">
            <h3 className="text-xl font-semibold text-gray-900">
              New Embalming Case
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <XIcon size={24} />
            </button>
          </div>
          <div className="px-6 pt-4">
            <div className="flex justify-between items-center mb-8">
              {formSteps.map((step, index) => <div key={index} className={`flex-1 relative ${index !== formSteps.length - 1 ? "after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-gray-200 after:top-1/2 after:transform after:-translate-y-1/2 after:left-1/2" : ""}`}>
                  <div className="flex flex-col items-center relative z-10">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${index < currentStep ? "bg-green-500 text-white" : index === currentStep ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-500"}`}>
                      {index < currentStep ? <CheckCircleIcon size={16} /> : index + 1}
                    </div>
                    <div className="text-xs mt-2 text-gray-500">
                      {step.title}
                    </div>
                  </div>
                </div>)}
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6">
              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-900">
                  {formSteps[currentStep].title}
                </h4>
                <p className="text-sm text-gray-500">
                  {formSteps[currentStep].description}
                </p>
              </div>
              {renderFormStep()}
            </div>
            <div className="flex justify-between px-6 py-4 border-t bg-gray-50">
              <button type="button" onClick={handlePrevious} className={`px-4 py-2 flex items-center text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 ${currentStep === 0 ? "invisible" : ""}`}>
                <ChevronLeftIcon size={16} className="mr-1" />
                Previous
              </button>
              {currentStep === formSteps.length - 1 ? <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
                  <CheckCircleIcon size={16} className="mr-1" />
                  Create Case
                </button> : <button type="button" onClick={handleNext} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
                  Next
                  <ChevronRightIcon size={16} className="ml-1" />
                </button>}
            </div>
          </form>
        </div>
      </div>
    </div>;
};
export default NewEmbalmentCaseForm;
import React, { useEffect, useState } from "react";
import { XIcon, PlusIcon, TrashIcon, CalendarIcon, InfoIcon, DollarSignIcon, UserIcon, FileTextIcon, ClockIcon, AlertCircleIcon } from "lucide-react";
interface Service {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  dailyRate?: number;
  type: "one_time" | "daily";
}
const predefinedServices: Service[] = [{
  id: "srv1",
  name: "Basic Funeral Service",
  description: "Standard funeral service package",
  basePrice: 2500,
  type: "one_time"
}, {
  id: "srv2",
  name: "Embalming",
  description: "Professional embalming service",
  basePrice: 800,
  type: "one_time"
}, {
  id: "srv3",
  name: "Chapel Service",
  description: "Use of chapel facilities",
  basePrice: 600,
  type: "one_time"
}, {
  id: "srv4",
  name: "Transportation",
  description: "Hearse and vehicle services",
  basePrice: 400,
  type: "one_time"
}, {
  id: "srv5",
  name: "Casket - Standard",
  description: "Standard casket option",
  basePrice: 1200,
  type: "one_time"
}, {
  id: "srv6",
  name: "Casket - Premium",
  description: "Premium casket option",
  basePrice: 2500,
  type: "one_time"
}, {
  id: "srv7",
  name: "Refrigeration Storage",
  description: "Cold storage facility usage",
  basePrice: 100,
  dailyRate: 50,
  type: "daily"
}, {
  id: "srv8",
  name: "Viewing Room",
  description: "Private viewing room usage",
  basePrice: 200,
  dailyRate: 100,
  type: "daily"
}];
interface NewInvoiceFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}
const NewInvoiceForm: React.FC<NewInvoiceFormProps> = ({
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    client: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: ""
    },
    deceased: {
      name: "",
      dateOfDeath: "",
      dateReceived: "",
      dateReleased: ""
    },
    items: [{
      serviceId: "",
      description: "",
      quantity: 1,
      rate: 0,
      amount: 0,
      daysCharged: 0
    }],
    subtotal: 0,
    taxRate: 0.1,
    taxAmount: 0,
    discount: 0,
    total: 0,
    notes: "",
    dueDate: "",
    terms: "Net 30",
    paymentMethod: "bank_transfer",
    storageDays: 0,
    storageCharges: 0
  });
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});
  const calculateDuration = (startDate: string, endDate: string) => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  const calculateServiceAmount = (service: Service, quantity: number, days: number) => {
    if (service.type === "daily") {
      return (service.basePrice + (service.dailyRate || 0) * Math.max(0, days - 1)) * quantity;
    }
    return service.basePrice * quantity;
  };
  const updateItem = (index: number, field: "serviceId" | "quantity" | "rate" | "description", value: string | number) => {
    const newItems = [...formData.items];
    if (field === "serviceId") {
      const service = predefinedServices.find(s => s.id === value);
      if (service) {
        const days = calculateDuration(formData.deceased.dateReceived, formData.deceased.dateReleased);
        const amount = calculateServiceAmount(service, newItems[index].quantity, days);
        newItems[index] = {
          ...newItems[index],
          serviceId: value,
          description: service.description,
          rate: service.basePrice,
          amount: amount,
          daysCharged: service.type === "daily" ? days : 0
        };
      }
    } else {
      const service = predefinedServices.find(s => s.id === newItems[index].serviceId);
      if (service) {
        const days = calculateDuration(formData.deceased.dateReceived, formData.deceased.dateReleased);
        const amount = field === "quantity" ? calculateServiceAmount(service, Number(value), days) : calculateServiceAmount(service, newItems[index].quantity, days);
        newItems[index] = {
          ...newItems[index],
          [field]: value,
          amount: amount
        };
      }
    }
    setFormData({
      ...formData,
      items: newItems
    });
    calculateTotals();
  };
  useEffect(() => {
    const days = calculateDuration(formData.deceased.dateReceived, formData.deceased.dateReleased);
    const updatedItems = formData.items.map(item => {
      const service = predefinedServices.find(s => s.id === item.serviceId);
      if (service) {
        return {
          ...item,
          amount: calculateServiceAmount(service, item.quantity, days),
          daysCharged: service.type === "daily" ? days : 0
        };
      }
      return item;
    });
    setFormData(prev => ({
      ...prev,
      items: updatedItems,
      storageDays: days
    }));
  }, [formData.deceased.dateReceived, formData.deceased.dateReleased]);
  const calculateTotals = () => {
    const subtotal = formData.items.reduce((sum, item) => sum + item.amount, 0);
    const taxAmount = subtotal * formData.taxRate;
    const total = subtotal + taxAmount - formData.discount;
    setFormData(prev => ({
      ...prev,
      subtotal,
      taxAmount,
      total
    }));
  };
  const validateForm = () => {
    const newErrors: {
      [key: string]: string;
    } = {};
    // Client validation
    if (!formData.client.name) newErrors.clientName = "Client name is required";
    if (!formData.client.email) newErrors.clientEmail = "Email is required";
    if (!formData.client.phone) newErrors.clientPhone = "Phone is required";
    // Deceased validation
    if (!formData.deceased.name) newErrors.deceasedName = "Name is required";
    if (!formData.deceased.dateOfDeath) newErrors.dateOfDeath = "Date is required";
    if (!formData.deceased.dateReceived) newErrors.dateReceived = "Date Received is required";
    if (!formData.deceased.dateReleased) newErrors.dateReleased = "Date Released is required";
    // Items validation
    if (formData.items.length === 0) newErrors.items = "Add at least one item";
    formData.items.forEach((item, index) => {
      if (!item.serviceId) newErrors[`item${index}`] = "Select a service";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };
  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, {
        serviceId: "",
        description: "",
        quantity: 1,
        rate: 0,
        amount: 0,
        daysCharged: 0
      }]
    });
  };
  const removeItem = (index: number) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      items: newItems
    });
    calculateTotals();
  };
  const formatDate = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split("T")[0];
  };
  const handleTermsChange = (term: string) => {
    const dueDate = term === "due_on_receipt" ? formatDate(0) : term === "net_15" ? formatDate(15) : formatDate(30);
    setFormData({
      ...formData,
      terms: term,
      dueDate
    });
  };
  return <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Create Invoice</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <XIcon size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <UserIcon size={20} className="mr-2" />
                Client Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Client Name*
                  </label>
                  <input type="text" required className={`mt-1 block w-full border ${errors.clientName ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm p-2`} value={formData.client.name} onChange={e => setFormData({
                  ...formData,
                  client: {
                    ...formData.client,
                    name: e.target.value
                  }
                })} />
                  {errors.clientName && <p className="text-red-500 text-xs mt-1">
                      {errors.clientName}
                    </p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email*
                  </label>
                  <input type="email" required className={`mt-1 block w-full border ${errors.clientEmail ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm p-2`} value={formData.client.email} onChange={e => setFormData({
                  ...formData,
                  client: {
                    ...formData.client,
                    email: e.target.value
                  }
                })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone*
                  </label>
                  <input type="tel" required className={`mt-1 block w-full border ${errors.clientPhone ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm p-2`} value={formData.client.phone} onChange={e => setFormData({
                  ...formData,
                  client: {
                    ...formData.client,
                    phone: e.target.value
                  }
                })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.client.address} onChange={e => setFormData({
                  ...formData,
                  client: {
                    ...formData.client,
                    address: e.target.value
                  }
                })} />
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <FileTextIcon size={20} className="mr-2" />
                Deceased Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Deceased*
                  </label>
                  <select required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.deceased.name} onChange={e => {
                  const selected = deceasedRecords.find(record => record.name === e.target.value);
                  setFormData({
                    ...formData,
                    deceased: {
                      ...formData.deceased,
                      name: e.target.value,
                      dateOfDeath: selected?.dateOfDeath || ""
                    }
                  });
                }}>
                    <option value="">Select deceased</option>
                    {deceasedRecords.map(record => <option key={record.id} value={record.name}>
                        {record.name} -{" "}
                        {new Date(record.dateOfDeath).toLocaleDateString()}
                      </option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date Received*
                  </label>
                  <input type="date" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.deceased.dateReceived} onChange={e => setFormData({
                  ...formData,
                  deceased: {
                    ...formData.deceased,
                    dateReceived: e.target.value
                  }
                })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date Released*
                  </label>
                  <input type="date" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.deceased.dateReleased} onChange={e => setFormData({
                  ...formData,
                  deceased: {
                    ...formData.deceased,
                    dateReleased: e.target.value
                  }
                })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Storage Duration
                  </label>
                  <div className="mt-1 flex items-center text-sm text-gray-600">
                    <ClockIcon size={16} className="mr-1" />
                    {formData.storageDays} days
                    {formData.storageDays > 0 && <div className="ml-2 flex items-center text-yellow-600">
                        <AlertCircleIcon size={16} className="mr-1" />
                        Storage fees apply
                      </div>}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <DollarSignIcon size={20} className="mr-2" />
                  Services
                </h3>
                <button type="button" onClick={addItem} className="text-blue-600 hover:text-blue-800 flex items-center">
                  <PlusIcon size={18} className="mr-1" />
                  Add Service
                </button>
              </div>
              <div className="space-y-4">
                {formData.items.map((item, index) => <div key={index} className="flex space-x-4">
                    <div className="flex-grow">
                      <select className="w-full border border-gray-300 rounded-md shadow-sm p-2" value={item.serviceId} onChange={e => updateItem(index, "serviceId", e.target.value)}>
                        <option value="">Select a service</option>
                        {predefinedServices.map(service => <option key={service.id} value={service.id}>
                            {service.name} - ${service.basePrice}
                            {service.type === "daily" ? " + daily rate" : ""}
                          </option>)}
                      </select>
                      {item.daysCharged > 0 && <div className="mt-1 text-sm text-gray-500">
                          {item.daysCharged} days charged
                        </div>}
                    </div>
                    <div className="w-24">
                      <input type="number" min="1" placeholder="Qty" className="w-full border border-gray-300 rounded-md shadow-sm p-2" value={item.quantity} onChange={e => updateItem(index, "quantity", parseInt(e.target.value))} />
                    </div>
                    <div className="w-32">
                      <input type="text" readOnly className="w-full bg-gray-50 border border-gray-300 rounded-md shadow-sm p-2" value={`$${item.amount.toFixed(2)}`} />
                    </div>
                    <button type="button" onClick={() => removeItem(index)} className="p-2 text-red-600 hover:text-red-800">
                      <TrashIcon size={20} />
                    </button>
                  </div>)}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-end space-y-2">
                <div className="w-64 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">
                      ${formData.subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (10%):</span>
                    <span className="font-medium">
                      ${formData.taxAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discount:</span>
                    <input type="number" min="0" className="w-24 border border-gray-300 rounded-md shadow-sm p-1 text-right" value={formData.discount} onChange={e => setFormData({
                    ...formData,
                    discount: Number(e.target.value)
                  })} />
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total:</span>
                    <span>${formData.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Payment Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Payment Terms
                  </label>
                  <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.terms} onChange={e => handleTermsChange(e.target.value)}>
                    <option value="net_30">Net 30</option>
                    <option value="net_15">Net 15</option>
                    <option value="due_on_receipt">Due on Receipt</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Payment Method
                  </label>
                  <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.paymentMethod} onChange={e => setFormData({
                  ...formData,
                  paymentMethod: e.target.value
                })}>
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="credit_card">Credit Card</option>
                    <option value="cash">Cash</option>
                    <option value="check">Check</option>
                  </select>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Notes
              </label>
              <textarea rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Add any additional notes..." value={formData.notes} onChange={e => setFormData({
              ...formData,
              notes: e.target.value
            })} />
            </div>
            <div className="flex justify-end space-x-4">
              <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Create Invoice
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>;
};
export default NewInvoiceForm;
interface DeceasedRecord {
  id: string;
  name: string;
  dateOfDeath: string;
}
const deceasedRecords: DeceasedRecord[] = [{
  id: "D001",
  name: "John Smith",
  dateOfDeath: "2023-12-10"
}, {
  id: "D002",
  name: "Sarah Johnson",
  dateOfDeath: "2023-12-12"
}, {
  id: "D003",
  name: "Michael Brown",
  dateOfDeath: "2023-12-14"
}];
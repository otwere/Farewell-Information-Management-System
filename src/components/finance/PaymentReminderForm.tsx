import React, { useState } from "react";
import { XIcon, CheckIcon } from "lucide-react";
interface PaymentReminderFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}
const PaymentReminderForm: React.FC<PaymentReminderFormProps> = ({
  onClose,
  onSubmit
}) => {
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      selectedInvoices
    });
  };
  const overdueInvoices = [{
    id: "INV-001",
    client: "John Smith",
    amount: 4500,
    daysOverdue: 5
  }, {
    id: "INV-002",
    client: "Sarah Johnson",
    amount: 3200,
    daysOverdue: 3
  }, {
    id: "INV-003",
    client: "Michael Brown",
    amount: 2800,
    daysOverdue: 7
  }];
  const toggleInvoice = (id: string) => {
    if (selectedInvoices.includes(id)) {
      setSelectedInvoices(selectedInvoices.filter(invId => invId !== id));
    } else {
      setSelectedInvoices([...selectedInvoices, id]);
    }
  };
  return <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Send Payment Reminders
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <XIcon size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Overdue Invoices */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Select Invoices
              </h3>
              <div className="border rounded-md divide-y">
                {overdueInvoices.map(invoice => <div key={invoice.id} className="p-4 flex items-center space-x-4 hover:bg-gray-50">
                    <input type="checkbox" checked={selectedInvoices.includes(invoice.id)} onChange={() => toggleInvoice(invoice.id)} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                    <div className="flex-grow">
                      <p className="text-sm font-medium text-gray-900">
                        {invoice.client}
                      </p>
                      <p className="text-sm text-gray-500">{invoice.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        ${invoice.amount}
                      </p>
                      <p className="text-sm text-red-600">
                        {invoice.daysOverdue} days overdue
                      </p>
                    </div>
                  </div>)}
              </div>
            </div>
            {/* Reminder Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                Reminder Settings
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Reminder Method
                </label>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                    <label className="ml-2 text-sm text-gray-700">
                      Send Email
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                    <label className="ml-2 text-sm text-gray-700">
                      Send SMS
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Message Template
                </label>
                <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                  <option>Friendly Reminder</option>
                  <option>First Notice</option>
                  <option>Final Notice</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Additional Note
                </label>
                <textarea rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Add any additional message..." />
              </div>
            </div>
            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
                <CheckIcon size={18} className="mr-1" />
                Send Reminders
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>;
};
export default PaymentReminderForm;
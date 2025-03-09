import React, { useState } from "react";
import { XIcon, SearchIcon, CreditCardIcon, FileTextIcon, DollarSignIcon } from "lucide-react";
interface RecordPaymentFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}
const RecordPaymentForm: React.FC<RecordPaymentFormProps> = ({
  onClose,
  onSubmit
}) => {
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic here
    onSubmit({
      paymentMethod
    });
  };
  return <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Record Payment</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <XIcon size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Invoice Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Invoice
              </label>
              <div className="relative">
                <input type="text" className="block w-full border border-gray-300 rounded-md shadow-sm p-2 pl-10" placeholder="Search invoice number or client name..." />
                <SearchIcon size={20} className="absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>
            {/* Payment Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input type="number" className="block w-full border border-gray-300 rounded-md shadow-sm p-2 pl-8" placeholder="0.00" />
              </div>
            </div>
            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <div className="grid grid-cols-3 gap-4">
                <button type="button" onClick={() => setPaymentMethod("credit_card")} className={`p-4 border rounded-md flex flex-col items-center space-y-2 ${paymentMethod === "credit_card" ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}>
                  <CreditCardIcon size={24} className={paymentMethod === "credit_card" ? "text-blue-500" : "text-gray-400"} />
                  <span className="text-sm">Credit Card</span>
                </button>
                <button type="button" onClick={() => setPaymentMethod("bank_transfer")} className={`p-4 border rounded-md flex flex-col items-center space-y-2 ${paymentMethod === "bank_transfer" ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}>
                  <FileTextIcon size={24} className={paymentMethod === "bank_transfer" ? "text-blue-500" : "text-gray-400"} />
                  <span className="text-sm">Bank Transfer</span>
                </button>
                <button type="button" onClick={() => setPaymentMethod("cash")} className={`p-4 border rounded-md flex flex-col items-center space-y-2 ${paymentMethod === "cash" ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}>
                  <DollarSignIcon size={24} className={paymentMethod === "cash" ? "text-blue-500" : "text-gray-400"} />
                  <span className="text-sm">Cash</span>
                </button>
              </div>
            </div>
            {/* Payment Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Date
              </label>
              <input type="date" className="block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea rows={3} className="block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Add any additional notes..." />
            </div>
            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Record Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>;
};
export default RecordPaymentForm;
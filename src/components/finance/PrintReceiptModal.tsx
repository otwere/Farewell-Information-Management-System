import React from "react";
import { XIcon, PrinterIcon } from "lucide-react";
interface Service {
  name: string;
  amount: number;
}
interface PrintReceiptModalProps {
  onClose: () => void;
  payment: {
    id: string;
    date: string;
    amount: number;
    method: string;
    invoice: {
      id: string;
      client: string;
      deceased: string;
      services?: Service[];
    };
  };
}
const PrintReceiptModal: React.FC<PrintReceiptModalProps> = ({
  onClose,
  payment
}) => {
  const handlePrint = () => {
    window.print();
  };
  const services = payment.invoice.services || [];
  return <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Payment Receipt
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <XIcon size={24} />
            </button>
          </div>
          {/* Receipt Content - This will be printed */}
          <div className="print-content space-y-6 p-8 border rounded-lg">
            {/* Header */}
            <div className="text-center border-b pb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Mortuary Management System
              </h1>
              <p className="text-gray-600">Official Payment Receipt</p>
            </div>
            {/* Receipt Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Receipt No:</p>
                <p className="font-medium">{payment.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Date:</p>
                <p className="font-medium">{payment.date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Invoice No:</p>
                <p className="font-medium">{payment.invoice.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Payment Method:</p>
                <p className="font-medium">{payment.method}</p>
              </div>
            </div>
            {/* Client Details */}
            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">Client Information</h3>
              <p className="text-gray-600">{payment.invoice.client}</p>
              <p className="text-gray-600">For: {payment.invoice.deceased}</p>
            </div>
            {/* Services */}
            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">Services</h3>
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-600">
                    <th className="py-2">Description</th>
                    <th className="py-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {services.length > 0 ? services.map((service, index) => <tr key={index}>
                        <td className="py-2">{service.name}</td>
                        <td className="py-2 text-right">
                          ${service.amount.toFixed(2)}
                        </td>
                      </tr>) : <tr>
                      <td colSpan={2} className="py-2 text-center text-gray-500">
                        No itemized services
                      </td>
                    </tr>}
                </tbody>
                <tfoot className="border-t">
                  <tr>
                    <td className="py-2 font-medium">Total</td>
                    <td className="py-2 text-right font-medium">
                      ${payment.amount.toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            {/* Footer */}
            <div className="border-t pt-4 text-center text-sm text-gray-600">
              <p>Thank you for your payment</p>
              <p>This is a computer generated receipt</p>
            </div>
          </div>
          {/* Print Button */}
          <div className="mt-6 flex justify-end">
            <button onClick={handlePrint} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center">
              <PrinterIcon size={18} className="mr-2" />
              Print Receipt
            </button>
          </div>
        </div>
      </div>
    </div>;
};
export default PrintReceiptModal;
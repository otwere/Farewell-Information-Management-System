import React from "react";
import { XIcon, PrinterIcon, DownloadIcon } from "lucide-react";
interface PayslipModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: {
    id: string;
    name: string;
    position: string;
    department: string;
  };
  payrollData: {
    month: string;
    basicSalary: number;
    allowances: {
      name: string;
      amount: number;
    }[];
    deductions: {
      name: string;
      amount: number;
    }[];
    netPay: number;
  };
}
const PayslipModal: React.FC<PayslipModalProps> = ({
  isOpen,
  onClose,
  employee,
  payrollData
}) => {
  const handlePrint = () => {
    window.print();
  };
  const handleDownloadPDF = () => {
    // Implement PDF download functionality
    console.log("Downloading PDF...");
  };
  return <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 ${isOpen ? "" : "hidden"}`}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Payslip</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <XIcon size={24} />
            </button>
          </div>
          <div className="print-content space-y-6 p-8 border rounded-lg">
            {/* Header */}
            <div className="text-center border-b pb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Mortuary Management System
              </h1>
              <p className="text-gray-600">Payslip for {payrollData.month}</p>
            </div>
            {/* Employee Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Employee Name:</p>
                <p className="font-medium">{employee.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Employee ID:</p>
                <p className="font-medium">{employee.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Position:</p>
                <p className="font-medium">{employee.position}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Department:</p>
                <p className="font-medium">{employee.department}</p>
              </div>
            </div>
            {/* Earnings & Deductions */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="font-medium mb-2 border-b pb-2">Earnings</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Basic Salary</span>
                    <span className="font-medium">
                      ${payrollData.basicSalary.toFixed(2)}
                    </span>
                  </div>
                  {payrollData.allowances.map((allowance, index) => <div key={index} className="flex justify-between">
                      <span className="text-gray-600">{allowance.name}</span>
                      <span className="font-medium">
                        ${allowance.amount.toFixed(2)}
                      </span>
                    </div>)}
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2 border-b pb-2">Deductions</h3>
                <div className="space-y-2">
                  {payrollData.deductions.map((deduction, index) => <div key={index} className="flex justify-between">
                      <span className="text-gray-600">{deduction.name}</span>
                      <span className="font-medium">
                        ${deduction.amount.toFixed(2)}
                      </span>
                    </div>)}
                </div>
              </div>
            </div>
            {/* Total */}
            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Net Pay</span>
                <span>${payrollData.netPay.toFixed(2)}</span>
              </div>
            </div>
            {/* Footer */}
            <div className="border-t pt-4 text-center text-sm text-gray-600">
              <p>This is a computer-generated document</p>
              <p>Generated on: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="mt-6 flex justify-end space-x-4">
            <button onClick={handlePrint} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center">
              <PrinterIcon size={18} className="mr-2" />
              Print
            </button>
            <button onClick={handleDownloadPDF} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
              <DownloadIcon size={18} className="mr-2" />
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>;
};
export default PayslipModal;
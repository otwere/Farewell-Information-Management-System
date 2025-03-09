import React from "react";
import { XIcon, PrinterIcon, DownloadIcon } from "lucide-react";
interface P9FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: {
    id: string;
    name: string;
    pin: string;
    position: string;
  };
  taxYear: string;
  monthlyData: {
    month: string;
    basicSalary: number;
    benefits: number;
    paye: number;
    shif: number;
    nssf: number;
  }[];
}
const P9FormModal: React.FC<P9FormModalProps> = ({
  isOpen,
  onClose,
  employee,
  taxYear,
  monthlyData
}) => {
  const handlePrint = () => {
    window.print();
  };
  const handleDownloadPDF = () => {
    // Implement PDF download functionality
    console.log("Downloading PDF...");
  };
  const calculateTotals = () => {
    return monthlyData.reduce((acc, curr) => ({
      basicSalary: acc.basicSalary + curr.basicSalary,
      benefits: acc.benefits + curr.benefits,
      paye: acc.paye + curr.paye,
      shif: acc.shif + curr.shif,
      nssf: acc.nssf + curr.nssf
    }), {
      basicSalary: 0,
      benefits: 0,
      paye: 0,
      shif: 0,
      nssf: 0
    });
  };
  const totals = calculateTotals();
  return <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 ${isOpen ? "" : "hidden"}`}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              P9 Tax Deduction Card
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <XIcon size={24} />
            </button>
          </div>
          <div className="print-content space-y-6 p-8 border rounded-lg">
            {/* Header */}
            <div className="text-center border-b pb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                P9 Tax Deduction Card
              </h1>
              <p className="text-gray-600">Year: {taxYear}</p>
            </div>
            {/* Employee Details */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-600">Employee Name:</p>
                <p className="font-medium">{employee.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">PIN:</p>
                <p className="font-medium">{employee.pin}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Position:</p>
                <p className="font-medium">{employee.position}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Employee ID:</p>
                <p className="font-medium">{employee.id}</p>
              </div>
            </div>
            {/* Monthly Data Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Month
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Basic Salary
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Benefits
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      PAYE
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      SHIF
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      NSSF
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {monthlyData.map((data, index) => <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {data.month}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${data.basicSalary.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${data.benefits.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${data.paye.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${data.shif.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${data.nssf.toFixed(2)}
                      </td>
                    </tr>)}
                  <tr className="bg-gray-50 font-medium">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Totals
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${totals.basicSalary.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${totals.benefits.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${totals.paye.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${totals.shif.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${totals.nssf.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
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
export default P9FormModal;
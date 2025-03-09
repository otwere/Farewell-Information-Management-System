import React, { useState } from "react";
import { DollarSignIcon, PrinterIcon, DownloadIcon, FilterIcon, CalendarIcon, SearchIcon, ChevronDownIcon } from "lucide-react";
import BulkPayrollProcessModal from "./BulkPayrollProcessModal";
interface PayrollSectionProps {
  onViewPayslip: (employeeId: string, month: string) => void;
  onViewP9Form: (employeeId: string, year: string) => void;
}
const PayrollSection: React.FC<PayrollSectionProps> = ({
  onViewPayslip,
  onViewP9Form
}) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [showBulkProcessModal, setShowBulkProcessModal] = useState(false);
  const payrollData = [{
    id: "EMP001",
    name: "Dr. Sarah Wilson",
    basicSalary: 5000,
    allowances: 800,
    deductions: 650,
    netPay: 5150,
    status: "Processed"
  }, {
    id: "EMP002",
    name: "Michael Brown",
    basicSalary: 4500,
    allowances: 600,
    deductions: 550,
    netPay: 4550,
    status: "Pending"
  }];
  const handleProcessPayroll = async (data: any) => {
    try {
      console.log("Processing payroll:", data);
      toast.success("Payroll processed successfully");
    } catch (error) {
      toast.error("Failed to process payroll");
      console.error("Error processing payroll:", error);
    }
  };
  return <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Month
            </label>
            <input type="month" className="border border-gray-300 rounded-md p-2" value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Year (P9)
            </label>
            <select className="border border-gray-300 rounded-md p-2" value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
              {Array.from({
              length: 5
            }, (_, i) => {
              const year = new Date().getFullYear() - i;
              return <option key={year} value={year}>
                      {year}
                    </option>;
            })}
            </select>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center">
            <FilterIcon size={18} className="mr-2" />
            Filter
          </button>
          <button onClick={() => setShowBulkProcessModal(true)} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
            <DollarSignIcon size={18} className="mr-2" />
            Process Payroll
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Basic Salary
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Allowances
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deductions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Net Pay
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payrollData.map(employee => <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {employee.name}
                    </div>
                    <div className="text-sm text-gray-500">{employee.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${employee.basicSalary}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${employee.allowances}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${employee.deductions}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${employee.netPay}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${employee.status === "Processed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button onClick={() => onViewPayslip(employee.id, selectedMonth)} className="text-blue-600 hover:text-blue-900">
                        Payslip
                      </button>
                      <button onClick={() => onViewP9Form(employee.id, selectedYear)} className="text-blue-600 hover:text-blue-900">
                        P9
                      </button>
                    </div>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
      {showBulkProcessModal && <BulkPayrollProcessModal isOpen={showBulkProcessModal} onClose={() => setShowBulkProcessModal(false)} employees={[{
      id: "EMP001",
      name: "Dr. Sarah Wilson",
      position: "Senior Embalmer",
      basicSalary: 5000,
      allowances: [{
        name: "Housing",
        amount: 500
      }, {
        name: "Transport",
        amount: 300
      }],
      deductions: [{
        name: "Tax",
        amount: 450
      }, {
        name: "Insurance",
        amount: 200
      }],
      bankDetails: {
        bankName: "City Bank",
        accountNumber: "1234567890",
        branchCode: "001"
      },
      overtimeHours: 10,
      overtimeRate: 25
    }]} onProcessPayroll={handleProcessPayroll} />}
    </div>;
};
export default PayrollSection;
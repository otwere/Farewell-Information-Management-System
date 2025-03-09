import React, { useState } from "react";
import { XIcon, DollarSignIcon, CheckCircleIcon, AlertCircleIcon, CalendarIcon, FileTextIcon } from "lucide-react";
interface Employee {
  id: string;
  name: string;
  position: string;
  basicSalary: number;
  allowances: {
    name: string;
    amount: number;
  }[];
  deductions: {
    name: string;
    amount: number;
  }[];
  bankDetails: {
    bankName: string;
    accountNumber: string;
    branchCode: string;
  };
}
interface ProcessPayrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  employees: Employee[];
  onProcessPayroll: (data: any) => void;
}
const ProcessPayrollModal: React.FC<ProcessPayrollModalProps> = ({
  isOpen,
  onClose,
  employees,
  onProcessPayroll
}) => {
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [payrollMonth, setPayrollMonth] = useState(new Date().toISOString().slice(0, 7));
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState(1);
  const [confirmation, setConfirmation] = useState({
    verified: false,
    approved: false
  });
  const calculatePayroll = (employee: Employee) => {
    const totalAllowances = employee.allowances.reduce((sum, allowance) => sum + allowance.amount, 0);
    const totalDeductions = employee.deductions.reduce((sum, deduction) => sum + deduction.amount, 0);
    const grossPay = employee.basicSalary + totalAllowances;
    const netPay = grossPay - totalDeductions;
    return {
      grossPay,
      netPay,
      totalAllowances,
      totalDeductions
    };
  };
  const getTotalPayrollAmount = () => {
    return employees.filter(emp => selectedEmployees.includes(emp.id)).reduce((total, emp) => total + calculatePayroll(emp).netPay, 0);
  };
  const handleSubmit = async () => {
    setProcessing(true);
    try {
      const payrollData = {
        month: payrollMonth,
        employees: employees.filter(emp => selectedEmployees.includes(emp.id)).map(emp => ({
          employeeId: emp.id,
          ...calculatePayroll(emp),
          bankDetails: emp.bankDetails
        })),
        totalAmount: getTotalPayrollAmount(),
        processedAt: new Date().toISOString()
      };
      await onProcessPayroll(payrollData);
      setStep(4); // Success step
    } catch (error) {
      console.error("Payroll processing failed:", error);
    } finally {
      setProcessing(false);
    }
  };
  return <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 ${isOpen ? "" : "hidden"}`}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Process Payroll
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <XIcon size={24} />
            </button>
          </div>
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3, 4].map(item => <div key={item} className={`flex items-center ${item !== 4 ? "flex-1" : ""}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= item ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}`}>
                    {item}
                  </div>
                  {item !== 4 && <div className={`flex-1 h-1 mx-2 ${step > item ? "bg-blue-600" : "bg-gray-200"}`}></div>}
                </div>)}
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>Select Employees</span>
              <span>Review</span>
              <span>Confirm</span>
              <span>Complete</span>
            </div>
          </div>
          {/* Step 1: Select Employees */}
          {step === 1 && <div className="space-y-6">
              <div className="flex items-center space-x-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payroll Month
                  </label>
                  <input type="month" className="border border-gray-300 rounded-md p-2" value={payrollMonth} onChange={e => setPayrollMonth(e.target.value)} />
                </div>
              </div>
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        <input type="checkbox" checked={selectedEmployees.length === employees.length} onChange={e => {
                      setSelectedEmployees(e.target.checked ? employees.map(emp => emp.id) : []);
                    }} className="rounded border-gray-300 text-blue-600" />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Employee
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Position
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Basic Salary
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Net Pay
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {employees.map(employee => {
                  const {
                    netPay
                  } = calculatePayroll(employee);
                  return <tr key={employee.id}>
                          <td className="px-6 py-4">
                            <input type="checkbox" checked={selectedEmployees.includes(employee.id)} onChange={e => {
                        setSelectedEmployees(e.target.checked ? [...selectedEmployees, employee.id] : selectedEmployees.filter(id => id !== employee.id));
                      }} className="rounded border-gray-300 text-blue-600" />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {employee.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {employee.id}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {employee.position}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${employee.basicSalary.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${netPay.toFixed(2)}
                          </td>
                        </tr>;
                })}
                  </tbody>
                </table>
              </div>
            </div>}
          {/* Step 2: Review */}
          {step === 2 && <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Payroll Summary
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Total Employees:</p>
                    <p className="font-medium">{selectedEmployees.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Amount:</p>
                    <p className="font-medium">
                      ${getTotalPayrollAmount().toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Payroll Month:</p>
                    <p className="font-medium">{payrollMonth}</p>
                  </div>
                </div>
              </div>
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Employee
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Bank Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {employees.filter(emp => selectedEmployees.includes(emp.id)).map(employee => {
                  const {
                    netPay
                  } = calculatePayroll(employee);
                  return <tr key={employee.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {employee.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {employee.id}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {employee.bankDetails.bankName}
                              </div>
                              <div className="text-sm text-gray-500">
                                Acc: {employee.bankDetails.accountNumber}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              ${netPay.toFixed(2)}
                            </td>
                          </tr>;
                })}
                  </tbody>
                </table>
              </div>
            </div>}
          {/* Step 3: Confirm */}
          {step === 3 && <div className="space-y-6">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      Please verify the following before processing payroll
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <label className="flex items-center space-x-3">
                  <input type="checkbox" checked={confirmation.verified} onChange={e => setConfirmation({
                ...confirmation,
                verified: e.target.checked
              })} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                  <span className="text-sm text-gray-700">
                    I have verified all employee salaries and deductions are
                    correct
                  </span>
                </label>
                <label className="flex items-center space-x-3">
                  <input type="checkbox" checked={confirmation.approved} onChange={e => setConfirmation({
                ...confirmation,
                approved: e.target.checked
              })} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                  <span className="text-sm text-gray-700">
                    I have approval to process payroll for the selected period
                  </span>
                </label>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Final Summary
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Employees:</span>
                    <span className="font-medium">
                      {selectedEmployees.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-medium">
                      ${getTotalPayrollAmount().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Processing Date:</span>
                    <span className="font-medium">
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>}
          {/* Step 4: Complete */}
          {step === 4 && <div className="text-center py-8">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <CheckCircleIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Payroll Processing Complete
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Payroll has been successfully processed for{" "}
                    {selectedEmployees.length} employees.
                  </p>
                </div>
              </div>
            </div>}
          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-end space-x-4">
            {step < 4 && <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                Cancel
              </button>}
            {step === 4 ? <button type="button" onClick={onClose} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Close
              </button> : <>
                {step > 1 && <button type="button" onClick={() => setStep(step - 1)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                    Back
                  </button>}
                {step === 3 ? <button type="button" onClick={handleSubmit} disabled={!confirmation.verified || !confirmation.approved} className={`px-4 py-2 rounded-md text-white flex items-center ${!confirmation.verified || !confirmation.approved ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}>
                    <DollarSignIcon size={18} className="mr-2" />
                    Process Payroll
                  </button> : <button type="button" onClick={() => setStep(step + 1)} disabled={step === 1 && selectedEmployees.length === 0} className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${step === 1 && selectedEmployees.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}>
                    Next
                  </button>}
              </>}
          </div>
        </div>
      </div>
    </div>;
};
export default ProcessPayrollModal;
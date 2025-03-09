import React, { useState } from "react";
import { XIcon, DollarSignIcon, CheckCircleIcon, AlertCircleIcon, CalendarIcon, FileTextIcon, CheckIcon, SearchIcon } from "lucide-react";
import { toast } from "sonner";

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
  overtimeHours?: number;
  overtimeRate?: number;
  bonuses?: {
    name: string;
    amount: number;
  }[];
  loans?: {
    amount: number;
    monthlyDeduction: number;
    remainingBalance: number;
  }[];
}

interface BulkPayrollProcessModalProps {
  isOpen: boolean;
  onClose: () => void;
  employees: Employee[];
  onProcessPayroll: (data: any) => void;
}

const BulkPayrollProcessModal: React.FC<BulkPayrollProcessModalProps> = ({
  isOpen,
  onClose,
  employees,
  onProcessPayroll
}) => {
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [payrollMonth, setPayrollMonth] = useState(new Date().toISOString().slice(0, 7));
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState(1);
  const [approvalStatus, setApprovalStatus] = useState<Record<string, boolean>>({});
  const [payrollNotes, setPayrollNotes] = useState("");

  const calculatePayroll = (employee: Employee) => {
    let totalEarnings = employee.basicSalary;
    const totalAllowances = employee.allowances.reduce((sum, allowance) => sum + allowance.amount, 0);
    totalEarnings += totalAllowances;
    if (employee.overtimeHours && employee.overtimeRate) {
      totalEarnings += employee.overtimeHours * employee.overtimeRate;
    }
    const totalBonuses = employee.bonuses?.reduce((sum, bonus) => sum + bonus.amount, 0) || 0;
    totalEarnings += totalBonuses;
    let totalDeductions = employee.deductions.reduce((sum, deduction) => sum + deduction.amount, 0);
    const loanDeductions = employee.loans?.reduce((sum, loan) => sum + loan.monthlyDeduction, 0) || 0;
    totalDeductions += loanDeductions;
    const netPay = totalEarnings - totalDeductions;
    return {
      grossPay: totalEarnings,
      netPay,
      totalAllowances,
      totalDeductions,
      totalBonuses,
      overtime: employee.overtimeHours ? employee.overtimeHours * (employee.overtimeRate || 0) : 0,
      loanDeductions
    };
  };

  const filteredEmployees = employees.filter(emp => emp.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleSelectAll = (checked: boolean) => {
    setSelectedEmployees(checked ? employees.map(emp => emp.id) : []);
  };

  const handleEmployeeSelect = (employeeId: string, checked: boolean) => {
    setSelectedEmployees(checked ? [...selectedEmployees, employeeId] : selectedEmployees.filter(id => id !== employeeId));
  };

  const handleApproval = (employeeId: string) => {
    setApprovalStatus(prev => ({
      ...prev,
      [employeeId]: true
    }));
    toast.success("Payroll approved for employee");
  };

  const handleBulkProcess = async () => {
    setProcessing(true);
    try {
      const payrollData = {
        month: payrollMonth,
        processedAt: new Date().toISOString(),
        notes: payrollNotes,
        employees: employees.filter(emp => selectedEmployees.includes(emp.id)).map(emp => ({
          employeeId: emp.id,
          ...calculatePayroll(emp),
          bankDetails: emp.bankDetails,
          approved: approvalStatus[emp.id] || false
        }))
      };
      await onProcessPayroll(payrollData);
      toast.success("Bulk payroll processing completed successfully");
      setStep(4);
    } catch (error) {
      toast.error("Failed to process payroll");
      console.error("Payroll processing failed:", error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 ${isOpen ? "" : "hidden"}`}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Bulk Payroll Processing</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <XIcon size={24} />
            </button>
          </div>
          {/* Steps Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {["Select Employees", "Review", "Approve", "Complete"].map((stepName, index) => (
                <div key={index} className={`flex items-center ${index !== 3 ? "flex-1" : ""}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step > index + 1 ? "bg-green-100 text-green-600" : step === index + 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}`}>
                    {step > index + 1 ? <CheckIcon size={16} /> : <span>{index + 1}</span>}
                  </div>
                  {index !== 3 && <div className={`h-1 flex-1 mx-4 ${step > index + 1 ? "bg-green-500" : "bg-gray-200"}`} />}
                </div>
              ))}
            </div>
          </div>
          {/* Step Content */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payroll Month</label>
                    <input type="month" className="border border-gray-300 rounded-md p-2" value={payrollMonth} onChange={e => setPayrollMonth(e.target.value)} />
                  </div>
                  <div className="relative">
                    <SearchIcon size={20} className="absolute left-3 top-9 text-gray-400" />
                    <label className="block text-sm font-medium text-gray-700 mb-1">Search Employees</label>
                    <input type="text" className="pl-10 border border-gray-300 rounded-md p-2" placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                  </div>
                </div>
              </div>
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        <input type="checkbox" checked={selectedEmployees.length === employees.length} onChange={e => handleSelectAll(e.target.checked)} className="rounded border-gray-300 text-blue-600" />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Basic Salary</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Allowances</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deductions</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Net Pay</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredEmployees.map(employee => {
                      const payrollDetails = calculatePayroll(employee);
                      return (
                        <tr key={employee.id}>
                          <td className="px-6 py-4">
                            <input type="checkbox" checked={selectedEmployees.includes(employee.id)} onChange={e => handleEmployeeSelect(employee.id, e.target.checked)} className="rounded border-gray-300 text-blue-600" />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                            <div className="text-sm text-gray-500">{employee.id}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.position}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${employee.basicSalary.toFixed(2)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${payrollDetails.totalAllowances.toFixed(2)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${payrollDetails.totalDeductions.toFixed(2)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${payrollDetails.netPay.toFixed(2)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Review Details</h3>
                <div className="space-y-4">
                  {selectedEmployees.map(employeeId => {
                    const employee = employees.find(emp => emp.id === employeeId)!;
                    const payrollDetails = calculatePayroll(employee);
                    return (
                      <div key={employee.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-gray-900">{employee.name}</h4>
                            <p className="text-sm text-gray-500">{employee.position}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Net Pay</p>
                            <p className="font-medium text-gray-900">${payrollDetails.netPay.toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Basic Salary</p>
                            <p className="font-medium">${employee.basicSalary.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Total Allowances</p>
                            <p className="font-medium">${payrollDetails.totalAllowances.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Total Deductions</p>
                            <p className="font-medium">${payrollDetails.totalDeductions.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Bank Details</p>
                            <p className="font-medium">{employee.bankDetails.bankName} - {employee.bankDetails.accountNumber}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-6">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex">
                  <AlertCircleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">Please review and approve each employee's payroll before processing</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg border">
                <div className="p-4">
                  <label className="block text-sm font-medium text-gray-700">Payroll Notes</label>
                  <textarea className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" rows={3} value={payrollNotes} onChange={e => setPayrollNotes(e.target.value)} placeholder="Add any notes or comments about this payroll run..." />
                </div>
                <div className="border-t">
                  {selectedEmployees.map(employeeId => {
                    const employee = employees.find(emp => emp.id === employeeId)!;
                    const payrollDetails = calculatePayroll(employee);
                    return (
                      <div key={employee.id} className="border-b last:border-b-0 p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium text-gray-900">{employee.name}</h4>
                            <p className="text-sm text-gray-500">Net Pay: ${payrollDetails.netPay.toFixed(2)}</p>
                          </div>
                          <button onClick={() => handleApproval(employee.id)} disabled={approvalStatus[employee.id]} className={`px-4 py-2 rounded-md flex items-center ${approvalStatus[employee.id] ? "bg-green-100 text-green-800" : "bg-blue-600 text-white hover:bg-blue-700"}`}>
                            {approvalStatus[employee.id] ? (
                              <>
                                <CheckIcon size={18} className="mr-2" />
                                Approved
                              </>
                            ) : "Approve"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="text-center py-8">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <CheckCircleIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Payroll Processing Complete</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Payroll has been successfully processed for {selectedEmployees.length} employees.</p>
                </div>
              </div>
            </div>
          )}
          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-end space-x-4">
            {step < 4 && (
              <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
            )}
            {step === 4 ? (
              <button type="button" onClick={onClose} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Close
              </button>
            ) : (
              <>
                {step > 1 && (
                  <button type="button" onClick={() => setStep(step - 1)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                    Back
                  </button>
                )}
                {step === 3 ? (
                  <button type="button" onClick={handleBulkProcess} disabled={processing} className={`px-4 py-2 rounded-md text-white flex items-center ${processing ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}>
                    <DollarSignIcon size={18} className="mr-2" />
                    {processing ? "Processing..." : "Process Payroll"}
                  </button>
                ) : (
                  <button type="button" onClick={() => setStep(step + 1)} disabled={step === 1 && selectedEmployees.length === 0} className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${step === 1 && selectedEmployees.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}>
                    Next
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkPayrollProcessModal;
import React, { useState } from "react";
import { UsersIcon, PlusIcon, SearchIcon, FilterIcon, CalendarIcon, ClockIcon, AwardIcon, BookOpenIcon } from "lucide-react";
import { Card, CardHeader, CardContent } from "../components/common/Card";
import AddEmployeeForm from "../components/staff/AddEmployeeForm";
import StaffProfileModal from "../components/staff/StaffProfileModal";
import PayrollSection from "../components/staff/PayrollSection";
import PayslipModal from "../components/staff/PayslipModal";
import P9FormModal from "../components/staff/P9FormModal";
const StaffManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [selectedView, setSelectedView] = useState("staff");
  const [showPayslip, setShowPayslip] = useState(false);
  const [showP9Form, setShowP9Form] = useState(false);
  const [selectedPayrollEmployee, setSelectedPayrollEmployee] = useState<any>(null);
  const staff = [{
    id: "EMP001",
    name: "Dr. Sarah Wilson",
    role: "Embalmer",
    department: "Technical",
    status: "Active",
    shift: "Morning",
    contact: "+1 (555) 123-4567",
    email: "sarah.wilson@example.com",
    certifications: ["Licensed Embalmer", "Mortuary Science Degree"],
    joinDate: "2022-03-15"
  }, {
    id: "EMP002",
    name: "Michael Brown",
    role: "Funeral Director",
    department: "Operations",
    status: "Active",
    shift: "Evening",
    contact: "+1 (555) 234-5678",
    email: "michael.brown@example.com",
    certifications: ["Funeral Director License", "Grief Counseling Cert"],
    joinDate: "2021-06-20"
  }];
  const schedules = [{
    id: "SCH001",
    employee: "Dr. Sarah Wilson",
    date: "2023-12-15",
    shift: "Morning (8AM-4PM)",
    status: "Scheduled"
  }];
  const leaves = [{
    id: "LV001",
    employee: "Michael Brown",
    type: "Vacation",
    startDate: "2023-12-20",
    endDate: "2023-12-27",
    status: "Approved"
  }];
  const handleAddEmployee = (employee: any) => {
    console.log("New employee:", employee);
    setShowAddEmployee(false);
  };
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Staff Management</h1>
          <p className="text-gray-600 mt-1">
            Manage employees, schedules, and payroll
          </p>
        </div>
        <button onClick={() => setShowAddEmployee(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
          <PlusIcon size={18} className="mr-1" />
          Add Employee
        </button>
      </div>

      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          <button onClick={() => setSelectedView("staff")} className={`py-4 px-6 border-b-2 font-medium text-sm ${selectedView === "staff" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}>
            Staff List
          </button>
          <button onClick={() => setSelectedView("payroll")} className={`py-4 px-6 border-b-2 font-medium text-sm ${selectedView === "payroll" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}>
            Payroll
          </button>
        </nav>
      </div>

      {selectedView === "staff" ? <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent>
                <div className="flex items-center">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <UsersIcon size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Staff</p>
                    <p className="text-2xl font-semibold">24</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <div className="flex items-center">
                  <div className="bg-green-100 rounded-full p-3 mr-4">
                    <ClockIcon size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">On Duty</p>
                    <p className="text-2xl font-semibold">12</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <div className="flex items-center">
                  <div className="bg-yellow-100 rounded-full p-3 mr-4">
                    <CalendarIcon size={20} className="text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">On Leave</p>
                    <p className="text-2xl font-semibold">3</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <div className="flex items-center">
                  <div className="bg-purple-100 rounded-full p-3 mr-4">
                    <AwardIcon size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Certifications</p>
                    <p className="text-2xl font-semibold">45</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between mb-4 space-y-4 md:space-y-0">
                <div className="relative w-full md:w-64">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon size={18} className="text-gray-400" />
                  </div>
                  <input type="text" placeholder="Search staff..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                </div>
                <div className="flex space-x-2">
                  <select className="border border-gray-300 rounded-md px-4 py-2" value={selectedDepartment} onChange={e => setSelectedDepartment(e.target.value)}>
                    <option value="all">All Departments</option>
                    <option value="technical">Technical</option>
                    <option value="operations">Operations</option>
                    <option value="administrative">Administrative</option>
                  </select>
                  <button className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-md flex items-center">
                    <FilterIcon size={18} className="mr-1" />
                    Filter
                  </button>
                </div>
              </div>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Shift
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {staff.map(employee => <tr key={employee.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {employee.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {employee.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {employee.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {employee.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${employee.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                          {employee.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {employee.shift}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button onClick={() => setSelectedEmployee(employee)} className="text-blue-600 hover:text-blue-900 mr-3">
                          View
                        </button>
                        <button className="text-blue-600 hover:text-blue-900">
                          Edit
                        </button>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </Card>
        </> : <PayrollSection onViewPayslip={(employeeId, month) => {
      setSelectedPayrollEmployee(staff.find(emp => emp.id === employeeId));
      setShowPayslip(true);
    }} onViewP9Form={(employeeId, year) => {
      setSelectedPayrollEmployee(staff.find(emp => emp.id === employeeId));
      setShowP9Form(true);
    }} />}

      {showPayslip && selectedPayrollEmployee && <PayslipModal isOpen={showPayslip} onClose={() => {
      setShowPayslip(false);
      setSelectedPayrollEmployee(null);
    }} employee={{
      id: selectedPayrollEmployee.id,
      name: selectedPayrollEmployee.name,
      position: selectedPayrollEmployee.role,
      department: selectedPayrollEmployee.department
    }} payrollData={{
      month: new Date().toLocaleString("default", {
        month: "long",
        year: "numeric"
      }),
      basicSalary: 5000,
      allowances: [{
        name: "Housing",
        amount: 500
      }, {
        name: "Transport",
        amount: 300
      }],
      deductions: [{
        name: "PAYE",
        amount: 450
      }, {
        name: "SHIF",
        amount: 150
      }, {
        name: "NSSF",
        amount: 50
      }],
      netPay: 5150
    }} />}

      {showP9Form && selectedPayrollEmployee && <P9FormModal isOpen={showP9Form} onClose={() => {
      setShowP9Form(false);
      setSelectedPayrollEmployee(null);
    }} employee={{
      id: selectedPayrollEmployee.id,
      name: selectedPayrollEmployee.name,
      pin: "A123456789B",
      position: selectedPayrollEmployee.role
    }} taxYear="2023" monthlyData={[{
      month: "January",
      basicSalary: 5000,
      benefits: 800,
      paye: 450,
      shif: 150,
      nssf: 50
    }
    // Add more months as needed
    ]} />}

      {showAddEmployee && <AddEmployeeForm isOpen={showAddEmployee} onClose={() => setShowAddEmployee(false)} onSubmit={handleAddEmployee} />}

      {selectedEmployee && <StaffProfileModal isOpen={!!selectedEmployee} onClose={() => setSelectedEmployee(null)} employee={selectedEmployee} onUpdateEmployee={(employeeId, data) => {
      console.log("Updating employee:", employeeId, data);
      // Implement employee update logic here
    }} />}
    </div>;
};
export default StaffManagement;
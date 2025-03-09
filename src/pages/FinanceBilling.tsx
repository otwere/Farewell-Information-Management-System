import React, { useState } from "react";
import { DollarSignIcon, FileTextIcon, AlertCircleIcon, CreditCardIcon, ReceiptIcon, TrendingUpIcon, SearchIcon, PlusIcon, FilterIcon, DownloadIcon, CheckCircleIcon, XCircleIcon, ClockIcon } from "lucide-react";
import NewInvoiceForm from "../components/finance/NewInvoiceForm";
import RecordPaymentForm from "../components/finance/RecordPaymentForm";
import PaymentReminderForm from "../components/finance/PaymentReminderForm";
import GenerateReportForm from "../components/finance/GenerateReportForm";
import GatePassForm from "../components/finance/GatePassForm";
import PrintReceiptModal from "../components/finance/PrintReceiptModal";
const FinanceBilling = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("invoices");
  const [showNewInvoiceForm, setShowNewInvoiceForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showReminderForm, setShowReminderForm] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);
  const [showGatePassForm, setShowGatePassForm] = useState(false);
  const [showPrintReceipt, setShowPrintReceipt] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const currentStaff = {
    id: "STAFF001",
    name: "John Doe",
    role: "Funeral Director"
  };
  const invoices = [{
    id: "INV-2023-001",
    client: "Mary Smith",
    deceased: "John Smith",
    date: "2023-12-14",
    dueDate: "2023-12-28",
    amount: 4500.0,
    status: "Paid",
    services: ["Embalming", "Chapel Service", "Transportation"]
  }, {
    id: "INV-2023-002",
    client: "Robert Johnson",
    deceased: "Sarah Johnson",
    date: "2023-12-13",
    dueDate: "2023-12-27",
    amount: 3800.0,
    status: "Pending",
    services: ["Chapel Service", "Burial"]
  }, {
    id: "INV-2023-003",
    client: "Michael Brown",
    deceased: "Emma Brown",
    date: "2023-12-12",
    dueDate: "2023-12-26",
    amount: 5200.0,
    status: "Overdue",
    services: ["Embalming", "Chapel Service", "Cremation"]
  }];
  const recentPayments = [{
    id: "PAY-2023-001",
    invoice: "INV-2023-001",
    amount: 4500.0,
    method: "Credit Card",
    date: "2023-12-14",
    status: "Completed"
  }, {
    id: "PAY-2023-002",
    invoice: "INV-2023-004",
    amount: 2800.0,
    method: "Bank Transfer",
    date: "2023-12-13",
    status: "Processing"
  }];
  const expenses = [{
    id: "EXP-2023-001",
    category: "Supplies",
    description: "Embalming Chemicals",
    amount: 850.0,
    date: "2023-12-14"
  }, {
    id: "EXP-2023-002",
    category: "Utilities",
    description: "Electricity Bill",
    amount: 420.0,
    date: "2023-12-13"
  }];
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const handleNewInvoice = (data: any) => {
    console.log("New Invoice:", data);
    setShowNewInvoiceForm(false);
  };
  const handleRecordPayment = (data: any) => {
    console.log("Payment:", data);
    setShowPaymentForm(false);
  };
  const handleSendReminders = (data: any) => {
    console.log("Reminders:", data);
    setShowReminderForm(false);
  };
  const handleGenerateReport = (data: any) => {
    console.log("Generate Report:", data);
    setShowReportForm(false);
  };
  const handleGenerateGatePass = (data: any) => {
    console.log("Generate Gate Pass:", data);
    setShowGatePassForm(false);
  };
  const handleViewInvoice = (invoice: any) => {
    setSelectedInvoice(invoice);
    setShowGatePassForm(true);
  };
  const handlePrintReceipt = (payment: any) => {
    setSelectedPayment(payment);
    setShowPrintReceipt(true);
  };
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Finance & Billing
          </h1>
          <p className="text-gray-600 mt-1">
            Manage invoices, payments, and financial records
          </p>
        </div>
        <button onClick={() => setShowNewInvoiceForm(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center transition-colors duration-200">
          <PlusIcon size={18} className="mr-1" />
          New Invoice
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 rounded-full p-3 mr-4">
              <DollarSignIcon size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Revenue</p>
              <p className="text-2xl font-semibold text-gray-800">$45,250</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-green-100 rounded-full p-3 mr-4">
              <ReceiptIcon size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Paid Invoices</p>
              <p className="text-2xl font-semibold text-gray-800">28</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-yellow-100 rounded-full p-3 mr-4">
              <ClockIcon size={20} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Pending Payments</p>
              <p className="text-2xl font-semibold text-gray-800">12</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-red-100 rounded-full p-3 mr-4">
              <AlertCircleIcon size={20} className="text-red-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Overdue</p>
              <p className="text-2xl font-semibold text-gray-800">5</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button onClick={() => setSelectedTab("invoices")} className={`py-4 px-6 border-b-2 font-medium text-sm ${selectedTab === "invoices" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}>
              Invoices
            </button>
            <button onClick={() => setSelectedTab("payments")} className={`py-4 px-6 border-b-2 font-medium text-sm ${selectedTab === "payments" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}>
              Payments
            </button>
            <button onClick={() => setSelectedTab("expenses")} className={`py-4 px-6 border-b-2 font-medium text-sm ${selectedTab === "expenses" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}>
              Expenses
            </button>
          </nav>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0">
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon size={18} className="text-gray-400" />
              </div>
              <input type="text" placeholder="Search records..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50 flex items-center">
                <FilterIcon size={18} className="mr-2" />
                Filter
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50 flex items-center">
                <DownloadIcon size={18} className="mr-2" />
                Export
              </button>
            </div>
          </div>

          {selectedTab === "invoices" && <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Invoice
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
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
                  {invoices.map(invoice => <tr key={invoice.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {invoice.id}
                        </div>
                        <div className="text-sm text-gray-500">
                          For {invoice.deceased}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {invoice.client}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${invoice.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {invoice.date}
                        </div>
                        <div className="text-sm text-gray-500">
                          Due {invoice.dueDate}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          View
                        </button>
                        <button className="text-blue-600 hover:text-blue-900">
                          Edit
                        </button>
                        <button className={`${invoice.status === "Paid" ? "text-green-600 hover:text-green-900" : "text-gray-400 cursor-not-allowed"}`} onClick={() => {
                    if (invoice.status === "Paid") {
                      handleViewInvoice(invoice);
                    }
                  }}>
                          Gate Pass
                        </button>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>}

          {selectedTab === "payments" && <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Invoice
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Method
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentPayments.map(payment => <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {payment.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payment.invoice}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${payment.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payment.method}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payment.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button onClick={() => handlePrintReceipt(payment)} className="text-blue-600 hover:text-blue-900 mr-3">
                          Print Receipt
                        </button>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>}

          {selectedTab === "expenses" && <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Expense ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {expenses.map(expense => <tr key={expense.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {expense.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {expense.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {expense.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${expense.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {expense.date}
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Payment Methods
          </h3>
          <div className="space-y-4">
            <div className="flex items-center p-3 border rounded-md">
              <CreditCardIcon size={20} className="text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Credit/Debit Cards
                </p>
                <p className="text-xs text-gray-500">
                  Visa, Mastercard, American Express
                </p>
              </div>
            </div>
            <div className="flex items-center p-3 border rounded-md">
              <FileTextIcon size={20} className="text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Bank Transfer
                </p>
                <p className="text-xs text-gray-500">Direct bank transfer</p>
              </div>
            </div>
            <div className="flex items-center p-3 border rounded-md">
              <DollarSignIcon size={20} className="text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Mobile Money
                </p>
                <p className="text-xs text-gray-500">
                  Various mobile payment options
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Outstanding Payments
          </h3>
          <div className="space-y-4">
            {invoices.filter(inv => inv.status === "Pending" || inv.status === "Overdue").map(invoice => <div key={invoice.id} className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {invoice.client}
                    </p>
                    <p className="text-xs text-gray-500">{invoice.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      ${invoice.amount.toFixed(2)}
                    </p>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </div>
                </div>)}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button onClick={() => setShowNewInvoiceForm(true)} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md flex items-center">
              <PlusIcon size={18} className="mr-2" />
              Create New Invoice
            </button>
            <button onClick={() => setShowPaymentForm(true)} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md flex items-center">
              <CreditCardIcon size={18} className="mr-2" />
              Record Payment
            </button>
            <button onClick={() => setShowReportForm(true)} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md flex items-center">
              <TrendingUpIcon size={18} className="mr-2" />
              Generate Report
            </button>
            <button onClick={() => setShowReminderForm(true)} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md flex items-center">
              <AlertCircleIcon size={18} className="mr-2" />
              Send Payment Reminders
            </button>
          </div>
        </div>
      </div>

      {showNewInvoiceForm && <NewInvoiceForm onClose={() => setShowNewInvoiceForm(false)} onSubmit={data => {
      console.log("New Invoice Data:", data);
      setShowNewInvoiceForm(false);
    }} />}

      {showPaymentForm && <RecordPaymentForm onClose={() => setShowPaymentForm(false)} onSubmit={handleRecordPayment} />}

      {showReminderForm && <PaymentReminderForm onClose={() => setShowReminderForm(false)} onSubmit={handleSendReminders} />}

      {showReportForm && <GenerateReportForm onClose={() => setShowReportForm(false)} onSubmit={handleGenerateReport} />}

      {showGatePassForm && selectedInvoice && <GatePassForm onClose={() => {
      setShowGatePassForm(false);
      setSelectedInvoice(null);
    }} onSubmit={handleGenerateGatePass} invoice={{
      ...selectedInvoice,
      paid: selectedInvoice.status === "Paid" ? selectedInvoice.amount : 0
    }} currentStaff={currentStaff} />}

      {showPrintReceipt && selectedPayment && <PrintReceiptModal payment={selectedPayment} onClose={() => {
      setShowPrintReceipt(false);
      setSelectedPayment(null);
    }} />}
    </div>;
};
export default FinanceBilling;
import React, { useState } from "react";
import { XIcon, FileTextIcon, DownloadIcon, EyeIcon } from "lucide-react";
interface GenerateReportFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}
const GenerateReportForm: React.FC<GenerateReportFormProps> = ({
  onClose,
  onSubmit
}) => {
  const [reportType, setReportType] = useState("financial");
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: ""
  });
  const [format, setFormat] = useState("pdf");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      reportType,
      dateRange,
      format
    });
  };
  return <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Generate Report
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <XIcon size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Report Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Report Type
              </label>
              <select value={reportType} onChange={e => setReportType(e.target.value)} className="block w-full border border-gray-300 rounded-md shadow-sm p-2">
                <option value="financial">Financial Report</option>
                <option value="invoices">Invoice Report</option>
                <option value="payments">Payment Report</option>
                <option value="overdue">Overdue Payments Report</option>
                <option value="expenses">Expense Report</option>
                <option value="revenue">Revenue Analysis</option>
              </select>
            </div>
            {/* Date Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input type="date" value={dateRange.startDate} onChange={e => setDateRange({
                ...dateRange,
                startDate: e.target.value
              })} className="block w-full border border-gray-300 rounded-md shadow-sm p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input type="date" value={dateRange.endDate} onChange={e => setDateRange({
                ...dateRange,
                endDate: e.target.value
              })} className="block w-full border border-gray-300 rounded-md shadow-sm p-2" />
              </div>
            </div>
            {/* Format Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Export Format
              </label>
              <div className="grid grid-cols-3 gap-4">
                <button type="button" onClick={() => setFormat("pdf")} className={`p-4 border rounded-md flex flex-col items-center space-y-2 ${format === "pdf" ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}>
                  <FileTextIcon size={24} className={format === "pdf" ? "text-blue-500" : "text-gray-400"} />
                  <span className="text-sm">PDF</span>
                </button>
                <button type="button" onClick={() => setFormat("excel")} className={`p-4 border rounded-md flex flex-col items-center space-y-2 ${format === "excel" ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}>
                  <FileTextIcon size={24} className={format === "excel" ? "text-blue-500" : "text-gray-400"} />
                  <span className="text-sm">Excel</span>
                </button>
                <button type="button" onClick={() => setFormat("csv")} className={`p-4 border rounded-md flex flex-col items-center space-y-2 ${format === "csv" ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}>
                  <FileTextIcon size={24} className={format === "csv" ? "text-blue-500" : "text-gray-400"} />
                  <span className="text-sm">CSV</span>
                </button>
              </div>
            </div>
            {/* Additional Options */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Include in Report
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm" />
                  <span className="ml-2 text-sm text-gray-600">
                    Include charts and graphs
                  </span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm" />
                  <span className="ml-2 text-sm text-gray-600">
                    Include transaction details
                  </span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm" />
                  <span className="ml-2 text-sm text-gray-600">
                    Include summary statistics
                  </span>
                </label>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button type="button" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center">
                <EyeIcon size={18} className="mr-2" />
                Preview
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
                <DownloadIcon size={18} className="mr-2" />
                Generate Report
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>;
};
export default GenerateReportForm;
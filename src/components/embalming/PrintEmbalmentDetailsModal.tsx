import React from "react";
import { XIcon, PrinterIcon } from "lucide-react";
interface PrintEmbalmentDetailsModalProps {
  onClose: () => void;
  caseData: {
    id: string;
    deceased: string;
    startTime: string;
    status: string;
    assignedTo: string;
    temperature: string;
    chemicalsUsed: string[];
    notes: string;
  };
  approvalSteps: {
    id: string;
    title: string;
    description: string;
    status: string;
    approvedBy?: string;
    approvedAt?: string;
    notes?: string;
  }[];
  procedureDetails: {
    chemicalMixture: {
      chemical: string;
      concentration: string;
      amount: string;
    }[];
    temperatureLogs: {
      time: string;
      temperature: string;
    }[];
    techniques: string[];
    observations: string[];
  };
}
const PrintEmbalmentDetailsModal: React.FC<PrintEmbalmentDetailsModalProps> = ({
  onClose,
  caseData,
  approvalSteps,
  procedureDetails
}) => {
  const handlePrint = () => {
    window.print();
  };
  return (
    <div className="fixed inset-0 bg-gradient-to-r from-gray-700 via-gray-900 to-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-full overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Embalming Case Report
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <XIcon size={24} />
            </button>
          </div>
          {/* Print Content */}
          <div className="print-content space-y-6 p-8 border rounded-lg shadow-md">
            {/* Header */}
            <div className="text-center border-b pb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Mortuary Management System
              </h1>
              <p className="text-gray-600">Embalming Procedure Report</p>
            </div>
            {/* Case Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Case ID :</p>
                <p className="font-medium">{caseData.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Deceased:</p>
                <p className="font-medium">{caseData.deceased}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Start Time:</p>
                <p className="font-medium">{caseData.startTime}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Embalmer:</p>
                <p className="font-medium">{caseData.assignedTo}</p>
              </div>
            </div>
            {/* Chemical Mixture Details */}
            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">Chemical Mixture Details</h3>
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-600">
                    <th className="py-2">Chemical</th>
                    <th className="py-2">Concentration</th>
                    <th className="py-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {procedureDetails.chemicalMixture.map((mixture, index) => (
                    <tr key={index}>
                      <td className="py-2">{mixture.chemical}</td>
                      <td className="py-2">{mixture.concentration}</td>
                      <td className="py-2">{mixture.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Temperature Logs */}
            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">Temperature Monitoring</h3>
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-600">
                    <th className="py-2">Time</th>
                    <th className="py-2">Temperature</th>
                  </tr>
                </thead>
                <tbody>
                  {procedureDetails.temperatureLogs.map((log, index) => (
                    <tr key={index}>
                      <td className="py-2">{log.time}</td>
                      <td className="py-2">{log.temperature}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Techniques Used */}
            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">Techniques Applied</h3>
              <ul className="list-disc list-inside space-y-1">
                {procedureDetails.techniques.map((technique, index) => (
                  <li key={index} className="text-gray-600">
                    {technique}
                  </li>
                ))}
              </ul>
            </div>
            {/* Observations */}
            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">Observations</h3>
              <ul className="list-disc list-inside space-y-1">
                {procedureDetails.observations.map((observation, index) => (
                  <li key={index} className="text-gray-600">
                    {observation}
                  </li>
                ))}
              </ul>
            </div>
            {/* Approval Steps */}
            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">Quality Control & Approvals</h3>
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-600">
                    <th className="py-2">Step</th>
                    <th className="py-2">Status</th>
                    <th className="py-2">Approved By</th>
                    <th className="py-2">Date/Time</th>
                  </tr>
                </thead>
                <tbody>
                  {approvalSteps.map((step) => (
                    <tr key={step.id}>
                      <td className="py-2">{step.title}</td>
                      <td className="py-2">{step.status}</td>
                      <td className="py-2">{step.approvedBy || "-"}</td>
                      <td className="py-2">
                        {step.approvedAt ? new Date(step.approvedAt).toLocaleString() : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Notes */}
            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">Additional Notes</h3>
              <p className="text-gray-600">{caseData.notes}</p>
            </div>
            {/* Footer */}
            <div className="border-t pt-4 text-center text-sm text-gray-600">
              <p>This is an official embalming procedure report</p>
              <p>Generated on: {new Date().toLocaleString()}</p>
            </div>
          </div>
          {/* Print Button */}
          <div className="mt-6 flex justify-end">
            <button onClick={handlePrint} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center">
              <PrinterIcon size={18} className="mr-2" />
              Print Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PrintEmbalmentDetailsModal;
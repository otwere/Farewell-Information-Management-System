import React, { useState } from "react";
import { XIcon, QrCodeIcon, UserIcon, CheckCircleIcon, AlertCircleIcon, CalendarIcon, ClipboardIcon, MapPinIcon, TruckIcon, ShieldIcon, FileTextIcon, ScrollIcon, CheckSquareIcon } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
interface GatePassFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
  invoice: {
    id: string;
    amount: number;
    paid: number;
    client: string;
    deceased: string;
  };
  currentStaff: {
    name: string;
    id: string;
    role: string;
  };
}
const GatePassForm: React.FC<GatePassFormProps> = ({
  onClose,
  onSubmit,
  invoice,
  currentStaff
}) => {
  const [agreed, setAgreed] = useState(false);
  const [destination, setDestination] = useState("");
  const [transportMethod, setTransportMethod] = useState("");
  const [showBurialPermit, setShowBurialPermit] = useState(false);
  const [burialPermitData, setBurialPermitData] = useState({
    burialLocation: "",
    burialDate: "",
    ceremonyType: "",
    religiousRequirements: "",
    healthDeptApproval: false,
    localAuthorityApproval: false,
    deathCertificate: false,
    specialInstructions: ""
  });
  const isPaidInFull = invoice.paid >= invoice.amount;
  const generateQRData = () => {
    return JSON.stringify({
      invoiceId: invoice.id,
      dateGenerated: new Date().toISOString(),
      staffId: currentStaff.id,
      staffName: currentStaff.name,
      destination,
      transportMethod,
      type: "GATE_PASS",
      burialPermit: showBurialPermit ? burialPermitData : null
    });
  };
  const allPermitRequirementsMet = () => {
    if (!showBurialPermit) return true;
    return burialPermitData.burialLocation && burialPermitData.burialDate && burialPermitData.ceremonyType && burialPermitData.healthDeptApproval && burialPermitData.localAuthorityApproval && burialPermitData.deathCertificate;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPaidInFull || !destination || !transportMethod) return;
    if (showBurialPermit && !allPermitRequirementsMet()) return;
    onSubmit({
      invoiceId: invoice.id,
      staffId: currentStaff.id,
      timestamp: new Date().toISOString(),
      destination,
      transportMethod,
      qrData: generateQRData(),
      burialPermit: showBurialPermit ? burialPermitData : null
    });
  };
  return <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Generate Gate Pass {showBurialPermit && "& Burial Permit"}
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <XIcon size={24} />
            </button>
          </div>
          <div className="mb-8">
            {!isPaidInFull ? <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                <div className="flex items-center">
                  <AlertCircleIcon size={24} className="text-red-500 mr-3" />
                  <div>
                    <h3 className="text-red-800 font-medium text-lg">
                      Payment Required
                    </h3>
                    <p className="text-red-700">
                      Outstanding Amount: $
                      {(invoice.amount - invoice.paid).toFixed(2)}
                    </p>
                    <p className="text-red-600 text-sm mt-1">
                      Full payment is required before generating permits
                    </p>
                  </div>
                </div>
              </div> : <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md">
                <div className="flex items-center">
                  <CheckCircleIcon size={24} className="text-green-500 mr-3" />
                  <div>
                    <h3 className="text-green-800 font-medium text-lg">
                      Payment Verified
                    </h3>
                    <p className="text-green-700">
                      Payment received in full: ${invoice.paid.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>}
          </div>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <h3 className="font-medium text-gray-900 flex items-center">
                  <ClipboardIcon size={18} className="mr-2" />
                  Document Details
                </h3>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="text-gray-500">Invoice Number:</span>{" "}
                    <span className="font-medium">{invoice.id}</span>
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-500">Date:</span>{" "}
                    <span className="font-medium">
                      {new Date().toLocaleDateString()}
                    </span>
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <h3 className="font-medium text-gray-900 flex items-center">
                  <UserIcon size={18} className="mr-2" />
                  Personal Details
                </h3>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="text-gray-500">Deceased:</span>{" "}
                    <span className="font-medium">{invoice.deceased}</span>
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-500">Client:</span>{" "}
                    <span className="font-medium">{invoice.client}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
              <h3 className="font-medium text-gray-900 flex items-center">
                <TruckIcon size={18} className="mr-2" />
                Transport Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Destination
                  </label>
                  <input type="text" required placeholder="Enter destination" className="w-full p-2 border border-gray-300 rounded-md" value={destination} onChange={e => setDestination(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Transport Method
                  </label>
                  <select required className="w-full p-2 border border-gray-300 rounded-md" value={transportMethod} onChange={e => setTransportMethod(e.target.value)}>
                    <option value="">Select transport method</option>
                    <option value="hearse">Hearse</option>
                    <option value="van">Transport Van</option>
                    <option value="external">External Transport</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="burialPermit" checked={showBurialPermit} onChange={e => setShowBurialPermit(e.target.checked)} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <label htmlFor="burialPermit" className="text-sm font-medium text-gray-700">
                Include Burial Permit
              </label>
            </div>
            {showBurialPermit && <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <h3 className="font-medium text-gray-900 flex items-center">
                  <ScrollIcon size={18} className="mr-2" />
                  Burial Permit Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Burial Location*
                    </label>
                    <input type="text" required placeholder="Enter burial location" className="w-full p-2 border border-gray-300 rounded-md" value={burialPermitData.burialLocation} onChange={e => setBurialPermitData({
                  ...burialPermitData,
                  burialLocation: e.target.value
                })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Burial Date*
                    </label>
                    <input type="date" required className="w-full p-2 border border-gray-300 rounded-md" value={burialPermitData.burialDate} onChange={e => setBurialPermitData({
                  ...burialPermitData,
                  burialDate: e.target.value
                })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ceremony Type*
                    </label>
                    <select required className="w-full p-2 border border-gray-300 rounded-md" value={burialPermitData.ceremonyType} onChange={e => setBurialPermitData({
                  ...burialPermitData,
                  ceremonyType: e.target.value
                })}>
                      <option value="">Select ceremony type</option>
                      <option value="religious">Religious</option>
                      <option value="civil">Civil</option>
                      <option value="military">Military</option>
                      <option value="private">Private</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Religious Requirements
                    </label>
                    <input type="text" placeholder="Enter religious requirements" className="w-full p-2 border border-gray-300 rounded-md" value={burialPermitData.religiousRequirements} onChange={e => setBurialPermitData({
                  ...burialPermitData,
                  religiousRequirements: e.target.value
                })} />
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700">
                    Required Approvals
                  </h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={burialPermitData.healthDeptApproval} onChange={e => setBurialPermitData({
                    ...burialPermitData,
                    healthDeptApproval: e.target.checked
                  })} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                      <span className="text-sm text-gray-700">
                        Health Department Approval
                      </span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={burialPermitData.localAuthorityApproval} onChange={e => setBurialPermitData({
                    ...burialPermitData,
                    localAuthorityApproval: e.target.checked
                  })} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                      <span className="text-sm text-gray-700">
                        Local Authority Approval
                      </span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={burialPermitData.deathCertificate} onChange={e => setBurialPermitData({
                    ...burialPermitData,
                    deathCertificate: e.target.checked
                  })} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                      <span className="text-sm text-gray-700">
                        Death Certificate Verified
                      </span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Special Instructions
                  </label>
                  <textarea rows={3} placeholder="Enter any special instructions" className="w-full p-2 border border-gray-300 rounded-md" value={burialPermitData.specialInstructions} onChange={e => setBurialPermitData({
                ...burialPermitData,
                specialInstructions: e.target.value
              })} />
                </div>
              </div>}
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <h3 className="font-medium text-gray-900 flex items-center">
                <ShieldIcon size={18} className="mr-2" />
                Authorization
              </h3>
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <UserIcon size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">{currentStaff.name}</p>
                  <p className="text-sm text-gray-500">{currentStaff.role}</p>
                </div>
              </div>
            </div>
            {isPaidInFull && destination && transportMethod && allPermitRequirementsMet() && <div className="flex flex-col items-center space-y-4 p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 flex items-center">
                    <QrCodeIcon size={18} className="mr-2" />
                    {showBurialPermit ? "Gate Pass & Burial Permit" : "Gate Pass"}{" "}
                    QR Code
                  </h3>
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <QRCodeSVG value={generateQRData()} size={180} />
                  </div>
                  <p className="text-sm text-gray-500">
                    Scan this QR code at the security checkpoint
                  </p>
                </div>}
            <div className="space-y-4">
              <label className="flex items-start space-x-3">
                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                <span className="text-sm text-gray-600">
                  I confirm that all necessary documentation has been verified
                  and the release of the deceased's remains complies with all
                  applicable regulations and procedures.
                </span>
              </label>
            </div>
            <div className="flex justify-end space-x-4">
              <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" disabled={!isPaidInFull || !agreed || !destination || !transportMethod || !allPermitRequirementsMet()} className={`px-4 py-2 rounded-md flex items-center space-x-2 ${!isPaidInFull || !agreed || !destination || !transportMethod || !allPermitRequirementsMet() ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}>
                <QrCodeIcon size={18} />
                <span>
                  Generate {showBurialPermit ? "Permits" : "Gate Pass"}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>;
};
export default GatePassForm;
import React from "react";
import { XIcon, PrinterIcon, QrCodeIcon, PhoneIcon, MailIcon, MapPinIcon, GlobeIcon, ShieldCheckIcon, ClockIcon, CalendarIcon, UserIcon, HeartHandshakeIcon } from "lucide-react";
interface ServicePackage {
  id: string;
  name: string;
  price: number;
  includes: string[];
}
interface PrintServiceReceiptModalProps {
  onClose: () => void;
  serviceData: {
    serviceDetails: {
      type: string;
      date: string;
      startTime: string;
      endTime: string;
      location: string;
      expectedAttendees: string;
    };
    deceased: {
      name: string;
      dateOfDeath: string;
      religion: string;
      specialRequirements: string;
    };
    familyContact: {
      name: string;
      relationship: string;
      phone: string;
      email: string;
    };
    selectedPackage: string;
    addOns: string[];
    assignedStaff: Array<{
      id: string;
      name: string;
      role: string;
    }>;
    notes: string;
    totalCost: number;
    paymentDetails?: {
      method: string;
      transactionId: string;
      status: string;
      date: string;
    };
  };
  packageDetails: {
    basePrice: number;
    addOnsPrice: number;
    total: number;
  };
  servicePackages: ServicePackage[];
  addOnServices: Array<{
    id: string;
    name: string;
    price: number;
  }>;
}
const PrintServiceReceiptModal: React.FC<PrintServiceReceiptModalProps> = ({
  onClose,
  serviceData,
  packageDetails,
  servicePackages,
  addOnServices
}) => {
  const handlePrint = () => {
    window.print();
  };
  const selectedPackage = servicePackages.find(pkg => pkg.id === serviceData.selectedPackage);
  const getFormattedDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
    }).format(amount);
  };
  const scheduleId = `SRV-${Date.now().toString(36).toUpperCase()}`;
  const qrCodeUrl = `https://example.com/verify/${scheduleId}`;
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  return <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Service Schedule
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <XIcon size={24} />
            </button>
          </div>
          <div className="print-content space-y-6 p-8 border rounded-lg">
            <div className="relative corporate-pattern">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-blue-800/10"></div>
              <div className="relative p-8 text-center border-b">
                <div className="mb-6">
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    ETERNAL REST
                  </h1>
                  <p className="text-lg text-gray-600">
                    Mortuary Management Services
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Dignity • Compassion • Excellence
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex flex-col items-center">
                    <MapPinIcon size={18} className="mb-1" />
                    <p>1234 Memorial Drive</p>
                    <p>Springfield, IL 62701</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <PhoneIcon size={18} className="mb-1" />
                    <p>(555) 123-4567</p>
                    <p>24/7 Support Available</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <GlobeIcon size={18} className="mb-1" />
                    <p>www.eternalrest.com</p>
                    <p>info@eternalrest.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center py-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Service Schedule Confirmation
              </h2>
              <div className="flex justify-center items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <CalendarIcon size={16} className="mr-2" />
                  <span>Issued: {currentDate}</span>
                </div>
                <div className="flex items-center">
                  <ShieldCheckIcon size={16} className="mr-2" />
                  <span>Reference: {scheduleId}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="gradient-border p-6">
                  <h3 className="font-medium text-gray-900 mb-4 flex items-center">
                    <ClockIcon size={18} className="mr-2" />
                    Service Details
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">
                        {getFormattedDate(serviceData.serviceDetails.date)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium">
                        {serviceData.serviceDetails.startTime} -{" "}
                        {serviceData.serviceDetails.endTime}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">
                        {serviceData.serviceDetails.location}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-600">Expected Attendees:</span>
                      <span className="font-medium">
                        {serviceData.serviceDetails.expectedAttendees}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="gradient-border p-6">
                  <h3 className="font-medium text-gray-900 mb-4 flex items-center">
                    <UserIcon size={18} className="mr-2" />
                    Deceased Information
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">
                        {serviceData.deceased.name}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                      <span className="text-gray-600">Date of Death:</span>
                      <span className="font-medium">
                        {getFormattedDate(serviceData.deceased.dateOfDeath)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-600">Religion:</span>
                      <span className="font-medium">
                        {serviceData.deceased.religion}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="gradient-border p-6">
                  <h3 className="font-medium text-gray-900 mb-4 flex items-center">
                    <HeartHandshakeIcon size={18} className="mr-2" />
                    Family Contact
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">
                        {serviceData.familyContact.name}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                      <span className="text-gray-600">Relationship:</span>
                      <span className="font-medium">
                        {serviceData.familyContact.relationship}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-medium">
                        {serviceData.familyContact.phone}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">
                        {serviceData.familyContact.email}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="gradient-border p-6">
                  <h3 className="font-medium text-gray-900 mb-4">
                    Selected Package
                  </h3>
                  <div className="space-y-3">
                    <p className="font-medium text-blue-600 text-lg">
                      {selectedPackage?.name}
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-gray-600">
                      {selectedPackage?.includes.map((item, index) => <li key={index} className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                          {item}
                        </li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 mt-6">
              <h3 className="font-medium text-gray-900 mb-4">
                Cost & Payment Details
              </h3>
              <table className="w-full">
                <tbody className="text-sm">
                  <tr className="border-b border-gray-100">
                    <td className="py-3 text-gray-600">Base Package</td>
                    <td className="py-3 text-right font-medium">
                      {formatCurrency(packageDetails.basePrice)}
                    </td>
                  </tr>
                  {packageDetails.addOnsPrice > 0 && <tr className="border-b border-gray-100">
                      <td className="py-3 text-gray-600">
                        Additional Services
                      </td>
                      <td className="py-3 text-right font-medium">
                        {formatCurrency(packageDetails.addOnsPrice)}
                      </td>
                    </tr>}
                  {serviceData.paymentDetails && <>
                      <tr className="border-t border-gray-200">
                        <td colSpan={2} className="py-4">
                          <div className="space-y-2">
                            <h4 className="font-medium text-gray-900">
                              Payment Information
                            </h4>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-600">
                                  Payment Method:
                                </span>
                                <span className="ml-2 font-medium">
                                  {serviceData.paymentDetails.method.replace("_", " ").toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-600">
                                  Transaction ID:
                                </span>
                                <span className="ml-2 font-medium">
                                  {serviceData.paymentDetails.transactionId}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-600">Date:</span>
                                <span className="ml-2 font-medium">
                                  {new Date(serviceData.paymentDetails.date).toLocaleDateString()}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-600">Status:</span>
                                <span className="ml-2 font-medium text-green-600">
                                  {serviceData.paymentDetails.status.toUpperCase()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </>}
                  <tr>
                    <td className="py-4 font-medium text-lg">Total</td>
                    <td className="py-4 text-right font-medium text-lg text-blue-600">
                      {formatCurrency(packageDetails.total)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-8 border-t pt-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-xs text-gray-600 space-y-2">
                  <h4 className="font-medium text-gray-900 mb-3">
                    Terms & Conditions
                  </h4>
                  <div className="space-y-2">
                    <p>
                      1. All services must be paid in full prior to the service
                      date.
                    </p>
                    <p>
                      2. Schedule modifications require 48 hours advance notice.
                    </p>
                    <p>
                      3. Additional services may incur supplementary charges.
                    </p>
                    <p>
                      4. This document serves as official service confirmation.
                    </p>
                    <p>
                      5. Service details are subject to availability and
                      confirmation.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <div className="text-right">
                    <QrCodeIcon size={80} className="text-gray-400" />
                    <p className="text-xs text-gray-500 mt-2">
                      Scan for digital verification
                    </p>
                    <p className="text-xs text-gray-400">
                      Verification URL: {qrCodeUrl}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 border-t pt-6">
              <div className="text-center text-sm">
                <p className="font-medium text-gray-900">
                  Eternal Rest Mortuary Services
                </p>
                <p className="text-gray-600 mt-1">
                  Serving our community with dignity since 1985
                </p>
                <div className="mt-3 flex justify-center space-x-4 text-xs text-gray-500">
                  <span>State License: MSB-123456</span>
                  <span>|</span>
                  <span>EPA Certification: #ENV89012</span>
                  <span>|</span>
                  <span>BBB Accredited Business</span>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  All rights reserved © {new Date().getFullYear()} Eternal Rest
                  Mortuary Services
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button onClick={handlePrint} className="bg-blue-600 text-white px-6 py-2.5 rounded-md hover:bg-blue-700 flex items-center font-medium transition-colors duration-200">
              <PrinterIcon size={18} className="mr-2" />
              Print Schedule
            </button>
          </div>
        </div>
      </div>
    </div>;
};
export default PrintServiceReceiptModal;
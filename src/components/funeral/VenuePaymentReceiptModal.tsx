import React from "react";
import { XIcon, PrinterIcon } from "lucide-react";
interface VenuePaymentReceiptModalProps {
  onClose: () => void;
  booking: {
    id: string;
    venue: {
      name: string;
      type: string;
      location: string;
    };
    date: string;
    startTime: string;
    endTime: string;
    amount: number;
    paymentMethod: string;
    paymentDate: string;
    transactionId: string;
    notes?: string;
  };
}
const VenuePaymentReceiptModal: React.FC<VenuePaymentReceiptModalProps> = ({
  onClose,
  booking
}) => {
  const handlePrint = () => {
    window.print();
  };
  return <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Venue Booking Receipt
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <XIcon size={24} />
            </button>
          </div>
          {/* Receipt Content - This will be printed */}
          <div className="print-content space-y-6 p-8 border rounded-lg">
            {/* Header */}
            <div className="text-center border-b pb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Mortuary Management System
              </h1>
              <p className="text-gray-600">Venue Booking Receipt</p>
            </div>
            {/* Receipt Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Booking ID:</p>
                <p className="font-medium">{booking.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Transaction Date:</p>
                <p className="font-medium">{booking.paymentDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Transaction ID:</p>
                <p className="font-medium">{booking.transactionId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Payment Method:</p>
                <p className="font-medium">{booking.paymentMethod}</p>
              </div>
            </div>
            {/* Venue Details */}
            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">Venue Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Venue:</p>
                  <p className="font-medium">{booking.venue.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Type:</p>
                  <p className="font-medium">{booking.venue.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Location:</p>
                  <p className="font-medium">{booking.venue.location}</p>
                </div>
              </div>
            </div>
            {/* Booking Details */}
            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">Booking Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Date:</p>
                  <p className="font-medium">{booking.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Time:</p>
                  <p className="font-medium">
                    {booking.startTime} - {booking.endTime}
                  </p>
                </div>
              </div>
              {booking.notes && <div className="mt-2">
                  <p className="text-sm text-gray-600">Notes:</p>
                  <p className="font-medium">{booking.notes}</p>
                </div>}
            </div>
            {/* Payment Details */}
            <div className="border-t pt-4">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-600">
                    <th className="py-2">Description</th>
                    <th className="py-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2">Venue Booking Fee</td>
                    <td className="py-2 text-right">
                      ${booking.amount.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
                <tfoot className="border-t">
                  <tr>
                    <td className="py-2 font-medium">Total</td>
                    <td className="py-2 text-right font-medium">
                      ${booking.amount.toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            {/* Footer */}
            <div className="border-t pt-4 text-center text-sm text-gray-600">
              <p>Thank you for your booking</p>
              <p>This is a computer generated receipt</p>
            </div>
          </div>
          {/* Print Button */}
          <div className="mt-6 flex justify-end">
            <button onClick={handlePrint} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center">
              <PrinterIcon size={18} className="mr-2" />
              Print Receipt
            </button>
          </div>
        </div>
      </div>
    </div>;
};
export default VenuePaymentReceiptModal;
import React, { useState } from "react";
import { XIcon, CalendarIcon, ClockIcon, CreditCardIcon } from "lucide-react";
interface BookingConfirmDialogProps {
  venue: {
    id: string;
    name: string;
    type: string;
    location: string;
  };
  onClose: () => void;
  onConfirm: (bookingDetails: {
    date: string;
    startTime: string;
    endTime: string;
    notes: string;
    paymentMethod: string;
    amount: number;
  }) => void;
}
const BookingConfirmDialog: React.FC<BookingConfirmDialogProps> = ({
  venue,
  onClose,
  onConfirm
}) => {
  const [bookingDetails, setBookingDetails] = useState({
    date: "",
    startTime: "",
    endTime: "",
    notes: "",
    paymentMethod: "credit_card",
    amount: 500
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(bookingDetails);
  };
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-semibold text-gray-900">
            Confirm Venue Booking
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XIcon size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">
              {venue.name} - {venue.type}
            </h4>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input type="date" required className="w-full p-2 border border-gray-300 rounded-md" value={bookingDetails.date} onChange={e => setBookingDetails({
            ...bookingDetails,
            date: e.target.value
          })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Time
              </label>
              <input type="time" required className="w-full p-2 border border-gray-300 rounded-md" value={bookingDetails.startTime} onChange={e => setBookingDetails({
              ...bookingDetails,
              startTime: e.target.value
            })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Time
              </label>
              <input type="time" required className="w-full p-2 border border-gray-300 rounded-md" value={bookingDetails.endTime} onChange={e => setBookingDetails({
              ...bookingDetails,
              endTime: e.target.value
            })} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <div className="grid grid-cols-3 gap-4">
              <button type="button" onClick={() => setBookingDetails({
              ...bookingDetails,
              paymentMethod: "credit_card"
            })} className={`p-4 border rounded-md flex flex-col items-center space-y-2 ${bookingDetails.paymentMethod === "credit_card" ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}>
                <CreditCardIcon size={24} className={bookingDetails.paymentMethod === "credit_card" ? "text-blue-500" : "text-gray-400"} />
                <span className="text-sm">Credit Card</span>
              </button>
              <button type="button" onClick={() => setBookingDetails({
              ...bookingDetails,
              paymentMethod: "bank_transfer"
            })} className={`p-4 border rounded-md flex flex-col items-center space-y-2 ${bookingDetails.paymentMethod === "bank_transfer" ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}>
                <CalendarIcon size={24} className={bookingDetails.paymentMethod === "bank_transfer" ? "text-blue-500" : "text-gray-400"} />
                <span className="text-sm">Bank Transfer</span>
              </button>
              <button type="button" onClick={() => setBookingDetails({
              ...bookingDetails,
              paymentMethod: "cash"
            })} className={`p-4 border rounded-md flex flex-col items-center space-y-2 ${bookingDetails.paymentMethod === "cash" ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}>
                <CreditCardIcon size={24} className={bookingDetails.paymentMethod === "cash" ? "text-blue-500" : "text-gray-400"} />
                <span className="text-sm">Cash</span>
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount Due
            </label>
            <div className="text-2xl font-bold text-gray-900">
              ${bookingDetails.amount.toFixed(2)}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Notes
            </label>
            <textarea className="w-full p-2 border border-gray-300 rounded-md" rows={3} value={bookingDetails.notes} onChange={e => setBookingDetails({
            ...bookingDetails,
            notes: e.target.value
          })} />
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Pay & Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>;
};
export default BookingConfirmDialog;
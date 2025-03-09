import React, { useState, memo } from "react";
import { toast } from "sonner";
import { XIcon, UsersIcon, CalendarIcon, MapPinIcon, CheckCircleIcon, XCircleIcon, ClockIcon } from "lucide-react";
import BookingConfirmDialog from "./BookingConfirmDialog";
import VenuePaymentReceiptModal from "./VenuePaymentReceiptModal";
interface Venue {
  id: string;
  name: string;
  type: string;
  capacity: number;
  location: string;
  description: string;
  amenities: string[];
  available: boolean;
  nextAvailable?: string;
  imageUrl: string;
}
interface VenueViewModalProps {
  onClose: () => void;
}
const VenueViewModal: React.FC<VenueViewModalProps> = ({
  onClose
}) => {
  const [venues, setVenues] = useState<Venue[]>([{
    id: "venue1",
    name: "Main Chapel",
    type: "Chapel",
    capacity: 200,
    location: "Main Building, Ground Floor",
    description: "Our largest chapel with modern amenities and traditional design",
    amenities: ["Air Conditioning", "Audio System", "Projector", "Organ"],
    available: true,
    imageUrl: "https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&w=600"
  }, {
    id: "venue2",
    name: "Memorial Hall",
    type: "Hall",
    capacity: 150,
    location: "East Wing",
    description: "Versatile space suitable for memorial services and gatherings",
    amenities: ["Air Conditioning", "Catering Area", "Audio System"],
    available: false,
    nextAvailable: "2024-01-20",
    imageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=600"
  }, {
    id: "venue3",
    name: "Garden Chapel",
    type: "Chapel",
    capacity: 100,
    location: "Garden Area",
    description: "Beautiful outdoor chapel surrounded by nature",
    amenities: ["Natural Setting", "Covered Area", "Audio System"],
    available: true,
    imageUrl: "https://images.unsplash.com/photo-1468824357306-a439d58ccb1c?auto=format&fit=crop&w=600"
  }]);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [showPaymentReceipt, setShowPaymentReceipt] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<any>(null);
  const handleBookVenue = (venue: Venue) => {
    setSelectedVenue(venue);
    setShowBookingDialog(true);
  };
  const handleConfirmBooking = (bookingDetails: {
    date: string;
    startTime: string;
    endTime: string;
    notes: string;
    paymentMethod: string;
    amount: number;
  }) => {
    try {
      const bookingId = `BK${Date.now()}`;
      const transactionId = `TX${Date.now()}`;
      const booking = {
        id: bookingId,
        venue: selectedVenue,
        ...bookingDetails,
        paymentDate: new Date().toISOString(),
        transactionId
      };
      setVenues(currentVenues => currentVenues.map(venue => venue.id === selectedVenue?.id ? {
        ...venue,
        available: false,
        nextAvailable: bookingDetails.date
      } : venue));
      setCurrentBooking(booking);
      setShowBookingDialog(false);
      setShowPaymentReceipt(true);
      toast.success("Venue booked successfully", {
        description: `Payment received and ${selectedVenue?.name} has been booked for ${bookingDetails.date}`
      });
    } catch (error) {
      toast.error("Failed to book venue", {
        description: "Please try again later"
      });
    }
  };
  return <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 w-full max-w-4xl">
        <div className="relative bg-white rounded-lg shadow-xl">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800">
              Available Venues
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <XIcon size={24} />
            </button>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {venues.map(venue => <div key={venue.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img src={venue.imageUrl} alt={venue.name} className="h-48 w-full object-cover" />
                    </div>
                    <div className="p-6 md:w-2/3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">
                            {venue.name}
                          </h3>
                          <p className="text-sm text-gray-500">{venue.type}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${venue.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                          {venue.available ? "Available" : "Occupied"}
                        </span>
                      </div>
                      <p className="mt-2 text-gray-600">{venue.description}</p>
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="flex items-center text-gray-600">
                          <UsersIcon size={16} className="mr-2" />
                          Capacity: {venue.capacity}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPinIcon size={16} className="mr-2" />
                          {venue.location}
                        </div>
                      </div>
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900">
                          Amenities
                        </h4>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {venue.amenities.map((amenity, index) => <span key={index} className="px-2 py-1 bg-gray-100 rounded-md text-sm text-gray-600">
                              {amenity}
                            </span>)}
                        </div>
                      </div>
                      {!venue.available && venue.nextAvailable && <div className="mt-4 flex items-center text-gray-600">
                          <CalendarIcon size={16} className="mr-2" />
                          Next Available: {venue.nextAvailable}
                        </div>}
                      <div className="mt-4">
                        <button onClick={() => venue.available && handleBookVenue(venue)} className={`px-4 py-2 rounded-md ${venue.available ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`} disabled={!venue.available}>
                          {venue.available ? "Book Venue" : "Not Available"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>)}
            </div>
          </div>
        </div>
      </div>
      {showBookingDialog && selectedVenue && <BookingConfirmDialog venue={selectedVenue} onClose={() => setShowBookingDialog(false)} onConfirm={handleConfirmBooking} />}
      {showPaymentReceipt && currentBooking && <VenuePaymentReceiptModal booking={currentBooking} onClose={() => {
      setShowPaymentReceipt(false);
      setCurrentBooking(null);
      setSelectedVenue(null);
    }} />}
    </div>;
};
export default VenueViewModal;
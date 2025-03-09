import React, { useState } from "react";
import { toast } from "sonner";
import { MapPinIcon, ClockIcon, UserIcon, TruckIcon, ShareIcon, PhoneIcon, MailIcon, MessageSquareIcon, AlertCircleIcon, CheckCircleIcon, MoreVerticalIcon, CalendarIcon, GaugeIcon, AlertTriangleIcon, XCircleIcon, InfoIcon } from "lucide-react";
import Modal from "../common/Modal";
interface StatusUpdate {
  status: string;
  timestamp: string;
  notes: string;
  updatedBy: string;
}
interface TripStatus {
  value: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  requiresNotes: boolean;
  allowedFrom: string[];
}
const TRIP_STATUSES: TripStatus[] = [{
  value: "Not Started",
  label: "Not Started",
  description: "Trip has been scheduled but hasn't begun",
  icon: <ClockIcon className="h-5 w-5" />,
  color: "bg-gray-100 text-gray-800",
  requiresNotes: false,
  allowedFrom: ["Cancelled"]
}, {
  value: "In Progress",
  label: "In Progress",
  description: "Vehicle is en route",
  icon: <TruckIcon className="h-5 w-5" />,
  color: "bg-blue-100 text-blue-800",
  requiresNotes: false,
  allowedFrom: ["Not Started", "Delayed"]
}, {
  value: "Delayed",
  label: "Delayed",
  description: "Trip is experiencing delays",
  icon: <AlertCircleIcon className="h-5 w-5" />,
  color: "bg-yellow-100 text-yellow-800",
  requiresNotes: true,
  allowedFrom: ["Not Started", "In Progress"]
}, {
  value: "Completed",
  label: "Completed",
  description: "Trip has been successfully completed",
  icon: <CheckCircleIcon className="h-5 w-5" />,
  color: "bg-green-100 text-green-800",
  requiresNotes: false,
  allowedFrom: ["In Progress"]
}, {
  value: "Cancelled",
  label: "Cancelled",
  description: "Trip has been cancelled",
  icon: <XCircleIcon className="h-5 w-5" />,
  color: "bg-red-100 text-red-800",
  requiresNotes: true,
  allowedFrom: ["Not Started", "Delayed"]
}];
interface ActiveTripModalProps {
  trip: any;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (tripId: string, status: string) => void;
}
const ActiveTripModal: React.FC<ActiveTripModalProps> = ({
  trip,
  isOpen,
  onClose,
  onUpdateStatus
}) => {
  const [sharing, setSharing] = useState({
    email: "",
    phone: ""
  });
  const [newStatus, setNewStatus] = useState(trip.status);
  const [statusNote, setStatusNote] = useState("");
  const [showStatusConfirmation, setShowStatusConfirmation] = useState(false);
  const [statusHistory, setStatusHistory] = useState<StatusUpdate[]>(trip.statusHistory || []);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const currentStatus = TRIP_STATUSES.find(s => s.value === trip.status);
  const selectedStatus = TRIP_STATUSES.find(s => s.value === newStatus);
  const isValidStatusTransition = (fromStatus: string, toStatus: string) => {
    const toStatusConfig = TRIP_STATUSES.find(s => s.value === toStatus);
    return toStatusConfig?.allowedFrom.includes(fromStatus) || false;
  };
  const handleStatusUpdate = () => {
    if (!isValidStatusTransition(trip.status, newStatus)) {
      toast.error(`Cannot update status from ${trip.status} to ${newStatus}`);
      return;
    }
    const selectedStatusConfig = TRIP_STATUSES.find(s => s.value === newStatus);
    if (selectedStatusConfig?.requiresNotes && !statusNote.trim()) {
      toast.error("Notes are required for this status change");
      return;
    }
    setShowStatusConfirmation(true);
  };
  const confirmStatusUpdate = () => {
    const newStatusUpdate: StatusUpdate = {
      status: newStatus,
      timestamp: new Date().toISOString(),
      notes: statusNote,
      updatedBy: "Current User"
    };
    onUpdateStatus(trip.id, newStatus);
    setStatusHistory([...statusHistory, newStatusUpdate]);
    setShowStatusConfirmation(false);
    setStatusNote("");
    toast.success("Trip status updated successfully", {
      description: `Status changed to ${newStatus}`
    });
  };
  const handleShare = (method: "email" | "sms") => {
    if (method === "email" && sharing.email) {
      toast.success(`Trip details shared to ${sharing.email}`);
      setSharing({
        ...sharing,
        email: ""
      });
    } else if (method === "sms" && sharing.phone) {
      toast.success(`Trip details shared to ${sharing.phone}`);
      setSharing({
        ...sharing,
        phone: ""
      });
    }
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Delayed":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const progressSteps = [{
    id: 1,
    title: "Trip Started",
    time: trip.startTime,
    completed: true
  }, {
    id: 2,
    title: "In Transit",
    time: "Current",
    completed: trip.status !== "Not Started"
  }, {
    id: 3,
    title: "Arrived at Destination",
    time: trip.eta,
    completed: trip.status === "Completed"
  }];
  return <Modal isOpen={isOpen} onClose={onClose} title="Trip Details" maxWidth="max-w-4xl">
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-blue-50 rounded-lg">
                <TruckIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Vehicle</p>
                <p className="font-medium">{trip.vehicle}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-green-50 rounded-lg">
                <GaugeIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Distance</p>
                <p className="font-medium">23.5 km</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-purple-50 rounded-lg">
                <ClockIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-medium">45 mins</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-gray-900">Update Status</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${currentStatus?.color}`}>
              {currentStatus?.icon}
              <span className="ml-2">{trip.status}</span>
            </span>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {TRIP_STATUSES.map(status => <button key={status.value} onClick={() => setNewStatus(status.value)} disabled={!isValidStatusTransition(trip.status, status.value)} className={`p-4 rounded-lg border ${newStatus === status.value ? "border-blue-500 bg-blue-50" : !isValidStatusTransition(trip.status, status.value) ? "border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed" : "border-gray-200 hover:border-blue-200"}`}>
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${status.color}`}>
                      {status.icon}
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">
                        {status.label}
                      </p>
                      <p className="text-sm text-gray-500">
                        {status.description}
                      </p>
                    </div>
                  </div>
                </button>)}
            </div>
            {selectedStatus?.requiresNotes && <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status Notes <span className="text-red-500">*</span>
                </label>
                <textarea rows={3} className="w-full border border-gray-300 rounded-md shadow-sm p-2" value={statusNote} onChange={e => setStatusNote(e.target.value)} placeholder="Please provide details about this status change..." />
              </div>}
            <div className="flex justify-end space-x-4">
              <button onClick={handleStatusUpdate} disabled={newStatus === trip.status} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center">
                Update Status
              </button>
            </div>
          </div>
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-900 mb-4">
              Status History
            </h4>
            <div className="space-y-4">
              {statusHistory.map((update, index) => <div key={index} className="flex items-start space-x-3 text-sm">
                  <div className={`p-2 rounded-full ${TRIP_STATUSES.find(s => s.value === update.status)?.color}`}>
                    {TRIP_STATUSES.find(s => s.value === update.status)?.icon}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{update.status}</p>
                    <p className="text-gray-500">
                      {new Date(update.timestamp).toLocaleString()} by{" "}
                      {update.updatedBy}
                    </p>
                    {update.notes && <p className="text-gray-600 mt-1">{update.notes}</p>}
                  </div>
                </div>)}
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-6">
            Trip Details
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPinIcon className="mt-1 h-5 w-5 text-gray-400" />
                <div className="ml-3">
                  <p className="text-sm text-gray-500">Pickup Location</p>
                  <p className="font-medium">
                    {trip.startLocation || "Main Office"}
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPinIcon className="mt-1 h-5 w-5 text-gray-400" />
                <div className="ml-3">
                  <p className="text-sm text-gray-500">Destination</p>
                  <p className="font-medium">{trip.destination}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <UserIcon className="mt-1 h-5 w-5 text-gray-400" />
                <div className="ml-3">
                  <p className="text-sm text-gray-500">Driver</p>
                  <p className="font-medium">{trip.driver}</p>
                </div>
              </div>
              <div className="flex items-start">
                <CalendarIcon className="mt-1 h-5 w-5 text-gray-400" />
                <div className="ml-3">
                  <p className="text-sm text-gray-500">Schedule</p>
                  <p className="font-medium">
                    {trip.startTime} - {trip.eta}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-gray-900">
              Share Trip Details
            </h3>
            <button onClick={() => setShowShareOptions(!showShareOptions)} className="text-gray-400 hover:text-gray-600">
              <MoreVerticalIcon className="h-5 w-5" />
            </button>
          </div>
          {showShareOptions && <div className="space-y-4">
              <div className="flex space-x-4">
                <input type="email" placeholder="Enter email address" className="flex-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={sharing.email} onChange={e => setSharing({
              ...sharing,
              email: e.target.value
            })} />
                <button onClick={() => handleShare("email")} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center">
                  <MailIcon className="h-4 w-4 mr-2" />
                  Share via Email
                </button>
              </div>
              <div className="flex space-x-4">
                <input type="tel" placeholder="Enter phone number" className="flex-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={sharing.phone} onChange={e => setSharing({
              ...sharing,
              phone: e.target.value
            })} />
                <button onClick={() => handleShare("sms")} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center">
                  <MessageSquareIcon className="h-4 w-4 mr-2" />
                  Share via SMS
                </button>
              </div>
            </div>}
        </div>
      </div>
      {showStatusConfirmation && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Confirm Status Update
            </h3>
            <p className="text-gray-500 mb-4">
              Are you sure you want to change the status from "{trip.status}" to
              "{newStatus}"?
            </p>
            {statusNote && <div className="mb-4 p-3 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-600">{statusNote}</p>
              </div>}
            <div className="flex justify-end space-x-4">
              <button onClick={() => setShowStatusConfirmation(false)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={confirmStatusUpdate} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Confirm Update
              </button>
            </div>
          </div>
        </div>}
    </Modal>;
};
export default ActiveTripModal;
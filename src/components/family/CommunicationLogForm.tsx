import React, { useState } from "react";
import { XIcon, PhoneIcon, MailIcon, MessageSquareIcon, UserIcon } from "lucide-react";
interface CommunicationLogFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
  familyContact?: {
    id: string;
    name: string;
  };
}
const CommunicationLogForm: React.FC<CommunicationLogFormProps> = ({
  onClose,
  onSubmit,
  familyContact
}) => {
  const [formData, setFormData] = useState({
    type: "phone",
    date: new Date().toISOString().split("T")[0],
    time: new Date().toTimeString().slice(0, 5),
    duration: "",
    summary: "",
    followUpRequired: false,
    followUpDate: "",
    followUpNotes: "",
    status: "completed"
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  return <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 w-full max-w-md">
        <div className="relative bg-white rounded-lg shadow-xl">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-xl font-bold text-gray-800">
              Log Communication
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <XIcon size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {familyContact && <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <UserIcon className="text-gray-500" size={20} />
                <div>
                  <p className="font-medium text-gray-900">
                    {familyContact.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    ID: {familyContact.id}
                  </p>
                </div>
              </div>}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Communication Type
                </label>
                <div className="mt-2 grid grid-cols-3 gap-3">
                  <button type="button" onClick={() => setFormData({
                  ...formData,
                  type: "phone"
                })} className={`flex flex-col items-center justify-center p-3 border rounded-md ${formData.type === "phone" ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}>
                    <PhoneIcon size={20} className={formData.type === "phone" ? "text-blue-500" : "text-gray-400"} />
                    <span className="mt-1 text-sm">Phone</span>
                  </button>
                  <button type="button" onClick={() => setFormData({
                  ...formData,
                  type: "email"
                })} className={`flex flex-col items-center justify-center p-3 border rounded-md ${formData.type === "email" ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}>
                    <MailIcon size={20} className={formData.type === "email" ? "text-blue-500" : "text-gray-400"} />
                    <span className="mt-1 text-sm">Email</span>
                  </button>
                  <button type="button" onClick={() => setFormData({
                  ...formData,
                  type: "in_person"
                })} className={`flex flex-col items-center justify-center p-3 border rounded-md ${formData.type === "in_person" ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}>
                    <MessageSquareIcon size={20} className={formData.type === "in_person" ? "text-blue-500" : "text-gray-400"} />
                    <span className="mt-1 text-sm">In Person</span>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <input type="date" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.date} onChange={e => setFormData({
                  ...formData,
                  date: e.target.value
                })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Time
                  </label>
                  <input type="time" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.time} onChange={e => setFormData({
                  ...formData,
                  time: e.target.value
                })} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Duration (minutes)
                </label>
                <input type="number" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.duration} onChange={e => setFormData({
                ...formData,
                duration: e.target.value
              })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Summary
                </label>
                <textarea rows={3} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.summary} onChange={e => setFormData({
                ...formData,
                summary: e.target.value
              })} />
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" checked={formData.followUpRequired} onChange={e => setFormData({
                ...formData,
                followUpRequired: e.target.checked
              })} className="rounded text-blue-600" />
                <label className="text-sm font-medium text-gray-700">
                  Follow-up Required
                </label>
              </div>
              {formData.followUpRequired && <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Follow-up Date
                    </label>
                    <input type="date" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.followUpDate} onChange={e => setFormData({
                  ...formData,
                  followUpDate: e.target.value
                })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Follow-up Notes
                    </label>
                    <textarea rows={2} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.followUpNotes} onChange={e => setFormData({
                  ...formData,
                  followUpNotes: e.target.value
                })} />
                  </div>
                </div>}
            </div>
            <div className="flex justify-end space-x-4">
              <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Save Communication
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>;
};
export default CommunicationLogForm;
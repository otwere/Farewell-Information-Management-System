import React, { useState, Fragment } from "react";
import { ClockIcon, ThermometerIcon, BeakerIcon, UserIcon, FileTextIcon, CheckSquareIcon, CameraIcon, AlertCircleIcon, HeartPulseIcon, TimerIcon, CalendarIcon, ClipboardListIcon } from "lucide-react";
import { Card, CardHeader, CardContent } from "../common/Card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
interface EmbalmentCase {
  id: string;
  deceased: string;
  startTime: string;
  status: string;
  assignedTo: string;
  temperature: string;
  chemicalsUsed: {
    name: string;
    concentration: number;
    amount: number;
    maxAmount: number;
  }[];
  vitalSigns: {
    timestamp: string;
    temperature: number;
    humidity: number;
    preservationIndex: number;
  }[];
  procedures: {
    name: string;
    completed: boolean;
    timestamp?: string;
    notes?: string;
    performedBy?: string;
  }[];
  timeline: {
    action: string;
    timestamp: string;
    user: string;
    notes?: string;
  }[];
  qualityChecks: {
    name: string;
    status: "passed" | "failed" | "pending";
    checkedBy?: string;
    timestamp?: string;
    notes?: string;
  }[];
  photos: {
    id: string;
    url: string;
    timestamp: string;
    description: string;
  }[];
  notes: {
    id: string;
    text: string;
    timestamp: string;
    author: string;
    category: "general" | "technical" | "observation";
  }[];
}
interface EmbalmentDetailsProps {
  caseData: EmbalmentCase;
  onClose: () => void;
}
const EmbalmentDetails: React.FC<EmbalmentDetailsProps> = ({
  caseData,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  const calculateTimeElapsed = (startTime: string) => {
    const start = new Date(startTime).getTime();
    const now = new Date().getTime();
    const elapsed = now - start;
    const hours = Math.floor(elapsed / (1000 * 60 * 60));
    const minutes = Math.floor(elapsed % (1000 * 60 * 60) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };
  return <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 w-full max-w-6xl">
        <div className="bg-white rounded-lg shadow-xl">
          <div className="flex justify-between items-center p-6 border-b">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Case Details - {caseData.id}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Time Elapsed: {calculateTimeElapsed(caseData.startTime)}
              </p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              ×
            </button>
          </div>
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {[{
              id: "overview",
              label: "Overview",
              icon: ClipboardListIcon
            }, {
              id: "monitoring",
              label: "Monitoring",
              icon: HeartPulseIcon
            }, {
              id: "procedures",
              label: "Procedures",
              icon: CheckSquareIcon
            }, {
              id: "chemicals",
              label: "Chemicals",
              icon: BeakerIcon
            }, {
              id: "photos",
              label: "Photos",
              icon: CameraIcon
            }, {
              id: "notes",
              label: "Notes",
              icon: FileTextIcon
            }].map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`group inline-flex items-center px-6 py-4 border-b-2 font-medium text-sm ${activeTab === tab.id ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}>
                  <tab.icon className={`mr-2 h-5 w-5 ${activeTab === tab.id ? "text-blue-500" : "text-gray-400 group-hover:text-gray-500"}`} />
                  {tab.label}
                </button>)}
            </nav>
          </div>
          <div className="p-6">
            {activeTab === "overview" && <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <h4 className="text-lg font-medium">Case Information</h4>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <UserIcon className="w-5 h-5 text-gray-400 mr-2" />
                        <div>
                          <p className="text-sm text-gray-500">Deceased</p>
                          <p className="font-medium">{caseData.deceased}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="w-5 h-5 text-gray-400 mr-2" />
                        <div>
                          <p className="text-sm text-gray-500">Start Time</p>
                          <p className="font-medium">{caseData.startTime}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <UserIcon className="w-5 h-5 text-gray-400 mr-2" />
                        <div>
                          <p className="text-sm text-gray-500">Assigned To</p>
                          <p className="font-medium">{caseData.assignedTo}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <h4 className="text-lg font-medium">Quality Control</h4>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {caseData.qualityChecks.map((check, index) => <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${check.status === "passed" ? "bg-green-50" : check.status === "failed" ? "bg-red-50" : "bg-gray-50"}`}>
                          <div className="flex items-center">
                            <CheckSquareIcon className={`w-5 h-5 mr-2 ${check.status === "passed" ? "text-green-500" : check.status === "failed" ? "text-red-500" : "text-gray-400"}`} />
                            <div>
                              <p className="text-sm font-medium">
                                {check.name}
                              </p>
                              {check.timestamp && <p className="text-xs text-gray-500">
                                  {check.timestamp}
                                </p>}
                            </div>
                          </div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${check.status === "passed" ? "bg-green-100 text-green-800" : check.status === "failed" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"}`}>
                            {check.status}
                          </span>
                        </div>)}
                    </div>
                  </CardContent>
                </Card>
              </div>}
            {activeTab === "monitoring" && <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <h4 className="text-lg font-medium">
                      Temperature Monitoring
                    </h4>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={caseData.vitalSigns} margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5
                    }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="timestamp" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="temperature" stroke="#3b82f6" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {caseData.vitalSigns.slice(-1).map((vitals, index) => <Fragment key={index}>
                      <Card>
                        <CardContent>
                          <div className="flex items-center">
                            <ThermometerIcon className="w-8 h-8 text-blue-500 mr-3" />
                            <div>
                              <p className="text-sm text-gray-500">
                                Temperature
                              </p>
                              <p className="text-2xl font-semibold">
                                {vitals.temperature}°F
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent>
                          <div className="flex items-center">
                            <BeakerIcon className="w-8 h-8 text-green-500 mr-3" />
                            <div>
                              <p className="text-sm text-gray-500">Humidity</p>
                              <p className="text-2xl font-semibold">
                                {vitals.humidity}%
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent>
                          <div className="flex items-center">
                            <HeartPulseIcon className="w-8 h-8 text-purple-500 mr-3" />
                            <div>
                              <p className="text-sm text-gray-500">
                                Preservation Index
                              </p>
                              <p className="text-2xl font-semibold">
                                {vitals.preservationIndex}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Fragment>)}
                </div>
              </div>}
            {activeTab === "procedures" && <div className="space-y-6">
                {caseData.procedures.map((procedure, index) => <div key={index} className={`p-4 rounded-lg border ${procedure.completed ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CheckSquareIcon className={`w-6 h-6 mr-3 ${procedure.completed ? "text-green-500" : "text-gray-400"}`} />
                        <div>
                          <h4 className="font-medium">{procedure.name}</h4>
                          {procedure.timestamp && <p className="text-sm text-gray-500">
                              {procedure.timestamp}
                            </p>}
                        </div>
                      </div>
                      {procedure.performedBy && <div className="text-sm text-gray-500">
                          By: {procedure.performedBy}
                        </div>}
                    </div>
                    {procedure.notes && <p className="mt-2 text-sm text-gray-600">
                        {procedure.notes}
                      </p>}
                  </div>)}
              </div>}
            {activeTab === "chemicals" && <div className="space-y-6">
                {caseData.chemicalsUsed.map((chemical, index) => <div key={index} className="p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <BeakerIcon className="w-5 h-5 text-blue-500 mr-2" />
                        <h4 className="font-medium">{chemical.name}</h4>
                      </div>
                      <span className="text-sm text-gray-500">
                        {chemical.concentration}%
                      </span>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Usage</span>
                        <span>
                          {chemical.amount}/{chemical.maxAmount} units
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 rounded-full h-2" style={{
                    width: `${chemical.amount / chemical.maxAmount * 100}%`
                  }}></div>
                      </div>
                    </div>
                  </div>)}
              </div>}
            {activeTab === "photos" && <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {caseData.photos.map(photo => <div key={photo.id} className="border rounded-lg overflow-hidden">
                    <img src={photo.url} alt={photo.description} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <p className="text-sm text-gray-900">
                        {photo.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {photo.timestamp}
                      </p>
                    </div>
                  </div>)}
              </div>}
            {activeTab === "notes" && <div className="space-y-4">
                {caseData.notes.map(note => <div key={note.id} className="p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${note.category === "technical" ? "bg-blue-100 text-blue-800" : note.category === "observation" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                        {note.category}
                      </span>
                      <div className="text-sm text-gray-500">
                        {note.timestamp}
                      </div>
                    </div>
                    <p className="text-gray-800">{note.text}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      By: {note.author}
                    </p>
                  </div>)}
              </div>}
          </div>
        </div>
      </div>
    </div>;
};
export default EmbalmentDetails;
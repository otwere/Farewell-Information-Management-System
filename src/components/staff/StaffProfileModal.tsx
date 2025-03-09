import React, { useState } from "react";
import { XIcon, UserIcon, MailIcon, PhoneIcon, CalendarIcon, ClockIcon, AwardIcon, FileTextIcon, CheckCircleIcon, AlertCircleIcon, BriefcaseIcon, StarIcon, ClipboardListIcon, BoxIcon } from "lucide-react";
import { toast } from "sonner";
import Modal from "../common/Modal";
interface StaffProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: any;
  onUpdateEmployee: (employeeId: string, data: any) => void;
}
const StaffProfileModal: React.FC<StaffProfileModalProps> = ({
  isOpen,
  onClose,
  employee,
  onUpdateEmployee
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [leaveRequests] = useState([{
    id: "LR001",
    type: "Vacation",
    startDate: "2024-01-15",
    endDate: "2024-01-20",
    status: "Pending",
    requestedOn: "2024-01-02"
  }, {
    id: "LR002",
    type: "Sick Leave",
    startDate: "2023-12-10",
    endDate: "2023-12-12",
    status: "Approved",
    requestedOn: "2023-12-09"
  }]);
  const [schedules] = useState([{
    id: "SCH001",
    date: "2024-01-15",
    shift: "Morning (8AM-4PM)",
    role: "Embalmer",
    location: "Main Facility"
  }, {
    id: "SCH002",
    date: "2024-01-16",
    shift: "Evening (4PM-12AM)",
    role: "Embalmer",
    location: "East Branch"
  }]);
  const [performanceMetrics] = useState({
    serviceQuality: 4.8,
    attendance: 98,
    taskCompletion: 95,
    clientFeedback: 4.7,
    recentEvaluations: [{
      date: "2023-12",
      score: 4.8,
      evaluator: "John Manager",
      comments: "Excellent work ethic and attention to detail"
    }, {
      date: "2023-11",
      score: 4.6,
      evaluator: "Sarah Supervisor",
      comments: "Great team player, consistently meets deadlines"
    }]
  });
  const handleLeaveAction = (leaveId: string, action: "approve" | "reject") => {
    toast.success(`Leave request ${action === "approve" ? "approved" : "rejected"}`);
  };
  const handleScheduleUpdate = (scheduleId: string, data: any) => {
    toast.success("Schedule updated successfully");
  };
  const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      toast.success("Document uploaded successfully");
    }
  };
  return <Modal isOpen={isOpen} onClose={onClose} title="Staff Profile" maxWidth="max-w-5xl">
      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          <div className="bg-gray-100 p-4 rounded-full">
            <UserIcon size={40} className="text-gray-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {employee.name}
            </h2>
            <div className="mt-1 space-y-1">
              <p className="text-gray-500 flex items-center">
                <BriefcaseIcon size={16} className="mr-2" />
                {employee.role} • {employee.department}
              </p>
              <p className="text-gray-500 flex items-center">
                <MailIcon size={16} className="mr-2" />
                {employee.email}
              </p>
              <p className="text-gray-500 flex items-center">
                <PhoneIcon size={16} className="mr-2" />
                {employee.contact}
              </p>
            </div>
          </div>
          <div className="ml-auto">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${employee.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
              {employee.status}
            </span>
          </div>
        </div>
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {[{
            id: "overview",
            label: "Overview",
            icon: UserIcon
          }, {
            id: "schedule",
            label: "Schedule",
            icon: CalendarIcon
          }, {
            id: "leave",
            label: "Leave Requests",
            icon: ClockIcon
          }, {
            id: "performance",
            label: "Performance",
            icon: BoxIcon
          }, {
            id: "documents",
            label: "Documents",
            icon: FileTextIcon
          }].map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center px-3 py-4 border-b-2 text-sm font-medium ${activeTab === tab.id ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}>
                <tab.icon size={16} className="mr-2" />
                {tab.label}
              </button>)}
          </nav>
        </div>
        <div className="mt-6">
          {activeTab === "overview" && <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Personal Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">
                        Join Date
                      </label>
                      <p className="mt-1">{employee.joinDate}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">
                        Shift
                      </label>
                      <p className="mt-1">{employee.shift}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">
                        Certifications
                      </label>
                      <div className="mt-1 space-y-2">
                        {employee.certifications.map((cert: string, index: number) => <div key={index} className="flex items-center text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full w-fit">
                              <AwardIcon size={14} className="mr-2" />
                              {cert}
                            </div>)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Quick Stats
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Attendance Rate</p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {performanceMetrics.attendance}%
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Task Completion</p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {performanceMetrics.taskCompletion}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Upcoming Schedule
                  </h3>
                  <div className="space-y-4">
                    {schedules.map(schedule => <div key={schedule.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">
                            {schedule.date}
                          </p>
                          <p className="text-sm text-gray-500">
                            {schedule.shift}
                          </p>
                        </div>
                        <span className="text-sm text-gray-500">
                          {schedule.location}
                        </span>
                      </div>)}
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Recent Evaluations
                  </h3>
                  <div className="space-y-4">
                    {performanceMetrics.recentEvaluations.map((evaluation, index) => <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-gray-900">
                                {evaluation.evaluator}
                              </p>
                              <p className="text-sm text-gray-500">
                                {evaluation.date}
                              </p>
                            </div>
                            <div className="flex items-center">
                              <StarIcon size={16} className="text-yellow-400 mr-1" />
                              <span className="font-medium">
                                {evaluation.score}
                              </span>
                            </div>
                          </div>
                          <p className="mt-2 text-sm text-gray-600">
                            {evaluation.comments}
                          </p>
                        </div>)}
                  </div>
                </div>
              </div>
            </div>}
          {activeTab === "schedule" && <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">
                  Work Schedule
                </h3>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Modify Schedule
                </button>
              </div>
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Shift
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Location
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {schedules.map(schedule => <tr key={schedule.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {schedule.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {schedule.shift}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {schedule.role}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {schedule.location}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button onClick={() => handleScheduleUpdate(schedule.id, {})} className="text-blue-600 hover:text-blue-900">
                              Edit
                            </button>
                          </td>
                        </tr>)}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>}
          {activeTab === "leave" && <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">
                  Leave Requests
                </h3>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  New Request
                </button>
              </div>
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Duration
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Requested On
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {leaveRequests.map(request => <tr key={request.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {request.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {request.startDate} to {request.endDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {request.requestedOn}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${request.status === "Approved" ? "bg-green-100 text-green-800" : request.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>
                              {request.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {request.status === "Pending" && <div className="space-x-2">
                                <button onClick={() => handleLeaveAction(request.id, "approve")} className="text-green-600 hover:text-green-900">
                                  Approve
                                </button>
                                <button onClick={() => handleLeaveAction(request.id, "reject")} className="text-red-600 hover:text-red-900">
                                  Reject
                                </button>
                              </div>}
                          </td>
                        </tr>)}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>}
          {activeTab === "performance" && <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">Service Quality</p>
                    <span className="flex items-center text-yellow-500">
                      <StarIcon size={16} className="mr-1" />
                      {performanceMetrics.serviceQuality}
                    </span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">Attendance Rate</p>
                    <span className="text-green-600">
                      {performanceMetrics.attendance}%
                    </span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">Task Completion</p>
                    <span className="text-blue-600">
                      {performanceMetrics.taskCompletion}%
                    </span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">Client Feedback</p>
                    <span className="flex items-center text-yellow-500">
                      <StarIcon size={16} className="mr-1" />
                      {performanceMetrics.clientFeedback}
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Performance History
                </h3>
                <div className="space-y-4">
                  {performanceMetrics.recentEvaluations.map((evaluation, index) => <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900">
                              Monthly Evaluation - {evaluation.date}
                            </p>
                            <p className="text-sm text-gray-500">
                              By {evaluation.evaluator}
                            </p>
                          </div>
                          <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                            <StarIcon size={16} className="text-yellow-400 mr-1" />
                            <span className="font-medium">
                              {evaluation.score}
                            </span>
                          </div>
                        </div>
                        <p className="mt-2 text-sm text-gray-600">
                          {evaluation.comments}
                        </p>
                      </div>)}
                </div>
              </div>
            </div>}
          {activeTab === "documents" && <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Documents</h3>
                <label className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer">
                  <input type="file" className="hidden" onChange={handleDocumentUpload} />
                  Upload Document
                </label>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="space-y-4">
                  {employee.certifications.map((cert: string, index: number) => <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <FileTextIcon size={20} className="text-gray-400 mr-3" />
                          <div>
                            <p className="font-medium text-gray-900">{cert}</p>
                            <p className="text-sm text-gray-500">
                              Certification
                            </p>
                          </div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800">
                          View
                        </button>
                      </div>)}
                </div>
              </div>
            </div>}
        </div>
      </div>
    </Modal>;
};
export default StaffProfileModal;
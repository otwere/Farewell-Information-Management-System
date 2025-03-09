import React, { useState } from "react";
import { toast } from "sonner";
import { XIcon, CheckCircleIcon, AlertCircleIcon, ClockIcon, ThermometerIcon, BeakerIcon, FileTextIcon, UserIcon, DropletIcon, CheckIcon, ShieldIcon, PrinterIcon } from "lucide-react";
import PrintEmbalmentDetailsModal from "./PrintEmbalmentDetailsModal";
interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  type: "update" | "alert" | "note";
}
interface EmbalmentCaseModalProps {
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
  onUpdateStatus: (status: string) => void;
  onAddNote: (note: string) => void;
}
interface ApprovalStep {
  id: string;
  title: string;
  description: string;
  status: "pending" | "approved" | "completed";
  approvedBy?: string;
  approvedAt?: string;
  notes?: string;
  required: boolean;
}
const EmbalmentCaseModal: React.FC<EmbalmentCaseModalProps> = ({
  onClose,
  caseData,
  onUpdateStatus,
  onAddNote
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [newNote, setNewNote] = useState("");
  const [newStatus, setNewStatus] = useState(caseData.status);
  const [approvalSteps, setApprovalSteps] = useState<ApprovalStep[]>([{
    id: "step1",
    title: "Initial Assessment",
    description: "Physical examination and condition assessment",
    status: "pending",
    required: true
  }, {
    id: "step2",
    title: "Chemical Preparation",
    description: "Verification of chemical mixture and concentrations",
    status: "pending",
    required: true
  }, {
    id: "step3",
    title: "Arterial Injection",
    description: "Completion of arterial embalming process",
    status: "pending",
    required: true
  }, {
    id: "step4",
    title: "Cavity Treatment",
    description: "Thoracic and abdominal cavity treatment",
    status: "pending",
    required: true
  }, {
    id: "step5",
    title: "Feature Setting",
    description: "Facial and bodily feature setting",
    status: "pending",
    required: true
  }, {
    id: "step6",
    title: "Quality Check",
    description: "Final quality inspection and verification",
    status: "pending",
    required: true
  }]);
  const [approvalNote, setApprovalNote] = useState("");
  const timeline: TimelineEvent[] = [{
    time: "09:00 AM",
    title: "Process Started",
    description: "Initial preparation began",
    type: "update"
  }, {
    time: "09:15 AM",
    title: "Temperature Check",
    description: "Temperature recorded at 35°F",
    type: "update"
  }, {
    time: "09:30 AM",
    title: "Chemical Application",
    description: "First round of preservation chemicals applied",
    type: "update"
  }, {
    time: "10:00 AM",
    title: "Quality Check",
    description: "Initial preservation assessment completed",
    type: "alert"
  }];
  const qualityCheckpoints = [{
    id: 1,
    label: "Initial Assessment",
    completed: true
  }, {
    id: 2,
    label: "Chemical Application",
    completed: true
  }, {
    id: 3,
    label: "Tissue Color Check",
    completed: true
  }, {
    id: 4,
    label: "Feature Setting",
    completed: false
  }, {
    id: 5,
    label: "Final Inspection",
    completed: false
  }];
  const [showPrintModal, setShowPrintModal] = useState(false);
  const procedureDetails = {
    chemicalMixture: [{
      chemical: "Formaldehyde",
      concentration: "30%",
      amount: "2.5L"
    }, {
      chemical: "Methanol",
      concentration: "10%",
      amount: "1.0L"
    }, {
      chemical: "Phenol",
      concentration: "5%",
      amount: "0.5L"
    }],
    temperatureLogs: [{
      time: "09:00 AM",
      temperature: "35°F"
    }, {
      time: "10:00 AM",
      temperature: "34°F"
    }, {
      time: "11:00 AM",
      temperature: "35°F"
    }],
    techniques: ["Arterial Embalming via Right Carotid", "Cavity Treatment - Thoracic", "Cavity Treatment - Abdominal", "Multi-point Injection Method", "Restricted Cervical Injection"],
    observations: ["Good fluid distribution observed", "Tissue firmness achieved as expected", "Color restoration successful", "No complications during procedure"]
  };
  const handleStatusUpdate = () => {
    onUpdateStatus(newStatus);
    toast.success("Status Updated", {
      description: `Status has been updated to ${newStatus}`
    });
  };
  const handleAddNote = () => {
    if (newNote.trim()) {
      onAddNote(newNote);
      toast.success("Note Added", {
        description: "Your note has been added successfully"
      });
      setNewNote("");
    }
  };
  const handleStepApproval = (stepId: string) => {
    setApprovalSteps(steps => steps.map(step => {
      if (step.id === stepId) {
        const updatedStep = {
          ...step,
          status: "approved" as const,
          approvedBy: "Dr. Sarah Wilson",
          approvedAt: new Date().toISOString(),
          notes: approvalNote
        };
        toast.success(`${step.title} Approved`, {
          description: `Step has been approved by ${updatedStep.approvedBy}`
        });
        const isLastStep = steps.indexOf(step) === steps.length - 1;
        if (isLastStep) {
          toast.success("Embalming Process Completed", {
            description: "All required steps have been Approved"
          });
          onUpdateStatus("Completed");
        }
        return updatedStep;
      }
      return step;
    }));
    setApprovalNote("");
  };
  const handleStepCompletion = (stepId: string) => {
    setApprovalSteps(steps => steps.map(step => {
      if (step.id === stepId) {
        const updatedStep = {
          ...step,
          status: "completed" as const
        };
        toast.success(`${step.title} Completed`, {
          description: "Step has been marked as completed"
        });
        return updatedStep;
      }
      return step;
    }));
  };
  return <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Embalming Case Details
            </h2>
            <p className="text-gray-600">Case ID : {caseData.id}</p>
          </div>
          <div className="flex items-center space-x-2">
            {approvalSteps.every(step => step.status === "approved") && <button onClick={() => setShowPrintModal(true)} className="text-blue-600 hover:text-blue-700 flex items-center">
                <PrinterIcon size={20} className="mr-1" />
                Print Report
              </button>}
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <XIcon size={24} />
            </button>
          </div>
        </div>
        <div className="flex border-b">
          <button onClick={() => setActiveTab("overview")} className={`px-6 py-3 font-medium text-sm border-b-2 ${activeTab === "overview" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
            Overview
          </button>
          <button onClick={() => setActiveTab("timeline")} className={`px-6 py-3 font-medium text-sm border-b-2 ${activeTab === "timeline" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
            Timeline
          </button>
          <button onClick={() => setActiveTab("chemicals")} className={`px-6 py-3 font-medium text-sm border-b-2 ${activeTab === "chemicals" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
            Chemical Usage
          </button>
          <button onClick={() => setActiveTab("quality")} className={`px-6 py-3 font-medium text-sm border-b-2 ${activeTab === "quality" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
            Quality Control
          </button>
          <button onClick={() => setActiveTab("approvals")} className={`px-6 py-3 font-medium text-sm border-b-2 ${activeTab === "approvals" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
            Approvals
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-12rem)]">
          {activeTab === "overview" && <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-4">
                    <UserIcon className="text-gray-500 mr-2" size={20} />
                    <h3 className="font-medium text-gray-900">
                      Case Information
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Deceased</p>
                      <p className="font-medium">{caseData.deceased}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Assigned To</p>
                      <p className="font-medium">{caseData.assignedTo}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Start Time</p>
                      <p className="font-medium">{caseData.startTime}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-4">
                    <ThermometerIcon className="text-gray-500 mr-2" size={20} />
                    <h3 className="font-medium text-gray-900">
                      Current Conditions
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Temperature</p>
                      <p className="font-medium">{caseData.temperature}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <select value={newStatus} onChange={e => setNewStatus(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2">
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="On Hold">On Hold</option>
                        <option value="Quality Check">Quality Check</option>
                      </select>
                    </div>
                    <button onClick={handleStatusUpdate} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full">
                      Update Status
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-4">
                  <FileTextIcon className="text-gray-500 mr-2" size={20} />
                  <h3 className="font-medium text-gray-900">Notes</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <input type="text" value={newNote} onChange={e => setNewNote(e.target.value)} placeholder="Add a note..." className="flex-1 rounded-md border-gray-300 shadow-sm p-2" />
                    <button onClick={handleAddNote} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                      Add Note
                    </button>
                  </div>
                  <div className="bg-white p-4 rounded-md">
                    <p className="text-gray-600">{caseData.notes}</p>
                  </div>
                </div>
              </div>
            </div>}
          {activeTab === "timeline" && <div className="space-y-6">
              <div className="flow-root">
                <ul className="-mb-8">
                  {timeline.map((event, eventIdx) => <li key={eventIdx}>
                      <div className="relative pb-8">
                        {eventIdx !== timeline.length - 1 ? <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" /> : null}
                        <div className="relative flex space-x-3">
                          <div>
                            <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${event.type === "alert" ? "bg-yellow-100" : "bg-blue-100"}`}>
                              {event.type === "alert" ? <AlertCircleIcon className="text-yellow-600" size={16} /> : <CheckCircleIcon className="text-blue-600" size={16} />}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5">
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-gray-500">
                                {event.time}
                              </p>
                              <p className={`text-sm ${event.type === "alert" ? "text-yellow-600" : "text-blue-600"}`}>
                                {event.title}
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-gray-600">
                              {event.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>)}
                </ul>
              </div>
            </div>}
          {activeTab === "chemicals" && <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-4">
                  <BeakerIcon className="text-gray-500 mr-2" size={20} />
                  <h3 className="font-medium text-gray-900">Chemical Usage</h3>
                </div>
                <div className="space-y-4">
                  {caseData.chemicalsUsed.map((chemical, index) => <div key={index} className="flex items-center justify-between bg-white p-4 rounded-md">
                      <div className="flex items-center">
                        <DropletIcon className="text-blue-500 mr-3" size={20} />
                        <div>
                          <p className="font-medium">{chemical}</p>
                          <p className="text-sm text-gray-500">
                            Applied at {timeline[2].time}
                          </p>
                        </div>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                        Verified
                      </span>
                    </div>)}
                </div>
              </div>
            </div>}
          {activeTab === "quality" && <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-4">
                  <CheckCircleIcon className="text-gray-500 mr-2" size={20} />
                  <h3 className="font-medium text-gray-900">
                    Quality Control Checklist
                  </h3>
                </div>
                <div className="space-y-4">
                  {qualityCheckpoints.map(checkpoint => <div key={checkpoint.id} className="flex items-center justify-between bg-white p-4 rounded-md">
                      <div className="flex items-center">
                        <span className={`h-8 w-8 rounded-full flex items-center justify-center ${checkpoint.completed ? "bg-green-100" : "bg-gray-100"}`}>
                          {checkpoint.completed ? <CheckCircleIcon size={16} className="text-green-600" /> : <ClockIcon size={16} className="text-gray-400" />}
                        </span>
                        <span className="ml-3 font-medium">
                          {checkpoint.label}
                        </span>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${checkpoint.completed ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>
                        {checkpoint.completed ? "Completed" : "Pending"}
                      </span>
                    </div>)}
                </div>
              </div>
            </div>}
          {activeTab === "approvals" && <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="text-gray-500 mr-2" />
                  <h3 className="font-medium text-gray-900">
                    Embalming Process Approval
                  </h3>
                </div>
                <div className="space-y-4">
                  {approvalSteps.map((step) => <div key={step.id} className="bg-white p-4 rounded-lg border space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-full ${step.status === "approved" ? "bg-green-100" : step.status === "completed" ? "bg-blue-100" : "bg-gray-100"}`}>
                            {step.status === "approved" ? <CheckCircleIcon size={20} className="text-green-600" /> : step.status === "completed" ? <CheckIcon size={20} className="text-blue-600" /> : <ClockIcon size={20} className="text-gray-400" />}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {step.title}
                              {step.required && <span className="text-red-500 ml-1">*</span>}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {step.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {step.status === "pending" && <button onClick={() => handleStepCompletion(step.id)} className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200">
                              Complete
                            </button>}
                          {step.status === "completed" && <button onClick={() => handleStepApproval(step.id)} className="px-3 py-1 text-sm bg-green-100 text-green-600 rounded-md hover:bg-green-200">
                              Approve
                            </button>}
                        </div>
                      </div>
                      {step.status === "completed" && <div className="mt-2">
                          <textarea placeholder="Add approval notes..." className="w-full p-2 border rounded-md text-sm" value={approvalNote} onChange={e => setApprovalNote(e.target.value)} />
                        </div>}
                      {step.status === "approved" && <div className="text-sm text-gray-500 mt-2">
                          <p>
                            Approved by {step.approvedBy} on{" "}
                            {step.approvedAt ? new Date(step.approvedAt).toLocaleString() : "N/A"}
                          </p>
                          {step.notes && <p className="mt-1">Notes: {step.notes}</p>}
                        </div>}
                    </div>)}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-4">
                  <ShieldIcon className="text-gray-500 mr-2" size={20} />
                  <h3 className="font-medium text-gray-900">
                    Approval Progress
                  </h3>
                </div>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                        Progress
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-green-600">
                        {Math.round(approvalSteps.filter(step => step.status === "approved").length / approvalSteps.length * 100)}
                        %
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                    <div style={{
                  width: `${approvalSteps.filter(step => step.status === "approved").length / approvalSteps.length * 100}%`
                }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
                  </div>
                </div>
              </div>
            </div>}
        </div>
      </div>
      {showPrintModal && <PrintEmbalmentDetailsModal onClose={() => setShowPrintModal(false)} caseData={caseData} approvalSteps={approvalSteps} procedureDetails={procedureDetails} />}
    </div>;
};
export default EmbalmentCaseModal;
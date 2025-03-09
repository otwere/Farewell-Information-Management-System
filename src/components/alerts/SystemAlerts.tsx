import React, { useState } from "react";
import { AlertCircleIcon, ThermometerIcon, BeakerIcon, FileTextIcon, ChevronDownIcon, ChevronUpIcon, CheckCircleIcon, ClockIcon, UserIcon, AlertTriangleIcon } from "lucide-react";
interface Alert {
  id: string;
  type: "temperature" | "inventory" | "certificate" | "maintenance";
  priority: "high" | "medium" | "low";
  title: string;
  description: string;
  timestamp: string;
  status: "pending" | "in_progress" | "resolved";
  assignedTo?: string;
  value?: string;
  threshold?: string;
  action?: string;
  progress?: number;
}
const SystemAlerts: React.FC = () => {
  const [expandedAlert, setExpandedAlert] = useState<string | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([{
    id: "TEMP001",
    type: "temperature",
    priority: "high",
    title: "Refrigeration Unit 3 Temperature Alert",
    description: "Temperature above threshold - Maintenance required",
    timestamp: "2023-12-15 10:30 AM",
    status: "pending",
    value: "42°F",
    threshold: "35°F",
    assignedTo: "Technical Team",
    action: "Maintenance inspection required",
    progress: 0
  }, {
    id: "INV001",
    type: "inventory",
    priority: "medium",
    title: "Embalming Fluid Inventory Alert",
    description: "Inventory below minimum threshold",
    timestamp: "2023-12-15 09:45 AM",
    status: "in_progress",
    value: "5 units",
    threshold: "20 units",
    action: "Reorder required",
    progress: 50
  }, {
    id: "CERT001",
    type: "certificate",
    priority: "medium",
    title: "Death Certificates Pending",
    description: "Certificates awaiting submission to authorities",
    timestamp: "2023-12-15 08:15 AM",
    status: "in_progress",
    value: "3 certificates",
    assignedTo: "Administrative Team",
    action: "Submit to authorities",
    progress: 30
  }]);
  const getAlertIcon = (type: string) => {
    switch (type) {
      case "temperature":
        return <ThermometerIcon className="w-5 h-5" />;
      case "inventory":
        return <BeakerIcon className="w-5 h-5" />;
      case "certificate":
        return <FileTextIcon className="w-5 h-5" />;
      default:
        return <AlertCircleIcon className="w-5 h-5" />;
    }
  };
  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-50 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-50 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-blue-50 text-blue-800 border-blue-200";
      default:
        return "bg-gray-50 text-gray-800 border-gray-200";
    }
  };
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-red-100 text-red-800";
      case "in_progress":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const handleAlertAction = (alertId: string, action: string) => {
    setAlerts(alerts.map(alert => alert.id === alertId ? {
      ...alert,
      status: "in_progress",
      progress: alert.progress ? alert.progress + 25 : 25
    } : alert));
  };
  const handleMarkResolved = (alertId: string) => {
    setAlerts(alerts.map(alert => alert.id === alertId ? {
      ...alert,
      status: "resolved",
      progress: 100
    } : alert));
  };
  return <div className="space-y-4">
      {alerts.map(alert => <div key={alert.id} className={`border rounded-lg overflow-hidden ${getPriorityStyles(alert.priority)}`}>
          <div className="p-4 cursor-pointer" onClick={() => setExpandedAlert(expandedAlert === alert.id ? null : alert.id)}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getAlertIcon(alert.type)}
                <div>
                  <h3 className="font-medium">{alert.title}</h3>
                  <p className="text-sm opacity-75">{alert.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusStyles(alert.status)}`}>
                  {alert.status.replace("_", " ").toUpperCase()}
                </span>
                {expandedAlert === alert.id ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
              </div>
            </div>
          </div>
          {expandedAlert === alert.id && <div className="px-4 pb-4 space-y-3">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  {alert.timestamp}
                </div>
                {alert.assignedTo && <div className="flex items-center">
                    <UserIcon className="w-4 h-4 mr-1" />
                    {alert.assignedTo}
                  </div>}
              </div>
              {(alert.value || alert.threshold) && <div className="flex items-center space-x-4 text-sm">
                  {alert.value && <div className="flex items-center">
                      <AlertCircleIcon className="w-4 h-4 mr-1" />
                      Current: {alert.value}
                    </div>}
                  {alert.threshold && <div className="flex items-center">
                      <AlertTriangleIcon className="w-4 h-4 mr-1" />
                      Threshold: {alert.threshold}
                    </div>}
                </div>}
              {alert.progress !== undefined && <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{alert.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 rounded-full h-2 transition-all duration-300" style={{
              width: `${alert.progress}%`
            }}></div>
                  </div>
                </div>}
              <div className="flex justify-end space-x-3 mt-4">
                {alert.action && alert.status !== "resolved" && <button onClick={() => handleAlertAction(alert.id, alert.action!)} className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    {alert.action}
                  </button>}
                {alert.status !== "resolved" && <button onClick={() => handleMarkResolved(alert.id)} className="px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center">
                    <CheckCircleIcon className="w-4 h-4 mr-1" />
                    Mark Resolved
                  </button>}
              </div>
            </div>}
        </div>)}
    </div>;
};
export default SystemAlerts;
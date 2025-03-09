import { useMemo, useState } from "react";
import {
  AlertCircleIcon,
  ThermometerIcon,
  BeakerIcon,
  FileTextIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  XIcon,
  ClockIcon,
  CheckCircleIcon,
  BellIcon,
  FilterIcon,
  SortAscIcon,
  ArchiveIcon,
  HistoryIcon,
  TagIcon,
  BellOffIcon,
  UserIcon,
} from "lucide-react";
interface Alert {
  id: string;
  title: string;
  description: string;
  type: "maintenance" | "inventory" | "documentation" | "security" | "system";
  severity: "critical" | "warning" | "info";
  priority: "high" | "medium" | "low";
  category: string;
  timestamp: string;
  status: "pending" | "in_progress" | "resolved" | "archived";
  assignedTo?: string;
  actions: {
    primary: {
      label: string;
      action: () => void;
    };
    secondary?: {
      label: string;
      action: () => void;
    };
  };
  history?: {
    timestamp: string;
    action: string;
    user: string;
  }[];
  approvalRequired?: boolean;
  approvalStatus?: "pending" | "approved" | "rejected";
}
interface AlertFilters {
  type: string[];
  severity: string[];
  status: string[];
  priority: string[];
}
const SystemAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "alert-1",
      title: "Refrigeration Unit 3 Temperature Alert",
      description: "Temperature above threshold (8°C) - Maintenance required",
      type: "maintenance",
      severity: "critical",
      priority: "high",
      category: "Equipment",
      timestamp: "2024-01-15T10:30:00",
      status: "pending",
      assignedTo: "John Smith",
      actions: {
        primary: {
          label: "Create Maintenance Request",
          action: () => console.log("Creating maintenance request..."),
        },
        secondary: {
          label: "View Temperature Log",
          action: () => console.log("Viewing temperature log..."),
        },
      },
      history: [
        {
          timestamp: "2024-01-15T10:30:00",
          action: "Alert Created",
          user: "System",
        },
        {
          timestamp: "2024-01-15T10:35:00",
          action: "Assigned to John Smith",
          user: "Admin",
        },
      ],
      approvalRequired: true,
      approvalStatus: "pending",
    },
    // ... existing alerts with added properties
  ]);
  const [expandedAlerts, setExpandedAlerts] = useState<string[]>([]);
  const [filters, setFilters] = useState<AlertFilters>({
    type: [],
    severity: [],
    status: [],
    priority: [],
  });
  const [sortBy, setSortBy] = useState<{
    field: keyof Alert;
    direction: "asc" | "desc";
  }>({
    field: "timestamp",
    direction: "desc",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [view, setView] = useState<"list" | "timeline">("list");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const toggleAlert = (alertId: string) => {
    setExpandedAlerts((prev) =>
      prev.includes(alertId)
        ? prev.filter((id) => id !== alertId)
        : [...prev, alertId],
    );
  };
  const dismissAlert = (alertId: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== alertId));
  };
  const archiveAlert = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId
          ? {
              ...alert,
              status: "archived",
            }
          : alert,
      ),
    );
  };
  const approveAlert = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId
          ? {
              ...alert,
              approvalStatus: "approved",
            }
          : alert,
      ),
    );
  };
  const rejectAlert = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId
          ? {
              ...alert,
              approvalStatus: "rejected",
            }
          : alert,
      ),
    );
  };
  const filteredAlerts = useMemo(() => {
    let filtered = [...alerts];
    if (filters.type.length > 0) {
      filtered = filtered.filter((alert) => filters.type.includes(alert.type));
    }
    if (filters.severity.length > 0) {
      filtered = filtered.filter((alert) =>
        filters.severity.includes(alert.severity),
      );
    }
    if (filters.status.length > 0) {
      filtered = filtered.filter((alert) =>
        filters.status.includes(alert.status),
      );
    }
    if (filters.priority.length > 0) {
      filtered = filtered.filter((alert) =>
        filters.priority.includes(alert.priority),
      );
    }
    filtered.sort((a, b) => {
      const aValue = a[sortBy.field] ?? "";
      const bValue = b[sortBy.field] ?? "";
      if (sortBy.direction === "asc") {
        return aValue < bValue ? -1 : 1;
      } else {
        return aValue > bValue ? -1 : 1;
      }
    });
    return filtered;
  }, [alerts, filters, sortBy]);
  const statistics = useMemo(() => {
    return {
      total: alerts.length,
      critical: alerts.filter((a) => a.severity === "critical").length,
      pending: alerts.filter((a) => a.status === "pending").length,
      resolved: alerts.filter((a) => a.status === "resolved").length,
    };
  }, [alerts]);
  const getAlertIcon = (type: string) => {
    switch (type) {
      case "maintenance":
        return <ThermometerIcon size={18} />;
      case "inventory":
        return <BeakerIcon size={18} />;
      case "documentation":
        return <FileTextIcon size={18} />;
      default:
        return <AlertCircleIcon size={18} />;
    }
  };
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <BellIcon className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Alerts</p>
              <p className="text-xl font-semibold">{statistics.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="bg-red-100 p-2 rounded-full mr-3">
              <AlertCircleIcon className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Critical</p>
              <p className="text-xl font-semibold">{statistics.critical}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-2 rounded-full mr-3">
              <ClockIcon className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-xl font-semibold">{statistics.pending}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="bg-green-100 p-2 rounded-full mr-3">
              <CheckCircleIcon className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Resolved</p>
              <p className="text-xl font-semibold">{statistics.resolved}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-3 py-2 text-sm border rounded-md hover:bg-gray-50"
          >
            <FilterIcon size={16} className="mr-2" />
            Filters
          </button>
          <button
            onClick={() =>
              setSortBy({
                ...sortBy,
                direction: sortBy.direction === "asc" ? "desc" : "asc",
              })
            }
            className="flex items-center px-3 py-2 text-sm border rounded-md hover:bg-gray-50"
          >
            <SortAscIcon size={16} className="mr-2" />
            Sort
          </button>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setView("list")}
              className={`px-3 py-2 text-sm rounded-md ${view === "list" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"}`}
            >
              List
            </button>
            <button
              onClick={() => setView("timeline")}
              className={`px-3 py-2 text-sm rounded-md ${view === "timeline" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"}`}
            >
              Timeline
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            className={`p-2 rounded-md ${notificationsEnabled ? "text-blue-600 bg-blue-50" : "text-gray-400 hover:bg-gray-50"}`}
          >
            {notificationsEnabled ? (
              <BellIcon size={20} />
            ) : (
              <BellOffIcon size={20} />
            )}
          </button>
        </div>
      </div>
      {showFilters && (
        <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                className="w-full border rounded-md p-2"
                multiple
                value={filters.type}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    type: Array.from(
                      e.target.selectedOptions,
                      (option) => option.value,
                    ),
                  })
                }
              >
                <option value="maintenance">Maintenance</option>
                <option value="inventory">Inventory</option>
                <option value="documentation">Documentation</option>
                <option value="security">Security</option>
                <option value="system">System</option>
              </select>
            </div>
          </div>
        </div>
      )}
      <div className="space-y-4">
        {view === "list" ? (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`border rounded-lg overflow-hidden transition-all duration-200 ${alert.severity === "critical" ? "animate-pulse" : ""}`}
            >
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className={`mt-0.5`}>{getAlertIcon(alert.type)}</div>
                    <div>
                      <h3 className="font-medium">{alert.title}</h3>
                      <p className="text-sm mt-1">{alert.description}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span
                          className={`px-2 py-0.5 text-xs rounded-full ${alert.priority === "high" ? "bg-red-100 text-red-800" : alert.priority === "medium" ? "bg-yellow-100 text-yellow-800" : "bg-blue-100 text-blue-800"}`}
                        >
                          {alert.priority}
                        </span>
                        <span className="text-gray-500 text-sm">
                          {alert.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleAlert(alert.id)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      {expandedAlerts.includes(alert.id) ? (
                        <ChevronUpIcon size={16} />
                      ) : (
                        <ChevronDownIcon size={16} />
                      )}
                    </button>
                    <button
                      onClick={() => archiveAlert(alert.id)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <ArchiveIcon size={16} />
                    </button>
                    <button
                      onClick={() => dismissAlert(alert.id)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <XIcon size={16} />
                    </button>
                  </div>
                </div>
                {expandedAlerts.includes(alert.id) && (
                  <div className="mt-4 border-t pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Details</h4>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <TagIcon size={14} className="mr-2" />
                            Status: {alert.status}
                          </div>
                          {alert.assignedTo && (
                            <div className="flex items-center text-sm">
                              <UserIcon size={14} className="mr-2" />
                              Assigned to: {alert.assignedTo}
                            </div>
                          )}
                          <div className="flex items-center text-sm">
                            <ClockIcon size={14} className="mr-2" />
                            {new Date(alert.timestamp).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      {alert.history && (
                        <div>
                          <h4 className="text-sm font-medium mb-2">History</h4>
                          <div className="space-y-2">
                            {alert.history.map((entry, index) => (
                              <div
                                key={index}
                                className="flex items-start text-sm"
                              >
                                <HistoryIcon size={14} className="mr-2 mt-1" />
                                <div>
                                  <p>{entry.action}</p>
                                  <p className="text-xs text-gray-500">
                                    {new Date(entry.timestamp).toLocaleString()}{" "}
                                    by {entry.user}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="mt-4 flex space-x-3">
                      <button
                        onClick={alert.actions.primary.action}
                        className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        {alert.actions.primary.label}
                      </button>
                      {alert.actions.secondary && (
                        <button
                          onClick={alert.actions.secondary.action}
                          className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                        >
                          {alert.actions.secondary.label}
                        </button>
                      )}
                      {alert.approvalRequired && alert.approvalStatus === "pending" && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => approveAlert(alert.id)}
                            className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => rejectAlert(alert.id)}
                            className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                      {alert.approvalStatus === "approved" && (
                        <span className="px-3 py-2 bg-green-100 text-green-800 rounded-md">
                          Approved
                        </span>
                      )}
                      {alert.approvalStatus === "rejected" && (
                        <span className="px-3 py-2 bg-red-100 text-red-800 rounded-md">
                          Rejected
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="border rounded-lg divide-y">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className="p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-16 text-sm text-gray-500">
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </div>
                  <div className="flex-grow ml-4">
                    <h4 className="text-sm font-medium">{alert.title}</h4>
                    <p className="text-sm text-gray-500">{alert.description}</p>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${alert.severity === "critical" ? "bg-red-100 text-red-800" : alert.severity === "warning" ? "bg-yellow-100 text-yellow-800" : "bg-blue-100 text-blue-800"}`}
                    >
                      {alert.severity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {filteredAlerts.length === 0 && (
        <div className="text-center py-6 bg-gray-50 rounded-lg">
          <CheckCircleIcon size={24} className="mx-auto text-green-500 mb-2" />
          <p className="text-gray-500">No active alerts</p>
        </div>
      )}
    </div>
  );
};
export default SystemAlerts;

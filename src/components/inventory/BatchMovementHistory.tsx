import React from "react";
import { format } from "date-fns";
import { XIcon, ArrowRightIcon, ArrowLeftIcon, RepeatIcon } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
interface BatchMovementHistoryProps {
  batch: any; // Using the Batch interface from BatchManagementModal
  onClose: () => void;
}
const BatchMovementHistory: React.FC<BatchMovementHistoryProps> = ({
  batch,
  onClose
}) => {
  const movementTypeIcons = {
    in: <ArrowRightIcon className="text-green-500" size={16} />,
    out: <ArrowLeftIcon className="text-red-500" size={16} />,
    transfer: <RepeatIcon className="text-blue-500" size={16} />,
    adjustment: <RepeatIcon className="text-yellow-500" size={16} />
  };
  // Calculate running total for stock level chart
  const stockLevels = batch.movements.reduce((acc: any[], movement: any) => {
    const lastLevel = acc[acc.length - 1].level;
    const newLevel = movement.type === "in" || movement.type === "transfer" ? lastLevel + movement.quantity : lastLevel - movement.quantity;
    return [...acc, {
      date: movement.date,
      level: newLevel
    }];
  }, [{
    date: batch.createdAt,
    level: batch.quantity
  }]);
  return <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Movement History
              </h2>
              <p className="text-gray-600">Batch: {batch.number}</p>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <XIcon size={24} />
            </button>
          </div>
          {/* Stock Level Chart */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Stock Level Trend
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stockLevels}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickFormatter={date => format(new Date(date), "MMM dd")} />
                  <YAxis />
                  <Tooltip labelFormatter={date => format(new Date(date), "MMM dd, yyyy")} />
                  <Line type="stepAfter" dataKey="level" stroke="#3B82F6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/* Movement List */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Movement Details
            </h3>
            <div className="space-y-4">
              {batch.movements.map((movement: any) => <div key={movement.id} className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-gray-100 rounded-full">
                      {movementTypeIcons[movement.type as keyof typeof movementTypeIcons]}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {movement.type.charAt(0).toUpperCase() + movement.type.slice(1)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {format(new Date(movement.date), "MMM dd, yyyy HH:mm")}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${movement.type === "in" ? "text-green-600" : movement.type === "out" ? "text-red-600" : "text-blue-600"}`}>
                      {movement.type === "in" ? "+" : "-"}
                      {movement.quantity}
                    </p>
                    <p className="text-sm text-gray-500">{movement.location}</p>
                  </div>
                </div>)}
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default BatchMovementHistory;
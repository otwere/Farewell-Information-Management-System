import React from "react";
import { XIcon, TrendingUpIcon, AlertCircleIcon, DollarSignIcon, PackageIcon } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
interface AnalyticsData {
  stockTrend: Array<{
    date: string;
    level: number;
  }>;
  categoryDistribution: Array<{
    name: string;
    value: number;
  }>;
  monthlyConsumption: Array<{
    month: string;
    quantity: number;
  }>;
  valueAnalysis: {
    totalValue: number;
    averageValue: number;
    highestValue: number;
    lowestValue: number;
  };
}
interface InventoryAnalyticsModalProps {
  data: AnalyticsData;
  onClose: () => void;
}
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];
const InventoryAnalyticsModal: React.FC<InventoryAnalyticsModalProps> = ({
  data,
  onClose
}) => {
  return <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Inventory Analytics
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <XIcon size={24} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Stock Level Trend */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <TrendingUpIcon size={20} className="mr-2" />
                Stock Level Trend
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.stockTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="level" stroke="#3B82F6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* Category Distribution */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <PackageIcon size={20} className="mr-2" />
                Category Distribution
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={data.categoryDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                      {data.categoryDistribution.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* Monthly Consumption */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <AlertCircleIcon size={20} className="mr-2" />
                Monthly Consumption
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.monthlyConsumption}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="quantity" fill="#4F46E5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* Value Analysis */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <DollarSignIcon size={20} className="mr-2" />
                Value Analysis
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Total Value</p>
                  <p className="text-2xl font-semibold">
                    ${data.valueAnalysis.totalValue.toLocaleString()}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Average Value</p>
                  <p className="text-2xl font-semibold">
                    ${data.valueAnalysis.averageValue.toLocaleString()}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Highest Value</p>
                  <p className="text-2xl font-semibold text-green-600">
                    ${data.valueAnalysis.highestValue.toLocaleString()}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Lowest Value</p>
                  <p className="text-2xl font-semibold text-red-600">
                    ${data.valueAnalysis.lowestValue.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default InventoryAnalyticsModal;
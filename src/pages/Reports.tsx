import React, { useState } from "react";
import { BarChart2Icon, FileTextIcon, DownloadIcon, FilterIcon, CalendarIcon, PackageIcon, DollarSignIcon, UsersIcon, PieChartIcon, TrendingUpIcon } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Card, CardHeader, CardContent } from "../components/common/Card";
const Reports = () => {
  const [selectedReport, setSelectedReport] = useState("financial");
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: ""
  });
  const revenueData = [{
    month: "Jan",
    revenue: 45000,
    expenses: 32000
  }, {
    month: "Feb",
    revenue: 52000,
    expenses: 34000
  }, {
    month: "Mar",
    revenue: 48000,
    expenses: 31000
  }, {
    month: "Apr",
    revenue: 51000,
    expenses: 35000
  }, {
    month: "May",
    revenue: 54000,
    expenses: 36000
  }, {
    month: "Jun",
    revenue: 49000,
    expenses: 32000
  }];
  const serviceDistribution = [{
    name: "Funeral Services",
    value: 45
  }, {
    name: "Embalming",
    value: 25
  }, {
    name: "Transportation",
    value: 15
  }, {
    name: "Other Services",
    value: 15
  }];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const reports = [{
    id: "financial",
    name: "Financial Reports",
    description: "Revenue, expenses, and financial analytics",
    icon: <DollarSignIcon size={20} className="text-blue-600" />
  }, {
    id: "services",
    name: "Service Reports",
    description: "Service statistics and performance metrics",
    icon: <FileTextIcon size={20} className="text-green-600" />
  }, {
    id: "inventory",
    name: "Inventory Reports",
    description: "Stock levels and inventory movement",
    icon: <PackageIcon size={20} className="text-yellow-600" />
  }, {
    id: "staff",
    name: "Staff Reports",
    description: "Staff performance and scheduling analytics",
    icon: <UsersIcon size={20} className="text-purple-600" />
  }];
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Reports & Analytics
          </h1>
          <p className="text-gray-600 mt-1">
            Generate reports and view system analytics
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
          <DownloadIcon size={18} className="mr-1" />
          Export Report
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {reports.map(report => <div key={report.id} className={`cursor-pointer ${selectedReport === report.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"} border-2 rounded-lg p-4`} onClick={() => setSelectedReport(report.id)}>
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${selectedReport === report.id ? "bg-blue-100" : "bg-gray-100"}`}>
                {report.icon}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{report.name}</h3>
                <p className="text-sm text-gray-500">{report.description}</p>
              </div>
            </div>
          </div>)}
      </div>
      <Card>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex space-x-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input type="date" className="border border-gray-300 rounded-md p-2" value={dateRange.startDate} onChange={e => setDateRange({
                ...dateRange,
                startDate: e.target.value
              })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input type="date" className="border border-gray-300 rounded-md p-2" value={dateRange.endDate} onChange={e => setDateRange({
                ...dateRange,
                endDate: e.target.value
              })} />
              </div>
            </div>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              <FilterIcon size={18} className="mr-2" />
              Apply Filters
            </button>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium text-gray-900">
              Revenue vs Expenses
            </h3>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData} margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5
              }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#0088FE" name="Revenue" />
                  <Bar dataKey="expenses" fill="#FF8042" name="Expenses" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium text-gray-900">
              Service Distribution
            </h3>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={serviceDistribution} cx="50%" cy="50%" labelLine={false} label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  percent,
                  name
                }) => {
                  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                  return <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
                          {`${name} ${(percent * 100).toFixed(0)}%`}
                        </text>;
                }} outerRadius={100} fill="#8884d8" dataKey="value">
                    {serviceDistribution.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default Reports;
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
interface TemperatureData {
  time: string;
  temperature: number;
  optimal: number;
}
interface TemperatureChartProps {
  data: TemperatureData[];
}
const TemperatureChart: React.FC<TemperatureChartProps> = ({
  data
}) => {
  return <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" tick={{
          fontSize: 12
        }} tickFormatter={value => value.split(" ")[0]} />
          <YAxis tick={{
          fontSize: 12
        }} />
          <Tooltip />
          <Line type="monotone" dataKey="temperature" stroke="#3b82f6" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="optimal" stroke="#9ca3af" strokeDasharray="5 5" strokeWidth={1} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>;
};
export default TemperatureChart;
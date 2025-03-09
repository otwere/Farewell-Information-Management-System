import React from "react";
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}
const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  color
}) => {
  return <div className="bg-white rounded-lg shadow-sm p-6 flex items-center">
      <div className={`rounded-full p-3 ${color} mr-4`}>{icon}</div>
      <div>
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-semibold text-gray-800">{value}</p>
      </div>
    </div>;
};
export default StatCard;
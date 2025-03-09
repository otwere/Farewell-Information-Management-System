import React from "react";
import { GradientText } from "../common/Gradient";
interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}
const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  actions
}) => {
  return <div className="flex justify-between items-start mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          <GradientText>{title}</GradientText>
        </h1>
        {subtitle && <p className="text-gray-600 dark:text-gray-400 mt-1">{subtitle}</p>}
      </div>
      {actions && <div className="flex space-x-3">{actions}</div>}
    </div>;
};
export default PageHeader;
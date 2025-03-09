import React from "react";
import { FileIcon } from "lucide-react";
interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}
const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon = <FileIcon size={40} />,
  action
}) => {
  return <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="w-16 h-16 mb-4 text-gray-400 dark:text-gray-600">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {description}
      </p>
      {action && <div>{action}</div>}
    </div>;
};
export default EmptyState;
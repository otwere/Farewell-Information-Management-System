import React from "react";
interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}
const TableSkeleton: React.FC<TableSkeletonProps> = ({
  rows = 5,
  columns = 4
}) => {
  return <div className="animate-pulse">
      <div className="grid grid-cols-1 gap-4">
        <div className="h-10 bg-gray-200 rounded dark:bg-gray-700" />
        {Array.from({
        length: rows
      }).map((_, rowIndex) => <div key={rowIndex} className="grid grid-cols-4 gap-4" style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`
      }}>
            {Array.from({
          length: columns
        }).map((_, colIndex) => <div key={colIndex} className="h-8 bg-gray-200 rounded dark:bg-gray-700" />)}
          </div>)}
      </div>
    </div>;
};
export default TableSkeleton;
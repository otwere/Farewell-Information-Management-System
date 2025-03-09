import React from "react";
interface GradientProps {
  variant?: "primary" | "secondary" | "accent";
  className?: string;
  children?: React.ReactNode;
}
export const Gradient: React.FC<GradientProps> = ({
  variant = "primary",
  className = "",
  children
}) => {
  const gradients = {
    primary: "bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700",
    secondary: "bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900",
    accent: "bg-gradient-to-br from-purple-600 via-purple-500 to-purple-700"
  };
  return <div className={`${gradients[variant]} ${className}`}>{children}</div>;
};
export const GradientText: React.FC<GradientProps> = ({
  variant = "primary",
  className = "",
  children
}) => {
  const gradients = {
    primary: "from-blue-600 via-blue-500 to-blue-700",
    secondary: "from-gray-800 via-gray-700 to-gray-900",
    accent: "from-purple-600 via-purple-500 to-purple-700"
  };
  return <span className={`bg-gradient-to-br ${gradients[variant]} inline-block text-transparent bg-clip-text ${className}`}>
      {children}
    </span>;
};
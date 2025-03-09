import React from "react";
import { motion } from "framer-motion";
interface CardProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}
export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  animate = false
}) => {
  const BaseCard = <div className={`bg-white rounded-lg shadow-sm dark:bg-gray-800 ${className}`}>
      {children}
    </div>;
  if (animate) {
    return <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} exit={{
      opacity: 0,
      y: 20
    }} transition={{
      duration: 0.3
    }}>
        {BaseCard}
      </motion.div>;
  }
  return BaseCard;
};
export const CardHeader: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({
  children,
  className = ""
}) => <div className={`px-6 py-4 border-b border-gray-200 dark:border-gray-700 ${className}`}>
    {children}
  </div>;
export const CardContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({
  children,
  className = ""
}) => <div className={`p-6 ${className}`}>{children}</div>;
export const CardFooter: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({
  children,
  className = ""
}) => <div className={`px-6 py-4 border-t border-gray-200 dark:border-gray-700 ${className}`}>
    {children}
  </div>;
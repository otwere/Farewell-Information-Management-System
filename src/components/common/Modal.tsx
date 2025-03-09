import React from "react";
import { XIcon } from "lucide-react";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
  actions?: React.ReactNode;
}
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "max-w-2xl",
  actions
}) => {
  if (!isOpen) return null;
  return <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 w-full sm:w-auto">
        <div className={`relative bg-white rounded-lg shadow-xl ${maxWidth}`}>
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500 focus:outline-none">
              <XIcon size={24} />
            </button>
          </div>
          <div className="p-6">{children}</div>
          {actions && <div className="flex justify-end gap-4 px-6 py-4 border-t border-gray-200">
              {actions}
            </div>}
        </div>
      </div>
    </div>;
};
export default Modal;
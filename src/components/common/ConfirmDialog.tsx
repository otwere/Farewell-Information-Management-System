import React from "react";
import Modal from "./Modal";
import Button from "./Button";
import { AlertTriangleIcon } from "lucide-react";
interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  type?: "danger" | "warning" | "info";
}
const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  type = "danger"
}) => {
  const iconColors = {
    danger: "text-red-600",
    warning: "text-yellow-600",
    info: "text-blue-600"
  };
  const bgColors = {
    danger: "bg-red-100",
    warning: "bg-yellow-100",
    info: "bg-blue-100"
  };
  return <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-md" actions={<>
          <Button variant="ghost" onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button variant={type === "danger" ? "danger" : "primary"} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </>}>
      <div className="flex items-start space-x-4">
        <div className={`p-2 rounded-full ${bgColors[type]}`}>
          <AlertTriangleIcon className={`h-6 w-6 ${iconColors[type]}`} />
        </div>
        <p className="text-gray-600">{message}</p>
      </div>
    </Modal>;
};
export default ConfirmDialog;
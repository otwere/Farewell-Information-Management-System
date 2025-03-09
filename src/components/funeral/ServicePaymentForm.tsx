import React, { useState } from "react";
import { CreditCardIcon, SmartphoneIcon, CheckIcon, AlertCircleIcon, QrCodeIcon } from "lucide-react";
interface ServicePaymentFormProps {
  amount: number;
  onPaymentComplete: (paymentDetails: {
    method: string;
    mode: string;
    transactionId: string;
    status: string;
    date: string;
  }) => void;
}
const ServicePaymentForm: React.FC<ServicePaymentFormProps> = ({
  amount,
  onPaymentComplete
}) => {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: ""
  });
  const [mobileDetails, setMobileDetails] = useState({
    phoneNumber: "",
    provider: ""
  });
  const [paymentMode, setPaymentMode] = useState("full");
  const paymentMethods = [{
    id: "credit_card",
    name: "Credit/Debit Card",
    icon: <CreditCardIcon size={24} />,
    description: "Pay securely with your card"
  }, {
    id: "mobile_money",
    name: "Mobile Money",
    icon: <SmartphoneIcon size={24} />,
    description: "Pay using mobile money services"
  }, {
    id: "bank_transfer",
    name: "Bank Transfer",
    icon: <div size={24} />,
    description: "Direct bank transfer"
  }, {
    id: "cash",
    name: "Cash",
    icon: <div size={24} />,
    description: "Pay in cash"
  }];
  const mobileProviders = [{
    id: "mpesa",
    name: "M-Pesa"
  }, {
    id: "airtel",
    name: "Airtel Money"
  }, {
    id: "orange",
    name: "Orange Money"
  }];
  const paymentModes = [{
    id: "full",
    name: "Full Payment",
    description: "Pay the entire amount now"
  }, {
    id: "installment",
    name: "Installment",
    description: "Pay in multiple installments"
  }, {
    id: "partial",
    name: "Partial Payment",
    description: "Pay partial amount now"
  }];
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const paymentDetails = {
        method: selectedMethod,
        mode: paymentMode,
        transactionId: `TXN${Date.now()}`,
        status: "completed",
        date: new Date().toISOString()
      };
      onPaymentComplete(paymentDetails);
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };
  const renderPaymentForm = () => {
    switch (selectedMethod) {
      case "credit_card":
        return <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Card Number
              </label>
              <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="1234 5678 9012 3456" value={cardDetails.number} onChange={e => setCardDetails({
              ...cardDetails,
              number: e.target.value
            })} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700">
                  Expiry
                </label>
                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="MM/YY" value={cardDetails.expiry} onChange={e => setCardDetails({
                ...cardDetails,
                expiry: e.target.value
              })} />
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700">
                  CVC
                </label>
                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="123" value={cardDetails.cvc} onChange={e => setCardDetails({
                ...cardDetails,
                cvc: e.target.value
              })} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Cardholder Name
              </label>
              <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="John Doe" value={cardDetails.name} onChange={e => setCardDetails({
              ...cardDetails,
              name: e.target.value
            })} />
            </div>
          </div>;
      case "mobile_money":
        return <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Provider
              </label>
              <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={mobileDetails.provider} onChange={e => setMobileDetails({
              ...mobileDetails,
              provider: e.target.value
            })}>
                <option value="">Select a provider</option>
                {mobileProviders.map(provider => <option key={provider.id} value={provider.id}>
                    {provider.name}
                  </option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input type="tel" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Enter your mobile money number" value={mobileDetails.phoneNumber} onChange={e => setMobileDetails({
              ...mobileDetails,
              phoneNumber: e.target.value
            })} />
            </div>
            {mobileDetails.provider && <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center space-x-4">
                  <QrCodeIcon size={100} className="text-gray-400" />
                  <div className="text-sm text-gray-600">
                    <p className="font-medium">Scan to Pay</p>
                    <p>1. Open your mobile money app</p>
                    <p>2. Scan this QR code</p>
                    <p>3. Confirm the payment</p>
                  </div>
                </div>
              </div>}
          </div>;
      case "bank_transfer":
        return <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Bank Details</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Bank: National Bank</p>
              <p>Account Name: Eternal Rest Mortuary Services</p>
              <p>Account Number: 1234567890</p>
              <p>Sort Code: 12-34-56</p>
              <p>Reference: SERVICE-{Date.now().toString(36).toUpperCase()}</p>
            </div>
            <div className="mt-4 flex items-center text-sm text-yellow-600">
              <AlertCircleIcon size={16} className="mr-2" />
              Please use the reference number when making the transfer
            </div>
          </div>;
      case "cash":
        return <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">
              <p>Please pay the amount at our office:</p>
              <p className="mt-2">
                Eternal Rest Mortuary Services
                <br />
                1234 Memorial Drive
                <br />
                Springfield, IL 62701
              </p>
              <div className="mt-4 flex items-center text-yellow-600">
                <AlertCircleIcon size={16} className="mr-2" />
                <span>
                  Please bring the exact amount. A receipt will be provided.
                </span>
              </div>
            </div>
          </div>;
      default:
        return null;
    }
  };
  return <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <span className="text-blue-800 font-medium">Amount Due</span>
          <span className="text-2xl font-bold text-blue-800">
            ${amount.toFixed(2)}
          </span>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="font-medium text-gray-900">Select Payment Mode</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {paymentModes.map(mode => <button key={mode.id} onClick={() => setPaymentMode(mode.id)} className={`p-4 border rounded-lg text-left transition-all duration-200 ${paymentMode === mode.id ? "border-blue-500 bg-blue-50" : "hover:border-blue-300"}`}>
              <div>
                <p className="font-medium text-gray-900">{mode.name}</p>
                <p className="text-sm text-gray-500">{mode.description}</p>
              </div>
            </button>)}
        </div>
      </div>
      {selectedMethod && <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {renderPaymentForm()}
          <button type="submit" disabled={isProcessing} className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center">
            {isProcessing ? <>
                <span className="animate-spin mr-2">⌛</span>
                Processing...
              </> : <>
                <CheckIcon size={18} className="mr-2" />
                Complete{" "}
                {paymentMode === "full" ? "Payment" : paymentMode === "installment" ? "First Installment" : "Partial Payment"}
              </>}
          </button>
        </form>}
    </div>;
};
export default ServicePaymentForm;
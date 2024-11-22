import React from 'react';
import { Calculator } from 'lucide-react';

interface BillingItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  category: string;
}

interface Discount {
  id: string;
  type: 'percentage' | 'fixed';
  value: number;
  description: string;
}

interface BillingDetailsProps {
  items: BillingItem[];
  discounts: Discount[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onAddDiscount: (discount: Discount) => void;
}

const BillingDetails: React.FC<BillingDetailsProps> = ({
  items,
  discounts,
  onUpdateQuantity,
  onAddDiscount,
}) => {
  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  };

  const calculateDiscounts = () => {
    return discounts.reduce((sum, discount) => {
      if (discount.type === 'percentage') {
        return sum + (calculateSubtotal() * discount.value) / 100;
      }
      return sum + discount.value;
    }, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscounts();
  };

  const formatToINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Billing Details</h3>
        </div>
        <div className="p-4">
          <table className="w-full">
            <thead>
              <tr className="text-sm text-gray-600">
                <th className="text-left pb-4">Description</th>
                <th className="text-right pb-4">Qty</th>
                <th className="text-right pb-4">Unit Price</th>
                <th className="text-right pb-4">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {items.map((item) => (
                <tr key={item.id} className="text-sm">
                  <td className="py-3">
                    <div>
                      <p className="font-medium">{item.description}</p>
                      <p className="text-gray-500">{item.category}</p>
                    </div>
                  </td>
                  <td className="py-3 text-right">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))}
                      className="w-16 text-right border rounded p-1"
                    />
                  </td>
                  <td className="py-3 text-right">{formatToINR(item.unitPrice)}</td>
                  <td className="py-3 text-right">
                    {formatToINR(item.quantity * item.unitPrice)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Discounts & Adjustments</h3>
        </div>
        <div className="p-4">
          {discounts.map((discount) => (
            <div
              key={discount.id}
              className="flex justify-between items-center py-2 text-sm"
            >
              <span>{discount.description}</span>
              <span className="text-green-600">
                -{discount.type === 'percentage'
                  ? `${discount.value}%`
                  : formatToINR(discount.value)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{formatToINR(calculateSubtotal())}</span>
          </div>
          <div className="flex justify-between text-sm text-green-600">
            <span>Total Discounts</span>
            <span>-{formatToINR(calculateDiscounts())}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg pt-2 border-t">
            <span>Total Amount</span>
            <span>{formatToINR(calculateTotal())}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingDetails;
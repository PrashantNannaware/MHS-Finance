import React, { useState } from 'react';
import { FileText, Search, Filter, Plus, X, CreditCard, Wallet, BanknoteIcon, Building2, Calculator } from 'lucide-react';
import toast from 'react-hot-toast';
import BillingDetails from './billing/BillingDetails';
import CostEstimator from './billing/CostEstimator';

const Billing = () => {
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showInvoiceDetails, setShowInvoiceDetails] = useState<number | null>(null);
  const [showCostEstimator, setShowCostEstimator] = useState(false);
  const [invoiceData, setInvoiceData] = useState({
    patientName: '',
    amount: '',
    description: '',
    paymentMethod: '',
    items: [
      {
        id: '1',
        description: 'Doctor Consultation',
        quantity: 1,
        unitPrice: 2000,
        category: 'Consultation',
      },
      {
        id: '2',
        description: 'Blood Test',
        quantity: 1,
        unitPrice: 1500,
        category: 'Laboratory',
      },
      {
        id: '3',
        description: 'Private Room (per day)',
        quantity: 2,
        unitPrice: 5000,
        category: 'Accommodation',
      },
    ],
    discounts: [
      {
        id: '1',
        type: 'percentage' as const,
        value: 10,
        description: 'Senior Citizen Discount',
      },
      {
        id: '2',
        type: 'fixed' as const,
        value: 2000,
        description: 'Insurance Coverage',
      },
    ],
  });

  const paymentMethods = [
    { id: 'credit-card', label: 'Credit Card', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'bank-transfer', label: 'Bank Transfer', icon: <Building2 className="w-4 h-4" /> },
    { id: 'cash', label: 'Cash', icon: <BanknoteIcon className="w-4 h-4" /> },
    { id: 'digital-wallet', label: 'Digital Wallet', icon: <Wallet className="w-4 h-4" /> },
  ];

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invoiceData.paymentMethod) {
      toast.error('Please select a payment method');
      return;
    }
    toast.success('Invoice created successfully');
    setShowInvoiceModal(false);
    setInvoiceData({
      ...invoiceData,
      patientName: '',
      amount: '',
      description: '',
      paymentMethod: '',
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setInvoiceData({
      ...invoiceData,
      items: invoiceData.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    });
  };

  const handleAddDiscount = (discount: {
    type: 'percentage' | 'fixed';
    value: number;
    description: string;
  }) => {
    setInvoiceData({
      ...invoiceData,
      discounts: [
        ...invoiceData.discounts,
        { id: String(invoiceData.discounts.length + 1), ...discount },
      ],
    });
  };

  const formatToINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const recentInvoices = [
    { id: 1001, amount: 13000, dueDate: '5 days', date: 'March 15, 2024', patient: 'John Doe', status: 'Pending' },
    { id: 1002, amount: 14000, dueDate: '3 days', date: 'March 16, 2024', patient: 'Jane Smith', status: 'Paid' },
    { id: 1003, amount: 15000, dueDate: '7 days', date: 'March 14, 2024', patient: 'Mike Johnson', status: 'Overdue' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Billing Management</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setShowCostEstimator(true)}
            className="flex items-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
          >
            <Calculator className="w-4 h-4 mr-2" />
            Cost Estimator
          </button>
          <button
            onClick={() => setShowInvoiceModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Invoice
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search invoices..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="flex items-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Invoices</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentInvoices.map((invoice) => (
              <div
                key={invoice.id}
                onClick={() => setShowInvoiceDetails(invoice.id)}
                className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-center">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">Invoice #{invoice.id}</p>
                    <p className="text-sm text-gray-500">Due in {invoice.dueDate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatToINR(invoice.amount)}</p>
                  <p className="text-sm text-gray-500">{invoice.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showInvoiceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Create New Invoice</h2>
              <button
                onClick={() => setShowInvoiceModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateInvoice} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Patient Name
                  </label>
                  <input
                    type="text"
                    required
                    value={invoiceData.patientName}
                    onChange={(e) =>
                      setInvoiceData({ ...invoiceData, patientName: e.target.value })
                    }
                    className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() =>
                          setInvoiceData({ ...invoiceData, paymentMethod: method.id })
                        }
                        className={`flex items-center p-3 border rounded-lg ${
                          invoiceData.paymentMethod === method.id
                            ? 'border-blue-500 bg-blue-50 text-blue-600'
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        {method.icon}
                        <span className="ml-2 text-sm">{method.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <BillingDetails
                items={invoiceData.items}
                discounts={invoiceData.discounts}
                onUpdateQuantity={handleUpdateQuantity}
                onAddDiscount={handleAddDiscount}
              />

              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Invoice
              </button>
            </form>
          </div>
        </div>
      )}

      {showCostEstimator && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CostEstimator onClose={() => setShowCostEstimator(false)} />
          </div>
        </div>
      )}

      {showInvoiceDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Invoice Details</h2>
              <button
                onClick={() => setShowInvoiceDetails(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {(() => {
              const invoice = recentInvoices.find((inv) => inv.id === showInvoiceDetails);
              return invoice ? (
                <div className="space-y-4">
                  <div className="flex justify-between pb-4 border-b">
                    <div>
                      <p className="text-sm text-gray-600">Invoice Number</p>
                      <p className="font-medium">#{invoice.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Date</p>
                      <p className="font-medium">{invoice.date}</p>
                    </div>
                  </div>
                  <div className="flex justify-between pb-4 border-b">
                    <div>
                      <p className="text-sm text-gray-600">Patient Name</p>
                      <p className="font-medium">{invoice.patient}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Status</p>
                      <span
                        className={`inline-block px-2 py-1 rounded text-sm ${
                          invoice.status === 'Paid'
                            ? 'bg-green-100 text-green-800'
                            : invoice.status === 'Overdue'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {invoice.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-end pt-4">
                    <div>
                      <p className="text-sm text-gray-600">Amount Due</p>
                      <p className="text-2xl font-bold">{formatToINR(invoice.amount)}</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Download Invoice
                    </button>
                  </div>
                </div>
              ) : null;
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Billing;
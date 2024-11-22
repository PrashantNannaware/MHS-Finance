import React, { useState } from 'react';
import { Activity, DollarSign, FileCheck2, LineChart, Plus, Calculator, FileText } from 'lucide-react';
import StatCard from './StatCard';
import RevenueChart from './RevenueChart';
import RecentTransactions from './RecentTransactions';
import CostEstimator from './billing/CostEstimator';

const Dashboard = () => {
  const [showCostEstimator, setShowCostEstimator] = useState(false);

  const formatToINR = (amount: string) => {
    const numericAmount = parseFloat(amount.replace(/[^0-9.-]+/g, ''));
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(numericAmount);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Financial Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, Admin</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowCostEstimator(true)}
            className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center transition-colors"
          >
            <Calculator className="w-4 h-4 mr-2" />
            Cost Estimate
          </button>
          <button
            className="px-4 py-2 bg-white border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 flex items-center transition-colors"
          >
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </button>
          <button
            onClick={() => window.location.href = '/billing'}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={formatToINR("₹12843000")}
          change="+12.5%"
          icon={<DollarSign className="w-6 h-6" />}
          color="green"
        />
        <StatCard
          title="Pending Claims"
          value="43"
          change="-8.1%"
          icon={<FileCheck2 className="w-6 h-6" />}
          color="yellow"
        />
        <StatCard
          title="Collection Rate"
          value="92.3%"
          change="+3.2%"
          icon={<Activity className="w-6 h-6" />}
          color="blue"
        />
        <StatCard
          title="Outstanding"
          value={formatToINR("₹2385000")}
          change="-5.4%"
          icon={<LineChart className="w-6 h-6" />}
          color="red"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
          <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>
          <RevenueChart />
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
          <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
          <RecentTransactions />
        </div>
      </div>

      {showCostEstimator && (
        <CostEstimator onClose={() => setShowCostEstimator(false)} />
      )}
    </div>
  );
};

export default Dashboard;
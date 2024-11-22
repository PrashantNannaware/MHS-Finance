import React, { useState } from 'react';
import { Activity, DollarSign, FileCheck2, LineChart } from 'lucide-react';
import StatCard from '../StatCard';
import RevenueChart from '../RevenueChart';
import RecentTransactions from '../RecentTransactions';
import CostEstimator from '../billing/CostEstimator';
import DashboardHeader from './Header';

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
      <DashboardHeader onCostEstimatorClick={() => setShowCostEstimator(true)} />

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
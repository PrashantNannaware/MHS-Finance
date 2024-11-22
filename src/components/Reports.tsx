import React from 'react';
import { BarChart3, Download, Calendar, ArrowUpRight } from 'lucide-react';

const Reports = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Financial Reports</h1>
        <div className="flex gap-2">
          <button className="flex items-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Calendar className="w-4 h-4 mr-2" />
            Last 30 Days
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'Revenue Growth', value: '+12.5%', trend: 'up' },
          { title: 'Claims Success Rate', value: '92.3%', trend: 'up' },
          { title: 'Average Processing Time', value: '2.4 days', trend: 'down' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-gray-600">{stat.title}</h3>
              <div className="p-2 bg-blue-50 rounded-lg">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">{stat.value}</span>
              <span className={`ml-2 flex items-center text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                <ArrowUpRight className="w-4 h-4" />
                vs last month
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Monthly Reports</h2>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All Reports
          </button>
        </div>
        <div className="space-y-4">
          {['Financial Summary', 'Claims Analysis', 'Revenue Breakdown'].map((report, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-gray-600" />
                </div>
                <div className="ml-4">
                  <p className="font-medium">{report}</p>
                  <p className="text-sm text-gray-500">March 2024</p>
                </div>
              </div>
              <button className="flex items-center text-blue-600 hover:text-blue-700">
                <Download className="w-4 h-4 mr-1" />
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;
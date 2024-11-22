import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Jan', revenue: 6500000, growth: 12 },
  { name: 'Feb', revenue: 7200000, growth: 15 },
  { name: 'Mar', revenue: 6800000, growth: 8 },
  { name: 'Apr', revenue: 8500000, growth: 20 },
  { name: 'May', revenue: 9200000, growth: 25 },
  { name: 'Jun', revenue: 8800000, growth: 18 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
        <p className="font-semibold text-gray-800">{label}</p>
        <p className="text-blue-600">
          Revenue: {new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
          }).format(payload[0].value)}
        </p>
        <p className="text-green-600">
          Growth: {payload[1].value}%
        </p>
      </div>
    );
  }
  return null;
};

const RevenueChart = () => {
  const [hoveredData, setHoveredData] = useState(null);

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          onMouseMove={(e) => {
            if (e.activePayload) {
              setHoveredData(e.activePayload[0].payload);
            }
          }}
          onMouseLeave={() => setHoveredData(null)}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#666' }}
          />
          <YAxis
            tickFormatter={(value) => `₹${value / 100000}L`}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#666' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#2563eb"
            strokeWidth={2}
            dot={{ fill: '#2563eb', r: 4 }}
            activeDot={{ r: 6, fill: '#2563eb', stroke: '#fff', strokeWidth: 2 }}
            animationDuration={1500}
          />
          <Line
            type="monotone"
            dataKey="growth"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ fill: '#10b981', r: 4 }}
            activeDot={{ r: 6, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
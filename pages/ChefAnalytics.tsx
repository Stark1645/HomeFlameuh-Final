
import React, { useEffect, useState } from 'react';
import { ChefAnalytics as AnalyticsType, User } from '../types';
import { mockApi } from '../services/mockApi';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const ChefAnalytics: React.FC<{ user: User }> = ({ user }) => {
  const [data, setData] = useState<AnalyticsType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockApi.chefs.getAnalytics(user.id).then(res => {
      setData(res.data);
      setLoading(false);
    });
  }, [user]);

  if (loading || !data) return <div className="p-20 text-center">Loading kitchen insights...</div>;

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue ($)',
        data: data.monthlyRevenue,
        borderColor: '#ea580c',
        backgroundColor: 'rgba(234, 88, 12, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      y: { beginAtZero: true, grid: { color: '#f1f5f9' } },
      x: { grid: { display: false } }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-10">Kitchen Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Total Orders</p>
          <h2 className="text-4xl font-extrabold text-slate-900">{data.totalOrders}</h2>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Total Revenue</p>
          <h2 className="text-4xl font-extrabold text-orange-600">${data.totalRevenue.toFixed(2)}</h2>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Average Rating</p>
          <h2 className="text-4xl font-extrabold text-slate-900">{data.averageRating} <i className="fas fa-star text-orange-400 text-2xl"></i></h2>
        </div>
      </div>

      <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-bold text-slate-900">Revenue Performance</h3>
          <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">+12% from last month</span>
        </div>
        <div className="h-[400px]">
          <Line data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ChefAnalytics;

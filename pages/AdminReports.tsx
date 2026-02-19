
import React, { useEffect, useState } from 'react';
import { AdminReport } from '../types';
import { apiService } from '../services/apiService';

const AdminReports: React.FC = () => {
  const [report, setReport] = useState<AdminReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiService.admin.getReport().then(res => {
      setReport(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading || !report) return <div className="p-20 text-center animate-pulse text-slate-400 uppercase tracking-widest font-bold">Compiling Report Data...</div>;

  const stats = [
    { label: 'Total Platform Users', value: report.totalUsers, icon: 'fa-users', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Home Chefs', value: report.totalChefs, icon: 'fa-hat-chef', color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Completed Orders', value: report.totalOrders, icon: 'fa-box-check', color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Total GMV (Revenue)', value: `$${report.totalRevenue.toFixed(2)}`, icon: 'fa-chart-line', color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900">Platform Performance</h1>
          <p className="text-slate-500">Global health metrics for HomeFlame.</p>
        </div>
        <button className="bg-slate-900 text-white px-6 py-2 rounded-xl font-bold text-sm shadow-lg hover:bg-slate-800 transition-all">
          <i className="fas fa-download mr-2"></i> Export PDF
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s, idx) => (
          <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 ${s.bg} ${s.color} rounded-2xl flex items-center justify-center mb-6 text-xl`}>
              <i className={`fas ${s.icon}`}></i>
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{s.label}</p>
            <h2 className="text-3xl font-extrabold text-slate-900">{s.value}</h2>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100">
          <h3 className="text-xl font-bold text-slate-900">Recent Growth Insights</h3>
        </div>
        <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
           <div>
              <p className="text-slate-600 mb-6 italic">"Platform activity has increased by 15% following the introduction of the new weekly meal subscription plans. Chef retention remains at an all-time high of 94%."</p>
              <div className="space-y-4">
                 <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 w-[75%]"></div>
                 </div>
                 <p className="text-xs font-bold text-slate-400">CHEF ONBOARDING GOAL (75%)</p>
              </div>
           </div>
           <div className="bg-slate-50 rounded-2xl p-6">
              <h4 className="font-bold mb-4">Top Performing Areas</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between items-center"><span>San Francisco</span> <span className="font-bold">422 Orders</span></li>
                <li className="flex justify-between items-center"><span>New York</span> <span className="font-bold">389 Orders</span></li>
                <li className="flex justify-between items-center"><span>Chicago</span> <span className="font-bold">245 Orders</span></li>
              </ul>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;

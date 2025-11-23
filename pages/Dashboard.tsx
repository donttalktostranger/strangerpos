import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { DollarSign, ShoppingBag, TrendingUp, AlertTriangle, Sparkles, Lightbulb } from 'lucide-react';
import { generateBusinessInsight, askAssistant } from '../services/geminiService';

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; color: string }> = ({ title, value, icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-500 mb-1 font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
    </div>
    <div className={`h-12 w-12 rounded-full flex items-center justify-center text-white shadow-md`} style={{ backgroundColor: color }}>
      {icon}
    </div>
  </div>
);

export const Dashboard: React.FC = () => {
  const { sales, products } = useStore();
  const [aiInsight, setAiInsight] = useState<string>("");
  const [loadingAi, setLoadingAi] = useState(false);
  const [assistantQuery, setAssistantQuery] = useState("");
  const [assistantResponse, setAssistantResponse] = useState("");

  // Aggregations
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
  const totalTransactions = sales.length;
  const totalStockValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
  const lowStockItems = products.filter(p => p.stock <= 20).length;

  // Chart Data (Mock transformation of sales dates)
  const chartData = sales.reduce((acc: any[], sale) => {
    const date = new Date(sale.date).toLocaleDateString('en-US', { weekday: 'short' });
    const existing = acc.find(item => item.name === date);
    if (existing) {
      existing.amount += sale.totalAmount;
    } else {
      acc.push({ name: date, amount: sale.totalAmount });
    }
    return acc;
  }, []);

  // Ensure some data shows up even if empty
  const displayChartData = chartData.length > 0 ? chartData : [
    { name: 'Mon', amount: 0 }, { name: 'Tue', amount: 0 }, { name: 'Wed', amount: 0 },
    { name: 'Thu', amount: 0 }, { name: 'Fri', amount: 0 }, { name: 'Sat', amount: 0 }, { name: 'Sun', amount: 0 }
  ];

  const handleGenerateInsight = async () => {
    setLoadingAi(true);
    const insight = await generateBusinessInsight(sales, products);
    setAiInsight(insight);
    setLoadingAi(false);
  };

  const handleAskAssistant = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!assistantQuery.trim()) return;
    const context = `Total Rev: ${totalRevenue}, Low Stock Items: ${lowStockItems}. Top Products: ${products.slice(0,3).map(p=>p.name).join(', ')}`;
    const answer = await askAssistant(assistantQuery, context);
    setAssistantResponse(answer);
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#004D40]">Executive Dashboard</h1>
        <span className="text-sm text-gray-500">{new Date().toLocaleDateString()}</span>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value={`$${totalRevenue.toFixed(2)}`} icon={<DollarSign className="h-6 w-6" />} color="#004D40" />
        <StatCard title="Transactions" value={totalTransactions} icon={<ShoppingBag className="h-6 w-6" />} color="#00695C" />
        <StatCard title="Inventory Value" value={`$${totalStockValue.toFixed(2)}`} icon={<TrendingUp className="h-6 w-6" />} color="#4CAF50" />
        <StatCard title="Low Stock Alerts" value={lowStockItems} icon={<AlertTriangle className="h-6 w-6" />} color="#E53935" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Sales Trends (Weekly)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={displayChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF' }} />
                <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
                <Line type="monotone" dataKey="amount" stroke="#004D40" strokeWidth={3} dot={{ r: 4, fill: '#004D40', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insights Section */}
        <div className="space-y-6">
            {/* Executive Summary */}
            <div className="bg-gradient-to-br from-[#004D40] to-[#00695C] text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
                <Sparkles className="absolute top-4 right-4 h-12 w-12 text-white opacity-10" />
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    AI Business Insights
                </h3>
                <div className="min-h-[120px] text-sm text-gray-100 leading-relaxed">
                    {loadingAi ? (
                        <div className="flex items-center gap-2 animate-pulse">
                            <div className="h-2 w-2 bg-white rounded-full animate-bounce"></div>
                            <div className="h-2 w-2 bg-white rounded-full animate-bounce delay-75"></div>
                            <div className="h-2 w-2 bg-white rounded-full animate-bounce delay-150"></div>
                            Analyzing data...
                        </div>
                    ) : (
                        aiInsight || "Click below to generate a professional analysis of your current sales and inventory performance using Gemini AI."
                    )}
                </div>
                <button 
                    onClick={handleGenerateInsight}
                    className="mt-4 w-full bg-white/20 hover:bg-white/30 text-white py-2 rounded-lg text-sm font-medium transition-colors backdrop-blur-sm"
                >
                    {aiInsight ? 'Refresh Analysis' : 'Generate Report'}
                </button>
            </div>

            {/* Quick Assistant */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                 <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    Quick Assist
                </h3>
                <form onSubmit={handleAskAssistant} className="relative">
                    <input 
                        type="text"
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-3 pr-10 py-2 text-sm focus:ring-2 focus:ring-[#004D40] focus:outline-none"
                        placeholder="e.g., 'What sold best today?'"
                        value={assistantQuery}
                        onChange={(e) => setAssistantQuery(e.target.value)}
                    />
                    <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-[#004D40] hover:text-[#00695C]">
                        <Sparkles className="h-4 w-4" />
                    </button>
                </form>
                {assistantResponse && (
                    <div className="mt-3 p-3 bg-yellow-50 text-yellow-900 text-xs rounded-lg border border-yellow-100">
                        {assistantResponse}
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Package, 
  Layers, 
  Users, 
  Inbox, 
  AlertTriangle, 
  ArrowRight, 
  Clock, 
  FileSpreadsheet,
  CheckCircle2
} from "lucide-react";
import { api } from "../../services/api.js";
import { formatINR } from "../../utils/price.js";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        setLoading(true);
        const res = await api.stats.getDashboard();
        if (res.data) setStats(res.data);
      } catch (e) {
        console.error("Dashboard stats error:", e);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "Contacted":
        return "bg-blue-50 text-blue-800 border-blue-200";
      case "Processing":
        return "bg-purple-50 text-purple-800 border-purple-200";
      case "Completed":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "Cancelled":
        return "bg-rose-50 text-rose-800 border-rose-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  if (loading) {
    return (
      <div className="py-16 text-center text-xs uppercase tracking-widest text-[#7A6961]">
        Gathering Store Telemetry...
      </div>
    );
  }

  // Section 23: Total Products, Active Products, Categories, Customers, Enquiries, Pending Enquiries, Limited Stock
  const statCards = [
    {
      label: "Total Products",
      value: stats?.totalProducts || 0,
      sub: `${stats?.activeProducts || 0} active in catalogue`,
      icon: Package,
      link: "/admin/products"
    },
    {
      label: "Active Products",
      value: stats?.activeProducts || 0,
      sub: "Available to customers",
      icon: CheckCircle2,
      link: "/admin/products"
    },
    {
      label: "Categories",
      value: stats?.totalCategories || 0,
      sub: "Sweets, Snacks & Hampers",
      icon: Layers,
      link: "/admin/categories"
    },
    {
      label: "Customers",
      value: stats?.totalCustomers || 0,
      sub: "Patrons registered",
      icon: Users,
      link: "/admin/customers"
    },
    {
      label: "Enquiries",
      value: stats?.totalEnquiries || 0,
      sub: `${stats?.pendingEnquiries || 0} awaiting review`,
      icon: Inbox,
      link: "/admin/enquiries"
    },
    {
      label: "Pending Enquiries",
      value: stats?.pendingEnquiries || 0,
      sub: "Requires concierge action",
      icon: Clock,
      link: "/admin/enquiries?status=Pending"
    },
    {
      label: "Limited Stock",
      value: stats?.limitedStockProducts || 0,
      sub: `≤ 10 kg remaining (${stats?.outOfStockProducts || 0} out of stock)`,
      icon: AlertTriangle,
      link: "/admin/stock"
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#2A211D]">
            MS Sweets Dashboard
          </h1>
          <p className="text-xs text-[#7A6961] mt-0.5">
            Operational overview of catalogue, live stock alerts, and customer celebration enquiries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={api.stats.getExportCsvUrl()}
            download
            className="px-3.5 py-2 bg-white border border-[#EFE5D5] hover:bg-[#FFFDF8] text-[#2A211D] text-xs font-semibold rounded-lg shadow-2xs transition-colors flex items-center gap-1.5"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-[#2E7D32]" />
            <span>Export CSV</span>
          </a>

          <Link
            to="/admin/stock"
            className="px-4 py-2 bg-[#5A171C] hover:bg-[#741F24] text-[#FFFDF8] text-xs font-bold uppercase tracking-wider rounded-lg shadow-2xs transition-colors"
          >
            Manage Stock
          </Link>
        </div>
      </div>

      {/* Clean Compact Cards Grid (Section 23) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              to={card.link}
              className="p-4 bg-white rounded-xl border border-[#EFE5D5] shadow-2xs hover:border-[#D9B66F] transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#7A6961]">
                  {card.label}
                </span>
                <Icon className="w-4 h-4 text-[#C89B52] group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <div className="font-serif text-3xl font-bold text-[#2A211D]">
                  {card.value}
                </div>
                <p className="text-[11px] text-[#7A6961] mt-0.5 truncate">
                  {card.sub}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Enquiries Table (Section 23) */}
      <div className="bg-white rounded-xl border border-[#EFE5D5] shadow-2xs overflow-hidden space-y-3 p-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#EFE5D5]">
          <div>
            <h2 className="text-sm font-bold text-[#2A211D]">
              Recent Customer Enquiries
            </h2>
            <p className="text-[11px] text-[#7A6961]">
              Latest patron order requests submitted via online storefront.
            </p>
          </div>
          <Link
            to="/admin/enquiries"
            className="text-xs font-semibold text-[#5A171C] hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EFE5D5] text-[#7A6961] uppercase tracking-wider bg-[#FFFDF8]">
                <th className="py-2.5 px-3 font-semibold">Enquiry ID</th>
                <th className="py-2.5 px-3 font-semibold">Customer</th>
                <th className="py-2.5 px-3 font-semibold">Occasion</th>
                <th className="py-2.5 px-3 font-semibold">Items</th>
                <th className="py-2.5 px-3 font-semibold">Est. Total</th>
                <th className="py-2.5 px-3 font-semibold">Status</th>
                <th className="py-2.5 px-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFE5D5]">
              {stats?.recentEnquiries && stats.recentEnquiries.length > 0 ? (
                stats.recentEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-[#FFFDF8] transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-[#2A211D]">
                      {enq.id}
                    </td>
                    <td className="py-3 px-3 font-semibold text-[#2A211D]">
                      {enq.customerName}
                    </td>
                    <td className="py-3 px-3 text-[#5C4D46]">
                      {enq.occasion}
                    </td>
                    <td className="py-3 px-3 text-[#5C4D46]">
                      {enq.itemsCount} Items
                    </td>
                    <td className="py-3 px-3 font-serif font-bold text-[#5A171C]">
                      {formatINR(enq.estimatedTotal)}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(enq.status)}`}>
                        {enq.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <Link
                        to={`/admin/enquiries/${enq.id}`}
                        className="text-xs font-semibold text-[#5A171C] hover:underline"
                      >
                        Inspect
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-[#7A6961]">
                    No recent customer enquiries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

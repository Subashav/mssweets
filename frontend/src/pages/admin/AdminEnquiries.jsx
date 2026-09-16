import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { 
  Inbox, 
  Search, 
  FileSpreadsheet, 
  Filter, 
  Eye, 
  MessageCircle, 
  Clock, 
  RefreshCw 
} from "lucide-react";
import { api } from "../../services/api.js";
import { formatINR } from "../../utils/price.js";
import { generateWhatsAppLink } from "../../utils/whatsapp.js";

export default function AdminEnquiries() {
  const [searchParams] = useSearchParams();
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState(searchParams.get("status") || "");
  const [search, setSearch] = useState("");

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const res = await api.enquiries.getAll({ status: statusFilter, search });
      if (res.data) setEnquiries(res.data);
    } catch (e) {
      console.error("Failed to load enquiries:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter]);

  const handleStatusChange = async (enquiryId, newStatus) => {
    try {
      const res = await api.enquiries.updateStatus(enquiryId, newStatus);
      if (res.data) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === enquiryId ? { ...e, status: newStatus } : e))
        );
      }
    } catch (err) {
      alert("Failed to update status: " + err.message);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "Contacted":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "Processing":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "Completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "Cancelled":
        return "bg-rose-100 text-rose-800 border-rose-300";
      default:
        return "bg-slate-100 text-slate-700 border-slate-300";
    }
  };

  const statuses = ["Pending", "Contacted", "Processing", "Completed", "Cancelled"];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Customer Celebration Enquiries
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Review incoming sweet cart requests, update fulfillment stages, and initiate WhatsApp contact.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={api.stats.getExportCsvUrl()}
            download
            className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg shadow-2xs transition-colors flex items-center gap-2"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Export Enquiries (CSV)</span>
          </a>

          <button
            onClick={fetchEnquiries}
            className="p-2 bg-white border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50"
            title="Refresh list"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex-1 min-w-[240px] relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchEnquiries()}
            placeholder="Search by Enquiry ID, Patron Name or Phone..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="py-2 px-3 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none font-medium"
          >
            <option value="">All Statuses</option>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider bg-slate-50/70">
                <th className="py-3 px-4 font-semibold">Enquiry Ref</th>
                <th className="py-3 px-4 font-semibold">Patron Name</th>
                <th className="py-3 px-4 font-semibold">Phone / Location</th>
                <th className="py-3 px-4 font-semibold">Occasion</th>
                <th className="py-3 px-4 font-semibold">Items</th>
                <th className="py-3 px-4 font-semibold">Est. Total</th>
                <th className="py-3 px-4 font-semibold">Current Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-slate-400">
                    Loading customer enquiries...
                  </td>
                </tr>
              ) : enquiries.length > 0 ? (
                enquiries.map((enq) => {
                  const whatsappUrl = generateWhatsAppLink({
                    enquiryId: enq.id,
                    customerName: enq.customer?.name,
                    customerPhone: enq.customer?.phone,
                    items: enq.items,
                    estimatedTotal: enq.estimatedTotal,
                    occasion: enq.occasion,
                    customMessage: enq.message
                  });

                  return (
                    <tr key={enq.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                        <Link
                          to={`/admin/enquiries/${enq.id}`}
                          className="hover:text-amber-600 hover:underline"
                        >
                          {enq.id}
                        </Link>
                        <span className="block text-[10px] text-slate-400 font-sans font-normal">
                          {new Date(enq.createdAt).toLocaleDateString("en-IN")}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-900 block">
                          {enq.customer?.name || "Patron"}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          {enq.customer?.email || ""}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-slate-600">
                        <span className="font-mono text-slate-700 block">
                          {enq.customer?.phone || "—"}
                        </span>
                        <span className="text-[11px] text-slate-500 truncate max-w-xs block">
                          {enq.customer?.location || "Online"}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-slate-700 font-medium">
                        {enq.occasion}
                      </td>

                      <td className="py-3.5 px-4 text-slate-600 max-w-xs">
                        <span className="font-semibold text-slate-900">
                          {(enq.items || []).reduce((sum, i) => sum + (i.quantity || 1), 0)} items
                        </span>
                        <p className="text-[11px] text-slate-500 truncate">
                          {(enq.items || []).map((i) => `${i.productName} (${i.weight} × ${i.quantity})`).join(", ")}
                        </p>
                      </td>

                      <td className="py-3.5 px-4 font-bold text-slate-900 font-serif text-sm">
                        {formatINR(enq.estimatedTotal)}
                      </td>

                      <td className="py-3.5 px-4">
                        <select
                          value={enq.status}
                          onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                          className={`px-2 py-1 rounded-full text-[11px] font-bold border focus:outline-none cursor-pointer ${getStatusBadge(enq.status)}`}
                        >
                          {statuses.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
                            title="Contact Patron on WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4 fill-emerald-100" />
                          </a>

                          <Link
                            to={`/admin/enquiries/${enq.id}`}
                            className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-slate-100 rounded transition-colors"
                            title="View Full Details"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-slate-400">
                    No enquiries found matching filters.
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

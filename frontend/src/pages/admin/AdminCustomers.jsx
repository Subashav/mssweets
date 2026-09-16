import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Users, Phone, Mail, MapPin, Eye, ArrowRight } from "lucide-react";
import { api } from "../../services/api.js";

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCustomers() {
      try {
        setLoading(true);
        const res = await api.customers.getAll();
        if (res.data) setCustomers(res.data);
      } catch (e) {
        console.error("Customers error:", e);
      } finally {
        setLoading(false);
      }
    }
    loadCustomers();
  }, []);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Patrons & Customer Profiles
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Directory of valued patrons who have submitted celebration enquiries or orders.
        </p>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider bg-slate-50/70">
                <th className="py-3 px-4 font-semibold">Customer Patron</th>
                <th className="py-3 px-4 font-semibold">Contact Phone</th>
                <th className="py-3 px-4 font-semibold">Email</th>
                <th className="py-3 px-4 font-semibold">Location</th>
                <th className="py-3 px-4 font-semibold">Total Enquiries</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-slate-400">
                    Loading customer profiles...
                  </td>
                </tr>
              ) : customers.length > 0 ? (
                customers.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-900 block text-sm">
                        {c.name}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {c.id}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-700">
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span>{c.phone || "—"}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <span>{c.email || "—"}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate max-w-xs">{c.location || "Online"}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 font-bold text-slate-800 text-[11px]">
                        {c.enquiriesCount || 0} {c.enquiriesCount === 1 ? "Enquiry" : "Enquiries"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        to={`/admin/customers/${c.id}`}
                        className="text-xs font-semibold text-amber-600 hover:text-amber-700 hover:underline inline-flex items-center gap-1"
                      >
                        <span>Profile & History</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-slate-400">
                    No customer records found yet.
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

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, User, Phone, Mail, MapPin, Inbox, Calendar, ArrowRight, MessageCircle } from "lucide-react";
import { api } from "../../services/api.js";
import { formatINR } from "../../utils/price.js";
import { generateWhatsAppLink } from "../../utils/whatsapp.js";

export default function AdminCustomerDetail() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCustomer() {
      try {
        setLoading(true);
        const res = await api.customers.getById(id);
        if (res.data) setCustomer(res.data);
      } catch (err) {
        setError(err.message || "Failed to load customer profile");
      } finally {
        setLoading(false);
      }
    }
    loadCustomer();
  }, [id]);

  if (loading) {
    return (
      <div className="py-16 text-center text-xs uppercase tracking-widest text-slate-500">
        Loading patron profile...
      </div>
    );
  }

  if (error || !customer) {
    return (
      <div className="p-8 text-center space-y-3">
        <p className="text-rose-600 font-semibold">{error || "Customer profile not found"}</p>
        <Link to="/admin/customers" className="text-xs text-amber-600 underline">
          Back to Patrons Directory
        </Link>
      </div>
    );
  }

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

  const whatsappDirect = generateWhatsAppLink({
    customerName: customer.name,
    customerPhone: customer.phone,
    customMessage: `Hello ${customer.name}, reaching out from the MITHAIRA boutique concierge regarding your enquiry.`
  });

  return (
    <div className="space-y-6">
      
      {/* Back button */}
      <Link
        to="/admin/customers"
        className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Customer Directory</span>
      </Link>

      {/* Profile Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500 text-slate-950 font-serif font-bold text-2xl flex items-center justify-center">
              {customer.name?.charAt(0) || "P"}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {customer.name}
              </h1>
              <span className="text-xs font-mono text-slate-400">
                Customer ID: {customer.id}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={whatsappDirect}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-2xs flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Patron</span>
            </a>
          </div>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="text-slate-400 uppercase tracking-wider font-semibold block">
              Phone Number
            </span>
            <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Phone className="w-4 h-4 text-slate-400" />
              <span>{customer.phone || "Not provided"}</span>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="text-slate-400 uppercase tracking-wider font-semibold block">
              Email Address
            </span>
            <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Mail className="w-4 h-4 text-slate-400" />
              <span className="truncate">{customer.email || "Not provided"}</span>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="text-slate-400 uppercase tracking-wider font-semibold block">
              Location / City
            </span>
            <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span>{customer.location || "Online"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enquiry History */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Enquiry & Celebration History
          </h2>
          <p className="text-xs text-slate-500">
            Total {customer.enquiriesCount || 0} enquiries registered by this patron.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider bg-slate-50/70">
                <th className="py-3 px-4 font-semibold">Enquiry ID</th>
                <th className="py-3 px-4 font-semibold">Occasion</th>
                <th className="py-3 px-4 font-semibold">Items</th>
                <th className="py-3 px-4 font-semibold">Est. Total</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Date</th>
                <th className="py-3 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {customer.enquiries && customer.enquiries.length > 0 ? (
                customer.enquiries.map((e) => (
                  <tr key={e.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">
                      {e.id}
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-700">
                      {e.occasion}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {(e.items || []).map((i) => `${i.productName} (${i.weight} × ${i.quantity})`).join(", ")}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900">
                      {formatINR(e.estimatedTotal)}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(e.status)}`}>
                        {e.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {new Date(e.createdAt).toLocaleDateString("en-IN")}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        to={`/admin/enquiries/${e.id}`}
                        className="text-xs font-semibold text-amber-600 hover:text-amber-700 hover:underline"
                      >
                        Inspect
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-slate-400">
                    No enquiries recorded for this patron.
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

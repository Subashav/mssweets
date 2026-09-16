import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  MessageCircle, 
  CheckCircle, 
  Clock, 
  Package 
} from "lucide-react";
import { api } from "../../services/api.js";
import { formatINR } from "../../utils/price.js";
import { generateWhatsAppLink } from "../../utils/whatsapp.js";

export default function AdminEnquiryDetail() {
  const { id } = useParams();
  const [enquiry, setEnquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentStatus, setCurrentStatus] = useState("Pending");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    async function loadEnquiry() {
      try {
        setLoading(true);
        const res = await api.enquiries.getById(id);
        if (res.data) {
          setEnquiry(res.data);
          setCurrentStatus(res.data.status);
        }
      } catch (err) {
        setError(err.message || "Failed to load enquiry details");
      } finally {
        setLoading(false);
      }
    }
    loadEnquiry();
  }, [id]);

  const handleStatusUpdate = async (status) => {
    setUpdating(true);
    try {
      const res = await api.enquiries.updateStatus(id, status);
      if (res.data) {
        setEnquiry(res.data);
        setCurrentStatus(res.data.status);
      }
    } catch (err) {
      alert("Failed to update status: " + err.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="py-16 text-center text-xs uppercase tracking-widest text-slate-500">
        Loading enquiry details...
      </div>
    );
  }

  if (error || !enquiry) {
    return (
      <div className="p-8 text-center space-y-3">
        <p className="text-rose-600 font-semibold">{error || "Enquiry not found"}</p>
        <Link to="/admin/enquiries" className="text-xs text-amber-600 underline">
          Back to Enquiries List
        </Link>
      </div>
    );
  }

  const whatsappUrl = generateWhatsAppLink({
    enquiryId: enquiry.id,
    customerName: enquiry.customer?.name,
    customerPhone: enquiry.customer?.phone,
    items: enquiry.items,
    estimatedTotal: enquiry.estimatedTotal,
    occasion: enquiry.occasion,
    customMessage: enquiry.message
  });

  const statuses = ["Pending", "Contacted", "Processing", "Completed", "Cancelled"];

  return (
    <div className="space-y-6">
      
      {/* Back Button & Top Action */}
      <div className="flex items-center justify-between">
        <Link
          to="/admin/enquiries"
          className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Enquiries</span>
        </Link>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-2xs flex items-center gap-2"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>Contact Patron via WhatsApp</span>
        </a>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Customer & Details */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Status Updater Card */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Fulfillment Status
            </h3>
            <div className="space-y-2">
              {statuses.map((s) => (
                <button
                  key={s}
                  onClick={() => handleStatusUpdate(s)}
                  disabled={updating}
                  className={`w-full py-2 px-3 text-xs font-bold uppercase rounded-lg border text-left flex items-center justify-between transition-all ${
                    currentStatus === s
                      ? "bg-slate-900 text-amber-400 border-slate-900 shadow-xs"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <span>{s}</span>
                  {currentStatus === s && <CheckCircle className="w-4 h-4 text-amber-400" />}
                </button>
              ))}
            </div>
          </div>

          {/* Patron Details Card */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4 text-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Patron Profile
            </h3>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-slate-400 shrink-0" />
                <div>
                  <span className="font-bold text-slate-900 text-sm block">
                    {enquiry.customer?.name}
                  </span>
                  <Link
                    to={`/admin/customers/${enquiry.customerId}`}
                    className="text-[10px] text-amber-600 hover:underline"
                  >
                    View Patron History →
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="font-mono text-slate-800">
                  {enquiry.customer?.phone || "No phone given"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-slate-600 truncate">
                  {enquiry.customer?.email || "No email given"}
                </span>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span className="text-slate-600">
                  {enquiry.customer?.location || "Online Storefront"}
                </span>
              </div>
            </div>
          </div>

          {/* Metadata Card */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3 text-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Celebration Context
            </h3>
            <div className="space-y-2 text-slate-700">
              <div>
                <span className="text-slate-400 block">Occasion Type:</span>
                <span className="font-bold text-slate-900 text-sm">{enquiry.occasion}</span>
              </div>

              <div>
                <span className="text-slate-400 block">Submission Timestamp:</span>
                <span className="font-mono text-slate-700">
                  {new Date(enquiry.createdAt).toLocaleString("en-IN")}
                </span>
              </div>

              {enquiry.message && (
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-slate-400 block mb-1">Patron's Custom Note:</span>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 italic">
                    "{enquiry.message}"
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Right Column: Ordered Items Table & Snapshot Calculation */}
        <div className="lg:col-span-8 bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="font-mono text-xs text-slate-400 uppercase">
                Enquiry Identification
              </span>
              <h2 className="text-2xl font-bold font-mono text-slate-900">
                {enquiry.id}
              </h2>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 uppercase tracking-wider block">
                Estimated Order Value
              </span>
              <span className="font-serif text-3xl font-bold text-[#5B131A]">
                {formatINR(enquiry.estimatedTotal)}
              </span>
            </div>
          </div>

          {/* Products Snapshot Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider bg-slate-50/70">
                  <th className="py-3 px-4 font-semibold">Mithai Selection</th>
                  <th className="py-3 px-4 font-semibold">Selected Weight</th>
                  <th className="py-3 px-4 font-semibold">Quantity</th>
                  <th className="py-3 px-4 font-semibold">Price Snapshot</th>
                  <th className="py-3 px-4 font-semibold text-right">Estimated Line Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {enquiry.items && enquiry.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      <div className="flex items-center gap-3">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.productName}
                            className="w-10 h-10 rounded object-cover border border-slate-200 shrink-0"
                          />
                        )}
                        <div>
                          <span>{item.productName}</span>
                          <span className="block text-[10px] text-slate-400 font-mono font-normal">
                            Ref: {item.productId}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-amber-700">
                      {item.weight || "1kg"}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">
                      × {item.quantity}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">
                      {formatINR(item.priceSnapshot)}
                    </td>
                    <td className="py-3.5 px-4 font-serif font-bold text-slate-900 text-sm text-right">
                      {formatINR((item.priceSnapshot || 0) * (item.quantity || 1))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Box */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
            <span className="text-slate-600">
              *All item prices were snapshotted at the moment of enquiry submission.
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-slate-500 uppercase font-semibold">Grand Estimated Total:</span>
              <span className="font-serif font-bold text-xl text-[#5B131A]">
                {formatINR(enquiry.estimatedTotal)}
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Lock, User, ArrowRight, ShieldAlert, CheckCircle2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import { BRAND_CONFIG } from "../../config/brand.js";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(username.trim(), password);
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Invalid administrative credentials. Please verify.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 text-slate-100 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <Link to="/" className="inline-block">
          <span className="font-serif text-3xl font-bold tracking-widest text-amber-400">
            {BRAND_CONFIG.businessName}
          </span>
          <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400 mt-0.5">
            Boutique Administrative Portal
          </p>
        </Link>
        <h2 className="text-xl font-semibold text-slate-200">
          Sign In to Back-Office
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-900 py-8 px-6 shadow-2xl rounded-2xl border border-slate-800 sm:px-10 space-y-6">
          
          {error && (
            <div className="p-3.5 bg-rose-950/60 border border-rose-800 rounded-lg text-xs text-rose-300 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Admin Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white focus:border-amber-400 focus:outline-none"
                />
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white focus:border-amber-400 focus:outline-none"
                />
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs uppercase tracking-widest font-bold rounded-lg shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              <span>{loading ? "Verifying Session..." : "Access Dashboard"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Demonstration Notice Card */}
          <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2 text-xs text-slate-400">
            <div className="flex items-center gap-2 text-amber-400 font-semibold uppercase text-[11px] tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Pre-Filled Demo Credentials</span>
            </div>
            <div className="font-mono text-[11px] text-slate-300 space-y-0.5">
              <div>Username: <strong className="text-white">admin</strong></div>
              <div>Password: <strong className="text-white">admin123</strong></div>
            </div>
            <p className="text-[10px] text-slate-500 leading-normal pt-1 border-t border-slate-800">
              *These credentials are for demonstration purposes and must be updated in backend .env before production release.
            </p>
          </div>

          <div className="text-center pt-2">
            <Link to="/" className="text-xs text-slate-400 hover:text-amber-400 transition-colors">
              ← Return to Customer Storefront
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

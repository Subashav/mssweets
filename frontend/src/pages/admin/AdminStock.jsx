import React, { useState, useEffect } from "react";
import { Search, Boxes, Check, AlertTriangle, Save, RefreshCw } from "lucide-react";
import { api } from "../../services/api.js";
import { BRAND_CONFIG } from "../../config/brand.js";

export default function AdminStock() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [stockInputs, setStockInputs] = useState({});
  const [updatingId, setUpdatingId] = useState(null);
  const [successId, setSuccessId] = useState(null);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const [prodRes, catRes] = await Promise.all([
        api.products.getAdminAll({ search, category: selectedCategory }),
        api.categories.getAll()
      ]);
      if (prodRes.data) {
        setProducts(prodRes.data);
        const inputs = {};
        prodRes.data.forEach((p) => {
          inputs[p.id] = p.stockQuantity;
        });
        setStockInputs(inputs);
      }
      if (catRes.data) setCategories(catRes.data);
    } catch (e) {
      console.error("Failed to load inventory:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, [selectedCategory]);

  const handleStockInputChange = (id, val) => {
    setStockInputs((prev) => ({ ...prev, [id]: val }));
  };

  const handleQuickUpdate = async (product) => {
    const newQty = Number(stockInputs[product.id]);
    if (isNaN(newQty) || newQty < 0) {
      alert("Please specify a valid non-negative stock quantity.");
      return;
    }

    setUpdatingId(product.id);
    try {
      const res = await api.products.updateStock(product.id, newQty);
      if (res.success && res.data) {
        // Update local products list immediately
        setProducts((prev) =>
          prev.map((p) => (p.id === product.id ? res.data : p))
        );
        setSuccessId(product.id);
        setTimeout(() => setSuccessId(null), 2000);
      }
    } catch (err) {
      alert("Failed to update stock: " + err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const getStockBadge = (p) => {
    if (p.stockQuantity <= 0) {
      return (
        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-300">
          Out of Stock (0)
        </span>
      );
    }
    if (p.stockQuantity <= BRAND_CONFIG.limitedStockMax) {
      return (
        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
          Limited Stock (≤ {BRAND_CONFIG.limitedStockMax})
        </span>
      );
    }
    return (
      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
        In Stock ({p.stockQuantity} kg)
      </span>
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Boxes className="w-6 h-6 text-amber-500" />
            <h1 className="text-2xl font-bold text-slate-900">
              Live Stock & Inventory Manager
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Inline quick stock updates. Changes instantly reflect in customer availability badges across the boutique storefront.
          </p>
        </div>

        <button
          onClick={fetchInventory}
          className="px-3.5 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg shadow-2xs transition-colors flex items-center gap-2"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Stock</span>
        </button>
      </div>

      {/* Threshold Guide */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
          <div>
            <strong className="block font-bold">In Stock:</strong>
            <span>Stock &gt; {BRAND_CONFIG.limitedStockMax} kg/units</span>
          </div>
        </div>
        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-amber-500 shrink-0" />
          <div>
            <strong className="block font-bold">Limited Stock:</strong>
            <span>1 to {BRAND_CONFIG.limitedStockMax} kg/units remaining</span>
          </div>
        </div>
        <div className="p-4 bg-rose-50 rounded-xl border border-rose-200 text-xs text-rose-900 flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-rose-500 shrink-0" />
          <div>
            <strong className="block font-bold">Out of Stock:</strong>
            <span>0 kg/units remaining (cart disabled)</span>
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex-1 min-w-[240px] relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search sweets by title..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="py-2 px-3 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none font-medium"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Stock Management Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider bg-slate-50/70">
                <th className="py-3 px-4 font-semibold">Product</th>
                <th className="py-3 px-4 font-semibold">Category</th>
                <th className="py-3 px-4 font-semibold">Current Availability</th>
                <th className="py-3 px-4 font-semibold">Available Stock (kg/units)</th>
                <th className="py-3 px-4 font-semibold text-right">Quick Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-slate-400">
                    Loading inventory positions...
                  </td>
                </tr>
              ) : products.length > 0 ? (
                products.map((p) => {
                  const isDirty = stockInputs[p.id] !== undefined && Number(stockInputs[p.id]) !== p.stockQuantity;
                  const isUpdating = updatingId === p.id;
                  const isSuccess = successId === p.id;

                  return (
                    <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.images?.[0] || p.image}
                            alt={p.name}
                            className="w-10 h-10 rounded-md object-cover bg-slate-100 border border-slate-200 shrink-0"
                          />
                          <div>
                            <span className="font-bold text-slate-900 block">
                              {p.name}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400">
                              ID: {p.id}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-600 font-medium">
                        {p.categorySlug ? p.categorySlug.replace("-", " ") : "Mithai"}
                      </td>
                      <td className="py-3 px-4">
                        {getStockBadge(p)}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2 max-w-[140px]">
                          <input
                            type="number"
                            min="0"
                            value={stockInputs[p.id] !== undefined ? stockInputs[p.id] : p.stockQuantity}
                            onChange={(e) => handleStockInputChange(p.id, e.target.value)}
                            className={`w-24 px-2.5 py-1.5 text-xs font-mono font-bold border rounded focus:outline-none ${
                              isDirty
                                ? "border-amber-500 bg-amber-50/50 text-amber-900"
                                : "border-slate-300 bg-white text-slate-900"
                            }`}
                          />
                          <span className="text-slate-400 text-[11px]">kg</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleQuickUpdate(p)}
                          disabled={isUpdating || !isDirty}
                          className={`px-3.5 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-1.5 ${
                            isSuccess
                              ? "bg-emerald-600 text-white"
                              : isDirty
                              ? "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-xs"
                              : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                          }`}
                        >
                          {isUpdating ? (
                            <span>Saving...</span>
                          ) : isSuccess ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Updated</span>
                            </>
                          ) : (
                            <>
                              <Save className="w-3.5 h-3.5" />
                              <span>Save Stock</span>
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-slate-400">
                    No products found.
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

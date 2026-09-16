import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  ToggleLeft, 
  ToggleRight, 
  X, 
  Package, 
  Check, 
  AlertCircle 
} from "lucide-react";
import { api } from "../../services/api.js";
import { formatINR } from "../../utils/price.js";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    description: "",
    imagesStr: "",
    retailPrice: 1000,
    wholesalePrice: 850,
    stockQuantity: 25,
    weightOptionsStr: "250g, 500g, 1kg",
    ingredients: "Goan Cashews, Desi Ghee, Sugar, Cardamom",
    storageInformation: "Store in a cool, dry place.",
    bestBefore: "15 days from packaging",
    status: "active"
  });
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const [prodRes, catRes] = await Promise.all([
        api.products.getAdminAll({ search, category: categoryFilter }),
        api.categories.getAll()
      ]);
      if (prodRes.data) setProducts(prodRes.data);
      if (catRes.data) setCategories(catRes.data);
    } catch (e) {
      console.error("Fetch products error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [categoryFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      categoryId: categories[0]?.id || "",
      description: "",
      imagesStr: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Assorted_Indian_Sweets.jpg",
      retailPrice: 800,
      wholesalePrice: 680,
      stockQuantity: 30,
      weightOptionsStr: "250g, 500g, 1kg",
      ingredients: "Pure Cow Ghee, Cane Sugar, Cardamom, Dry Fruits",
      storageInformation: "Store in a cool dry area away from sunlight.",
      bestBefore: "15 days from preparation",
      status: "active"
    });
    setFormError("");
    setModalOpen(true);
  };

  const openEditModal = (p) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      categoryId: p.categoryId,
      description: p.description || "",
      imagesStr: Array.isArray(p.images) ? p.images.join(", ") : (p.image || ""),
      retailPrice: p.retailPrice,
      wholesalePrice: p.wholesalePrice || Math.round(p.retailPrice * 0.85),
      stockQuantity: p.stockQuantity,
      weightOptionsStr: Array.isArray(p.weightOptions) ? p.weightOptions.join(", ") : "250g, 500g, 1kg",
      ingredients: p.ingredients || "",
      storageInformation: p.storageInformation || "",
      bestBefore: p.bestBefore || "",
      status: p.status || "active"
    });
    setFormError("");
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setFormError("Product name is required");
      return;
    }
    if (!formData.categoryId) {
      setFormError("Please select a category");
      return;
    }

    setSaving(true);
    setFormError("");

    try {
      const payload = {
        name: formData.name.trim(),
        categoryId: formData.categoryId,
        description: formData.description.trim(),
        images: formData.imagesStr.split(",").map((s) => s.trim()).filter(Boolean),
        retailPrice: Number(formData.retailPrice),
        wholesalePrice: Number(formData.wholesalePrice),
        stockQuantity: Number(formData.stockQuantity),
        weightOptions: formData.weightOptionsStr.split(",").map((s) => s.trim()).filter(Boolean),
        ingredients: formData.ingredients.trim(),
        storageInformation: formData.storageInformation.trim(),
        bestBefore: formData.bestBefore.trim(),
        status: formData.status
      };

      if (editingProduct) {
        await api.products.update(editingProduct.id, payload);
      } else {
        await api.products.create(payload);
      }

      setModalOpen(false);
      fetchProducts();
    } catch (err) {
      setFormError(err.message || "Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  const handleToggleStatus = async (product) => {
    const nextStatus = product.status === "active" ? "inactive" : "active";
    try {
      await api.products.update(product.id, { status: nextStatus });
      fetchProducts();
    } catch (e) {
      alert("Failed to update status: " + e.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.products.delete(id);
      fetchProducts();
    } catch (e) {
      alert("Failed to delete product: " + e.message);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Artisanal Confectionery Catalogue
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage sweet descriptions, weights, ingredients, wholesale/retail pricing, and visibility.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs uppercase tracking-wider font-bold rounded-lg shadow-2xs transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Sweet</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <form onSubmit={handleSearchSubmit} className="flex-1 min-w-[240px] relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by sweet name..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </form>

        <div className="flex items-center gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
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
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider bg-slate-50/70">
                <th className="py-3 px-4 font-semibold">Product</th>
                <th className="py-3 px-4 font-semibold">Category</th>
                <th className="py-3 px-4 font-semibold">Retail Price</th>
                <th className="py-3 px-4 font-semibold">Stock</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-slate-400">
                    Loading sweets catalogue...
                  </td>
                </tr>
              ) : products.length > 0 ? (
                products.map((p) => (
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
                          <span className="text-[11px] text-slate-500 line-clamp-1 max-w-xs">
                            {p.description}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600 font-medium">
                      {p.categorySlug ? p.categorySlug.replace("-", " ") : "Mithai"}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-slate-900">
                        {formatINR(p.retailPrice)}
                      </span>
                      <span className="text-[10px] text-slate-500"> / kg</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`font-mono font-bold ${
                        p.stockQuantity <= 0 ? "text-rose-600" :
                        p.stockQuantity <= 10 ? "text-amber-600" : "text-emerald-700"
                      }`}>
                        {p.stockQuantity} kg
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleToggleStatus(p)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors ${
                          p.status === "active"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                            : "bg-slate-100 text-slate-500 border-slate-300"
                        }`}
                        title="Click to toggle active/inactive status"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${p.status === "active" ? "bg-emerald-500" : "bg-slate-400"}`} />
                        <span className="uppercase">{p.status}</span>
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-1.5 text-slate-600 hover:text-amber-600 hover:bg-slate-100 rounded transition-colors"
                          title="Edit Product"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-slate-400">
                    No products found matching criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setModalOpen(false)} />

          <div className="relative bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {editingProduct ? `Edit ${editingProduct.name}` : "Create New Artisanal Confection"}
                </h3>
                <p className="text-xs text-slate-500">
                  Configure pricing, imagery, weight options, and shelf life metadata.
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg">
                {formError}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">
                    Sweet Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Kaju Pista Roll"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">
                    Collection / Category *
                  </label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase mb-1">
                  Product Description
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Artisanal description of taste profile, texture, and ingredients..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase mb-1">
                  Image URLs (Comma-separated for gallery)
                </label>
                <input
                  type="text"
                  value={formData.imagesStr}
                  onChange={(e) => setFormData({ ...formData, imagesStr: e.target.value })}
                  placeholder="https://images.unsplash.com/..., https://..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500 font-mono text-[11px]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">
                    Retail Price (₹/kg) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.retailPrice}
                    onChange={(e) => setFormData({ ...formData, retailPrice: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">
                    Wholesale Price (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.wholesalePrice}
                    onChange={(e) => setFormData({ ...formData, wholesalePrice: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">
                    Stock Quantity (kg/boxes)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.stockQuantity}
                    onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">
                    Weight Options (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.weightOptionsStr}
                    onChange={(e) => setFormData({ ...formData, weightOptionsStr: e.target.value })}
                    placeholder="250g, 500g, 1kg or Box (500g)"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                  >
                    <option value="active">Active (Visible in Store)</option>
                    <option value="inactive">Inactive (Archived)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase mb-1">
                  Ingredients List
                </label>
                <input
                  type="text"
                  value={formData.ingredients}
                  onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                  placeholder="e.g. Goan Cashews (70%), Shudh Desi Ghee, Sugar..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">
                    Storage Information
                  </label>
                  <input
                    type="text"
                    value={formData.storageInformation}
                    onChange={(e) => setFormData({ ...formData, storageInformation: e.target.value })}
                    placeholder="Store in cool, dry conditions..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">
                    Best Before Duration
                  </label>
                  <input
                    type="text"
                    value={formData.bestBefore}
                    onChange={(e) => setFormData({ ...formData, bestBefore: e.target.value })}
                    placeholder="e.g. 15 days from preparation"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg font-bold uppercase tracking-wider"
                >
                  {saving ? "Saving..." : editingProduct ? "Update Product" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

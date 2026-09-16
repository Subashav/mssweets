import { BRAND_CONFIG } from "../config/brand.js";

const BASE_URL = BRAND_CONFIG.apiUrl;

function getHeaders(isJson = true) {
  const headers = {};
  if (isJson) {
    headers["Content-Type"] = "application/json";
  }
  const token = localStorage.getItem("mithaira_token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

async function handleResponse(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const errorMsg = data.message || `Request failed with status ${res.status}`;
    const error = new Error(errorMsg);
    error.status = res.status;
    error.data = data;
    throw error;
  }
  return data;
}

export const api = {
  // Auth
  auth: {
    async login(username, password) {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      return handleResponse(res);
    },
    async me() {
      const res = await fetch(`${BASE_URL}/auth/me`, {
        headers: getHeaders()
      });
      return handleResponse(res);
    }
  },

  // Products
  products: {
    async getPublic(params = {}) {
      const query = new URLSearchParams();
      Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== "") {
          query.append(key, val);
        }
      });
      const res = await fetch(`${BASE_URL}/products?${query.toString()}`);
      return handleResponse(res);
    },
    async getById(id) {
      const res = await fetch(`${BASE_URL}/products/${id}`);
      return handleResponse(res);
    },
    async getAdminAll(params = {}) {
      const query = new URLSearchParams(params);
      const res = await fetch(`${BASE_URL}/products/admin/all?${query.toString()}`, {
        headers: getHeaders()
      });
      return handleResponse(res);
    },
    async create(data) {
      const res = await fetch(`${BASE_URL}/products`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(data)
      });
      return handleResponse(res);
    },
    async update(id, data) {
      const res = await fetch(`${BASE_URL}/products/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(data)
      });
      return handleResponse(res);
    },
    async updateStock(id, stockQuantity) {
      const res = await fetch(`${BASE_URL}/products/${id}/stock`, {
        method: "PATCH",
        headers: getHeaders(),
        body: JSON.stringify({ stockQuantity: Number(stockQuantity) })
      });
      return handleResponse(res);
    },
    async delete(id) {
      const res = await fetch(`${BASE_URL}/products/${id}`, {
        method: "DELETE",
        headers: getHeaders()
      });
      return handleResponse(res);
    }
  },

  // Categories
  categories: {
    async getPublic() {
      const res = await fetch(`${BASE_URL}/categories?active=true`);
      return handleResponse(res);
    },
    async getAll() {
      const res = await fetch(`${BASE_URL}/categories`, {
        headers: getHeaders()
      });
      return handleResponse(res);
    },
    async getById(id) {
      const res = await fetch(`${BASE_URL}/categories/${id}`);
      return handleResponse(res);
    },
    async create(data) {
      const res = await fetch(`${BASE_URL}/categories`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(data)
      });
      return handleResponse(res);
    },
    async update(id, data) {
      const res = await fetch(`${BASE_URL}/categories/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(data)
      });
      return handleResponse(res);
    },
    async delete(id) {
      const res = await fetch(`${BASE_URL}/categories/${id}`, {
        method: "DELETE",
        headers: getHeaders()
      });
      return handleResponse(res);
    }
  },

  // Customers
  customers: {
    async getAll() {
      const res = await fetch(`${BASE_URL}/customers`, {
        headers: getHeaders()
      });
      return handleResponse(res);
    },
    async getById(id) {
      const res = await fetch(`${BASE_URL}/customers/${id}`, {
        headers: getHeaders()
      });
      return handleResponse(res);
    }
  },

  // Enquiries
  enquiries: {
    async create(data) {
      const res = await fetch(`${BASE_URL}/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      return handleResponse(res);
    },
    async getAll(params = {}) {
      const query = new URLSearchParams(params);
      const res = await fetch(`${BASE_URL}/enquiries?${query.toString()}`, {
        headers: getHeaders()
      });
      return handleResponse(res);
    },
    async getById(id) {
      const res = await fetch(`${BASE_URL}/enquiries/${id}`, {
        headers: getHeaders()
      });
      return handleResponse(res);
    },
    async updateStatus(id, status) {
      const res = await fetch(`${BASE_URL}/enquiries/${id}/status`, {
        method: "PATCH",
        headers: getHeaders(),
        body: JSON.stringify({ status })
      });
      return handleResponse(res);
    }
  },

  // Stats
  stats: {
    async getDashboard() {
      const res = await fetch(`${BASE_URL}/stats/dashboard`, {
        headers: getHeaders()
      });
      return handleResponse(res);
    },
    getExportCsvUrl() {
      return `${BASE_URL}/stats/enquiries/export.csv`;
    }
  }
};

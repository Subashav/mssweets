# MITHAIRA — Tradition, Crafted Beautifully

A luxury, production-grade digital storefront and back-office management platform for an Indian premium mithai, gifting, and celebration brand.

Designed specifically as a high-end confectionery experience, avoiding generic ecommerce templates in favor of warm ivory/cream backgrounds, royal burgundy/maroon tones, subtle gold accents, and food photography celebrating heirloom Indian sweets.

---

## 🌟 Key Features

### 🍬 Customer Storefront Experience
- **Hero & Heritage Showcase**: High-resolution editorial photography of authentic Indian sweets, trust badges, and brand values.
- **Dynamic Weight-Based Pricing**: Real-time price calculation for `250g`, `500g`, `1kg`, or fixed gift boxes in Indian Rupees (₹).
- **Catalogue & Collections**: Filter by 8 authentic sweet categories, live text search, dynamic price slider, availability filtering, and sorting.
- **Detailed Product Confectionery**: Multi-image galleries with zoom, ingredients, storage instructions, shelf life ("Best Enjoyed Within"), and paired recommendations.
- **Enquiry Cart (No Payments)**: An ecommerce-grade cart tailored for celebration enquiries without payment gateways. Generates price snapshots per weight.
- **WhatsApp Concierge Integration**: Automatically formats professional WhatsApp click-to-chat messages containing selected items, weights, quantities, estimated INR total, and the customer's contact reference.
- **Configurable Brand**: Brand name, tagline, address, phone, email, and WhatsApp numbers are centralized in `frontend/src/config/brand.js` without hardcoded brand strings throughout component files.

### 🛡️ Administrative Back-Office Management
- **Executive Admin UI**: Distinct, professional dark slate/executive dashboard aesthetics.
- **JWT Authentication**: Protected API endpoints and protected React Router routes with automated session validation.
- **Real-Time KPI Dashboard**: Metrics for Total Products, Active Items, Categories, Patrons, Enquiries, Pending Queue, and Limited Stock alerts.
- **Product Management**: Full CRUD for sweets with multiple image galleries, retail/wholesale pricing, status toggles (active/inactive), and shelf life metadata.
- **Dedicated Quick Stock Manager**: Update stock levels inline via `PATCH /api/products/:id/stock` with immediate storefront availability recalculation:
  - `Stock <= 0` ➔ **Out of Stock** (Cart actions disabled)
  - `Stock <= 10` ➔ **Limited Stock**
  - `Stock > 10` ➔ **In Stock**
- **Category Management**: Create, edit, and safely delete categories with protection preventing deletion of categories containing active sweets.
- **Customer Patron Directory**: Customer histories, contact points, and frequency metrics.
- **Enquiry Fulfillment & Tracking**: Update lifecycle statuses (`Pending`, `Contacted`, `Processing`, `Completed`, `Cancelled`) with direct WhatsApp reply buttons.
- **CSV Data Export**: Download an instant `.csv` spreadsheet export of all customer enquiries.

---

## 🏗️ Technology Stack

- **Frontend**:
  - React 19 + Vite 8
  - React Router DOM 7
  - Tailwind CSS 4 (`@tailwindcss/vite`)
  - Lucide React (Icons)
  - Google Fonts: *Cinzel*, *Cormorant Garamond*, *Plus Jakarta Sans*
- **Backend**:
  - Node.js (ES Modules)
  - Express
  - Lowdb 7 (`backend/data/db.json` local JSON persistence, abstracted repository layer)
  - JSON Web Tokens (`jsonwebtoken`)
  - UUID (`uuid`)
  - CORS & Dotenv
- **Zero Paid / External Dependencies**: Runs 100% locally with zero external database or cloud requirements.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

---

### 1. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Setup environment variables
copy .env.example .env

# Seed the database with 8 categories, 36 authentic sweets, and demo enquiries
npm run seed

# Start development server (Port 5000)
npm run dev
```

The backend engine will start at `http://localhost:5000` with health check at `http://localhost:5000/api/health`.

---

### 2. Frontend Setup

In a new terminal window:

```bash
cd frontend

# Install dependencies
npm install

# Setup environment variables
copy .env.example .env

# Start Vite development server (Port 5173)
npm run dev
```

Visit the storefront at:
👉 **[http://localhost:5173](http://localhost:5173)**

---

## 🔑 Administrative Credentials

| Credential | Value |
| :--- | :--- |
| **Admin Portal URL** | `http://localhost:5173/admin/login` |
| **Username** | `admin` |
| **Password** | `admin123` |

> [!IMPORTANT]
> These credentials are for demonstration purposes only. You must update `ADMIN_USERNAME` and `ADMIN_PASSWORD` in `backend/.env` prior to production deployment.

---

## ⚙️ Central Brand Configuration

To rebrand the sweet shop with a real shop name, phone number, and location:

1. **Frontend**: Edit `frontend/src/config/brand.js`:
   ```javascript
   export const BRAND_CONFIG = {
     businessName: "YOUR_SHOP_NAME",
     tagline: "Tradition, Crafted Beautifully.",
     whatsappNumber: "+919876543210",
     phone: "+91 98765 43210",
     email: "contact@yourshop.com",
     address: "Shop 12, Market Square, City",
     currencySymbol: "₹",
     limitedStockMax: 10,
     ...
   };
   ```
2. **Backend**: Edit `backend/.env`:
   ```env
   PORT=5000
   JWT_SECRET=your_secure_secret_key
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=your_secure_password
   LIMITED_STOCK_MAX=10
   WHATSAPP_NUMBER=+919876543210
   ```

---

## 🧪 Automated Testing & Verification

To verify all customer endpoints, admin CRUD, stock transitions, and database persistence, run:

```bash
cd backend
node scripts/verify-all.js
```

All 22 integration tests will execute against live routes and log verification passes.

---

## 📦 Sweet Categories Seeded

1. **Kaju Collection**: Kaju Katli, Kaju Pista Roll, Kaju Anjeer Roll, Kaju Badam Burfi, Kaju Chocolate Roll
2. **Laddu Collection**: Motichoor Laddu, Boondi Laddu, Besan Laddu, Dry Fruit Laddu, Coconut Laddu
3. **Milk Sweets**: Mathura Milk Peda, Doodh Peda, Malai Peda, Kalakand, Caramelized Milk Cake
4. **Bengali Sweets**: Spongy Rasgulla, Gulab Jamun, Saffron Rabri Rasmalai, Cham Cham, Nolen Gur Sandesh
5. **Traditional Mithai**: Ghee Mysore Pak, Badam Halwa, Moong Dal Halwa, Jangiri, Honeycomb Mysore Pak
6. **Dry Fruit Specials**: Sugar-Free Dry Fruit Barfi, Badam Katli, Pista Barfi, Dry Fruit Roll, Gond Laddu
7. **Premium Gifting**: Royal Mithai Box (500g), Signature Box (1kg), Dry Fruit Box (500g), Festive Box (1kg), Grand 2-Tier Hamper (2kg)
8. **Festive Specials**: Shahi Kesar Kheer Pot, seasonal Diwali creations

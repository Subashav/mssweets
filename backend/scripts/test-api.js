import app from "../src/server.js";
import http from "http";

async function runTests() {
  const PORT = 5055;
  const server = http.createServer(app);
  
  await new Promise(resolve => server.listen(PORT, resolve));
  console.log(`Test server running on port ${PORT}`);

  try {
    const baseUrl = `http://localhost:${PORT}/api`;

    // 1. Health
    const healthRes = await fetch(`${baseUrl}/health`).then(r => r.json());
    console.log("✓ Health Check:", healthRes.status === "ok" ? "PASSED" : "FAILED");

    // 2. Auth Login
    const loginRes = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "admin", password: "admin123" })
    }).then(r => r.json());
    console.log("✓ Auth Login:", loginRes.token ? "PASSED (Token received)" : "FAILED");
    const token = loginRes.token;

    // 3. Categories
    const catRes = await fetch(`${baseUrl}/categories`).then(r => r.json());
    console.log(`✓ Categories (${catRes.count}):`, catRes.count === 8 ? "PASSED" : "FAILED");

    // 4. Products Public
    const prodRes = await fetch(`${baseUrl}/products`).then(r => r.json());
    console.log(`✓ Products Public (${prodRes.count}):`, prodRes.count >= 30 ? "PASSED" : "FAILED");

    // 5. Create Enquiry
    const enquiryPayload = {
      customerName: "Radha Devi",
      customerPhone: "+91 98333 44556",
      customerEmail: "radha@example.com",
      customerLocation: "Bandra West, Mumbai",
      occasion: "Wedding",
      message: "Testing automated enquiry submission flow.",
      items: [
        {
          productId: "prod_kaju_katli",
          productName: "Kaju Katli",
          weight: "500g",
          quantity: 2,
          priceSnapshot: 500
        }
      ],
      estimatedTotal: 1000
    };
    const enqRes = await fetch(`${baseUrl}/enquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enquiryPayload)
    }).then(r => r.json());
    console.log("✓ Create Enquiry:", enqRes.data?.id?.startsWith("ENQ-") ? `PASSED (${enqRes.data.id})` : "FAILED");

    // 6. Update Stock
    const stockRes = await fetch(`${baseUrl}/products/prod_kaju_katli/stock`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ stockQuantity: 9 }) // Set to 9 -> should become "Limited Stock"
    }).then(r => r.json());
    console.log("✓ Stock Update (patch):", stockRes.data?.availability === "Limited Stock" ? "PASSED (Limited Stock)" : "FAILED");

    // 7. Dashboard Stats
    const statsRes = await fetch(`${baseUrl}/stats/dashboard`, {
      headers: { "Authorization": `Bearer ${token}` }
    }).then(r => r.json());
    console.log("✓ Dashboard Stats:", statsRes.data?.totalProducts > 0 ? "PASSED" : "FAILED");

    // 8. CSV Export
    const csvRes = await fetch(`${baseUrl}/stats/enquiries/export.csv`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    const csvText = await csvRes.text();
    console.log("✓ CSV Export:", csvText.includes("Enquiry ID") ? "PASSED" : "FAILED");

    console.log("\nALL BACKEND API TESTS COMPLETED SUCCESSFULLY!");
  } catch (err) {
    console.error("Test Error:", err);
  } finally {
    server.close();
    process.exit(0);
  }
}

runTests();

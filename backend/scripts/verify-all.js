async function verifyAll() {
  console.log("==================================================");
  console.log("   RUNNING MS SWEETS END-TO-END VERIFICATION SUITE  ");
  console.log("==================================================\n");

  const baseUrl = `http://localhost:5000/api`;

  let passCount = 0;
  let totalTests = 0;

  function assert(condition, testName) {
    totalTests++;
    if (condition) {
      passCount++;
      console.log(`  [PASS] ${testName}`);
    } else {
      console.error(`  [FAIL] ${testName}`);
      process.exitCode = 1;
    }
  }

  try {
    // 1. Health
    const health = await fetch(`${baseUrl}/health`).then((r) => r.json());
    assert(health.status === "ok", "API Health check responds ok");

    // 2. Public Categories
    const categories = await fetch(`${baseUrl}/categories?active=true`).then((r) => r.json());
    assert(categories.count === 8, "8 Public categories returned with active product counts");

    // 3. Public Products Listing & Filter
    const allProducts = await fetch(`${baseUrl}/products`).then((r) => r.json());
    assert(allProducts.count >= 30, `Public catalogue contains ${allProducts.count} active sweets`);

    // 4. Search Filter
    const searchRes = await fetch(`${baseUrl}/products?search=kaju`).then((r) => r.json());
    assert(searchRes.data.length >= 4, "Search for 'kaju' returns matching delicacies");

    // 5. Category Filter
    const catFiltered = await fetch(`${baseUrl}/products?category=cat_laddu`).then((r) => r.json());
    assert(catFiltered.data.every((p) => p.categoryId === "cat_laddu"), "Category filter strictly matches category");

    // 6. Sorting Price Asc
    const sortAsc = await fetch(`${baseUrl}/products?sort=price_asc`).then((r) => r.json());
    const isSortedAsc = sortAsc.data.every((p, idx) => idx === 0 || p.retailPrice >= sortAsc.data[idx - 1].retailPrice);
    assert(isSortedAsc, "Sorting by price: low to high returns properly sorted order");

    // 7. Product Detail by ID
    const singleProduct = await fetch(`${baseUrl}/products/prod_kaju_katli`).then((r) => r.json());
    assert(singleProduct.data?.name === "Kaju Katli", "Single product detail retrieval works");
    assert(Array.isArray(singleProduct.data?.weightOptions), "Product includes weight options");

    // 8. Auth: Rejected invalid login
    const badLogin = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "admin", password: "wrongpassword" })
    });
    assert(badLogin.status === 401, "Invalid login credentials properly rejected with 401");

    // 9. Auth: Successful login
    const goodLogin = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "admin", password: "admin123" })
    }).then((r) => r.json());
    assert(!!goodLogin.token, "Valid credentials generate JWT authentication token");
    const token = goodLogin.token;

    // 10. Customer Enquiry Submission & ID generation
    const newEnquiryPayload = {
      customerName: "Maharani Gayatri",
      customerPhone: "+91 99887 76655",
      customerEmail: "gayatri@royalpalace.in",
      customerLocation: "Jaipur, Rajasthan",
      occasion: "Royal Wedding",
      message: "Need 50 bespoke 1kg signature celebration boxes with gold embossed monogram.",
      items: [
        {
          productId: "prod_kaju_katli",
          productName: "Kaju Katli",
          weight: "1kg",
          quantity: 2,
          priceSnapshot: 1000
        },
        {
          productId: "prod_royal_mithai_box",
          productName: "Royal Mithai Box - 500g",
          weight: "Box (500g)",
          quantity: 5,
          priceSnapshot: 650
        }
      ],
      estimatedTotal: 5250
    };

    const createdEnquiry = await fetch(`${baseUrl}/enquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEnquiryPayload)
    }).then((r) => r.json());

    assert(createdEnquiry.data?.id?.startsWith("ENQ-"), `Generated sequential Enquiry ID: ${createdEnquiry.data?.id}`);
    assert(createdEnquiry.data?.estimatedTotal === 5250, "Estimated total preserved in enquiry record");

    // 11. Admin Enquiry List
    const enquiriesList = await fetch(`${baseUrl}/enquiries`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((r) => r.json());
    assert(enquiriesList.data.some((e) => e.id === createdEnquiry.data?.id), "Admin enquiry list includes newly created enquiry");

    // 12. Admin Enquiry Status Update
    const statusUpdate = await fetch(`${baseUrl}/enquiries/${createdEnquiry.data.id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status: "Processing" })
    }).then((r) => r.json());
    assert(statusUpdate.data?.status === "Processing", "Admin successfully updated enquiry status to 'Processing'");

    // 13. Stock Update & Reflection in Availability
    // Step A: Patch stock to 5 (Limited Stock)
    const patchLimited = await fetch(`${baseUrl}/products/prod_motichoor_laddu/stock`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ stockQuantity: 5 })
    }).then((r) => r.json());
    assert(patchLimited.data?.availability === "Limited Stock", "Stock quantity 5 yields 'Limited Stock' availability");

    // Step B: Public product page reflects "Limited Stock"
    const publicProdCheck = await fetch(`${baseUrl}/products/prod_motichoor_laddu`).then((r) => r.json());
    assert(publicProdCheck.data?.availability === "Limited Stock", "Public product view immediately reflects 'Limited Stock'");

    // Step C: Patch stock to 0 (Out of Stock)
    const patchOutOfStock = await fetch(`${baseUrl}/products/prod_motichoor_laddu/stock`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ stockQuantity: 0 })
    }).then((r) => r.json());
    assert(patchOutOfStock.data?.availability === "Out of Stock", "Stock quantity 0 yields 'Out of Stock' availability");

    // Step D: Reset stock to 45 (In Stock)
    await fetch(`${baseUrl}/products/prod_motichoor_laddu/stock`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ stockQuantity: 45 })
    });

    // 14. Admin Product Creation & Deactivation
    const newSweetRes = await fetch(`${baseUrl}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: "Artisan Kesar Peda",
        categoryId: "cat_sweets",
        retailPrice: 850,
        wholesalePrice: 700,
        stockQuantity: 20,
        description: "Freshly made saffron milk peda."
      })
    }).then((r) => r.json());
    assert(!!newSweetRes.data?.id, "Admin successfully created new sweet item");

    // Deactivate
    const deactRes = await fetch(`${baseUrl}/products/${newSweetRes.data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status: "inactive" })
    }).then((r) => r.json());
    assert(deactRes.data?.status === "inactive", "Admin successfully deactivated sweet item");

    // 15. Admin Dashboard Metrics
    const dashboard = await fetch(`${baseUrl}/stats/dashboard`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((r) => r.json());
    assert(dashboard.data?.totalProducts > 0, "Dashboard KPI metrics aggregated accurately");
    assert(dashboard.data?.recentEnquiries?.length > 0, "Dashboard recent enquiries populated");

    // 16. CSV Export Stream
    const csvStream = await fetch(`${baseUrl}/stats/enquiries/export.csv`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const csvContent = await csvStream.text();
    assert(csvContent.includes("Enquiry ID") && csvContent.includes("Customer Name"), "CSV export correctly formats headers and records");

    console.log("\n==================================================");
    console.log(`  VERIFICATION COMPLETE: ${passCount} / ${totalTests} TESTS PASSED`);
    console.log("==================================================");
  } catch (err) {
    console.error("Verification suite execution error:", err);
  } finally {
    process.exit(passCount === totalTests ? 0 : 1);
  }
}

verifyAll();

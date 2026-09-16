import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { JSONFilePreset } from "lowdb/node";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.resolve(__dirname, "../data/db.json");

const dataDir = path.dirname(DB_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

console.log("Seeding MS SWEETS Database at:", DB_FILE);

const categories = [
  {
    id: "cat_sweets",
    name: "Sweets",
    slug: "sweets",
    description: "Traditional Indian mithai crafted with pure cow ghee and timeless recipes.",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Assorted_Indian_Sweets.jpg",
    status: "active",
    createdAt: new Date().toISOString()
  },
  {
    id: "cat_snacks",
    name: "Snacks",
    slug: "snacks",
    description: "Crunchy, golden, and freshly fried authentic South & North Indian savouries.",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Murukku.jpg",
    status: "active",
    createdAt: new Date().toISOString()
  },
  {
    id: "cat_namkeen",
    name: "Namkeen",
    slug: "namkeen",
    description: "Spiced artisanal mixtures, crispy sev, thattai, and traditional teatime crunch.",
    image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=800&auto=format&fit=crop",
    status: "active",
    createdAt: new Date().toISOString()
  },
  {
    id: "cat_kaju",
    name: "Kaju Collection",
    slug: "kaju-collection",
    description: "Royal cashew confections crafted from the finest Goan cashews and edible silver leaf.",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Assorted_Indian_Sweets.jpg",
    status: "active",
    createdAt: new Date().toISOString()
  },
  {
    id: "cat_laddu",
    name: "Laddu Collection",
    slug: "laddu-collection",
    description: "Golden pearls of roasted besan, motichoor, and pure desi ghee.",
    image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=800&auto=format&fit=crop",
    status: "active",
    createdAt: new Date().toISOString()
  },
  {
    id: "cat_dryfruit",
    name: "Dry Fruit Specials",
    slug: "dry-fruit-specials",
    description: "Nutritious luxury bites of Mamra almonds, Afghani pistachios, and organic figs.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop",
    status: "active",
    createdAt: new Date().toISOString()
  },
  {
    id: "cat_gifting",
    name: "Gift Boxes",
    slug: "gift-boxes",
    description: "Artisan hampers and handcrafted velvet/gold embossed celebration gift boxes.",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop",
    status: "active",
    createdAt: new Date().toISOString()
  },
  {
    id: "cat_festive",
    name: "Festive Collection",
    slug: "festive-collection",
    description: "Exclusive celebratory creations designed for Diwali, weddings, and grand occasions.",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop",
    status: "active",
    createdAt: new Date().toISOString()
  }
];

const products = [
  // ==================== SWEETS ====================
  {
    id: "prod_kaju_katli",
    name: "Kaju Katli",
    slug: "kaju-katli",
    categoryId: "cat_kaju",
    categorySlug: "kaju-collection",
    description: "Delicate diamond-cut kaju fudge crafted from premium Goan cashews and edible silver leaf.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/1/1d/Assorted_Indian_Sweets.jpg",
      "https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=800&auto=format&fit=crop"
    ],
    retailPrice: 1000,
    wholesalePrice: 850,
    stockQuantity: 45,
    weightOptions: ["250g", "500g", "1kg"],
    ingredients: "Goan Cashews (72%), Fine Cane Sugar, Shudh Desi Ghee, Pure Silver Vark, Green Cardamom.",
    storageInformation: "Store in a cool, dry place away from moisture. Shelf life increases when refrigerated.",
    bestBefore: "15 days from preparation",
    status: "active",
    featured: true,
    isSignature: true,
    isDemoData: true
  },
  {
    id: "prod_kaju_pista_roll",
    name: "Kaju Pista Roll",
    slug: "kaju-pista-roll",
    categoryId: "cat_kaju",
    categorySlug: "kaju-collection",
    description: "Silken cashew sheet filled with a rich pistachio crumble and Kashmiri saffron essence.",
    images: [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop"
    ],
    retailPrice: 1200,
    wholesalePrice: 1020,
    stockQuantity: 28,
    weightOptions: ["250g", "500g", "1kg"],
    ingredients: "Cashews (Kaju), Pistachios (Pista), Sugar, Ghee, Kashmiri Saffron.",
    storageInformation: "Keep in an airtight container in a cool spot.",
    bestBefore: "12 days from preparation",
    status: "active",
    featured: true,
    isSignature: true,
    isDemoData: true
  },
  {
    id: "prod_kaju_anjeer_roll",
    name: "Kaju Anjeer Roll",
    slug: "kaju-anjeer-roll",
    categoryId: "cat_kaju",
    categorySlug: "kaju-collection",
    description: "Organic Turkish figs roasted to perfection and enveloped in velvety cashew paste.",
    images: [
      "https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=800&auto=format&fit=crop"
    ],
    retailPrice: 1300,
    wholesalePrice: 1100,
    stockQuantity: 8, // Limited stock demo
    weightOptions: ["250g", "500g", "1kg"],
    ingredients: "Cashews, Dried Figs (Anjeer), Honey, Poppy Seeds, Ghee.",
    storageInformation: "Store in cool dry conditions.",
    bestBefore: "20 days from preparation",
    status: "active",
    featured: false,
    isDemoData: true
  },
  {
    id: "prod_kaju_badam_burfi",
    name: "Kaju Badam Burfi",
    slug: "kaju-badam-burfi",
    categoryId: "cat_kaju",
    categorySlug: "kaju-collection",
    description: "A dual-layered luxury fudge uniting slow-roasted Mamra almonds and royal cashews.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/9/9a/Murukku.jpg"
    ],
    retailPrice: 1100,
    wholesalePrice: 935,
    stockQuantity: 18,
    weightOptions: ["250g", "500g", "1kg"],
    ingredients: "Cashews, California Almonds, Cane Sugar, Desi Ghee.",
    storageInformation: "Keep in a cool dry area.",
    bestBefore: "15 days from preparation",
    status: "active",
    featured: false,
    isDemoData: true
  },
  {
    id: "prod_motichoor_laddu",
    name: "Motichoor Laddu",
    slug: "motichoor-laddu",
    categoryId: "cat_laddu",
    categorySlug: "laddu-collection",
    description: "Melt-in-mouth tiny gram flour pearls gently fried in pure cow ghee and steeped in cardamom saffron syrup.",
    images: [
      "https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=800&auto=format&fit=crop",
      "https://upload.wikimedia.org/wikipedia/commons/9/9a/Murukku.jpg"
    ],
    retailPrice: 700,
    wholesalePrice: 580,
    stockQuantity: 50,
    weightOptions: ["250g", "500g", "1kg"],
    ingredients: "Besan (Bengal Gram Flour), Pure Desi Cow Ghee, Sugar, Saffron, Magaz Seeds.",
    storageInformation: "Best kept at room temperature in a shaded pantry.",
    bestBefore: "7 days from preparation",
    status: "active",
    featured: true,
    isSignature: true,
    isDemoData: true
  },
  {
    id: "prod_boondi_laddu",
    name: "Boondi Laddu",
    slug: "boondi-laddu",
    categoryId: "cat_laddu",
    categorySlug: "laddu-collection",
    description: "Classic larger golden pearls bursting with warm cloves, cashews, and aromatic green cardamom.",
    images: [
      "https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=800&auto=format&fit=crop"
    ],
    retailPrice: 600,
    wholesalePrice: 500,
    stockQuantity: 30,
    weightOptions: ["250g", "500g", "1kg"],
    ingredients: "Gram Flour, Pure Ghee, Sugar, Cloves, Cashews, Raisins.",
    storageInformation: "Store in ambient conditions.",
    bestBefore: "10 days from preparation",
    status: "active",
    featured: false,
    isDemoData: true
  },
  {
    id: "prod_dryfruit_laddu",
    name: "Dry Fruit Laddu",
    slug: "dry-fruit-laddu",
    categoryId: "cat_laddu",
    categorySlug: "laddu-collection",
    description: "Sugar-free powerhouse packed with roasted almonds, pistachios, cashews, and natural Medjool dates.",
    images: [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop"
    ],
    retailPrice: 900,
    wholesalePrice: 760,
    stockQuantity: 6, // Limited stock demo
    weightOptions: ["250g", "500g", "1kg"],
    ingredients: "Dates, Almonds, Cashews, Pistachios, Edible Gum (Gond), Desi Ghee.",
    storageInformation: "Keep sealed in dry conditions.",
    bestBefore: "30 days from preparation",
    status: "active",
    featured: true,
    isSignature: true,
    isDemoData: true
  },
  {
    id: "prod_besan_laddu",
    name: "Besan Laddu",
    slug: "besan-laddu",
    categoryId: "cat_laddu",
    categorySlug: "laddu-collection",
    description: "Slow-roasted coarse chickpea flour kneaded patiently with golden cow ghee and coarse bura sugar.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/9/9a/Murukku.jpg"
    ],
    retailPrice: 650,
    wholesalePrice: 540,
    stockQuantity: 25,
    weightOptions: ["250g", "500g", "1kg"],
    ingredients: "Coarse Chickpea Flour, Shudh Desi Ghee, Tagar/Bura Sugar, Nutmeg.",
    storageInformation: "Store in an airtight tin.",
    bestBefore: "21 days from preparation",
    status: "active",
    featured: false,
    isDemoData: true
  },
  {
    id: "prod_milk_peda",
    name: "Milk Peda",
    slug: "milk-peda",
    categoryId: "cat_sweets",
    categorySlug: "sweets",
    description: "Velvety Mathura-style peda gently caramelized from fresh whole dairy milk and crushed green cardamom.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/9/9a/Murukku.jpg"
    ],
    retailPrice: 650,
    wholesalePrice: 540,
    stockQuantity: 35,
    weightOptions: ["250g", "500g", "1kg"],
    ingredients: "Slow Cooked Khoya, Organic Sugar, Elaichi, Pistachio Garnish.",
    storageInformation: "Refrigerate after opening.",
    bestBefore: "10 days from preparation",
    status: "active",
    featured: true,
    isSignature: true,
    isDemoData: true
  },
  {
    id: "prod_doodh_peda",
    name: "Doodh Peda",
    slug: "doodh-peda",
    categoryId: "cat_sweets",
    categorySlug: "sweets",
    description: "Classic creamy white pedas with subtle saffron strands and delicate embossing.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/9/9a/Murukku.jpg"
    ],
    retailPrice: 700,
    wholesalePrice: 590,
    stockQuantity: 24,
    weightOptions: ["250g", "500g", "1kg"],
    ingredients: "Fresh Cow Milk, Cane Sugar, Saffron, Silver Leaf.",
    storageInformation: "Keep cool in sealed container.",
    bestBefore: "8 days from preparation",
    status: "active",
    featured: false,
    isDemoData: true
  },
  {
    id: "prod_malai_peda",
    name: "Malai Peda",
    slug: "malai-peda",
    categoryId: "cat_sweets",
    categorySlug: "sweets",
    description: "Soft, luscious textured milk fudge enriched with thick clotted cream and fragrant rose essence.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/1/1d/Assorted_Indian_Sweets.jpg"
    ],
    retailPrice: 750,
    wholesalePrice: 630,
    stockQuantity: 15,
    weightOptions: ["250g", "500g", "1kg"],
    ingredients: "Fresh Clotted Cream (Malai), Khoya, Sugar, Rose Water.",
    storageInformation: "Requires refrigeration.",
    bestBefore: "7 days from preparation",
    status: "active",
    featured: false,
    isDemoData: true
  },
  {
    id: "prod_kalakand",
    name: "Kalakand",
    slug: "kalakand",
    categoryId: "cat_sweets",
    categorySlug: "sweets",
    description: "Moist, granular milk cake delicately balanced with pure cardamom and slivered almonds.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/9/9a/Murukku.jpg"
    ],
    retailPrice: 750,
    wholesalePrice: 630,
    stockQuantity: 18,
    weightOptions: ["250g", "500g", "1kg"],
    ingredients: "Fresh Milk Paneer, Sugar, Cardamom, Pistachio slivers.",
    storageInformation: "Refrigerate immediately.",
    bestBefore: "5 days from preparation",
    status: "active",
    featured: false,
    isDemoData: true
  },
  {
    id: "prod_milk_cake",
    name: "Milk Cake",
    slug: "milk-cake",
    categoryId: "cat_sweets",
    categorySlug: "sweets",
    description: "Traditional caramelized dual-tone fudge with a warm roasted aroma and dense fudgy center.",
    images: [
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=800&auto=format&fit=crop"
    ],
    retailPrice: 800,
    wholesalePrice: 680,
    stockQuantity: 30,
    weightOptions: ["250g", "500g", "1kg"],
    ingredients: "Whole Buffalo Milk, Sugar, Lemon Juice, Pure Ghee.",
    storageInformation: "Store at ambient room temperature.",
    bestBefore: "12 days from preparation",
    status: "active",
    featured: false,
    isDemoData: true
  },
  {
    id: "prod_gulab_jamun",
    name: "Gulab Jamun",
    slug: "gulab-jamun",
    categoryId: "cat_sweets",
    categorySlug: "sweets",
    description: "Warm golden-brown spheres of soft mawa, slow-fried in pure ghee and steeped in cardamom saffron syrup.",
    images: [
      "https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=800&auto=format&fit=crop"
    ],
    retailPrice: 550,
    wholesalePrice: 460,
    stockQuantity: 38,
    weightOptions: ["500g", "1kg"],
    ingredients: "Fresh Mawa (Khoya), Ghee, Saffron, Rose Infused Sugar Syrup.",
    storageInformation: "Warm gently before serving.",
    bestBefore: "6 days from preparation",
    status: "active",
    featured: true,
    isDemoData: true
  },
  {
    id: "prod_rasgulla",
    name: "Rasgulla",
    slug: "rasgulla",
    categoryId: "cat_sweets",
    categorySlug: "sweets",
    description: "Supremely light, spongy dumplings of hand-kneaded cow milk chenna simmered in crystal-clear rose syrup.",
    images: [
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=800&auto=format&fit=crop"
    ],
    retailPrice: 500,
    wholesalePrice: 420,
    stockQuantity: 40,
    weightOptions: ["500g", "1kg"],
    ingredients: "Fresh Cow Milk Chenna, Cane Sugar, Rose Water, Cardamom.",
    storageInformation: "Store refrigerated in sweet syrup.",
    bestBefore: "4 days from preparation",
    status: "active",
    featured: true,
    isDemoData: true
  },
  {
    id: "prod_rasmalai",
    name: "Rasmalai",
    slug: "rasmalai",
    categoryId: "cat_sweets",
    categorySlug: "sweets",
    description: "Tender discs of fresh chenna bathed in saffron-infused clotted rabri and showered with pistachios.",
    images: [
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=800&auto=format&fit=crop"
    ],
    retailPrice: 700,
    wholesalePrice: 580,
    stockQuantity: 12,
    weightOptions: ["500g", "1kg"],
    ingredients: "Fresh Chenna, Heavy Cream, Full Fat Milk, Saffron, Pistachios, Cardamom.",
    storageInformation: "Keep chilled at all times (2-5°C).",
    bestBefore: "3 days from preparation",
    status: "active",
    featured: true,
    isDemoData: true
  },
  {
    id: "prod_sandesh",
    name: "Sandesh",
    slug: "sandesh",
    categoryId: "cat_sweets",
    categorySlug: "sweets",
    description: "Delicate artisanal chenna confection infused with organic date palm jaggery (nolen gur).",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/9/9a/Murukku.jpg"
    ],
    retailPrice: 750,
    wholesalePrice: 620,
    stockQuantity: 5, // Limited stock demo
    weightOptions: ["250g", "500g", "1kg"],
    ingredients: "Fresh Artisanal Chenna, Date Palm Jaggery, Green Cardamom.",
    storageInformation: "Keep strictly refrigerated.",
    bestBefore: "3 days from preparation",
    status: "active",
    featured: false,
    isDemoData: true
  },
  {
    id: "prod_ghee_mysore_pak",
    name: "Ghee Mysore Pak",
    slug: "ghee-mysore-pak",
    categoryId: "cat_sweets",
    categorySlug: "sweets",
    description: "Royal melt-in-the-mouth Karnataka delicacy made with flowing pure cow ghee, besan, and sugar.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/1/1d/Assorted_Indian_Sweets.jpg"
    ],
    retailPrice: 700,
    wholesalePrice: 580,
    stockQuantity: 42,
    weightOptions: ["250g", "500g", "1kg"],
    ingredients: "Pure Cow Ghee (60%), Fine Gram Flour, Sugar.",
    storageInformation: "Store at room temperature in a dry container.",
    bestBefore: "18 days from preparation",
    status: "active",
    featured: true,
    isSignature: true,
    isDemoData: true
  },
  {
    id: "prod_badam_halwa",
    name: "Badam Halwa",
    slug: "badam-halwa",
    categoryId: "cat_sweets",
    categorySlug: "sweets",
    description: "Dense, slow-simmered almond pudding made with pure saffron strands and golden ghee.",
    images: [
      "https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=800&auto=format&fit=crop"
    ],
    retailPrice: 950,
    wholesalePrice: 800,
    stockQuantity: 15,
    weightOptions: ["250g", "500g", "1kg"],
    ingredients: "Blanched Mamra Almonds, Saffron, Cow Ghee, Sugar, Cardamom.",
    storageInformation: "Refrigerate and warm slightly before serving.",
    bestBefore: "10 days from preparation",
    status: "active",
    featured: false,
    isDemoData: true
  },
  {
    id: "prod_jangiri",
    name: "Jangiri",
    slug: "jangiri",
    categoryId: "cat_sweets",
    categorySlug: "sweets",
    description: "Intricately piped urad dal swirls crisp-fried and drenched in aromatic saffron rose syrup.",
    images: [
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=800&auto=format&fit=crop"
    ],
    retailPrice: 550,
    wholesalePrice: 450,
    stockQuantity: 19,
    weightOptions: ["250g", "500g", "1kg"],
    ingredients: "Black Gram Lentils (Urad), Ghee, Sugar Syrup, Rose Essence.",
    storageInformation: "Consume fresh at ambient room temperature.",
    bestBefore: "5 days from preparation",
    status: "active",
    featured: false,
    isDemoData: true
  },

  // ==================== SAVOURY SNACKS & NAMKEEN ====================
  {
    id: "prod_madras_mixture",
    name: "Madras Mixture",
    slug: "madras-mixture",
    categoryId: "cat_snacks",
    categorySlug: "snacks",
    description: "Legendary South Indian mixture of crisp sev, boondi, roasted peanuts, cashews, and curry leaves with fragrant spices.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/9/9a/Murukku.jpg"
    ],
    retailPrice: 500,
    wholesalePrice: 420,
    stockQuantity: 35,
    weightOptions: ["250g", "500g", "1kg"],
    ingredients: "Gram Flour (Besan), Rice Flour, Peanuts, Cashews, Curry Leaves, Red Chilli, Asafoetida, Vegetable Oil.",
    storageInformation: "Store in an airtight container to preserve crispness.",
    bestBefore: "45 days from packaging",
    status: "active",
    featured: true,
    isSnack: true,
    isDemoData: true
  },
  {
    id: "prod_special_mixture",
    name: "Special Mixture",
    slug: "special-mixture",
    categoryId: "cat_snacks",
    categorySlug: "snacks",
    description: "Grand royal namkeen mix with golden raisins, whole cashews, almond slivers, and crunchy spiced lentils.",
    images: [
      "https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=800&auto=format&fit=crop"
    ],
    retailPrice: 550,
    wholesalePrice: 460,
    stockQuantity: 30,
    weightOptions: ["250g", "500g", "1kg"],
    ingredients: "Besan, Cashews, Almonds, Kishmish, Masoor Dal, Salt, Chaat Spices, Oil.",
    storageInformation: "Airtight pantry storage.",
    bestBefore: "45 days from packaging",
    status: "active",
    featured: true,
    isSnack: true,
    isDemoData: true
  },
  {
    id: "prod_kara_sev",
    name: "Kara Sev",
    slug: "kara-sev",
    categoryId: "cat_namkeen",
    categorySlug: "namkeen",
    description: "Thick, crunchy strands of spiced chickpea flour boldly seasoned with crushed black pepper and garlic.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/9/9a/Murukku.jpg"
    ],
    retailPrice: 500,
    wholesalePrice: 420,
    stockQuantity: 28,
    weightOptions: ["250g", "500g", "1kg"],
    ingredients: "Besan, Crushed Black Pepper, Garlic, Salt, Pure Oil.",
    storageInformation: "Keep sealed away from moisture.",
    bestBefore: "40 days from packaging",
    status: "active",
    featured: false,
    isSnack: true,
    isDemoData: true
  },
  {
    id: "prod_ribbon_pakoda",
    name: "Ribbon Pakoda",
    slug: "ribbon-pakoda",
    categoryId: "cat_namkeen",
    categorySlug: "namkeen",
    description: "Melt-in-the-mouth crispy ribbon ribbons infused with butter, roasted gram, and red chili warmth.",
    images: [
      "https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=800&auto=format&fit=crop"
    ],
    retailPrice: 500,
    wholesalePrice: 420,
    stockQuantity: 26,
    weightOptions: ["250g", "500g", "1kg"],
    ingredients: "Rice Flour, Besan, Fresh Butter, Red Chilli Powder, Asafoetida.",
    storageInformation: "Store in airtight jar.",
    bestBefore: "40 days from packaging",
    status: "active",
    featured: true,
    isSnack: true,
    isDemoData: true
  },
  {
    id: "prod_murukku",
    name: "Murukku",
    slug: "murukku",
    categoryId: "cat_snacks",
    categorySlug: "snacks",
    description: "Spiral, golden crispy spirals delicately flavoured with roasted cumin and fragrant white sesame seeds.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/9/9a/Murukku.jpg"
    ],
    retailPrice: 550,
    wholesalePrice: 460,
    stockQuantity: 40,
    weightOptions: ["250g", "500g", "1kg"],
    ingredients: "Raw Rice Flour, Urad Dal Flour, White Butter, Cumin Seeds, Sesame, Salt.",
    storageInformation: "Keep in a dry container.",
    bestBefore: "45 days from packaging",
    status: "active",
    featured: true,
    isSnack: true,
    isDemoData: true
  },
  {
    id: "prod_nippattu",
    name: "Nippattu",
    slug: "nippattu",
    categoryId: "cat_snacks",
    categorySlug: "snacks",
    description: "Karnataka-style spicy flat crisps studded with crushed peanuts, roasted gram, and green chillies.",
    images: [
      "https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=800&auto=format&fit=crop"
    ],
    retailPrice: 550,
    wholesalePrice: 460,
    stockQuantity: 22,
    weightOptions: ["250g", "500g", "1kg"],
    ingredients: "Rice Flour, Roasted Peanuts, Roasted Chana Dal, Curry Leaves, Chillies, Oil.",
    storageInformation: "Store in airtight tin.",
    bestBefore: "35 days from packaging",
    status: "active",
    featured: false,
    isSnack: true,
    isDemoData: true
  },
  {
    id: "prod_thattai",
    name: "Thattai",
    slug: "thattai",
    categoryId: "cat_namkeen",
    categorySlug: "namkeen",
    description: "Traditional Tamil crispy disc crackers spiced with soaked chana dal, ginger, and curry leaves.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/9/9a/Murukku.jpg"
    ],
    retailPrice: 550,
    wholesalePrice: 460,
    stockQuantity: 24,
    weightOptions: ["250g", "500g", "1kg"],
    ingredients: "Rice Flour, Urad Flour, Chana Dal, Ginger, Curry Leaves, Asafoetida.",
    storageInformation: "Store in a cool dry container.",
    bestBefore: "35 days from packaging",
    status: "active",
    featured: false,
    isSnack: true,
    isDemoData: true
  },
  {
    id: "prod_boondi_mixture",
    name: "Boondi Mixture",
    slug: "boondi-mixture",
    categoryId: "cat_namkeen",
    categorySlug: "namkeen",
    description: "Crisp chickpea pearls generously mixed with fried peanuts, cashew halves, and spiced curry leaves.",
    images: [
      "https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=800&auto=format&fit=crop"
    ],
    retailPrice: 500,
    wholesalePrice: 420,
    stockQuantity: 30,
    weightOptions: ["250g", "500g", "1kg"],
    ingredients: "Bengal Gram Flour, Peanuts, Cashews, Curry Leaves, Red Chilli, Salt, Vegetable Oil.",
    storageInformation: "Keep in a dry container.",
    bestBefore: "45 days from packaging",
    status: "active",
    featured: false,
    isSnack: true,
    isDemoData: true
  },

  // ==================== GIFT BOXES ====================
  {
    id: "prod_classic_box_500g",
    name: "Classic Celebration Box 500g",
    slug: "classic-celebration-box-500g",
    categoryId: "cat_gifting",
    categorySlug: "gift-boxes",
    description: "An elegant assortment of Kaju Katli, Motichoor Laddu, and Milk Peda presented in a burgundy gift box.",
    images: [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop"
    ],
    retailPrice: 650,
    wholesalePrice: 550,
    stockQuantity: 40,
    weightOptions: ["Box (500g)"],
    ingredients: "Assorted Cashews, Desi Ghee, Khoya, Cane Sugar, Pistachios.",
    storageInformation: "Store in a cool, dry area.",
    bestBefore: "12 days from packaging",
    status: "active",
    featured: true,
    isDemoData: true
  },
  {
    id: "prod_premium_mithai_box_1kg",
    name: "Premium Mithai Box 1kg",
    slug: "premium-mithai-box-1kg",
    categoryId: "cat_gifting",
    categorySlug: "gift-boxes",
    description: "Our signature 1kg keepsake collection with Kaju Pista Roll, Ghee Mysore Pak, Badam Halwa, and Motichoor Laddu.",
    images: [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop"
    ],
    retailPrice: 1250,
    wholesalePrice: 1050,
    stockQuantity: 30,
    weightOptions: ["Box (1kg)"],
    ingredients: "Selected Cashews, Pistachios, Almonds, Pure Ghee, Sugar.",
    storageInformation: "Store in cool dry conditions.",
    bestBefore: "12 days from packaging",
    status: "active",
    featured: true,
    isDemoData: true
  },
  {
    id: "prod_royal_dryfruit_box_500g",
    name: "Royal Dry Fruit Box 500g",
    slug: "royal-dry-fruit-box-500g",
    categoryId: "cat_gifting",
    categorySlug: "gift-boxes",
    description: "Artisanal assortment of Mamra almonds, Iranian pistachios, Goan cashews, and Afghan figs.",
    images: [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop"
    ],
    retailPrice: 850,
    wholesalePrice: 720,
    stockQuantity: 35,
    weightOptions: ["Box (500g)"],
    ingredients: "Selected California Almonds, Roasted Cashews, Shelled Pistachios, Turkish Figs.",
    storageInformation: "Store in an airtight container.",
    bestBefore: "90 days from packaging",
    status: "active",
    featured: false,
    isDemoData: true
  },
  {
    id: "prod_festive_box_1kg",
    name: "Festive Celebration Box 1kg",
    slug: "festive-celebration-box-1kg",
    categoryId: "cat_gifting",
    categorySlug: "gift-boxes",
    description: "Specially designed for Diwali and wedding gifting: dual tier of sweets, crunchy Madras mixture, and silver coin.",
    images: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop"
    ],
    retailPrice: 1500,
    wholesalePrice: 1250,
    stockQuantity: 20,
    weightOptions: ["Box (1kg)"],
    ingredients: "Kaju Sweets, Pure Ghee Laddus, Madras Mixture, Silver Vark.",
    storageInformation: "Store in a cool dry space.",
    bestBefore: "15 days from packaging",
    status: "active",
    featured: true,
    isDemoData: true
  },
  {
    id: "prod_grand_celebration_box_2kg",
    name: "Grand Celebration Box 2kg",
    slug: "grand-celebration-box-2kg",
    categoryId: "cat_gifting",
    categorySlug: "gift-boxes",
    description: "The ultimate luxury statement: handcrafted wooden hamper brimming with 16 bespoke sweets and savoury treats.",
    images: [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop"
    ],
    retailPrice: 2800,
    wholesalePrice: 2350,
    stockQuantity: 10,
    weightOptions: ["Hamper (2kg)"],
    ingredients: "Grand artisanal mix of all signature delicacies, dry fruits, and savoury namkeen.",
    storageInformation: "Store in cool dry conditions.",
    bestBefore: "15 days from packaging",
    status: "active",
    featured: true,
    isDemoData: true
  }
];

const customers = [
  {
    id: "cust_101",
    name: "Priya Sharma",
    phone: "+91 98201 12345",
    email: "priya.sharma@example.com",
    location: "South Mumbai, Maharashtra",
    createdAt: "2026-09-10T09:30:00.000Z"
  },
  {
    id: "cust_102",
    name: "Rahul Kumar",
    phone: "+91 98111 22334",
    email: "rahul.kumar@example.com",
    location: "Cyber City, Gurugram, Haryana",
    createdAt: "2026-09-12T14:15:00.000Z"
  },
  {
    id: "cust_103",
    name: "Ananya Iyer",
    phone: "+91 94440 33445",
    email: "ananya.iyer@example.com",
    location: "Indiranagar, Bengaluru, Karnataka",
    createdAt: "2026-09-13T16:45:00.000Z"
  },
  {
    id: "cust_104",
    name: "Vikram Malhotra",
    phone: "+91 98765 88990",
    email: "vikram.m@example.com",
    location: "Alipore, Kolkata, West Bengal",
    createdAt: "2026-09-14T11:20:00.000Z"
  },
  {
    id: "cust_105",
    name: "Sneha Patel",
    phone: "+91 98980 11223",
    email: "sneha.patel@example.com",
    location: "Navrangpura, Ahmedabad, Gujarat",
    createdAt: "2026-09-15T08:10:00.000Z"
  }
];

const enquiries = [
  {
    id: "ENQ-1001",
    customerId: "cust_101",
    customer: {
      id: "cust_101",
      name: "Priya Sharma",
      phone: "+91 98201 12345",
      email: "priya.sharma@example.com",
      location: "South Mumbai, Maharashtra"
    },
    items: [
      {
        productId: "prod_kaju_katli",
        productName: "Kaju Katli",
        weight: "1kg",
        quantity: 2,
        priceSnapshot: 1000,
        totalEstimatedPrice: 2000,
        image: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Assorted_Indian_Sweets.jpg"
      },
      {
        productId: "prod_madras_mixture",
        productName: "Madras Mixture",
        weight: "500g",
        quantity: 2,
        priceSnapshot: 250,
        totalEstimatedPrice: 500,
        image: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Murukku.jpg"
      }
    ],
    estimatedTotal: 2500,
    occasion: "Wedding",
    message: "Kindly arrange golden gift ribbons and custom monogram cards for our reception guests.",
    status: "Processing",
    createdAt: "2026-09-10T10:00:00.000Z",
    updatedAt: "2026-09-11T12:00:00.000Z"
  },
  {
    id: "ENQ-1002",
    customerId: "cust_102",
    customer: {
      id: "cust_102",
      name: "Rahul Kumar",
      phone: "+91 98111 22334",
      email: "rahul.kumar@example.com",
      location: "Cyber City, Gurugram, Haryana"
    },
    items: [
      {
        productId: "prod_premium_mithai_box_1kg",
        productName: "Premium Mithai Box 1kg",
        weight: "Box (1kg)",
        quantity: 15,
        priceSnapshot: 1250,
        totalEstimatedPrice: 18750,
        image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop"
      }
    ],
    estimatedTotal: 18750,
    occasion: "Corporate Gifting",
    message: "Annual leadership meet gifting boxes required with customized corporate sleeve.",
    status: "Pending",
    createdAt: "2026-09-12T14:30:00.000Z",
    updatedAt: "2026-09-12T14:30:00.000Z"
  },
  {
    id: "ENQ-1003",
    customerId: "cust_103",
    customer: {
      id: "cust_103",
      name: "Ananya Iyer",
      phone: "+91 94440 33445",
      email: "ananya.iyer@example.com",
      location: "Indiranagar, Bengaluru, Karnataka"
    },
    items: [
      {
        productId: "prod_motichoor_laddu",
        productName: "Motichoor Laddu",
        weight: "1kg",
        quantity: 1,
        priceSnapshot: 700,
        totalEstimatedPrice: 700,
        image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=800&auto=format&fit=crop"
      },
      {
        productId: "prod_murukku",
        productName: "Murukku",
        weight: "500g",
        quantity: 2,
        priceSnapshot: 275,
        totalEstimatedPrice: 550,
        image: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Murukku.jpg"
      }
    ],
    estimatedTotal: 1250,
    occasion: "Festival",
    message: "Festive celebration hamper for family pooja at home.",
    status: "Completed",
    createdAt: "2026-09-13T17:00:00.000Z",
    updatedAt: "2026-09-14T09:15:00.000Z"
  },
  {
    id: "ENQ-1004",
    customerId: "cust_104",
    customer: {
      id: "cust_104",
      name: "Vikram Malhotra",
      phone: "+91 98765 88990",
      email: "vikram.m@example.com",
      location: "Alipore, Kolkata, West Bengal"
    },
    items: [
      {
        productId: "prod_ghee_mysore_pak",
        productName: "Ghee Mysore Pak",
        weight: "1kg",
        quantity: 2,
        priceSnapshot: 700,
        totalEstimatedPrice: 1400,
        image: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Assorted_Indian_Sweets.jpg"
      },
      {
        productId: "prod_special_mixture",
        productName: "Special Mixture",
        weight: "500g",
        quantity: 2,
        priceSnapshot: 275,
        totalEstimatedPrice: 550,
        image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=800&auto=format&fit=crop"
      }
    ],
    estimatedTotal: 1950,
    occasion: "Birthday",
    message: "Grandmother's 80th birthday sweet boxes.",
    status: "Contacted",
    createdAt: "2026-09-14T11:45:00.000Z",
    updatedAt: "2026-09-14T15:30:00.000Z"
  },
  {
    id: "ENQ-1005",
    customerId: "cust_105",
    customer: {
      id: "cust_105",
      name: "Sneha Patel",
      phone: "+91 98980 11223",
      email: "sneha.patel@example.com",
      location: "Navrangpura, Ahmedabad, Gujarat"
    },
    items: [
      {
        productId: "prod_festive_box_1kg",
        productName: "Festive Celebration Box 1kg",
        weight: "Box (1kg)",
        quantity: 8,
        priceSnapshot: 1500,
        totalEstimatedPrice: 12000,
        image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop"
      }
    ],
    estimatedTotal: 12000,
    occasion: "Diwali Celebration",
    message: "Pre-order for Diwali gifts for clinic staff.",
    status: "Pending",
    createdAt: "2026-09-15T08:30:00.000Z",
    updatedAt: "2026-09-15T08:30:00.000Z"
  }
];

async function seed() {
  const db = await JSONFilePreset(DB_FILE, {
    products: [],
    categories: [],
    customers: [],
    enquiries: []
  });

  db.data = {
    categories,
    products,
    customers,
    enquiries
  };

  await db.write();

  console.log("---------------------------------------------");
  console.log("Database seeded successfully for MS SWEETS!");
  console.log(`- Categories: ${categories.length}`);
  console.log(`- Products:   ${products.length} (Sweets, Snacks & Gift Boxes)`);
  console.log(`- Customers:  ${customers.length}`);
  console.log(`- Enquiries:  ${enquiries.length}`);
  console.log("---------------------------------------------");
}

seed().catch(err => {
  console.error("Error seeding database:", err);
  process.exit(1);
});

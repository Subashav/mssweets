import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  Clock, 
  Award, 
  Gift, 
  HeartHandshake, 
  MessageCircle,
  ChevronRight,
  Leaf
} from "lucide-react";
import { BRAND_CONFIG } from "../../config/brand.js";
import { api } from "../../services/api.js";
import ProductCard from "../../components/customer/ProductCard.jsx";
import { useCart } from "../../context/CartContext.jsx";
import { generateWhatsAppLink } from "../../utils/whatsapp.js";
import heroBgImage from "../../assets/ChatGPT Image Sep 15, 2026, 06_08_12 PM.png";

export default function HomePage() {
  const [signatureSweets, setSignatureSweets] = useState([]);
  const [savourySnacks, setSavourySnacks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { openDrawer } = useCart();

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [prodRes, catRes] = await Promise.all([
          api.products.getPublic(),
          api.categories.getPublic()
        ]);

        if (prodRes.data) {
          // Signature sweets (first 5 for desktop)
          const sweets = prodRes.data.filter((p) => p.isSignature || p.categoryId === "cat_kaju" || p.categoryId === "cat_laddu");
          setSignatureSweets(sweets.slice(0, 5));

          // Savoury snacks (Section 13)
          const snacks = prodRes.data.filter((p) => p.isSnack || p.categoryId === "cat_snacks" || p.categoryId === "cat_namkeen");
          setSavourySnacks(snacks.slice(0, 4));
        }

        if (catRes.data) {
          setCategories(catRes.data);
        }
      } catch (err) {
        console.error("Home data error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const occasionItems = [
    {
      title: "Weddings",
      tag: "Royal Platters",
      desc: "Customized wedding invitation boxes, bidai sweets, and artisanal reception trays.",
      image: "https://upload.wikimedia.org/wikipedia/commons/8/85/Kaju_katli.JPG"
    },
    {
      title: "Festivals",
      tag: "Diwali & Pooja",
      desc: "Luminous gift hampers of assorted kaju delicacies, pure ghee laddus, and crisp namkeen.",
      image: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Assorted_Indian_Sweets.jpg"
    },
    {
      title: "Birthdays",
      tag: "Sweet Milestones",
      desc: "Pure cow ghee motichoor pyramids, caramelized milk cake, and joyful sweet treats.",
      image: "https://upload.wikimedia.org/wikipedia/commons/6/65/Motichoor_Laddu.jpg"
    },
    {
      title: "Corporate Gifting",
      tag: "Executive Hampers",
      desc: "Thoughtfully assembled sweets and dry fruit boxes embossed with your corporate identity.",
      image: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Almond_Khoa_based_burfi_Mumbai_India.jpg"
    }
  ];

  const scrollingPillars = [
    {
      title: "100% Vegetarian",
      subtitle: "Pure & Sacred Kitchen",
      icon: Leaf
    },
    {
      title: "Shudh Desi Ghee",
      subtitle: "Pure Clarified Butter",
      icon: Sparkles
    },
    {
      title: "Premium Ingredients",
      subtitle: "No Compromise Sourcing",
      icon: Award
    },
    {
      title: "Hygienically Prepared",
      subtitle: "Made with Utmost Care",
      icon: ShieldCheck
    },
    {
      title: "Crafted Daily at Sunrise",
      subtitle: "Always Freshly Made",
      icon: Clock
    },
    {
      title: "Perfect for Gifting",
      subtitle: "For Every Celebration",
      icon: Gift
    },
    {
      title: "Authentic Recipes",
      subtitle: "Generations of Craft",
      icon: HeartHandshake
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      
      {/* ==================== 7. HERO SECTION ==================== */}
      <section className="relative min-h-[84vh] flex items-center bg-[#2A211D] text-[#FFFDF8] overflow-hidden">
        {/* Sweets Art Hero Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={heroBgImage}
            alt="MS Sweets Handcrafted Confections"
            className="w-full h-full object-cover object-[78%_center] sm:object-center"
          />
          {/* Vignette overlays for clean readability while letting the confections shine */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1B1512]/92 via-[#1B1512]/70 to-transparent sm:via-[#1B1512]/50 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B1512]/80 via-transparent to-[#1B1512]/30 pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Content Area */}
            <div className="lg:col-span-7 space-y-6">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9B66F]/15 border border-[#D9B66F]/35 text-[#D9B66F] text-[11px] uppercase tracking-[0.24em] font-semibold">
                <span>TRADITION MEETS TASTE</span>
              </div>

              {/* Large Headline in The Seasons */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[62px] font-bold leading-[1.12] tracking-tight text-[#FFFDF8]">
                Every Occasion <br />
                Tastes Better <br />
                with <span className="text-[#D9B66F] not-italic font-bold">{BRAND_CONFIG.businessName}</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-[#E3D4BF] max-w-xl font-light leading-relaxed">
                From pure desi ghee mithai to golden crunchy savouries, explore authentic flavours crafted fresh daily for everyday joy and grand celebrations.
              </p>

              {/* Hero CTA Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  to="/products?category=cat_sweets"
                  className="px-6 py-3.5 bg-[#5A171C] hover:bg-[#741F24] text-[#FFFDF8] text-xs uppercase tracking-[0.2em] font-bold rounded-lg shadow-sm transition-colors text-center"
                >
                  EXPLORE SWEETS
                </Link>

                <Link
                  to="/products?category=cat_snacks"
                  className="px-6 py-3.5 bg-[#8C6424] hover:bg-[#6D4C17] text-[#FFFDF8] text-xs uppercase tracking-[0.2em] font-bold rounded-lg shadow-sm transition-colors text-center"
                >
                  CRUNCHY SAVOURIES
                </Link>

                <Link
                  to="/products?category=cat_gifting"
                  className="px-6 py-3.5 bg-transparent hover:bg-white/10 text-[#D9B66F] border border-[#D9B66F] text-xs uppercase tracking-[0.2em] font-bold rounded-lg transition-colors text-center"
                >
                  GIFT BOXES
                </Link>
              </div>

              {/* Micro Details (Section 8) */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-[#EFE5D5]/20 text-[11px] text-[#E3D4BF]">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D9B66F]" />
                  <span>100% Vegetarian</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D9B66F]" />
                  <span>Freshly Prepared</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D9B66F]" />
                  <span>Pure Desi Ghee</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D9B66F]" />
                  <span>Crisp Teatime Savouries</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================== 9. AUTO-SCROLLING TRUST RIBBON ==================== */}
      <section className="relative bg-[#F8F2E8] border-y border-[#EFE5D5] py-4 sm:py-5 overflow-hidden group shadow-2xs">
        {/* Subtle luxury edge gradient fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#F8F2E8] via-[#F8F2E8]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#F8F2E8] via-[#F8F2E8]/80 to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee items-center">
          {/* First loop */}
          <div className="flex items-center gap-6 sm:gap-10 shrink-0 pr-6 sm:pr-10">
            {scrollingPillars.map((p, idx) => (
              <div key={`p1-${idx}`} className="flex items-center gap-3 sm:gap-3.5 shrink-0">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FFFDF8] border border-[#D9B66F]/50 flex items-center justify-center text-[#5A171C] shadow-2xs group-hover:border-[#C89B52] transition-colors shrink-0">
                  <p.icon className="w-4 h-4 text-[#C89B52]" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-serif text-[17px] sm:text-[19px] font-bold text-[#2A211D] leading-none whitespace-nowrap">
                    {p.title}
                  </h4>
                  <p className="text-[11px] text-[#7A6961] font-medium tracking-wide uppercase whitespace-nowrap">
                    {p.subtitle}
                  </p>
                </div>
                <span className="text-[#C89B52]/60 text-xs pl-6 sm:pl-10 select-none">✦</span>
              </div>
            ))}
          </div>

          {/* Duplicate loop for seamless infinite scroll */}
          <div className="flex items-center gap-6 sm:gap-10 shrink-0 pr-6 sm:pr-10" aria-hidden="true">
            {scrollingPillars.map((p, idx) => (
              <div key={`p2-${idx}`} className="flex items-center gap-3 sm:gap-3.5 shrink-0">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FFFDF8] border border-[#D9B66F]/50 flex items-center justify-center text-[#5A171C] shadow-2xs group-hover:border-[#C89B52] transition-colors shrink-0">
                  <p.icon className="w-4 h-4 text-[#C89B52]" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-serif text-[17px] sm:text-[19px] font-bold text-[#2A211D] leading-none whitespace-nowrap">
                    {p.title}
                  </h4>
                  <p className="text-[11px] text-[#7A6961] font-medium tracking-wide uppercase whitespace-nowrap">
                    {p.subtitle}
                  </p>
                </div>
                <span className="text-[#C89B52]/60 text-xs pl-6 sm:pl-10 select-none">✦</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 10. SIGNATURE SWEETS ==================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-[#EFE5D5]">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2A211D]">
              Our Signature Sweets
            </h2>
            <div className="w-12 h-[2px] bg-[#D9B66F] my-2" />
            <p className="text-xs sm:text-sm text-[#7A6961]">
              Beloved classics, crafted fresh for every sweet moment.
            </p>
          </div>
          <Link
            to="/products?category=cat_sweets"
            className="text-xs uppercase tracking-widest font-bold text-[#5A171C] hover:text-[#741F24] flex items-center gap-1 group"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 1 card per row on mobile/tablet, 5 on desktop */}
        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-44 sm:h-52 lg:h-80 bg-white rounded-xl border border-[#EFE5D5] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-5">
            {signatureSweets.map((sweet) => (
              <ProductCard key={sweet.id} product={sweet} />
            ))}
          </div>
        )}
      </section>

      {/* ==================== 12. CATEGORY SECTION ==================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2A211D]">
            Explore Our Favourites
          </h2>
          <div className="w-12 h-[2px] bg-[#D9B66F] my-2" />
          <p className="text-xs sm:text-sm text-[#7A6961]">
            Curated collections of authentic Indian mithai, savoury namkeen, and festive hampers.
          </p>
        </div>

        {/* Varied image-first tiles */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            {
              title: "Sweets",
              desc: "Traditional favourites",
              link: "/products?category=cat_sweets",
              img: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Assorted_Indian_Sweets.jpg"
            },
            {
              title: "Snacks",
              desc: "Crunchy & spicy",
              link: "/products?category=cat_snacks",
              img: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Murukku.jpg"
            },
            {
              title: "Namkeen",
              desc: "Crisp teatime sev",
              link: "/products?category=cat_namkeen",
              img: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Homemade_Boondi_in_West_Bengal%2C_India.jpg"
            },
            {
              title: "Dry Fruit Specials",
              desc: "Mamra & Afghan figs",
              link: "/products?category=cat_dryfruit",
              img: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Almond_Khoa_based_burfi_Mumbai_India.jpg"
            },
            {
              title: "Gift Boxes",
              desc: "Velvet celebration boxes",
              link: "/products?category=cat_gifting",
              img: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Assorted_Indian_Sweets.jpg"
            },
            {
              title: "Festive Collection",
              desc: "Made for celebrations",
              link: "/products?category=cat_festive",
              img: "https://upload.wikimedia.org/wikipedia/commons/5/56/Gulab_Jamun.jpg"
            }
          ].map((tile) => (
            <Link
              key={tile.title}
              to={tile.link}
              className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-[#F8F2E8] border border-[#EFE5D5] shadow-xs flex flex-col justify-end p-3"
            >
              <img
                src={tile.img}
                alt={tile.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="relative z-10 text-white">
                <span className="text-[10px] uppercase tracking-wider text-[#D9B66F] font-semibold block">
                  {tile.desc}
                </span>
                <h3 className="font-serif text-lg font-bold leading-tight">
                  {tile.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ==================== 13. SNACKS SECTION ("Something Savoury?") ==================== */}
      <section className="bg-[#F8F2E8] py-14 sm:py-16 border-y border-[#EFE5D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#C89B52] font-semibold">
                Crispy Teatime Treats
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2A211D] mt-1">
                Something Savoury?
              </h2>
              <div className="w-12 h-[2px] bg-[#D9B66F] my-2" />
              <p className="text-xs sm:text-sm text-[#7A6961]">
                Crunchy, spicy and irresistibly fresh — Madras Mixture, Ribbon Pakoda, Murukku & Thattai.
              </p>
            </div>

            <Link
              to="/products?category=cat_snacks"
              className="text-xs uppercase tracking-widest font-bold text-[#5A171C] hover:text-[#741F24] flex items-center gap-1 group"
            >
              <span>Explore All Snacks</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
            {savourySnacks.map((snack) => (
              <ProductCard key={snack.id} product={snack} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 14. FEATURED GIFTING SECTION ==================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl overflow-hidden shadow-md border border-[#C89B52]/30 grid grid-cols-1 lg:grid-cols-12 bg-[#5A171C] text-[#FFFDF8]">
          
          {/* Left: Large Gift Box Image */}
          <div className="lg:col-span-6 h-72 sm:h-96 lg:h-auto relative overflow-hidden bg-black/20">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/1/1d/Assorted_Indian_Sweets.jpg"
              alt="Luxury Sweets Gift Boxes with Ribbons"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right: Editorial Burgundy & Gold Content */}
          <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-[#D9B66F]">
              <Gift className="w-4 h-4" />
              <span>Celebration Gifting</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold leading-tight text-[#FFFDF8]">
              Make Every Celebration Sweeter
            </h2>

            <p className="text-sm text-[#F8F2E8]/85 leading-relaxed font-light">
              Thoughtfully packed sweets and savoury favourites for festivals, weddings, family gatherings and corporate celebrations. Handcrafted keepsake boxes tied with satin ribbons and personalized message cards.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <Link
                to="/products?category=cat_gifting"
                className="w-full sm:w-auto px-6 py-3.5 bg-[#C89B52] hover:bg-[#D9B66F] text-[#2A211D] text-xs uppercase tracking-[0.2em] font-bold rounded-lg shadow-sm transition-colors text-center"
              >
                EXPLORE GIFT BOXES
              </Link>

              <button
                onClick={openDrawer}
                className="w-full sm:w-auto px-6 py-3.5 bg-transparent hover:bg-white/10 text-[#FFFDF8] border border-[#D9B66F]/60 text-xs uppercase tracking-[0.2em] font-bold rounded-lg transition-colors text-center"
              >
                ENQUIRE FOR BULK ORDERS
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ==================== 16. OCCASIONS ==================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2A211D]">
            Made for Every Celebration
          </h2>
          <div className="w-12 h-[2px] bg-[#D9B66F] mx-auto my-2" />
          <p className="text-xs sm:text-sm text-[#7A6961]">
            Bespoke confections curated for life's most auspicious and joyful milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {occasionItems.map((occ) => (
            <div
              key={occ.title}
              className="bg-white rounded-xl overflow-hidden border border-[#EFE5D5] shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#F8F2E8]">
                <img
                  src={occ.image}
                  alt={occ.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2.5 left-2.5 bg-[#5A171C] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                  {occ.tag}
                </span>
              </div>

              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#2A211D]">
                    {occ.title}
                  </h3>
                  <p className="text-xs text-[#7A6961] mt-1 leading-relaxed">
                    {occ.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#EFE5D5]">
                  <button
                    onClick={openDrawer}
                    className="text-xs font-semibold text-[#5A171C] hover:text-[#741F24] flex items-center gap-1"
                  >
                    <span>Enquire for {occ.title}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== 17. BRAND STORY ==================== */}
      <section className="bg-[#F8F2E8] py-16 border-y border-[#EFE5D5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-[11px] uppercase tracking-[0.24em] text-[#C89B52] font-semibold">
            Heirloom Confectionery
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#2A211D] leading-snug">
            More Than Sweets. <br />
            A Part of Your Story.
          </h2>

          <p className="text-sm sm:text-base text-[#5C4D46] font-light leading-relaxed max-w-2xl mx-auto">
            At {BRAND_CONFIG.businessName}, we believe every celebration deserves something special. From traditional favourites to thoughtful gift boxes, every creation is prepared with care, quality and a love for timeless Indian flavours.
          </p>

          {/* Replaceable Demo Figures */}
          <div className="pt-6 grid grid-cols-3 gap-6 max-w-md mx-auto border-t border-[#EFE5D5]">
            <div className="space-y-0.5">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#5A171C]">
                25+
              </div>
              <div className="text-[11px] uppercase tracking-wider text-[#7A6961]">
                Varieties
              </div>
            </div>

            <div className="space-y-0.5">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#5A171C]">
                1000+
              </div>
              <div className="text-[11px] uppercase tracking-wider text-[#7A6961]">
                Happy Customers
              </div>
            </div>

            <div className="space-y-0.5">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#5A171C]">
                10+
              </div>
              <div className="text-[11px] uppercase tracking-wider text-[#7A6961]">
                Festive Collections
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FINAL ENQUIRY & WHATSAPP CTA ==================== */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A211D]">
          Looking for Something Special?
        </h3>
        <p className="text-xs sm:text-sm text-[#7A6961] max-w-md mx-auto">
          Need custom sweet curations, customized ribbon tags, or bulk celebratory orders? Our master halwais are delighted to assist.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            onClick={openDrawer}
            className="px-7 py-3 bg-[#5A171C] hover:bg-[#741F24] text-white text-xs uppercase tracking-widest font-bold rounded-lg shadow-xs transition-colors"
          >
            Start Your Sweet Enquiry
          </button>
          <a
            href={generateWhatsAppLink({
              customMessage: "Hello MS Sweets! I'd like to check availability for an upcoming occasion."
            })}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#FFFDF8] hover:bg-[#F8F2E8] text-[#2A211D] border border-[#EFE5D5] text-xs uppercase tracking-widest font-semibold rounded-lg transition-colors flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-[#2E7D32]" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </section>

    </div>
  );
}

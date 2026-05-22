"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { addProperty } from "@/utils/propertyApi";
import apiClient from "@/utils/apiClient";

const COUNTRIES = ["UAE", "USA", "Portugal", "Canada", "Australia", "Turkey", "Cyprus", "Malta", "Hungary", "Latvia", "Philippines", "Malaysia"];

const COUNTRY_REGION_LABEL = {
  UAE: "Emirate", USA: "State", Portugal: "District", Canada: "Province",
  Australia: "State/Territory", Turkey: "Province", Cyprus: "District",
  Malta: "Region", Hungary: "County", Latvia: "Region",
  Philippines: "Province", Malaysia: "State",
};

const COUNTRY_REGIONS = {
  UAE: ["Abu Dhabi", "Dubai", "Sharjah", "Ajman", "Umm Al Quwain", "Ras Al Khaimah", "Fujairah"],
  USA: ["California", "Texas", "New York", "Florida", "Illinois", "Washington", "Arizona"],
  Portugal: ["Lisbon", "Porto", "Algarve", "Setúbal", "Braga", "Aveiro", "Coimbra"],
  Canada: ["Ontario", "Quebec", "British Columbia", "Alberta", "Manitoba", "Saskatchewan", "Nova Scotia"],
  Australia: ["New South Wales", "Victoria", "Queensland", "Western Australia", "South Australia", "Tasmania"],
  Turkey: ["Istanbul", "Ankara", "Izmir", "Antalya", "Bursa", "Trabzon", "Mugla"],
  Cyprus: ["Nicosia", "Limassol", "Larnaca", "Famagusta", "Paphos", "Kyrenia"],
  Malta: ["Northern", "Southern", "Central", "Western", "Eastern", "Gozo"],
  Hungary: ["Budapest", "Pest", "Győr-Moson-Sopron", "Fejér", "Hajdú-Bihar", "Bács-Kiskun"],
  Latvia: ["Riga", "Vidzeme", "Kurzeme", "Zemgale", "Latgale"],
  Philippines: ["Metro Manila", "Cebu", "Davao", "Laguna", "Cavite", "Batangas", "Pampanga"],
  Malaysia: ["Kuala Lumpur", "Selangor", "Penang", "Johor", "Sabah", "Sarawak", "Perak"],
};

const REGION_CITIES = {
  "Abu Dhabi": ["Abu Dhabi City", "Al Ain", "Al Reem Island", "Saadiyat Island", "Yas Island", "Khalifa City"],
  "Dubai": ["Bur Dubai", "Deira", "Jumeirah", "Downtown Dubai", "Dubai Marina", "Business Bay", "JBR", "Palm Jumeirah", "JVC"],
  "Sharjah": ["Sharjah City", "Al Qasimia", "Al Majaz", "Al Nahda", "Muwaileh"],
  "Ajman": ["Ajman City", "Al Nuaimiya", "Al Rashidiya", "Al Jurf"],
  "Ras Al Khaimah": ["RAK City", "Al Hamra Village", "Mina Al Arab", "Al Marjan Island"],
  "Fujairah": ["Fujairah City", "Dibba", "Khor Fakkan"],
  "Umm Al Quwain": ["Umm Al Quwain City", "Al Salamah", "Al Raas"],
  "California": ["Los Angeles", "San Francisco", "San Diego", "San Jose", "Sacramento", "Oakland"],
  "Texas": ["Houston", "Austin", "Dallas", "San Antonio", "Fort Worth", "El Paso"],
  "New York": ["New York City", "Buffalo", "Albany", "Rochester", "Syracuse", "Yonkers"],
  "Florida": ["Miami", "Orlando", "Tampa", "Jacksonville", "Fort Lauderdale", "Boca Raton"],
  "Illinois": ["Chicago", "Springfield", "Naperville", "Rockford", "Peoria"],
  "Washington": ["Seattle", "Spokane", "Tacoma", "Bellevue", "Olympia"],
  "Arizona": ["Phoenix", "Tucson", "Scottsdale", "Mesa", "Chandler", "Tempe"],
  "Lisbon": ["Lisbon City", "Cascais", "Sintra", "Almada", "Amadora", "Setúbal"],
  "Porto": ["Porto City", "Gaia", "Matosinhos", "Braga", "Guimarães"],
  "Algarve": ["Faro", "Albufeira", "Portimão", "Lagos", "Tavira", "Vilamoura"],
  "Ontario": ["Toronto", "Ottawa", "Mississauga", "Brampton", "Hamilton", "London"],
  "Quebec": ["Montreal", "Quebec City", "Laval", "Gatineau", "Longueuil"],
  "British Columbia": ["Vancouver", "Surrey", "Burnaby", "Richmond", "Kelowna", "Victoria"],
  "Alberta": ["Calgary", "Edmonton", "Red Deer", "Lethbridge", "Medicine Hat"],
  "New South Wales": ["Sydney", "Newcastle", "Wollongong", "Central Coast", "Parramatta"],
  "Victoria": ["Melbourne", "Geelong", "Ballarat", "Bendigo", "Shepparton"],
  "Queensland": ["Brisbane", "Gold Coast", "Sunshine Coast", "Townsville", "Cairns"],
  "Western Australia": ["Perth", "Fremantle", "Mandurah", "Bunbury", "Geraldton"],
  "Istanbul": ["Beyoglu", "Kadıköy", "Beşiktaş", "Üsküdar", "Bakırköy", "Ataşehir", "Sarıyer"],
  "Ankara": ["Çankaya", "Keçiören", "Yenimahalle", "Mamak", "Altındağ"],
  "Izmir": ["Konak", "Karşıyaka", "Bornova", "Buca", "Çiğli", "Balçova"],
  "Antalya": ["Antalya City", "Alanya", "Kemer", "Belek", "Side", "Manavgat"],
  "Nicosia": ["Nicosia City", "Strovolos", "Aglandjia", "Latsia", "Lakatamia"],
  "Limassol": ["Limassol City", "Germasogeia", "Agios Athanasios", "Mesa Geitonia"],
  "Larnaca": ["Larnaca City", "Livadia", "Oroklini", "Pervolia"],
  "Paphos": ["Paphos City", "Chlorakas", "Pegeia", "Peyia", "Emba"],
  "Northern": ["Valletta", "Mellieħa", "Mosta", "Naxxar"],
  "Southern": ["Marsaskala", "Żabbar", "Fgura", "Tarxien"],
  "Central": ["Birkirkara", "Qormi", "Hamrun", "Marsa"],
  "Gozo": ["Victoria", "Marsalforn", "Xlendi", "Nadur"],
  "Budapest": ["District I", "District II", "District V", "District XIII", "District XIV"],
  "Riga": ["Riga Centre", "Purvciems", "Imanta", "Ziepniekkalns", "Mežciems", "Jūrmala"],
  "Metro Manila": ["Makati", "BGC", "Quezon City", "Pasig", "Mandaluyong", "Taguig"],
  "Cebu": ["Cebu City", "Mandaue", "Lapu-Lapu", "Talisay", "Consolacion"],
  "Davao": ["Davao City", "Tagum", "Digos", "Panabo"],
  "Kuala Lumpur": ["KLCC", "Mont Kiara", "Bangsar", "Chow Kit", "Bukit Bintang", "Damansara"],
  "Selangor": ["Petaling Jaya", "Shah Alam", "Subang Jaya", "Klang", "Ampang"],
  "Penang": ["George Town", "Bayan Lepas", "Butterworth", "Bukit Mertajam"],
  "Johor": ["Johor Bahru", "Iskandar Puteri", "Kluang", "Muar", "Batu Pahat"],
};

// All values match backend model enums exactly
const PROPERTY_TYPES = [
  { label: "Apartments", value: "apartments" },
  { label: "House", value: "house" },
  { label: "Villa", value: "villa" },
  { label: "Office", value: "office" },
  { label: "Shop", value: "shop" },
  { label: "Warehouse", value: "warehouse" },
  { label: "Industrial", value: "industrial" },
  { label: "Residential Plot", value: "residential-plot" },
  { label: "Commercial Plot", value: "commercial-plot" },
  { label: "Agricultural Land", value: "agricultural-land" },
  { label: "Industrial Plot", value: "industrial-plot" },
];
const PROPERTY_CATEGORIES = [
  { label: "Residential", value: "residential" },
  { label: "Commercial", value: "commercial" },
  { label: "Land / Plot", value: "land" },
];
const AD_TYPES = [
  { label: "For Rent", value: "rent" },
  { label: "For Sale / Resale", value: "resale" },
];
const BUILDING_TYPES = [
  { label: "Multi-Story", value: "multi-story" },
  { label: "Low-Rise (1-4 floors)", value: "low-rise" },
  { label: "High-Rise (5+ floors)", value: "high-rise" },
];
const FURNISHING_OPTIONS = [
  { label: "Fully Furnished", value: "fully-furnished" },
  { label: "Semi-Furnished", value: "semi-furnished" },
  { label: "Unfurnished", value: "unfurnished" },
];
const PROPERTY_AGE_OPTIONS = [
  { label: "0–1 Year", value: "0-1" },
  { label: "1–3 Years", value: "1-3" },
  { label: "3–5 Years", value: "3-5" },
  { label: "5–10 Years", value: "5-10" },
  { label: "10+ Years", value: "10+" },
];
const FLOOR_OPTIONS = ["Ground", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "15", "20", "25+"];
const TOTAL_FLOORS_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20, 25, 30];
const OWNERSHIP_OPTIONS = [
  { label: "Freehold", value: "freehold" },
  { label: "Leasehold", value: "leasehold" },
  { label: "Co-operative", value: "co-operative" },
  { label: "Power of Attorney", value: "power-of-attorney" },
];
const PARKING_OPTIONS = [
  { label: "None", value: "none" },
  { label: "Bike", value: "bike" },
  { label: "Car (1)", value: "car" },
  { label: "Car (2)", value: "car-2" },
  { label: "Bike + Car", value: "both" },
];

// Boolean amenities — stored as separate fields in the backend
const BOOLEAN_AMENITIES = [
  { label: "Gym", field: "gym" },
  { label: "Swimming Pool", field: "swimmingPool" },
  { label: "Garden", field: "garden" },
  { label: "Club House", field: "clubHouse" },
  { label: "Internet / WiFi", field: "internetWifi" },
  { label: "Lift / Elevator", field: "lift" },
  { label: "Power Backup", field: "powerBackup" },
  { label: "24/7 Security", field: "security" },
  { label: "Water Storage", field: "waterStorage" },
];

// String amenities — stored in amenities[] array
const AMENITIES_LIST = {
  "Home Safety": ["Smoke alarm", "Carbon monoxide alarm", "Security cameras", "Self check-in with lockbox"],
  "Kitchen": ["Refrigerator", "Dishwasher", "Microwave", "Coffee maker"],
};

const INITIAL_FORM = {
  propertyName: "",
  description: "",
  address: "",
  street: "",
  locality: "",
  landmark: "",
  zipCode: "",
  country: "UAE",
  state: "Dubai",
  city: "",
  propertyType: "apartments",
  propertyCategory: "residential",
  propertyAdType: "rent",
  buildingType: "multi-story",
  propertyAge: "",
  floor: "",
  totalFloor: "",
  price: "",
  priceNegotiable: false,
  superBuiltUpArea: "",
  sizeInFt: "",
  carpetArea: "",
  rooms: "",
  bedrooms: "",
  bathrooms: "",
  balconies: "",
  furnishing: "",
  parking: "none",
  ownershipType: "",
  availableFrom: "",
  garages: "",
  garageSize: "",
  yearBuilt: "",
  videoUrl: "",
  latitude: "",
  longitude: "",
  amenities: [],
  // Boolean amenity fields (stored separately in backend)
  gym: false,
  swimmingPool: false,
  garden: false,
  clubHouse: false,
  internetWifi: false,
  lift: false,
  powerBackup: false,
  security: false,
  waterStorage: false,
  // Media extras
  tourUrl: "",
  // Additional info
  previousOccupancy: "",
  whoWillShow: "",
  secondaryNumber: "",
  availabilityDays: "everyday",
  showingTime: "anytime",
};

export default function AddProperty() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const floorPlanInputRef = useRef(null);
  const attachmentInputRef = useRef(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [floorPlans, setFloorPlans] = useState([]);
  const [floorPlanPreviews, setFloorPlanPreviews] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiNote, setAiNote] = useState("");
  const [kycChecking, setKycChecking] = useState(true);
  const [kycGate, setKycGate] = useState(null); // null = ok, else { type, message }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const role = user.role || "";

    if (role === "buyer") {
      setKycGate({ type: "buyer", message: "Buyers cannot list properties. Switch to a Seller or Broker account to add listings." });
      setKycChecking(false);
      return;
    }

    if (role === "admin") {
      setKycChecking(false);
      return;
    }

    // seller or broker — must have verified KYC
    apiClient.get("/kyc/status")
      .then((res) => {
        const status = res.data?.kyc?.status;
        if (status === "verified") {
          setKycGate(null);
        } else if (status === "pending") {
          setKycGate({ type: "pending", message: "Your KYC is under review. You can add properties once it is approved by our team." });
        } else if (status === "rejected") {
          setKycGate({ type: "rejected", message: "Your KYC was rejected. Please resubmit your documents to list properties." });
        } else {
          setKycGate({ type: "unsubmitted", message: "KYC verification is required before you can add a property." });
        }
      })
      .catch(() => {
        // No KYC record found (404) or network error
        setKycGate({ type: "unsubmitted", message: "KYC verification is required before you can add a property." });
      })
      .finally(() => setKycChecking(false));
  }, []);

  const regionLabel = COUNTRY_REGION_LABEL[form.country] || "Province/State";
  const regions = COUNTRY_REGIONS[form.country] || [];
  const cities = REGION_CITIES[form.state] || [];

  const set = (field) => (e) => {
    const value = e.target ? e.target.value : e;
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "country") {
        const firstRegion = COUNTRY_REGIONS[value]?.[0] || "";
        next.state = firstRegion;
        next.city = "";
      }
      if (field === "state") next.city = "";
      return next;
    });
  };

  const toggleAmenity = (item) => {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(item)
        ? prev.amenities.filter((a) => a !== item)
        : [...prev.amenities, item],
    }));
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files || []).slice(0, 10);
    setImages(files);
    setPreviews(files.map((f) => URL.createObjectURL(f)));
  };

  const removeImage = (idx) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
    setPreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleFloorPlans = (e) => {
    const files = Array.from(e.target.files || []).slice(0, 5);
    setFloorPlans((prev) => [...prev, ...files].slice(0, 5));
    setFloorPlanPreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))].slice(0, 5));
  };

  const removeFloorPlan = (idx) => {
    setFloorPlans((prev) => prev.filter((_, i) => i !== idx));
    setFloorPlanPreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleAttachments = (e) => {
    const files = Array.from(e.target.files || []).slice(0, 5);
    setAttachments((prev) => [...prev, ...files].slice(0, 5));
  };

  const removeAttachment = (idx) => {
    setAttachments((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleAiAnalyzeImages = async () => {
    if (images.length === 0) {
      setAiNote("Upload at least one photo first.");
      return;
    }
    setAiAnalyzing(true);
    setAiNote("");
    try {
      const base64Images = await Promise.all(
        images.slice(0, 4).map(
          (file) =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result);
              reader.onerror = reject;
              reader.readAsDataURL(file);
            })
        )
      );
      const { data } = await apiClient.post("/ai/analyze-images", { images: base64Images });
      const ai = data.data;
      setForm((prev) => ({
        ...prev,
        propertyName: ai.title || prev.propertyName,
        description: ai.description || prev.description,
        bedrooms: ai.bedrooms || prev.bedrooms,
        bathrooms: ai.bathrooms || prev.bathrooms,
        sizeInFt: ai.sizeInFt || prev.sizeInFt,
        price: ai.priceEstimate?.replace(/[^0-9]/g, "") || prev.price,
      }));
      setAiNote("AI filled in details from your photos. Review and adjust as needed.");
    } catch {
      setAiNote("AI analysis failed. Please fill in manually.");
    } finally {
      setAiAnalyzing(false);
    }
  };

  const [descNote, setDescNote] = useState("");

  const handleAiGenerateDescription = async () => {
    if (!form.propertyName) {
      setDescNote("Fill in the Title first.");
      return;
    }
    setAiGenerating(true);
    setDescNote("");
    try {
      const { data } = await apiClient.post("/ai/generate-description", {
        propertyName: form.propertyName,
        bedrooms: form.bedrooms || "1",
        bathrooms: form.bathrooms || "1",
        city: form.city || form.state,
        country: form.country,
        propertyType: form.propertyType,
        price: form.price,
        sizeInFt: form.sizeInFt,
      });
      const desc = data.data?.description || data.data?.highlights?.join(" ") || "";
      if (desc) {
        setForm((prev) => ({ ...prev, description: desc }));
        setDescNote("✓ Description generated. Edit if needed.");
      } else {
        setDescNote("AI returned empty response. Try again.");
      }
    } catch (err) {
      setDescNote(err?.response?.data?.message || "AI generation failed. Try again.");
    } finally {
      setAiGenerating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.propertyName || !form.country || !form.state || !form.city ||
        !form.propertyCategory || !form.propertyAdType || !form.bedrooms || !form.bathrooms || !form.superBuiltUpArea) {
      setError("Please fill in all required fields marked with *");
      return;
    }
    if (images.length === 0) {
      setError("Please upload at least one photo.");
      return;
    }

    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (k === "amenities") {
          v.forEach((a) => fd.append("amenities", a));
        } else if (typeof v === "boolean") {
          fd.append(k, v);
        } else if (v !== "") {
          fd.append(k, v);
        }
      });
      images.forEach((img) => fd.append("images", img));
      floorPlans.forEach((f) => fd.append("floorPlans", f));
      attachments.forEach((f) => fd.append("attachments", f));

      await addProperty(fd);
      setSuccess(true);
      setTimeout(() => router.push("/my-property"), 2000);
    } catch (err) {
      const status = err?.response?.status;
      const msg = err?.response?.data?.message || "";
      if (status === 403 && msg.toLowerCase().includes("kyc")) {
        setKycGate({ type: "unsubmitted", message: msg });
      } else {
        setError(msg || "Failed to add property. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="main-content w-100">
        <div className="main-content-inner" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 400 }}>
          <div style={{ textAlign: "center", padding: 40 }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
            <h3 style={{ color: "#2db224", marginBottom: 8 }}>Property Submitted!</h3>
            <p>Your listing is pending admin approval. Redirecting to your properties…</p>
          </div>
        </div>
      </div>
    );
  }

  if (kycChecking) {
    return (
      <div className="main-content w-100">
        <div className="main-content-inner" style={{ padding: 60, textAlign: "center", color: "#888" }}>
          Checking verification status…
        </div>
      </div>
    );
  }

  if (kycGate) {
    const isUnsubmitted = kycGate.type === "unsubmitted" || kycGate.type === "rejected";
    const colors = {
      buyer:       { bg: "#fff7ed", border: "#fdba74", icon: "🚫" },
      unsubmitted: { bg: "#fef9c3", border: "#fbbf24", icon: "⚠️" },
      pending:     { bg: "#eff6ff", border: "#93c5fd", icon: "⏳" },
      rejected:    { bg: "#fee2e2", border: "#fca5a5", icon: "❌" },
    };
    const c = colors[kycGate.type] || colors.unsubmitted;
    return (
      <div className="main-content w-100" style={{ overflowY: "auto" }}>
        <div className="main-content-inner" style={{ minHeight: "calc(100vh - 80px)", padding: "60px 40px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{
            maxWidth: 520, width: "100%",
            background: c.bg, border: `1.5px solid ${c.border}`,
            borderRadius: 16, padding: "48px 40px", textAlign: "center",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          }}>
            <div style={{ fontSize: 56, marginBottom: 20 }}>{c.icon}</div>
            <h4 style={{ marginBottom: 12, fontWeight: 700, fontSize: 24, color: "#1a1a1a" }}>
              {kycGate.type === "pending" ? "KYC Under Review" : kycGate.type === "buyer" ? "Not Permitted" : kycGate.type === "rejected" ? "KYC Rejected" : "KYC Required"}
            </h4>
            <p style={{ color: "#6b7280", marginBottom: 32, lineHeight: 1.7, fontSize: 15 }}>{kycGate.message}</p>
            {isUnsubmitted && (
              <Link href="/kyc-property-verification" style={{ display: "inline-block", padding: "14px 36px", borderRadius: 10, textDecoration: "none", color: "#fff", fontWeight: 600, fontSize: 15, background: "#eb6753" }}>
                Complete KYC Verification →
              </Link>
            )}
            {kycGate.type === "pending" && (
              <p style={{ marginTop: 20, fontSize: 13, color: "#9ca3af" }}>
                Our team typically reviews submissions within 1–2 business days.
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content w-100">
      <div className="main-content-inner">
        <div className="button-show-hide show-mb">
          <span className="body-1">Show Dashboard</span>
        </div>

        {/* Upload Media */}
        <div className="widget-box-2 mb-20">
          <h3 className="title">Upload Media</h3>
          <div className="box-uploadfile text-center">
            <div className="uploadfile">
              <label className="tf-btn bg-color-primary pd-10 btn-upload mx-auto" style={{ cursor: "pointer" }}>
                <svg width={21} height={20} viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.625 14.375V17.1875C13.625 17.705 13.205 18.125 12.6875 18.125H4.5625C4.31386 18.125 4.0754 18.0262 3.89959 17.8504C3.72377 17.6746 3.625 17.4361 3.625 17.1875V6.5625C3.625 6.045 4.045 5.625 4.5625 5.625H6.125C6.54381 5.62472 6.96192 5.65928 7.375 5.72834M13.625 14.375H16.4375C16.955 14.375 17.375 13.955 17.375 13.4375V9.375C17.375 5.65834 14.6725 2.57417 11.125 1.97834C10.7119 1.90928 10.2938 1.87472 9.875 1.875H8.3125C7.795 1.875 7.375 2.295 7.375 2.8125V5.72834M13.625 14.375H8.3125C8.06386 14.375 7.8254 14.2762 7.64959 14.1004C7.47377 13.9246 7.375 13.6861 7.375 13.4375V5.72834M17.375 11.25V9.6875C17.375 8.94158 17.0787 8.22621 16.5512 7.69876C16.0238 7.17132 15.3084 6.875 14.5625 6.875H13.3125C13.0639 6.875 12.8254 6.77623 12.6496 6.60041C12.4738 6.4246 12.375 6.18614 12.375 5.9375V4.6875C12.375 4.31816 12.3023 3.95243 12.1609 3.6112C12.0196 3.26998 11.8124 2.95993 11.5512 2.69876C11.2901 2.4376 10.98 2.23043 10.6388 2.08909C10.2976 1.94775 9.93184 1.875 9.5625 1.875H8.625" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Select photos
                <input ref={fileInputRef} type="file" className="ip-file" accept="image/*" multiple onChange={handleImages} style={{ display: "none" }} />
              </label>
              <p className="file-name fw-5">or drag photos here <br /><span>(Up to 10 photos)</span></p>
            </div>
          </div>
          {previews.length > 0 && (
            <div className="box-img-upload">
              {previews.map((src, i) => (
                <div key={i} className="item-upload file-delete">
                  <img alt="preview" src={src} style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 8 }} />
                  <span className="icon icon-trashcan1 remove-file" onClick={() => removeImage(i)} style={{ cursor: "pointer" }} />
                </div>
              ))}
            </div>
          )}
          {previews.length > 0 && (
            <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <button type="button" className="tf-btn bg-color-primary pd-10" onClick={handleAiAnalyzeImages} disabled={aiAnalyzing} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span>🤖</span> {aiAnalyzing ? "Analyzing photos…" : "AI Auto-fill from Photos"}
              </button>
              {aiNote && <span style={{ fontSize: 13, color: "#2db224" }}>{aiNote}</span>}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Information */}
          <div className="widget-box-2 mb-20">
            <h5 className="title">Information</h5>
            <div className="box-info-property">
              <fieldset className="box box-fieldset">
                <label>Title:<span>*</span></label>
                <input type="text" className="form-control" placeholder="Property name" value={form.propertyName} onChange={set("propertyName")} required />
              </fieldset>
              <fieldset className="box box-fieldset">
                <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>Description:</span>
                  <button type="button" onClick={handleAiGenerateDescription} disabled={aiGenerating} style={{ background: "none", border: "1px solid #2db224", color: "#2db224", borderRadius: 6, padding: "2px 10px", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                    🤖 {aiGenerating ? "Generating…" : "AI Generate"}
                  </button>
                </label>
                <textarea className="textarea" placeholder="Describe the property…" value={form.description} onChange={set("description")} />
                {descNote && (
                  <span style={{ fontSize: 12, color: descNote.startsWith("✓") ? "#2db224" : "#cc0000", marginTop: 4, display: "block" }}>
                    {descNote}
                  </span>
                )}
              </fieldset>
              <div className="box grid-layout-3 gap-30">
                <fieldset className="box-fieldset">
                  <label>Full Address:<span>*</span></label>
                  <input type="text" className="form-control" placeholder="Street, building, unit…" value={form.address} onChange={set("address")} />
                </fieldset>
                <fieldset className="box-fieldset">
                  <label>Zip / Postal Code:</label>
                  <input type="text" className="form-control" placeholder="e.g. 10001" value={form.zipCode} onChange={set("zipCode")} />
                </fieldset>
                <fieldset className="box-fieldset">
                  <label>Country:<span>*</span></label>
                  <select className="form-control nice-select" value={form.country} onChange={set("country")}>
                    {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </fieldset>
              </div>
              <div className="box grid-layout-3 gap-30">
                <fieldset className="box-fieldset">
                  <label>{regionLabel}:<span>*</span></label>
                  <select className="form-control nice-select" value={form.state} onChange={set("state")}>
                    {regions.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </fieldset>
                <fieldset className="box-fieldset">
                  <label>City:<span>*</span></label>
                  <select className="form-control nice-select" value={form.city} onChange={set("city")}>
                    <option value="">Select city…</option>
                    {cities.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </fieldset>
                <fieldset className="box-fieldset">
                  <label>Latitude:</label>
                  <input type="text" className="form-control" placeholder="e.g. 25.2048" value={form.latitude} onChange={set("latitude")} />
                </fieldset>
              </div>
              <div className="box grid-layout-3 gap-30">
                <fieldset className="box-fieldset">
                  <label>Longitude:</label>
                  <input type="text" className="form-control" placeholder="e.g. 55.2708" value={form.longitude} onChange={set("longitude")} />
                </fieldset>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="widget-box-2 mb-20">
            <h3 className="title">Price & Listing</h3>
            <div className="box grid-layout-3 gap-30">
              <fieldset className="box-fieldset">
                <label>Price:<span>*</span></label>
                <input type="number" className="form-control" placeholder="e.g. 450000" value={form.price} onChange={set("price")} min={0} />
              </fieldset>
              <fieldset className="box-fieldset">
                <label>Listing Type:<span>*</span></label>
                <select className="form-control nice-select" value={form.propertyAdType} onChange={set("propertyAdType")}>
                  {AD_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </fieldset>
              <fieldset className="box-fieldset">
                <label>Category:<span>*</span></label>
                <select className="form-control nice-select" value={form.propertyCategory} onChange={set("propertyCategory")}>
                  {PROPERTY_CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </fieldset>
            </div>
            <div className="box grid-layout-3 gap-30">
              <fieldset className="box-fieldset">
                <label>Ownership Type:</label>
                <select className="form-control nice-select" value={form.ownershipType} onChange={set("ownershipType")}>
                  <option value="">Select…</option>
                  {OWNERSHIP_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </fieldset>
              <fieldset className="box-fieldset" style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 28 }}>
                <label style={{ marginBottom: 0, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                  <input type="checkbox" checked={form.priceNegotiable} onChange={(e) => setForm((p) => ({ ...p, priceNegotiable: e.target.checked }))} />
                  Price Negotiable
                </label>
              </fieldset>
              <fieldset className="box-fieldset">
                <label>Available From:</label>
                <input type="date" className="form-control" value={form.availableFrom} onChange={set("availableFrom")} min={new Date().toISOString().split("T")[0]} />
              </fieldset>
            </div>
          </div>

          {/* Property Details */}
          <div className="widget-box-2 mb-20">
            <h3 className="title">Property Details</h3>
            <div className="box grid-layout-3 gap-30">
              <fieldset className="box-fieldset">
                <label>Property Type:<span>*</span></label>
                <select className="form-control nice-select" value={form.propertyType} onChange={set("propertyType")}>
                  {PROPERTY_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </fieldset>
              <fieldset className="box-fieldset">
                <label>Building Type:</label>
                <select className="form-control nice-select" value={form.buildingType} onChange={set("buildingType")}>
                  {BUILDING_TYPES.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
                </select>
              </fieldset>
              <fieldset className="box-fieldset">
                <label>Property Age:</label>
                <select className="form-control nice-select" value={form.propertyAge} onChange={set("propertyAge")}>
                  <option value="">Select…</option>
                  {PROPERTY_AGE_OPTIONS.map((a) => <option key={a.value} value={a.value}>{a.label}</option>)}
                </select>
              </fieldset>
            </div>
            <div className="box grid-layout-3 gap-30">
              <fieldset className="box-fieldset">
                <label>Floor:</label>
                <select className="form-control nice-select" value={form.floor} onChange={set("floor")}>
                  <option value="">Select…</option>
                  {FLOOR_OPTIONS.map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
              </fieldset>
              <fieldset className="box-fieldset">
                <label>Total Floors in Building:</label>
                <select className="form-control nice-select" value={form.totalFloor} onChange={set("totalFloor")}>
                  <option value="">Select…</option>
                  {TOTAL_FLOORS_OPTIONS.map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
              </fieldset>
              <fieldset className="box-fieldset">
                <label>Furnishing:</label>
                <select className="form-control nice-select" value={form.furnishing} onChange={set("furnishing")}>
                  <option value="">Select…</option>
                  {FURNISHING_OPTIONS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
                </select>
              </fieldset>
            </div>
            <div className="box grid-layout-3 gap-30">
              <fieldset className="box-fieldset">
                <label>Built-Up Area (SqFt):<span>*</span></label>
                <input type="number" className="form-control" placeholder="e.g. 1200" value={form.superBuiltUpArea}
                  onChange={(e) => setForm((p) => ({ ...p, superBuiltUpArea: e.target.value, sizeInFt: e.target.value }))}
                  min={0} />
              </fieldset>
              <fieldset className="box-fieldset">
                <label>Carpet Area (SqFt):</label>
                <input type="number" className="form-control" placeholder="e.g. 950" value={form.carpetArea} onChange={set("carpetArea")} min={0} />
              </fieldset>
              <fieldset className="box-fieldset">
                <label>Bedrooms:<span>*</span></label>
                <input type="number" className="form-control" placeholder="e.g. 3" value={form.bedrooms} onChange={set("bedrooms")} min={0} required />
              </fieldset>
            </div>
            <div className="box grid-layout-3 gap-30">
              <fieldset className="box-fieldset">
                <label>Bathrooms:<span>*</span></label>
                <input type="number" className="form-control" placeholder="e.g. 2" value={form.bathrooms} onChange={set("bathrooms")} min={0} required />
              </fieldset>
              <fieldset className="box-fieldset">
                <label>Balconies:</label>
                <input type="number" className="form-control" placeholder="e.g. 1" value={form.balconies} onChange={set("balconies")} min={0} />
              </fieldset>
              <fieldset className="box-fieldset">
                <label>Parking:</label>
                <select className="form-control nice-select" value={form.parking} onChange={set("parking")}>
                  {PARKING_OPTIONS.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
                </select>
              </fieldset>
            </div>
            <div className="box grid-layout-3 gap-30">
              <fieldset className="box-fieldset">
                <label>Rooms (Total):</label>
                <input type="number" className="form-control" placeholder="e.g. 5" value={form.rooms} onChange={set("rooms")} min={0} />
              </fieldset>
              <fieldset className="box-fieldset">
                <label>Year Built:</label>
                <input type="number" className="form-control" placeholder="e.g. 2020" value={form.yearBuilt} onChange={set("yearBuilt")} min={1800} max={new Date().getFullYear()} />
              </fieldset>
              <fieldset className="box-fieldset">
                <label>Locality / Area:</label>
                <input type="text" className="form-control" placeholder="e.g. Near Metro, Downtown" value={form.locality} onChange={set("locality")} />
              </fieldset>
            </div>
            <div className="box grid-layout-3 gap-30">
              <fieldset className="box-fieldset">
                <label>Street / Building:</label>
                <input type="text" className="form-control" placeholder="e.g. Sheikh Zayed Rd" value={form.street} onChange={set("street")} />
              </fieldset>
              <fieldset className="box-fieldset">
                <label>Landmark:</label>
                <input type="text" className="form-control" placeholder="e.g. Near Dubai Mall" value={form.landmark} onChange={set("landmark")} />
              </fieldset>
            </div>
          </div>

          {/* Amenities */}
          <div className="widget-box-2 mb-20">
            <h5 className="title">Amenities</h5>
            <div className="box-amenities-property">
              {/* Boolean building facilities */}
              <div className="box-amenities" style={{ width: "100%", marginBottom: 20 }}>
                <div className="title-amenities fw-6 text-color-heading text-1" style={{ marginBottom: 10 }}>Building Facilities:</div>
                <div className="list-amenities" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {BOOLEAN_AMENITIES.map(({ label, field }) => (
                    <fieldset className="checkbox-item style-1" key={field} style={{ minWidth: 180 }}>
                      <label>
                        <span className="text-4">{label}</span>
                        <input type="checkbox" checked={!!form[field]} onChange={(e) => setForm((p) => ({ ...p, [field]: e.target.checked }))} />
                        <span className="btn-checkbox" />
                      </label>
                    </fieldset>
                  ))}
                </div>
              </div>
              {/* String amenities */}
              {Object.entries(AMENITIES_LIST).map(([category, items]) => (
                <div className="box-amenities" key={category} style={{ width: "100%", marginBottom: 20 }}>
                  <div className="title-amenities fw-6 text-color-heading text-1" style={{ marginBottom: 10 }}>{category}:</div>
                  <div className="list-amenities" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {items.map((item) => (
                      <fieldset className="checkbox-item style-1" key={item} style={{ minWidth: 180 }}>
                        <label>
                          <span className="text-4">{item}</span>
                          <input type="checkbox" checked={form.amenities.includes(item)} onChange={() => toggleAmenity(item)} />
                          <span className="btn-checkbox" />
                        </label>
                      </fieldset>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Videos */}
          <div className="widget-box-2 mb-20">
            <h3 className="title">Video</h3>
            <fieldset className="box-fieldset">
              <label className="text-btn">YouTube / Vimeo URL:</label>
              <input type="text" className="form-control" placeholder="e.g. https://youtube.com/watch?v=..." value={form.videoUrl} onChange={set("videoUrl")} />
              <small style={{ color: "#888", fontSize: 12 }}>Paste a YouTube or Vimeo link. Direct video file upload is not supported.</small>
            </fieldset>
          </div>

          {/* Floor Plans */}
          <div className="widget-box-2 mb-20">
            <h3 className="title">Floor Plans</h3>
            <p style={{ fontSize: 13, color: "#888", marginBottom: 16 }}>Upload floor plan images (up to 5). Accepted: JPG, PNG, WEBP.</p>
            <div className="box-uploadfile text-center" style={{ marginBottom: floorPlanPreviews.length > 0 ? 16 : 0 }}>
              <div className="uploadfile">
                <label className="tf-btn bg-color-primary pd-10 btn-upload mx-auto" style={{ cursor: "pointer" }}>
                  <svg width={21} height={20} viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.625 14.375V17.1875C13.625 17.705 13.205 18.125 12.6875 18.125H4.5625C4.31386 18.125 4.0754 18.0262 3.89959 17.8504C3.72377 17.6746 3.625 17.4361 3.625 17.1875V6.5625C3.625 6.045 4.045 5.625 4.5625 5.625H6.125C6.54381 5.62472 6.96192 5.65928 7.375 5.72834M13.625 14.375H16.4375C16.4375 13.955 17.375 13.4375V9.375C17.375 5.65834 14.6725 2.57417 11.125 1.97834C10.7119 1.90928 10.2938 1.87472 9.875 1.875H8.3125C7.795 1.875 7.375 2.295 7.375 2.8125V5.72834M13.625 14.375H8.3125C8.06386 14.375 7.8254 14.2762 7.64959 14.1004C7.47377 13.9246 7.375 13.6861 7.375 13.4375V5.72834" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Select Floor Plans
                  <input ref={floorPlanInputRef} type="file" className="ip-file" accept="image/*" multiple onChange={handleFloorPlans} style={{ display: "none" }} />
                </label>
                <p className="file-name fw-5">or drag images here <br /><span>(Up to 5 floor plan images)</span></p>
              </div>
            </div>
            {floorPlanPreviews.length > 0 && (
              <div className="box-img-upload">
                {floorPlanPreviews.map((src, i) => (
                  <div key={i} className="item-upload file-delete">
                    <img alt="floor plan" src={src} style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 8 }} />
                    <span className="icon icon-trashcan1 remove-file" onClick={() => removeFloorPlan(i)} style={{ cursor: "pointer" }} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* File Attachments */}
          <div className="widget-box-2 mb-20">
            <h3 className="title">File Attachments</h3>
            <p style={{ fontSize: 13, color: "#888", marginBottom: 16 }}>Upload brochures, contracts or documents (up to 5 files). Accepted: PDF, DOC, DOCX.</p>
            <div style={{ marginBottom: 16 }}>
              <label className="tf-btn bg-color-primary pd-10 btn-upload" style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}>
                <svg width={18} height={18} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2v6h6M12 18v-6M9 15l3-3 3 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Attach Documents
                <input ref={attachmentInputRef} type="file" accept=".pdf,.doc,.docx" multiple onChange={handleAttachments} style={{ display: "none" }} />
              </label>
            </div>
            {attachments.length > 0 && (
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {attachments.map((file, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", background: "#f8f9fa", borderRadius: 8, marginBottom: 8, fontSize: 13 }}>
                    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="#eb6753" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14 2v6h6" stroke="#eb6753" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span style={{ flex: 1 }}>{file.name}</span>
                    <span style={{ color: "#888", fontSize: 11 }}>({(file.size / 1024).toFixed(0)} KB)</span>
                    <span onClick={() => removeAttachment(i)} style={{ cursor: "pointer", color: "#cc0000", fontWeight: 700, fontSize: 16, lineHeight: 1 }}>×</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 360 Virtual Tour */}
          <div className="widget-box-2 mb-20">
            <h3 className="title">360° Virtual Tour</h3>
            <fieldset className="box-fieldset">
              <label className="text-btn">Virtual Tour URL:</label>
              <input type="text" className="form-control" placeholder="e.g. https://my.matterport.com/show/?m=..." value={form.tourUrl} onChange={set("tourUrl")} />
              <small style={{ color: "#888", fontSize: 12 }}>Paste a Matterport, Kuula, or any iframe-compatible 360° tour link.</small>
            </fieldset>
          </div>

          {/* Additional Information */}
          <div className="widget-box-2 mb-20">
            <h3 className="title">Additional Information</h3>
            <div className="box grid-layout-3 gap-30">
              <fieldset className="box-fieldset">
                <label>Previous Occupancy:</label>
                <select className="form-control nice-select" value={form.previousOccupancy} onChange={set("previousOccupancy")}>
                  <option value="">Select…</option>
                  <option value="never-occupied">Never Occupied</option>
                  <option value="family">Family</option>
                  <option value="bachelor">Bachelor</option>
                  <option value="company">Company</option>
                </select>
              </fieldset>
              <fieldset className="box-fieldset">
                <label>Who Will Show Property:</label>
                <select className="form-control nice-select" value={form.whoWillShow} onChange={set("whoWillShow")}>
                  <option value="">Select…</option>
                  <option value="owner">Owner</option>
                  <option value="agent">Agent</option>
                  <option value="relative">Relative</option>
                  <option value="neighbor">Neighbor</option>
                </select>
              </fieldset>
              <fieldset className="box-fieldset">
                <label>Secondary Contact:</label>
                <input type="tel" className="form-control" placeholder="Alternate phone number" value={form.secondaryNumber} onChange={set("secondaryNumber")} />
              </fieldset>
            </div>
          </div>

          {/* Schedule */}
          <div className="widget-box-2 mb-20">
            <h3 className="title">Schedule / Availability</h3>
            <div className="box grid-layout-2 gap-30">
              <fieldset className="box-fieldset">
                <label>Availability Days:</label>
                <select className="form-control nice-select" value={form.availabilityDays} onChange={set("availabilityDays")}>
                  <option value="everyday">Everyday</option>
                  <option value="weekday">Weekdays only</option>
                  <option value="weekend">Weekends only</option>
                </select>
              </fieldset>
              <fieldset className="box-fieldset">
                <label>Preferred Showing Time:</label>
                <select className="form-control nice-select" value={form.showingTime} onChange={set("showingTime")}>
                  <option value="anytime">Any time</option>
                  <option value="morning">Morning (8am–12pm)</option>
                  <option value="afternoon">Afternoon (12pm–5pm)</option>
                  <option value="evening">Evening (5pm–9pm)</option>
                </select>
              </fieldset>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={{ background: "#fff0f0", border: "1px solid #ffb3b3", borderRadius: 8, padding: "12px 16px", marginBottom: 16, color: "#cc0000" }}>
              {error}
            </div>
          )}

          {/* Submit */}
          <div className="box-btn">
            <button type="submit" className="tf-btn bg-color-primary pd-13" disabled={loading}>
              {loading ? "Submitting…" : "Add Property"}
            </button>
          </div>
        </form>

        <div className="footer-dashboard">
          <p>Copyright © {new Date().getFullYear()} Globperty</p>
          <ul className="list">
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Terms</a></li>
            <li><a href="#">Support</a></li>
          </ul>
        </div>
      </div>
      <div className="overlay-dashboard" />
    </div>
  );
}

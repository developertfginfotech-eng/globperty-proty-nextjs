import VisaPage from "@/components/visas/VisaPage";

export const metadata = {
  title: "Turkey Citizenship by Investment — Property | Globperty",
  description: "Get Turkish citizenship through property investment from $400K. Fast processing, visa-free travel to 110+ countries. Full guide.",
};

const VISA = {
  name: "Turkey Citizenship by Investment",
  country: "Turkey",
  hero: {
    bgImage: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=1400&q=80",
  badge: "Turkey Citizenship by Investment",
    titleWhite: "Turkey Citizenship ",
    titleOrange: "by Investment",
    tagline: "Obtain full Turkish citizenship in as little as 3–6 months through property investment from $400,000. No residency requirement, dual citizenship allowed.",
    tags: ["$400K Minimum", "Full Citizenship", "3–6 Months", "Dual Citizenship", "No Residency Required"],
    stats: [
      { value: "$400K", label: "Min. Investment" },
      { value: "3–6 mo", label: "Processing" },
      { value: "110+", label: "Visa-Free Countries" },
      { value: "Full", label: "Citizenship" },
    ],
  primaryCta: { href: "/contact", label: "Speak to a Visa Expert"},
  secondaryCta: { href: "/visa-checker", label: "Check My Eligibility"},
  snapshotTitle: "Citizenship at a Glance",
    snapshot: [
      { key: "Min. Property Value", value: "$400,000",          color: "#f0822d" },
      { key: "Processing Time",     value: "3–6 Months",        color: "#16b286" },
      { key: "Residency Required",  value: "No",                color: "#f0822d" },
      { key: "Dual Citizenship",    value: "Allowed",           color: "#16b286" },
      { key: "Family Members",      value: "Spouse + Children", color: "#fff" },
      { key: "Visa-Free Travel",    value: "110+ Countries",    color: "#fff" },
    ],
  },
  overviewTitle: "Turkish Citizenship",
  overviewTitleOrange: "by Property Investment",
  overview: [
    "Turkey's Citizenship by Investment programme offers one of the fastest and most accessible routes to a second passport globally. Since 2018, the minimum property investment threshold has been $400,000 USD.",
    "Unlike most investment residency programmes, Turkey grants full citizenship — not just residency. The Turkish passport provides visa-free or visa-on-arrival access to 110+ countries including Japan, Singapore and most of Latin America.",
    "The entire process can be completed without relocating to Turkey. Applicants receive their Turkish passport typically within 3–6 months of submitting a complete application.",
  ],
  quickFacts: [
    { label: "Minimum Investment", value: "$400,000" },
    { label: "Processing Time", value: "3–6 Months" },
    { label: "Residency Required", value: "No" },
    { label: "Dual Citizenship", value: "Yes — Allowed" },
    { label: "Citizenship Valid", value: "Lifetime" },
    { label: "Visa-Free Countries", value: "110+" },
  ],
  requirements: [
    { icon: "🏠", title: "Property Value", desc: "Purchase residential or commercial property worth minimum $400,000 USD. Must be held for 3 years." },
    { icon: "📄", title: "Title Deed (TAPU)", desc: "Registered TAPU (title deed) from Turkish Land Registry with valuation certificate from licensed appraiser." },
    { icon: "🏦", title: "Bank Transfer Proof", desc: "Funds must be transferred to Turkey via bank wire. Currency exchange record from Turkish bank required." },
    { icon: "🪪", title: "Valid Passport", desc: "Passport valid for at least 6 months. No criminal record. Apostilled documents from home country." },
    { icon: "📑", title: "Birth Certificates", desc: "Original birth certificates for applicant and all family members, apostilled and translated to Turkish." },
    { icon: "📋", title: "TAPU + Annotation", desc: "Property title deed annotated with 3-year retention clause by Land Registry before application submission." },
  ],
  steps: [
    { title: "Select Property", desc: "Buy qualifying property ($400K+). Use a licensed RICS appraiser for official valuation certificate." },
    { title: "Transfer Funds", desc: "Wire funds from your foreign bank account to Turkey. Obtain currency exchange receipt from Turkish bank." },
    { title: "Apply for Residence Permit", desc: "Submit short-term residence permit application to obtain Turkish address for citizenship application." },
    { title: "Submit Citizenship Application", desc: "Lodge application at the Directorate General of Migration Management with full document package." },
    { title: "Passport Issued", desc: "Citizenship certificate and Turkish passport issued — typically 3–6 months from complete submission." },
  ],
  benefits: [
    "Full Turkish citizenship — not just residency — for the whole family",
    "No minimum stay or residency requirement at any stage",
    "Dual citizenship permitted — no need to renounce existing passport",
    "Visa-free or visa-on-arrival access to 110+ countries",
    "Strong rental market in Istanbul and coastal resort cities",
    "Low property prices compared to Europe with high appreciation potential",
    "Turkey's strategic location bridges Europe, Middle East and Central Asia",
    "Thriving expat community and English-speaking infrastructure in major cities",
  ],
};

export default function Page() {
  return <VisaPage visa={VISA} />;
}

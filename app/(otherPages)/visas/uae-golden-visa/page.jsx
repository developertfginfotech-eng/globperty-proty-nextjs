import VisaPage from "@/components/visas/VisaPage";

export const metadata = {
  title: "UAE Golden Visa — Property Investment | Globperty",
  description: "Get UAE Golden Visa through property investment from AED 2 million. 10-year renewable residency for investors, entrepreneurs and families.",
};

const VISA = {
  name: "UAE Golden Visa",
  country: "UAE",
  hero: {
    bgImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1400&q=80",
    badge: "🇦🇪 UAE Golden Visa",
    titleWhite: "UAE Golden ",
    titleOrange: "Visa",
    tagline: "Secure 10-year renewable UAE residency through property investment from AED 2 million. Live, work and thrive in one of the world's fastest-growing economies.",
    tags: ["AED 2M Minimum", "10-Year Residency", "Renewable", "Family Included", "No Sponsor Needed"],
    stats: [
      { value: "AED 2M", label: "Min. Investment" },
      { value: "10 Yrs", label: "Visa Validity" },
      { value: "4–8 wks", label: "Processing Time" },
      { value: "Family", label: "Included" },
    ],
    primaryCta: { href: "/contact", label: "📞 Speak to a Visa Expert" },
    secondaryCta: { href: "/visa-checker", label: "✅ Check My Eligibility" },
    snapshotTitle: "🇦🇪 Visa at a Glance",
    snapshot: [
      { key: "Min. Property Value", value: "AED 2,000,000", color: "#f0822d" },
      { key: "Visa Duration",       value: "10 Years (Renewable)", color: "#16b286" },
      { key: "Family Members",      value: "Spouse + Children", color: "#f0822d" },
      { key: "Processing Time",     value: "4–8 Weeks", color: "#16b286" },
      { key: "Remote Apply",        value: "Yes", color: "#fff" },
      { key: "Nationality Restrict",value: "None", color: "#fff" },
    ],
  },
  overviewTitle: "UAE Golden Visa",
  overviewTitleOrange: "by Property Investment",
  overview: [
    "The UAE Golden Visa is a long-term residency programme introduced in 2019, offering 5 or 10-year renewable visas to investors, entrepreneurs, skilled professionals and their families.",
    "To qualify through property investment, applicants must own real estate in the UAE worth at least AED 2 million (approximately USD 545,000). The property can be a single unit or combined portfolio value.",
    "Golden Visa holders enjoy full residency rights — the ability to live, work and study in the UAE without a national sponsor, plus extended stays outside the country without losing residency status.",
  ],
  quickFacts: [
    { label: "Minimum Investment", value: "AED 2M" },
    { label: "Visa Validity", value: "10 Years" },
    { label: "Processing Time", value: "4–8 Weeks" },
    { label: "Family Included", value: "Yes" },
    { label: "Sponsor Required", value: "No" },
    { label: "Path to Citizenship", value: "No" },
  ],
  requirements: [
    { icon: "🏠", title: "Property Value", desc: "Own UAE real estate worth minimum AED 2 million. Property can be off-plan if purchased from approved developers." },
    { icon: "📄", title: "Title Deed / SPA", desc: "Valid title deed or Sales & Purchase Agreement from Dubai Land Department or relevant Emirate authority." },
    { icon: "🪪", title: "Valid Passport", desc: "Passport valid for minimum 6 months. Clean criminal record certificate from home country required." },
    { icon: "💰", title: "No Mortgage Restriction", desc: "Mortgaged properties are eligible — outstanding mortgage balance must not exceed 50% of property value." },
    { icon: "🏥", title: "Medical Fitness", desc: "UAE health fitness test required (blood test + chest X-ray). Completed inside UAE upon entry." },
    { icon: "📋", title: "Emirates ID", desc: "Emirates ID application submitted alongside visa. Biometrics collected at approved typing centres." },
  ],
  steps: [
    { title: "Verify Eligibility", desc: "Confirm your property meets the AED 2M threshold. Consult a RERA-registered agent or Globperty advisor." },
    { title: "Prepare Documents", desc: "Gather title deed, passport copy, passport photos, and criminal clearance certificate from your home country." },
    { title: "Submit Application", desc: "Apply via UAE ICP portal or through an authorised typing centre in Dubai or your Emirate of residence." },
    { title: "Medical & Biometrics", desc: "Complete the medical fitness test and provide biometric data at an approved centre inside the UAE." },
    { title: "Emirates ID Issued", desc: "Emirates ID and Golden Visa residency stamp are issued — typically within 4–8 weeks from submission." },
  ],
  benefits: [
    "Live, work and study in the UAE without a national sponsor",
    "Bring spouse, children and domestic staff as dependents",
    "Spend extended time abroad without losing UAE residency",
    "Open UAE bank accounts and access financial services freely",
    "Access world-class healthcare and international schools",
    "Zero income tax and capital gains tax on property",
    "Dubai and Abu Dhabi ranked among the world's safest cities",
    "Strong rental yields — Dubai averages 6–9% gross annually",
  ],
};

export default function Page() {
  return <VisaPage visa={VISA} />;
}

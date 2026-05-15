import VisaPage from "@/components/visas/VisaPage";

export const metadata = {
  title: "Malaysia MM2H Visa — Long-Stay Visa for Property Owners | Globperty",
  description: "Malaysia My Second Home (MM2H) visa for long-term residency. Property owners and retirees welcome. Full MM2H programme guide.",
};

const VISA = {
  name: "Malaysia MM2H Visa",
  country: "Malaysia",
  hero: {
    bgImage: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1400&q=80",
    badge: "🇲🇾 Malaysia MM2H Visa",
    titleWhite: "Malaysia ",
    titleOrange: "MM2H Visa",
    tagline: "Malaysia's My Second Home (MM2H) programme offers a 5-year renewable long-stay visa for retirees, investors and property owners seeking an affordable Asian base.",
    tags: ["5-Year Visa", "Property Owners", "Retiree Friendly", "Low Cost of Living", "Asia Hub"],
    stats: [
      { value: "RM 1.5M", label: "Min. Bank Balance" },
      { value: "5 Yrs", label: "Visa Validity" },
      { value: "Renewable", label: "Indefinitely" },
      { value: "Asia", label: "Strategic Base" },
    ],
    primaryCta: { href: "/contact", label: "📞 Speak to a Visa Expert" },
    secondaryCta: { href: "/visa-checker", label: "✅ Check My Eligibility" },
    snapshotTitle: "🇲🇾 MM2H at a Glance",
    snapshot: [
      { key: "Min. Bank Balance",   value: "RM 1,500,000 (≈$320K)",  color: "#f0822d" },
      { key: "Fixed Deposit",       value: "RM 1,000,000",            color: "#16b286" },
      { key: "Visa Duration",       value: "5 Years (Renewable)",     color: "#f0822d" },
      { key: "Min. Offshore Income",value: "RM 40,000/month",         color: "#16b286" },
      { key: "Property Purchase",   value: "Allowed",                 color: "#fff" },
      { key: "Processing Time",     value: "3–6 Months",              color: "#fff" },
    ],
  },
  overviewTitle: "Malaysia MM2H",
  overviewTitleOrange: "My Second Home Programme",
  overview: [
    "Malaysia's My Second Home (MM2H) programme is a long-term social visit pass designed for financially self-sufficient foreigners who want to live in Malaysia for extended periods. The programme was revamped in 2021 and relaunched with updated criteria.",
    "To qualify, applicants must demonstrate liquid assets of at least RM 1.5 million and offshore monthly income of RM 40,000. A fixed deposit of RM 1 million must be placed in a Malaysian bank, with 50% withdrawable after one year for approved expenses.",
    "MM2H holders can purchase property in Malaysia (subject to state-level minimums), bring dependents, own a car locally, and re-enter Malaysia multiple times. The visa is renewable every 5 years with no limit on the number of renewals.",
  ],
  quickFacts: [
    { label: "Liquid Assets", value: "RM 1.5M (≈$320K)" },
    { label: "Fixed Deposit", value: "RM 1,000,000" },
    { label: "Monthly Offshore Income", value: "RM 40,000" },
    { label: "Visa Duration", value: "5 Years" },
    { label: "Renewable", value: "Indefinitely" },
    { label: "Property Purchase", value: "Allowed" },
  ],
  requirements: [
    { icon: "💰", title: "Liquid Assets", desc: "Minimum RM 1.5 million in liquid assets (cash, fixed deposits, unit trusts, stocks) outside of property." },
    { icon: "🏦", title: "Fixed Deposit", desc: "Place RM 1,000,000 in a licensed Malaysian bank. After year 1, withdraw up to 50% for approved expenses." },
    { icon: "💼", title: "Offshore Income", desc: "Prove monthly offshore income (salary, pension, dividends) of at least RM 40,000." },
    { icon: "🪪", title: "Valid Passport", desc: "Passport with minimum 18 months validity. Clean criminal record from country of origin required." },
    { icon: "🏥", title: "Health Insurance", desc: "Valid medical insurance covering Malaysia with minimum RM 100,000 hospitalisation coverage." },
    { icon: "📋", title: "MM2H Agent Application", desc: "Application must be submitted through a licensed MM2H agent. Processing by Immigration Department." },
  ],
  steps: [
    { title: "Engage Licensed MM2H Agent", desc: "Applications must go through an approved MM2H agent. Globperty can connect you with licensed agents." },
    { title: "Prepare Financial Documents", desc: "Compile bank statements, income proof, fixed deposit evidence and insurance certificate." },
    { title: "Submit Application", desc: "Agent submits your application to the MM2H Centre at the Immigration Department of Malaysia." },
    { title: "Approval Letter Received", desc: "Conditional approval letter issued — typically 3–6 months. Fixed deposit opened within 6 months of approval." },
    { title: "Visa Stamped & Activated", desc: "Present to Malaysian immigration for 5-year MM2H visa stamp. Bring family members as dependents." },
  ],
  benefits: [
    "5-year multi-entry visa renewable indefinitely with no age restriction",
    "Purchase property in Malaysia subject to state-level minimum price thresholds",
    "Extremely low cost of living — world-class healthcare at fraction of Western cost",
    "Bring spouse, children under 21, and parents as dependents",
    "Own and drive a locally-purchased car — imported duty exemption for one car",
    "Kuala Lumpur ranked among Asia's best cities for expat living",
    "No capital gains tax on property in Malaysia",
    "English widely spoken — seamless for international residents",
  ],
};

export default function Page() {
  return <VisaPage visa={VISA} />;
}

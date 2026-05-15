import VisaPage from "@/components/visas/VisaPage";

export const metadata = {
  title: "Latvia Residency by Investment — Property | Globperty",
  description: "Latvia residency by investment from €250K property. EU and Schengen access, fast processing. Full Latvia residency guide.",
};

const VISA = {
  name: "Latvia Residency by Investment",
  country: "Latvia",
  hero: {
    bgImage: "https://images.unsplash.com/photo-1562629648-cf9b4ac0d580?w=1400&q=80",
    badge: "🇱🇻 Latvia Residency by Investment",
    titleWhite: "Latvia Residency ",
    titleOrange: "by Investment",
    tagline: "One of Europe's most affordable EU residency routes. Obtain Latvian residency through property investment from €250,000 with Schengen zone access.",
    tags: ["€250K Minimum", "EU Country", "Schengen Access", "5-Year Permit", "Affordable Route"],
    stats: [
      { value: "€250K", label: "Min. Investment" },
      { value: "5 Yrs", label: "Permit Duration" },
      { value: "EU", label: "Member State" },
      { value: "Schengen", label: "Access" },
    ],
    primaryCta: { href: "/contact", label: "📞 Speak to a Visa Expert" },
    secondaryCta: { href: "/visa-checker", label: "✅ Check My Eligibility" },
    snapshotTitle: "🇱🇻 Residency at a Glance",
    snapshot: [
      { key: "Min. Property Value",   value: "€250,000",           color: "#f0822d" },
      { key: "State Duty",            value: "5% of property value", color: "#16b286" },
      { key: "Permit Duration",       value: "5 Years",             color: "#f0822d" },
      { key: "Processing Time",       value: "30–60 Days",          color: "#16b286" },
      { key: "Schengen Access",       value: "Yes — 26 Countries",  color: "#fff" },
      { key: "EU Citizenship Path",   value: "After 5 Years (PR)",  color: "#fff" },
    ],
  },
  overviewTitle: "Latvia Residency",
  overviewTitleOrange: "by Property Investment",
  overview: [
    "Latvia's residency by investment programme is one of the most cost-effective routes to EU and Schengen residency available globally. Non-EU nationals can obtain a 5-year temporary residency permit through qualifying property investment.",
    "The minimum property investment threshold is €250,000 in Riga or other major urban areas. A 5% state duty on the investment amount is payable, plus standard legal and registration costs. The property must be held for the duration of the permit.",
    "Latvia is an EU member and Schengen signatory, offering free movement across 26 European countries. Riga, the Baltic capital, is a UNESCO-listed city with a growing technology sector and affordable cost of living.",
  ],
  quickFacts: [
    { label: "Minimum Investment", value: "€250,000" },
    { label: "State Duty", value: "5% of investment" },
    { label: "Permit Duration", value: "5 Years" },
    { label: "Processing Time", value: "30–60 Days" },
    { label: "Schengen Access", value: "Yes" },
    { label: "Permanent Residency", value: "After 5 Years" },
  ],
  requirements: [
    { icon: "🏠", title: "Property Purchase", desc: "Purchase residential or commercial real estate in Latvia worth minimum €250,000. One or multiple properties allowed." },
    { icon: "💰", title: "State Duty", desc: "5% state duty on property purchase price payable to the Latvian government. Non-refundable." },
    { icon: "🪪", title: "Clean Criminal Record", desc: "Criminal record certificate from home country and all countries of residence, apostilled and translated." },
    { icon: "💼", title: "Stable Income", desc: "Evidence of stable regular income sufficient to support yourself and dependents while residing in Latvia." },
    { icon: "🏥", title: "Health Insurance", desc: "Valid health insurance covering Latvia with minimum €30,000 coverage per person." },
    { icon: "📋", title: "OCMA Application", desc: "Application submitted to the Office of Citizenship and Migration Affairs (OCMA) with full document set." },
  ],
  steps: [
    { title: "Purchase Property", desc: "Buy qualifying property (€250K+). Register title with Latvian Land Register." },
    { title: "Prepare Documents", desc: "Gather criminal records, income proof, health insurance and passport copies. Apostille and translate as required." },
    { title: "Pay State Duty", desc: "Pay 5% state duty on property value to the Latvian state budget before application submission." },
    { title: "Submit to OCMA", desc: "Submit temporary residency application to the Office of Citizenship and Migration Affairs (OCMA)." },
    { title: "Permit Issued", desc: "5-year residency permit issued in 30–60 days. Renew for further periods or apply for permanent residency after 5 years." },
  ],
  benefits: [
    "One of Europe's most affordable EU residency programmes at €250K",
    "Full Schengen zone access — 26 countries without border checks",
    "Path to EU permanent residency and Latvian citizenship after 5 years",
    "Riga — a UNESCO World Heritage listed capital with low property prices",
    "Growing tech and startup ecosystem in Latvia",
    "Low cost of living compared to Western European capitals",
    "English widely spoken in business and professional circles",
    "Stable Baltic economy within the Eurozone",
  ],
};

export default function Page() {
  return <VisaPage visa={VISA} />;
}

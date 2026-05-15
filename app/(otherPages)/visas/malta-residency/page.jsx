import VisaPage from "@/components/visas/VisaPage";

export const metadata = {
  title: "Malta Residency Programme — Investment Residency | Globperty",
  description: "Obtain Malta permanent residency through property investment from €375K. EU country, Schengen access, tax-efficient base.",
};

const VISA = {
  name: "Malta Residency Programme",
  country: "Malta",
  hero: {
    bgImage: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1400&q=80",
    badge: "🇲🇹 Malta Permanent Residency",
    titleWhite: "Malta Permanent ",
    titleOrange: "Residency",
    tagline: "Establish permanent residency in Malta — an EU island nation with Schengen access, low taxes and a world-renowned quality of life. Investment from €375,000.",
    tags: ["€375K Property", "EU Country", "Schengen Access", "Permanent Residency", "Tax Efficient"],
    stats: [
      { value: "€375K", label: "Min. Property" },
      { value: "4–6 mo", label: "Processing" },
      { value: "Perm.", label: "Residency" },
      { value: "Schengen", label: "Access" },
    ],
    primaryCta: { href: "/contact", label: "📞 Speak to a Visa Expert" },
    secondaryCta: { href: "/visa-checker", label: "✅ Check My Eligibility" },
    snapshotTitle: "🇲🇹 Residency at a Glance",
    snapshot: [
      { key: "Min. Property Value",  value: "€375,000 (purchase)",  color: "#f0822d" },
      { key: "Rental Alternative",   value: "€14,000/year",         color: "#16b286" },
      { key: "Gov. Contribution",    value: "€28,000–€58,000",      color: "#f0822d" },
      { key: "Processing Time",      value: "4–6 Months",           color: "#16b286" },
      { key: "Schengen Access",      value: "Yes — 26 Countries",   color: "#fff" },
      { key: "Family Members",       value: "Spouse + Dependents",  color: "#fff" },
    ],
  },
  overviewTitle: "Malta Residency",
  overviewTitleOrange: "Programme (MPRP)",
  overview: [
    "The Malta Permanent Residency Programme (MPRP) is administered by Residency Malta Agency and grants lifetime residency to non-EU investors and their families through a combination of property purchase and government contribution.",
    "Applicants must either purchase property worth at least €375,000 in Malta or €300,000 in Gozo/South Malta, or rent at a minimum of €14,000 per year. A non-refundable government contribution of €28,000–€58,000 is also required.",
    "Malta is the EU's smallest member state — strategically located between Europe and North Africa, with English as an official language and one of the Mediterranean's most stable economies.",
  ],
  quickFacts: [
    { label: "Min. Property (Purchase)", value: "€375,000" },
    { label: "Min. Rental Option", value: "€14,000/year" },
    { label: "Government Fee", value: "€28,000–€58,000" },
    { label: "Processing Time", value: "4–6 Months" },
    { label: "Residency Type", value: "Permanent" },
    { label: "Citizenship Path", value: "Separate programme" },
  ],
  requirements: [
    { icon: "🏠", title: "Property Commitment", desc: "Purchase €375K+ property in Malta (€300K in Gozo/South Malta) OR rent at minimum €14,000/year for 5 years." },
    { icon: "💰", title: "Government Contribution", desc: "€28,000 if purchasing property; €58,000 if renting. Paid to Residency Malta — non-refundable." },
    { icon: "🎨", title: "Charitable Donation", desc: "€2,000 charitable donation to a Maltese NGO registered with the Commissioner for Voluntary Organisations." },
    { icon: "🪪", title: "Clean Criminal Record", desc: "Criminal record certificates from all countries of residence in the past 10 years, apostilled and translated." },
    { icon: "🏥", title: "Health Insurance", desc: "Comprehensive health insurance covering Malta with minimum €30,000 coverage for all family members." },
    { icon: "💼", title: "Financial Resources", desc: "Demonstrate €500,000 in capital of which €150,000 must be financial assets (stocks, bonds, savings)." },
  ],
  steps: [
    { title: "Engage Licensed Agent", desc: "Appoint a Residency Malta-accredited agent. They prepare your application pack and liaise with authorities." },
    { title: "Select Property", desc: "Choose qualifying property to purchase or rent. Sign SPA or tenancy agreement as part of application." },
    { title: "Submit Application", desc: "Agent submits full application to Residency Malta Agency. Application fee of €10,000 paid on submission." },
    { title: "Due Diligence Review", desc: "Residency Malta conducts 4-tier due diligence check (~4–6 months). Approval letter issued on success." },
    { title: "Pay Fees & Collect Cards", desc: "Pay government contribution and charitable donation. Residency cards issued for all family members." },
  ],
  benefits: [
    "Permanent EU residency — valid for life with no minimum stay requirements",
    "Schengen zone access — travel freely across 26 European countries",
    "English as an official language — seamless integration for expats",
    "Low flat-rate tax for residents on overseas income (15% minimum)",
    "No wealth tax, inheritance tax or estate duty in Malta",
    "Excellent private healthcare and international school system",
    "Safe, stable island nation with very low crime rate",
    "Strong demand for property — Valletta is EU's smallest and most vibrant capital",
  ],
};

export default function Page() {
  return <VisaPage visa={VISA} />;
}

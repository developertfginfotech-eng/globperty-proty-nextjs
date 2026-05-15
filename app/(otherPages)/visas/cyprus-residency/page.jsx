import VisaPage from "@/components/visas/VisaPage";

export const metadata = {
  title: "Cyprus Permanent Residency — Property Investment | Globperty",
  description: "Obtain Cyprus permanent residency through property investment from €300K. EU country, fast processing, family included.",
};

const VISA = {
  name: "Cyprus Permanent Residency",
  country: "Cyprus",
  hero: {
    bgImage: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=1400&q=80",
    badge: "🇨🇾 Cyprus Permanent Residency",
    titleWhite: "Cyprus Permanent ",
    titleOrange: "Residency",
    tagline: "Secure permanent residency in an EU island nation through property investment from €300,000. Fast 2-month processing with no annual stay requirement.",
    tags: ["€300K Minimum", "EU Country", "Permanent Residency", "2-Month Processing", "Family Included"],
    stats: [
      { value: "€300K", label: "Min. Investment" },
      { value: "2 mo", label: "Processing" },
      { value: "Perm.", label: "Residency" },
      { value: "EU", label: "Member State" },
    ],
    primaryCta: { href: "/contact", label: "📞 Speak to a Visa Expert" },
    secondaryCta: { href: "/visa-checker", label: "✅ Check My Eligibility" },
    snapshotTitle: "🇨🇾 Residency at a Glance",
    snapshot: [
      { key: "Min. Property Value", value: "€300,000 + VAT",      color: "#f0822d" },
      { key: "Residency Type",      value: "Permanent",            color: "#16b286" },
      { key: "Processing Time",     value: "~2 Months",            color: "#f0822d" },
      { key: "Min. Annual Stay",    value: "1 Visit every 2 Yrs",  color: "#16b286" },
      { key: "Family Members",      value: "Spouse + Children",    color: "#fff" },
      { key: "EU Citizenship Path", value: "After 7 Years",        color: "#fff" },
    ],
  },
  overviewTitle: "Cyprus Permanent Residency",
  overviewTitleOrange: "by Property Investment",
  overview: [
    "Cyprus offers one of Europe's most straightforward permanent residency programmes for non-EU nationals. The Category F investor programme grants permanent residency in exchange for qualifying property purchases from €300,000 (plus VAT).",
    "Unlike Golden Visa programmes in other countries, Cyprus permanent residency is issued indefinitely — it doesn't expire and doesn't require annual renewal. Holders simply need to visit Cyprus at least once every two years.",
    "Cyprus is a full EU member state, offering a Mediterranean lifestyle, English as a widely spoken second language, a favourable tax regime, and strong property demand in Limassol, Nicosia, Paphos and Larnaca.",
  ],
  quickFacts: [
    { label: "Minimum Investment", value: "€300K + VAT" },
    { label: "Residency Type", value: "Permanent" },
    { label: "Processing Time", value: "~2 Months" },
    { label: "Min. Stay", value: "1 visit / 2 years" },
    { label: "Citizenship Path", value: "After 7 Years" },
    { label: "Family Included", value: "Yes" },
  ],
  requirements: [
    { icon: "🏠", title: "Property Purchase", desc: "Purchase new residential property from a developer worth minimum €300,000 + VAT. Must be new — resale properties require higher amounts." },
    { icon: "💰", title: "Stable Annual Income", desc: "Demonstrate annual income of minimum €30,000 from abroad (salary, pension, dividends). Add €5,000 per dependent." },
    { icon: "🪪", title: "Clean Criminal Record", desc: "Criminal record certificate from country of residence, apostilled. Both applicant and spouse required." },
    { icon: "🏦", title: "Proof of Funds", desc: "Bank statements showing funds held abroad. Funds must originate outside Cyprus." },
    { icon: "🏥", title: "Health Insurance", desc: "Valid health insurance policy covering Cyprus. GESY (public health scheme) membership available after residency." },
    { icon: "📋", title: "Civil Registry Application", desc: "Application submitted to Civil Registry and Migration Department. Biometrics collected in Cyprus." },
  ],
  steps: [
    { title: "Choose Property", desc: "Select qualifying new-build property (€300K+ VAT) with a reputable developer in Limassol, Paphos or elsewhere." },
    { title: "Prove Stable Income", desc: "Prepare 3 years of tax returns, employment letters or dividend certificates showing €30,000+ annual overseas income." },
    { title: "Open Cyprus Bank Account", desc: "Open a Cyprus bank account and transfer 30% of property value as deposit before application submission." },
    { title: "Submit Application", desc: "Lodge application with the Civil Registry and Migration Department with complete document package." },
    { title: "Residency Cards Issued", desc: "Permanent residency card issued in approximately 2 months. Valid indefinitely — renew with a Cyprus visit every 2 years." },
  ],
  benefits: [
    "Permanent residency — never expires, no annual renewal required",
    "EU member state with full Schengen access for travel",
    "Only one visit to Cyprus every two years to maintain status",
    "English widely spoken — smooth transition for British and Commonwealth nationals",
    "Flat 12.5% corporate tax rate — one of Europe's lowest",
    "No inheritance tax and no wealth tax in Cyprus",
    "Path to full EU citizenship after 7 years of residency",
    "Mediterranean climate, excellent schools and healthcare",
  ],
};

export default function Page() {
  return <VisaPage visa={VISA} />;
}

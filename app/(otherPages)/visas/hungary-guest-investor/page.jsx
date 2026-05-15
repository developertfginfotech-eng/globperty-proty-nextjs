import VisaPage from "@/components/visas/VisaPage";

export const metadata = {
  title: "Hungary Guest Investor Visa — New 2024 Programme | Globperty",
  description: "Hungary Guest Investor Visa from €500K property investment. New 2024 programme offering 10-year renewable EU residency. Full guide.",
};

const VISA = {
  name: "Hungary Guest Investor Visa",
  country: "Hungary",
  hero: {
    bgImage: "https://images.unsplash.com/photo-1565881606991-789a8dff9ddd?w=1400&q=80",
    badge: "🇭🇺 Hungary Guest Investor Visa",
    titleWhite: "Hungary Guest ",
    titleOrange: "Investor Visa",
    tagline: "New 2024 programme. Obtain 10-year EU residency in Hungary through property or fund investment from €500,000. Schengen access with minimal stay requirements.",
    tags: ["€500K Investment", "New 2024", "10-Year Residency", "EU Country", "Schengen Access"],
    stats: [
      { value: "€500K", label: "Min. Investment" },
      { value: "10 Yrs", label: "Visa Validity" },
      { value: "2024", label: "Programme Launch" },
      { value: "Schengen", label: "Access" },
    ],
    primaryCta: { href: "/contact", label: "📞 Speak to a Visa Expert" },
    secondaryCta: { href: "/visa-checker", label: "✅ Check My Eligibility" },
    snapshotTitle: "🇭🇺 Visa at a Glance",
    snapshot: [
      { key: "Min. Property Value",  value: "€500,000",            color: "#f0822d" },
      { key: "Fund Option",          value: "€250,000 (fund)",     color: "#16b286" },
      { key: "Visa Validity",        value: "10 Years",            color: "#f0822d" },
      { key: "Renewable",            value: "Yes",                 color: "#16b286" },
      { key: "Schengen Access",      value: "Yes — 26 Countries",  color: "#fff" },
      { key: "Min. Stay",            value: "No Requirement",      color: "#fff" },
    ],
  },
  overviewTitle: "Hungary Guest",
  overviewTitleOrange: "Investor Visa 2024",
  overview: [
    "Hungary launched its Guest Investor Visa programme in 2024, positioning itself as a competitive new entrant in the EU residency-by-investment market. The programme offers a 10-year renewable residency permit to qualifying investors.",
    "There are two main investment routes: direct residential property purchase (€500,000 minimum) or an approved real estate investment fund (€250,000 minimum). The fund route is often preferred for investors seeking lower capital deployment.",
    "Hungary is an EU and Schengen member, offering visa-free travel across 26 European countries. Budapest, the capital, is widely regarded as one of Europe's most dynamic and affordable cities for property investment.",
  ],
  quickFacts: [
    { label: "Property Investment", value: "€500,000 min." },
    { label: "Fund Investment", value: "€250,000 min." },
    { label: "Visa Validity", value: "10 Years" },
    { label: "Renewable", value: "Yes" },
    { label: "Min. Stay", value: "None Specified" },
    { label: "Schengen Access", value: "Yes" },
  ],
  requirements: [
    { icon: "🏠", title: "Property or Fund", desc: "Purchase residential property worth €500K+ in Hungary, OR invest €250K+ into a licensed real estate fund." },
    { icon: "🪪", title: "Valid Passport", desc: "Passport valid for minimum 12 months beyond the visa application date. Clean criminal record." },
    { icon: "💰", title: "Proof of Funds", desc: "Bank statements and evidence that investment funds originate from legitimate, declared sources." },
    { icon: "🏥", title: "Health Insurance", desc: "Full health insurance coverage valid in Hungary required for initial application." },
    { icon: "📋", title: "Hungarian NIF", desc: "Hungarian tax identification number required. Can be obtained via an authorised tax representative." },
    { icon: "🏦", title: "Investment Proof", desc: "Notarised purchase contract or fund subscription agreement with payment receipts." },
  ],
  steps: [
    { title: "Consult Advisor", desc: "Engage a licensed Hungarian immigration lawyer or Globperty partner advisor to confirm eligibility." },
    { title: "Select Investment", desc: "Choose between direct property purchase (€500K) or approved investment fund (€250K)." },
    { title: "Complete Investment", desc: "Finalise purchase or fund subscription. Obtain notarised contracts and payment confirmation." },
    { title: "Submit Visa Application", desc: "Submit Guest Investor Visa application to the Hungarian consulate or National Directorate-General for Aliens Policing." },
    { title: "Residency Permit Issued", desc: "10-year residency permit issued upon approval. Renewable for further 10-year periods." },
  ],
  benefits: [
    "10-year renewable residency in an EU Schengen member state",
    "No mandatory minimum stay requirement",
    "Schengen zone travel — 26 countries without border checks",
    "Budapest ranked among Europe's top cities for quality of life and investment",
    "Lower property prices than Western European capitals with strong appreciation trend",
    "Hungary's flat 15% income tax rate — among EU's lowest",
    "Excellent private schools, healthcare and expat infrastructure in Budapest",
    "Central European location — 2-hour flight radius to major European cities",
  ],
};

export default function Page() {
  return <VisaPage visa={VISA} />;
}

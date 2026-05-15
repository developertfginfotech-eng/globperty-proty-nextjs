import VisaPage from "@/components/visas/VisaPage";

export const metadata = {
  title: "Portugal Golden Visa — Investment Residency | Globperty",
  description: "Get Portuguese residency through investment from €500K. Schengen access, path to citizenship in 5 years. Portugal Golden Visa guide.",
};

const VISA = {
  name: "Portugal Golden Visa",
  country: "Portugal",
  hero: {
    bgImage: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1400&q=80",
    badge: "🇵🇹 Portugal Golden Visa",
    titleWhite: "Portugal Golden ",
    titleOrange: "Visa",
    tagline: "Obtain Portuguese residency through investment. Schengen zone access, minimal stay requirements and a clear path to EU citizenship in 5 years.",
    tags: ["€500K Investment", "Schengen Access", "Path to Citizenship", "Minimal Stay", "EU Residency"],
    stats: [
      { value: "€500K", label: "Min. Investment" },
      { value: "2 Yrs", label: "Initial Visa" },
      { value: "7 Days/yr", label: "Min. Stay" },
      { value: "5 Yrs", label: "To Citizenship" },
    ],
    primaryCta: { href: "/contact", label: "📞 Speak to a Visa Expert" },
    secondaryCta: { href: "/visa-checker", label: "✅ Check My Eligibility" },
    snapshotTitle: "🇵🇹 Visa at a Glance",
    snapshot: [
      { key: "Min. Investment",    value: "€500,000",         color: "#f0822d" },
      { key: "Initial Validity",   value: "2 Years",          color: "#16b286" },
      { key: "Min. Stay/Year",     value: "7 Days (avg)",     color: "#f0822d" },
      { key: "Path to Passport",   value: "5 Years",          color: "#16b286" },
      { key: "Schengen Access",    value: "Yes — 26 Countries", color: "#fff" },
      { key: "Real Estate Option", value: "Non-Lisbon/Porto", color: "#fff" },
    ],
  },
  overviewTitle: "Portugal Golden Visa",
  overviewTitleOrange: "— EU Residency by Investment",
  overview: [
    "Portugal's Golden Visa (ARI — Autorização de Residência para Atividade de Investimento) is one of Europe's most popular investment residency programmes, open to non-EU nationals since 2012.",
    "Following 2023 reforms, direct residential property purchase in Lisbon, Porto and coastal areas no longer qualifies. Eligible property investments now focus on inland regions, Azores and Madeira — or alternatives like investment funds and job creation.",
    "Golden Visa holders need only spend 7 days per year in Portugal to maintain residency. After 5 years, applicants can apply for permanent residency or Portuguese citizenship — granting full EU passport rights.",
  ],
  quickFacts: [
    { label: "Minimum Investment", value: "€500K (fund/inland)" },
    { label: "Initial Validity", value: "2 Years" },
    { label: "Renewal", value: "Every 2 Years" },
    { label: "Min. Stay / Year", value: "7 Days (avg)" },
    { label: "Citizenship Eligible", value: "After 5 Years" },
    { label: "Family Included", value: "Yes" },
  ],
  requirements: [
    { icon: "💶", title: "Investment Amount", desc: "€500K in approved investment funds, €250K in cultural preservation, or real estate in qualifying interior regions." },
    { icon: "🪪", title: "Clean Criminal Record", desc: "Criminal record certificate from your country of residence for the past 12 months, apostilled and translated." },
    { icon: "💼", title: "Source of Funds", desc: "Bank statements or proof of funds showing investment capital originates from legitimate sources." },
    { icon: "🏥", title: "Health Insurance", desc: "Valid health insurance covering Portugal — EU or international policy accepted." },
    { icon: "🏦", title: "Portuguese Bank Account", desc: "NIF tax number and Portuguese bank account required before submitting AIMA application." },
    { icon: "📋", title: "AIMA Application", desc: "Application submitted online via AIMA portal (formerly SEF). Biometrics appointment in Portugal required." },
  ],
  steps: [
    { title: "Get NIF & Bank Account", desc: "Obtain Portuguese tax number (NIF) and open a local bank account — can be done remotely via a lawyer." },
    { title: "Select Investment", desc: "Choose qualifying investment: inland property, approved fund, or cultural donation. Sign agreements." },
    { title: "Submit AIMA Application", desc: "Submit online application via AIMA portal with all documents. Pay government fees (~€5,000–€6,000)." },
    { title: "Biometrics in Portugal", desc: "Attend biometrics appointment at AIMA office in Portugal. Schedule well in advance — waitlists can be long." },
    { title: "Residency Card Issued", desc: "Initial 2-year residency card issued. Renew every 2 years. Apply for citizenship after 5 years." },
  ],
  benefits: [
    "Live, work and study in Portugal and the entire European Union",
    "Travel visa-free to all 26 Schengen countries",
    "Only 7 days per year minimum stay required to maintain residency",
    "Apply for Portuguese passport after 5 years — visa-free to 190+ countries",
    "Bring spouse, children and dependent parents as family members",
    "Access to Portuguese public healthcare and education system",
    "Low property prices compared to Western Europe — strong rental demand",
    "Non-Habitual Resident (NHR) tax regime for favourable income treatment",
  ],
};

export default function Page() {
  return <VisaPage visa={VISA} />;
}

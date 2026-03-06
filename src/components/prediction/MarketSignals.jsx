import SectionTitle from "../layout/SectionTitle";

const SIGNALS = [
  { icon: "🌤", label: "Weather", title: "Deficit Rain", detail: "2mm · -40% normal", stats: ["2mm", "28°C", "62% RH"], rgb: "27,107,53" },
  { icon: "📦", label: "Arrivals", title: "Low Supply", detail: "2,840MT · -18% avg", stats: ["2,840MT", "-18%", "FAQ 68%"], rgb: "184,120,10" },
  { icon: "📰", label: "News Sentiment", title: "😊 Bullish", detail: "MSP up · Export OK", stats: ["Positive", "14 news", "0.78"], rgb: "27,107,53" },
];

export default function MarketSignals() {
  return (
    <div>
      <SectionTitle>Market Signals</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 11 }}>
        {SIGNALS.map(s => (
          <div key={s.label} style={{
            background: `rgba(${s.rgb},0.05)`,
            border: `1px solid rgba(${s.rgb},0.15)`,
            borderRadius: 14, padding: "14px 16px",
          }}>
            <div style={{
              fontSize: 12, color: `rgba(${s.rgb},0.65)`, fontWeight: 700,
              textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 5
            }}>
              {s.icon} {s.label}
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: `rgb(${s.rgb})`, marginBottom: 4 }}>{s.title}</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#5C7A5C", marginBottom: 7, lineHeight: 1.4 }}>{s.detail}</div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              {s.stats.map(st => (
                <div key={st} style={{
                  background: `rgba(${s.rgb},0.08)`, borderRadius: 5,
                  padding: "2px 7px", fontSize: 12, color: `rgb(${s.rgb})`, fontWeight: 700
                }}>{st}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
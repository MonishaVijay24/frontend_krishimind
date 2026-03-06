import { useState } from "react";
import { G, cardStyle } from "../styles/theme";
import { NEWS_ITEMS } from "../data/newsData";
import { ALL_CROPS } from "../data/crops";

const IMPACT_COL = { positive:G.green, negative:"#C0392B", neutral:"#B8780A" };
const IMPACT_BG  = { positive:"rgba(27,107,53,0.08)", negative:"rgba(192,57,43,0.08)", neutral:"rgba(184,120,10,0.08)" };

export default function NewsTab({ activeCrop }) {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all"
    ? NEWS_ITEMS
    : NEWS_ITEMS.filter(n => n.impact === filter || n.crop === activeCrop.id);

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>

      {/* Filter bar */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
        flexWrap:"wrap", gap:10 }}>
        <div style={{ display:"flex", alignItems:"center", gap:7 }}>
          <div style={{ width:3, height:14, borderRadius:2, background:G.green }} />
          <span style={{ fontSize:10, letterSpacing:"0.16em", textTransform:"uppercase",
            color:G.green, fontWeight:700 }}>Agri News &amp; Market Updates</span>
        </div>
        <div style={{ display:"flex", gap:7 }}>
          {[
            { id:"all",      l:"All News"     },
            { id:"positive", l:"😊 Positive"  },
            { id:"negative", l:"😟 Negative"  },
          ].map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)} style={{
              background: filter === f.id
                ? `linear-gradient(135deg,${G.deep},${G.green})` : "#F1F8F1",
              border: filter === f.id ? "none" : `1px solid ${G.bdr}`,
              borderRadius:20, padding:"5px 14px", cursor:"pointer",
              color: filter === f.id ? "#fff" : G.text,
              fontFamily:"'Mukta',sans-serif", fontSize:11,
              fontWeight: filter === f.id ? 700 : 400, transition:"all 0.15s",
            }}>{f.l}</button>
          ))}
        </div>
      </div>

      {/* News grid */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        {filtered.map(n => {
          const c = ALL_CROPS.find(x => x.id === n.crop);
          return (
            <div key={n.id} style={{ ...cardStyle({ padding:"16px 18px",
              position:"relative", overflow:"hidden" }) }}>
              <div style={{ position:"absolute", top:0, left:0, bottom:0, width:3,
                background: IMPACT_COL[n.impact] || G.muted }} />
              <div style={{ display:"flex", gap:8, alignItems:"flex-start", marginBottom:9 }}>
                <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                  <span style={{ fontSize:10, fontWeight:700,
                    background: IMPACT_BG[n.impact], color: IMPACT_COL[n.impact],
                    borderRadius:20, padding:"2px 9px" }}>{n.tag}</span>
                  <span style={{ fontSize:10, color:G.muted }}>{n.date}</span>
                </div>
                {c && (
                  <div style={{ marginLeft:"auto", fontSize:10, background:G.light,
                    border:`1px solid ${G.bdr}`, borderRadius:20, padding:"2px 8px",
                    color:G.green, fontWeight:600, whiteSpace:"nowrap" }}>
                    {c.emoji} {c.label}
                  </div>
                )}
              </div>
              <div style={{ fontSize:13, fontWeight:700, color:G.text,
                marginBottom:8, lineHeight:1.4 }}>{n.title}</div>
              <div style={{ fontSize:11, color:G.muted, lineHeight:1.6 }}>{n.body}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
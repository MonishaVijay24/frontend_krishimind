import { useState, useEffect } from "react";
import { G, cardStyle } from "../styles/theme";
import { getCropData } from "../data/cropData";
import { getOrderedMandis } from "../data/mandis";
import { generateForecast, generateMandiBarData } from "../utils/forecastGenerator";
import QuickPredict   from "../components/prediction/QuickPredict";
import PriceSummary   from "../components/prediction/PriceSummary";
import MandiComparison from "../components/prediction/MandiComparison";
import MarketSignals  from "../components/prediction/MarketSignals";
import SectionTitle   from "../components/layout/SectionTitle";
import PriceTrendChart from "../components/charts/PriceTrendChart";
import Card from "../components/common/Card";

export default function PredictionTab({ profile, activeCrop }) {
  const [predicted, setPredicted] = useState(false);
  const [result,    setResult   ] = useState(null); // { mandi, mandiIdx, days }

  const cdata    = getCropData(activeCrop.id);
  const myMandis = getOrderedMandis(profile.mandi, profile.state);

  // Reset on crop change
  useEffect(() => { setPredicted(false); setResult(null); }, [activeCrop.id]);

  const handlePredict = ({ mandi, mandiIdx, days }) => {
    setResult({ mandi, mandiIdx, days });
    setPredicted(true);
  };

  const forecastData = result
    ? generateForecast(cdata.base, cdata.pred, result.days)
    : [];

  const barData = result
    ? generateMandiBarData(myMandis, cdata.base, cdata.pred)
    : [];

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>

      <QuickPredict
        myMandis={myMandis}
        cdata={cdata}
        cropEmoji={activeCrop.emoji}
        cropLabel={activeCrop.label}
        onPredict={handlePredict}
      />

      {predicted && result && (
        <>
          {/* Price Summary */}
          <div className="fu s1">
            <SectionTitle>Key Price Summary</SectionTitle>
            <PriceSummary cdata={cdata} days={result.days} />
          </div>

          {/* LSTM Chart */}
          <div className="fu s2">
            <SectionTitle right={`${cdata.pct > 0 ? "▲" : "▼"}${Math.abs(cdata.pct)}%`}>
              Price Trend Chart · LSTM Forecast
            </SectionTitle>
            <Card>
              <PriceTrendChart
                data={forecastData}
                base={cdata.base}
                pred={cdata.pred}
                days={result.days}
                cropName={`${activeCrop.emoji} ${activeCrop.label}`}
                mandiName={result.mandi}
              />
            </Card>
          </div>

          {/* Mandi Comparison */}
          <div className="fu s3">
            <MandiComparison barData={barData} bestMandi={myMandis[0]} />
          </div>

          {/* Market Signals */}
          <div className="fu s4">
            <MarketSignals />
          </div>
        </>
      )}

      {/* Empty state */}
      {!predicted && (
        <Card style={{ textAlign:"center", padding:"44px 24px" }}>
          <div style={{ fontSize:42, marginBottom:10 }}>🌾</div>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:18,
            fontWeight:700, color:G.green, marginBottom:7 }}>
            Namaste, {profile.name.split(" ")[0]}! Select mandi &amp; days above
          </div>
          <div style={{ fontSize:12, color:G.muted, maxWidth:380,
            margin:"0 auto", lineHeight:1.7 }}>
            Your crops ({profile.crops.map(id =>
              ["tomato","onion","potato","wheat","rice"].includes(id) ? id : id
            ).join(", ")}) and primary mandi are pre-loaded.
            Pick a mandi + forecast period and click Predict.
          </div>
          <div style={{ display:"flex", justifyContent:"center", gap:9, marginTop:16, flexWrap:"wrap" }}>
            {["📈 LSTM Forecast","📍 Mandi Compare","🌤 Market Signals"].map(f => (
              <div key={f} style={{ background:G.light, border:`1px solid ${G.bdr}`,
                borderRadius:9, padding:"6px 14px", fontSize:11, color:G.green, fontWeight:600 }}>{f}</div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
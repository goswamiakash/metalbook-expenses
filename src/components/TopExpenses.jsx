import React, { useMemo } from "react";
import styled from "styled-components";

const Card = styled.div`
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  padding:16px;
  border-radius:10px;
  border:1px solid rgba(255,255,255,0.04);
`;

export default function TopExpenses({ items = [] }) {
  const byCategory = useMemo(() => {
    const map = {};
    items.forEach(i => map[i.category] = (map[i.category] || 0) + Number(i.amount));
    return Object.entries(map).map(([k,v]) => ({ k, v })).sort((a,b)=>b.v-a.v).slice(0,5);
  }, [items]);

  const max = byCategory[0] ? byCategory[0].v : 1;

  return (
    <Card>
      <h3 style={{ marginTop:0 }}>Top Expenses</h3>
      {byCategory.length === 0 && <div style={{ color:"var(--muted)" }}>No data</div>}
      {byCategory.map(b => (
        <div key={b.k} style={{ marginBottom:10 }}>
          <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, color:"var(--muted)" }}>
            <div>{b.k}</div>
            <div>₹{b.v.toFixed(2)}</div>
          </div>
          <div style={{ height:8, background:"rgba(255,255,255,0.04)", borderRadius:6, marginTop:6 }}>
            <div style={{ width: `${(b.v/max)*100}%`, height:"100%", background:"linear-gradient(90deg,#ffd166,#ff7b7b)", borderRadius:6 }} />
          </div>
        </div>
      ))}
    </Card>
  );
}

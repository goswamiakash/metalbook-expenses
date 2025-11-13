import React, { useMemo } from "react";
import styled from "styled-components";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const Card = styled.div`
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  padding:16px;
  border-radius:10px;
  border:1px solid rgba(255,255,255,0.04);
  width:360px;
  height:140px;
  @media (max-width:900px){ width:100%; }
`;

const COLORS = ["#ffd166", "#ef476f", "#06d6a0", "#118ab2", "#8e7dff"];

export default function PieChartCard({ items = [] }) {
  const data = useMemo(() => {
    const map = {};
    items.forEach(it => map[it.category] = (map[it.category] || 0) + Number(it.amount));
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [items]);

  return (
    <Card>
      <div style={{ fontSize:14, color:"var(--muted)" }}>Expense distribution</div>
      <div style={{ width: "100%", height: 90 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie dataKey="value" data={data} cx="50%" cy="50%" innerRadius={28} outerRadius={40} paddingAngle={3}>
              {data.map((entry, index) => <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

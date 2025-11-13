import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { parseISO, isWithinInterval } from "date-fns";
import usePagination from "../hooks/usePagination";
import Pagination from "./Pagination";
import ExpenseRow from "./ExpenseRow";

const Card = styled.div`
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  padding:14px;
  border-radius:10px;
  border:1px solid rgba(255,255,255,0.04);
`;

const Controls = styled.div`
  display:flex;
  gap:8px;
  align-items:center;
  margin-bottom:12px;
`;

const Input = styled.input`
  background:var(--glass);
  border:1px solid rgba(255,255,255,0.03);
  color:var(--text);
  padding:8px;
  border-radius:8px;
  outline:none;
`;

export default function ExpenseList({ items = [], query, setQuery, from, to, setFrom, setTo }) {
  const [localQuery, setLocalQuery] = useState(query || "");

  const filtered = useMemo(() => {
    let list = items;
    const q = String(localQuery || "").trim().toLowerCase();
    if (q) {
      const num = Number(q);
      list = list.filter(it => it.name.toLowerCase().includes(q) || String(it.amount).includes(q) || (!isNaN(num) && Number(it.amount) === num));
    }
    if (from || to) {
      const start = from ? parseISO(from) : null;
      const end = to ? parseISO(to) : null;
      list = list.filter(it => {
        const d = parseISO(it.date);
        if (start && end) return isWithinInterval(d, { start, end });
        if (start) return d >= start;
        if (end) return d <= end;
        return true;
      });
    }
    return list;
  }, [items, localQuery, from, to]);

  const pager = usePagination(filtered.length, 4);
  const pageItems = filtered.slice(pager.offset, pager.offset + pager.perPage);

  return (
    <Card>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
        <h3 style={{ margin:0 }}>Recent Transactions</h3>
        <div style={{ color:"var(--muted)", fontSize:13 }}>{filtered.length} items</div>
      </div>

      <Controls>
        <Input placeholder="Search by name or amount" value={localQuery} onChange={(e)=>setLocalQuery(e.target.value)} onKeyUp={()=>setQuery(localQuery)} style={{flex:1}} />
        <Input type="date" value={from} onChange={(e)=>setFrom(e.target.value)} />
        <Input type="date" value={to} onChange={(e)=>setTo(e.target.value)} />
      </Controls>

      <div style={{ display:"grid", gap:8 }}>
        {pageItems.length === 0 && <div style={{ color:"var(--muted)" }}>No transactions found</div>}
        {pageItems.map(it => <ExpenseRow key={it.id} item={it} />)}
      </div>

      <div style={{ marginTop:12 }}>
        <Pagination pager={pager} />
      </div>
    </Card>
  );
}

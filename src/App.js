import React, { useMemo, useState } from "react";
import styled from "styled-components";
import TopBar from "./components/TopBar";
import PieChartCard from "./components/PieChartCard";
import ExpenseList from "./components/ExpenseList";
import TopExpenses from "./components/TopExpenses";
import { useSelector } from "react-redux";
import { parseISO, compareDesc } from "date-fns";
import SummaryCard from "./components/Summary";

const Shell = styled.div`
  max-width:1100px;
  margin: auto;
  padding:10px;
`;

const Grid = styled.div`
  display:grid;
  grid-template-columns: 1fr 360px;
  gap:16px;
  @media (max-width:900px){ grid-template-columns: 1fr; }
`;

const Upper = styled.div`
  display:flex;
  gap:16px;
  margin-bottom:14px;
  @media (max-width:900px){ flex-direction:column; }
`;

export default function App() {
  const { items, walletBalance } = useSelector((s) => s.expenses);
  const sorted = useMemo(() => [...items].sort((a, b) => compareDesc(parseISO(a.date), parseISO(b.date))), [items]);

  // search + range filters live in ExpenseList (via props)
  const [query, setQuery] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  return (
    <Shell>
      <TopBar />
      <Upper>
        <SummaryCard wallet={walletBalance} setFilterQuery={setQuery} />
        <PieChartCard items={sorted} />
      </Upper>

      <Grid>
        <div>
          <ExpenseList items={sorted} query={query} setQuery={setQuery} from={from} to={to} setFrom={setFrom} setTo={setTo} />
        </div>

        <div>
          <TopExpenses items={sorted} />
        </div>
      </Grid>
    </Shell>
  );
}

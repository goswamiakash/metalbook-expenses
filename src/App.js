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
  max-width: 1100px;
  margin: auto;
  padding: 10px;
  width: 100%;
  overflow-x: hidden;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 360px);
  gap: 10px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Upper = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 14px;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

export default function App() {
  const { items, walletBalance } = useSelector((s) => s.expenses);

  const sorted = useMemo(
    () =>
      [...items].sort((a, b) =>
        compareDesc(parseISO(a.date), parseISO(b.date))
      ),
    [items]
  );

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
        <div style={{ minWidth: 0 }}>
          {" "}
          <ExpenseList
            items={sorted}
            query={query}
            setQuery={setQuery}
            from={from}
            to={to}
            setFrom={setFrom}
            setTo={setTo}
          />
        </div>

        <div style={{ minWidth: 0 }}>
          {" "}
          <TopExpenses items={sorted} />
        </div>
      </Grid>
    </Shell>
  );
}

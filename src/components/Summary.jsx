import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setWallet } from "../features/expenses/expensesSlice";
import AddBalanceModal from "./modals/AddBalanceModal";
import AddExpenseModal from "./modals/AddExpenseModal";

const Wrap = styled.div`
  display:flex;
  gap:12px;
  flex:1;
  @media (max-width:900px){ flex-direction:column; }
`;

const Card = styled.div`
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  flex:1;
  padding:16px;
  border-radius:10px;
  border:1px solid rgba(255,255,255,0.04);
`;

const Label = styled.div`color:var(--muted); font-size:13px;`;
const Big = styled.div`font-weight:700; font-size:20px; margin-top:6px;`;

const Btn = styled.button`
  margin-top:12px;
  background:${p=>p.add? "var(--accent-2)" : "var(--accent)"};
  color:#111827;
  padding:8px 10px;
  border-radius:8px;
  border:none;
  cursor:pointer;
  font-weight:600;
`;

export default function SummaryCard({ wallet, setFilterQuery }) {
  const dispatch = useDispatch();
  const [addBalanceOpen, setAddBalanceOpen] = useState(false);
  const [addExpenseOpen, setAddExpenseOpen] = useState(false);

  return (
    <Wrap>
      <Card>
        <Label>Wallet Balance</Label>
        <Big>₹{Number(wallet).toLocaleString()}</Big>
        <Btn onClick={() => setAddBalanceOpen(true)}>+ Add Balance</Btn>
      </Card>

      <Card>
        <Label>Total Expenses</Label>
        <Big>Click to add</Big>
        <Btn add onClick={() => setAddExpenseOpen(true)}>+ Add Expense</Btn>
      </Card>

      {addBalanceOpen && <AddBalanceModal onClose={() => setAddBalanceOpen(false)} />}
      {addExpenseOpen && <AddExpenseModal onClose={() => setAddExpenseOpen(false)} />}
    </Wrap>
  );
}

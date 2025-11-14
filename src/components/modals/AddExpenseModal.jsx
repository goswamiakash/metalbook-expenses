import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addExpense } from "../../features/expenses/expensesSlice";
import { validateExpense } from "../../utils/validation";

const Overlay = styled.div`
  position:fixed; inset:0; display:flex; align-items:center; justify-content:center;
  background:rgba(2,6,23,0.6);
  z-index:50;
`;
const Modal = styled.div`
  background:var(--panel); padding:18px; border-radius:10px; width:380px; border:1px solid rgba(255,255,255,0.04);
`;
const Input = styled.input`width:100%; padding:8px; border-radius:6px; margin-top:8px; background:transparent; border:1px solid rgba(255,255,255,0.04); color:var(--text);`;

const Button = styled.button`margin-top:12px; padding:8px 10px; border-radius:8px; border:none; cursor:pointer; background:var(--accent); color:#111827; font-weight:700;`;

export default function AddExpenseModal({ onClose }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name:"", amount:"", category:"Food", date: new Date().toISOString().slice(0,10) });
  const [errors, setErrors] = useState({});

  function onChange(e){ setForm(s=>({...s,[e.target.name]:e.target.value})); }

  function submit(e){
    e.preventDefault();
    const payload = { name: form.name, amount: Number(form.amount), category: form.category, date: new Date(form.date).toISOString() };
    const v = validateExpense(payload);
    if (Object.keys(v).length){ setErrors(v); return; }
    dispatch(addExpense(payload));
    onClose();
  }

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e)=>e.stopPropagation()}>
        <h3 style={{ marginTop:0 }}>Add Expense</h3>
        <label>Name</label>
        <Input name="name" value={form.name} onChange={onChange} />
        {errors.name && <div style={{color:"var(--accent-2)"}}>{errors.name}</div>}

        <label>Amount</label>
        <Input name="amount" value={form.amount} onChange={onChange} />
        {errors.amount && <div style={{color:"var(--accent-2)"}}>{errors.amount}</div>}

        <label>Category</label>
        <select name="category" value={form.category} onChange={onChange} style={{ width:"100%", padding:8, marginTop:8, borderRadius:6, background:"transparent", border:"1px solid rgba(255,255,255,0.04)" }}>
          {["Food","Transport","Entertainment","Bills","Shopping","Other"].map(c=> <option key={c} value={c}>{c}</option>)}
        </select>

        <label style={{marginTop:8}}>Date</label>
        <Input type="date" name="date" value={form.date} onChange={onChange} />

        <div style={{ display:"flex", gap:8 }}>
          <Button onClick={submit}>Add Expense</Button>
          <Button onClick={onClose} style={{ background:"transparent", border:"1px solid rgba(255,255,255,0.04)", color:"var(--text)" }}>Cancel</Button>
        </div>
      </Modal>
    </Overlay>
  );
}

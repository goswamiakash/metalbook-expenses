import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setWallet } from "../../features/expenses/expensesSlice";

const Overlay = styled.div`position:fixed; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(2,6,23,0.6); z-index:50;`;
const Modal = styled.div`background:var(--panel); padding:18px; border-radius:10px; width:320px; border:1px solid rgba(255,255,255,0.04);`;
const Input = styled.input`width:100%; padding:8px; border-radius:6px; margin-top:8px; background:transparent; border:1px solid rgba(255,255,255,0.04); color:var(--text);`;
const Button = styled.button`margin-top:12px; padding:8px 10px; border-radius:8px; border:none; cursor:pointer; background:var(--accent); color:#111827; font-weight:700;`;

export default function AddBalanceModal({ onClose }) {
  const dispatch = useDispatch();
  const [val, setVal] = useState("");

  function submit(e){
    e.preventDefault();
    const n = Number(val);
    if (isNaN(n)) return alert("Enter a number");
    dispatch(setWallet(n));
    onClose();
  }

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e)=>e.stopPropagation()}>
        <h3 style={{ marginTop:0 }}>Set Wallet Balance</h3>
        <label>Amount</label>
        <Input value={val} onChange={(e)=>setVal(e.target.value)} />
        <div style={{ display:"flex", gap:8 }}>
          <Button onClick={submit}>Set Balance</Button>
          <Button onClick={onClose} style={{ background:"transparent", border:"1px solid rgba(255,255,255,0.04)", color:"var(--text)" }}>Cancel</Button>
        </div>
      </Modal>
    </Overlay>
  );
}

import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { deleteExpense} from "../features/expenses/expensesSlice";
import ExpenseForm from "./ExpenseForm";
import { format, parseISO } from "date-fns";
import confirm from "sweetalert2";

const Item = styled.div`
  display:flex;
  justify-content: space-between;
  align-items:center;
  padding:8px;
  border-radius:8px;
  border:1px solid #eef2ff;
  background:#fff;
`;

const Left = styled.div``;

const Right = styled.div`
  display:flex;
  gap:8px;
  align-items:center;
`;

const Danger = styled.button`
  background: transparent;
  border: none;
  color: var(--danger);
  cursor: pointer;
`;

export default function ExpenseItem({ item, onEdit }) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);

  function onDelete() {
    if (confirm("Delete this expense?")) {
      dispatch(deleteExpense(item.id));
    }
  }

  return (
    <div>
      {!editing ? (
        <Item>
          <Left>
            <div style={{ fontWeight: 600 }}>{item.name}</div>
            <div style={{ color: "var(--muted)", fontSize: 13 }}>
              {item.category} • {format(parseISO(item.date), "yyyy-MM-dd")}
            </div>
          </Left>
          <Right>
            <div style={{ fontWeight: 700 }}>${Number(item.amount).toFixed(2)}</div>
            <button onClick={() => setEditing(true)} style={{ padding: "6px 8px", borderRadius: 6, border: "1px solid #e5e7eb", background: "white" }}>
              Edit
            </button>
            <Danger onClick={onDelete}>Delete</Danger>
          </Right>
        </Item>
      ) : (
        <div style={{ background: "#f8fafc", padding: 8, borderRadius: 6 }}>
          <ExpenseForm edit={item} onDone={() => setEditing(false)} />
        </div>
      )}
    </div>
  );
}

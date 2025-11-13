import React, { useState } from "react";
import styled from "styled-components";
import { format, parseISO } from "date-fns";
import { useDispatch } from "react-redux";
import { deleteExpense } from "../features/expenses/expensesSlice";
import EditExpenseModal from "./modals/EditExpenseModal";
import ConfirmModal from "./modals/ConfirmModal";

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.02);
`;

const Left = styled.div``;
const Right = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const Btn = styled.button`
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.04);
  padding: 6px 8px;
  border-radius: 6px;
  color: var(--text);
  cursor: pointer;
`;

export default function ExpenseRow({ item }) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <>
      <Row>
        <Left>
          <div style={{ fontWeight: 700 }}>{item.name}</div>
          <div style={{ color: "var(--muted)", fontSize: 13 }}>
            {item.category} • {format(parseISO(item.date), "yyyy-MM-dd")}
          </div>
        </Left>

        <Right>
          <div style={{ fontWeight: 800 }}>
            ₹{Number(item.amount).toFixed(2)}
          </div>
          <Btn onClick={() => setEditing(true)}>Edit</Btn>
          <Btn
            onClick={() => setConfirmOpen(true)}
            style={{ color: "var(--accent-2)" }}
          >
            Delete
          </Btn>
        </Right>
      </Row>

      {editing && (
        <EditExpenseModal item={item} onClose={() => setEditing(false)} />
      )}
      {confirmOpen && (
        <ConfirmModal
          message={`Delete "${item.name}"?`}
          onConfirm={() => {
            dispatch(deleteExpense(item.id));
            setConfirmOpen(false);
          }}
          onCancel={() => setConfirmOpen(false)}
        />
      )}
    </>
  );
}

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addExpense, updateExpense } from "../features/expenses/expensesSlice";
import { validateExpense } from "../utils/validation";
import { parseISO, formatISO } from "date-fns";

const Form = styled.form`
  display:flex;
  gap:8px;
  flex-direction:column;
`;

const Row = styled.div`
  display:flex;
  gap:8px;
  align-items:center;
`;

const Input = styled.input`
  padding:8px;
  border-radius:6px;
  border:1px solid #e5e7eb;
`;

const Label = styled.label`
  font-size:13px;
  color:var(--muted);
`;

const Error = styled.div`
  color: var(--danger);
  font-size:12px;
  margin-top:4px;
`;

const Button = styled.button`
  background: var(--accent);
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  &:disabled{opacity:0.6}
`;

const categories = ["Food", "Transport", "Entertainment", "Bills", "Shopping", "Other"];

export default function ExpenseForm({ edit = null, onDone }) {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    amount: "",
    category: "Food",
    date: formatISO(new Date(), { representation: "date" }), // yyyy-mm-dd
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (edit) {
      setForm({
        name: edit.name,
        amount: String(edit.amount),
        category: edit.category,
        date: formatISO(parseISO(edit.date), { representation: "date" }),
        id: edit.id,
      });
    }
  }, [edit]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      name: form.name,
      amount: Number(form.amount),
      category: form.category,
      date: new Date(form.date).toISOString(),
    };
    const v = validateExpense(payload);
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }
    setErrors({});
    if (form.id) {
      dispatch(updateExpense({ id: form.id, ...payload }));
      if (onDone) onDone();
    } else {
      dispatch(addExpense(payload));
    }
    setForm({
      name: "",
      amount: "",
      category: "Food",
      date: formatISO(new Date(), { representation: "date" }),
    });
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ margin: 0 }}>{form.id ? "Edit Expense" : "Add Expense"}</h3>
      </div>

      <div>
        <Label>Expense name</Label>
        <Input name="name" value={form.name} onChange={handleChange} placeholder="e.g. lunch" />
        {errors.name && <Error>{errors.name}</Error>}
      </div>

      <Row>
        <div style={{ flex: 1 }}>
          <Label>Amount</Label>
          <Input name="amount" value={form.amount} onChange={handleChange} placeholder="0.00" />
          {errors.amount && <Error>{errors.amount}</Error>}
        </div>

        <div style={{ width: 140 }}>
          <Label>Category</Label>
          <select name="category" value={form.category} onChange={handleChange} style={{ width: "100%", padding:8, borderRadius:6, border:"1px solid #e5e7eb" }}>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.category && <Error>{errors.category}</Error>}
        </div>
      </Row>

      <div>
        <Label>Date</Label>
        <Input type="date" name="date" value={form.date} onChange={handleChange} />
        {errors.date && <Error>{errors.date}</Error>}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <Button type="submit">{form.id ? "Update" : "Add"}</Button>
        {form.id && (
          <Button type="button" onClick={() => {
            setForm({
              name: "",
              amount: "",
              category: "Food",
              date: formatISO(new Date(), { representation: "date" }),
            });
            if (onDone) onDone();
          }} style={{ background: "#6b7280" }}>
            Cancel
          </Button>
        )}
      </div>
    </Form>
  );
}

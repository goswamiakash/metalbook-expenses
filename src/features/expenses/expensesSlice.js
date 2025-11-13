import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { subDays } from "date-fns";

const initialState = {
  items: [
    // small demo set so UI isn't empty
    { id: uuidv4(), name: "Groceries", amount: 42.5, category: "Food", date: new Date().toISOString() },
    { id: uuidv4(), name: "Bus pass", amount: 20, category: "Transport", date: subDays(new Date(), 1).toISOString() },
    { id: uuidv4(), name: "Movie", amount: 12.99, category: "Entertainment", date: subDays(new Date(), 3).toISOString() },
  ],
  walletBalance: 4500,
};

const slice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense(state, action) {
      state.items.push({ id: uuidv4(), ...action.payload });
    },
    updateExpense(state, action) {
      const idx = state.items.findIndex((i) => i.id === action.payload.id);
      if (idx >= 0) state.items[idx] = action.payload;
    },
    deleteExpense(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    setWallet(state, action) {
      state.walletBalance = action.payload;
    },
    replaceAll(state, action) {
      state.items = action.payload;
    },
  },
});

export const { addExpense, updateExpense, deleteExpense, setWallet, replaceAll } = slice.actions;
export default slice.reducer;

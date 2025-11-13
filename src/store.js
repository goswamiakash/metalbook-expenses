import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "./features/expenses/expensesSlice";

const loadState = () => {
  try {
    const raw = localStorage.getItem("mb_state_v1");
    if (!raw) return undefined;
    return JSON.parse(raw);
  } catch {
    return undefined;
  }
};

const store = configureStore({
  reducer: { expenses: expensesReducer },
  preloadedState: loadState(),
});

store.subscribe(() => {
  try {
    const state = store.getState();
    localStorage.setItem("mb_state_v1", JSON.stringify(state));
  } catch {}
});

export default store;

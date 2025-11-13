export function validateExpense({ name, amount, category, date }) {
  const errors = {};
  if (!name || String(name).trim().length < 2) errors.name = "Provide a name (2+ chars).";
  if (amount === "" || amount === null || isNaN(Number(amount))) errors.amount = "Amount required and must be a number.";
  else if (Number(amount) <= 0) errors.amount = "Must be greater than 0.";
  if (!category) errors.category = "Choose a category.";
  if (!date) errors.date = "Pick a date.";
  return errors;
}

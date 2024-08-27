const BASE_URL = import.meta.VITE_NODE_ENV !== "developement" ? "https://expense-tracker-api-ugtq.onrender.com/api/v1" :"http://localhost:5000/api/v1"
export const INCOME_URL = `${BASE_URL}/income`;
export const EXPENSE_URL = `${BASE_URL}/expense`;
export const USER_URL = `${BASE_URL}/user`;
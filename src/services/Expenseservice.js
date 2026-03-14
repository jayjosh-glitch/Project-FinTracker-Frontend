import apiClient from "../app/apiClient.js";

export const getExpenses = async () => {
  const response = await apiClient.get("/Expenses");
  return response.data;
};

export const addExpense = async (data) => {
  const response = await apiClient.post("/Expenses", data);
  return response.data;
};

export const updateExpense = async (id, data) => {
  const response = await apiClient.put(`/Expenses/${id}`, data);
  return response.data;
};

export const deleteExpense = async (id) => {
  const response = await apiClient.delete(`/Expenses/${id}`);
  return response.data;
};

export const filterExpenses = async (month, year) => {
  const response = await apiClient.get(`/Expenses/filter/month?month=${month}&financialYear=${year}`);
  return response.data;
}
import apiClient from "../app/apiClient.js";

export const getIncomes = async () => {
  const response = await apiClient.get("/Income");
  return response.data;
};

export const addIncome = async (data) => {
  const response = await apiClient.post("/Income", data);
  return response.data;
};

export const updateIncome = async (id, data) => {
  const response = await apiClient.put(`/Income/${id}`, data);
  return response.data;
};

export const deleteIncome = async (id) => {
  const response = await apiClient.delete(`/Income/${id}`);
  return response.data;
};

export const filterIncome = async (month, year) => {
  const response = await apiClient.get(`/Income/filter/month?month=${month}&financialYear=${year}`);
  return response.data;
}

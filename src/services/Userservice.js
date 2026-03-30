
import apiClient from "../app/apiClient";

// const API = axios.create({
//   baseURL: "https://fintracker-nova-g7frfweuchb4cca0.centralindia-01.azurewebsites.net/api"
// });
// // const API_BASE_URL = process.env.NODE_ENV === "production"
// //   ? "https://fintracker-nova-g7frfweuchb4cca0.centralindia-01.azurewebsites.net/api"
// //   : "http://localhost:5001/api";

// const API_BASE_URL = import.meta.env.MODE === "production"
//   ? "https://fintracker-nova-g7frfweuchb4cca0.centralindia-01.azurewebsites.net/api"
//   : "http://localhost:5001/api";


export const getloginUser = async (email, password) => {
  const response = await apiClient.post("/Auth/login", {
    email,
    password
  });
  console.log(response)
  return response.data;
};
export const addusers = (formdata) => {
  return apiClient.post("/Auth/register", formdata)
}

// const loginUser = async (email, password) => {
//   const response = await apiClient.post("/Auth/login", {
//     email: email,
//     password: password
//   });

//   return response.data;
// };
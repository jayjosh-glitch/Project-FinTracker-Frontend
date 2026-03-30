import axios from "axios";

console.log(import.meta.env.VITE_API_URL);

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/auth/login";
      }
      if (status === 500) {
        alert("Internal server error")
        if (error.response?.data?.message?.includes("database has reached monthly usage")) {
        alert("Service is unavilable, please try again later")
        throw error
      }
      }
      if (error.response?.data?.message?.includes("database has reached monthly usage")) {
        alert("Service is unavilable, please try again later")
        throw error
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;

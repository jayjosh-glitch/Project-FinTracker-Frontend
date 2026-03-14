import axios from "axios";



const apiClient = axios.create({
//   baseURL: API_BASE_URL,
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000, // 10 seconds timeout
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
        console.log("Unauthorized. Redirecting to login...");

        localStorage.removeItem("token");

        // optional redirect
        window.location.href = "/auth/login";
      }

      if (status === 500) {
        console.error("Server error occurred");
      }
    }

    return Promise.reject(error);
  }
);

/*
  Export instance to use in services
*/

export default apiClient;
import axios from 'axios';

const instance = () => {
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    withCredentials: true,
  });

  axiosInstance.interceptors.response.use(
    response => response,
    error => {
      return Promise.reject(error);
    }
  );
  return axiosInstance;
};

export default instance;

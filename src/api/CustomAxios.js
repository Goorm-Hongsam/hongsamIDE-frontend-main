import axios from 'axios';

const instance = () => {
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
  });

  // 요청 전에 헤더에 JWT 토큰을 추가하는 인터셉터
  axiosInstance.interceptors.request.use(
    config => {
      const JWTtoken = localStorage.getItem('Authorization');
      if (JWTtoken) {
        config.headers.Authorization = `${JWTtoken}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  // 응답에 대한 인터셉터
  axiosInstance.interceptors.response.use(
    response => {
      localStorage.setItem('Authorization', response.headers.authorization);
      return response;
    },
    error => {
      const originalRequest = error.config;

      // 토큰 만료 시 401 에러 발생 시 재시도하는 부분
      if (error.response && error.response.status === 401 && !isRetrying) {
        isRetrying = true;

        return Promise.reject(error);
      } else if (error.response && error.response.status === 406) {
        // 토큰 만료 시 처리
        localStorage.removeItem('Authorization');
        return Promise.reject(error);
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default instance;

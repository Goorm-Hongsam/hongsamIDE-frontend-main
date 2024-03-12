import axios from 'axios';

const instance = () => {
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
  });

  axiosInstance.interceptors.request.use(
    config => {
      const JWTtoken = localStorage.getItem('Authorization');
      if (JWTtoken) {
        config.headers.Authorization = `Bearer ${JWTtoken}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    response => {
      // 응답이 성공하면 그대로 반환
      return response;
    },
    async error => {
      const originalRequest = error.config;

      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        // 토큰이 만료되었을 경우 한 번만 재시도
        originalRequest._retry = true;

        // 로컬 스토리지에서 토큰 가져오기
        const JWTtoken = localStorage.getItem('Authorization');

        if (JWTtoken) {
          // 토큰이 있으면 헤더에 추가하여 재시도
          originalRequest.headers.Authorization = `Bearer ${JWTtoken}`;
          return axiosInstance(originalRequest);
        }
      }
      // 토큰이 없거나, 재시도 중에도 실패하면 에러 반환
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default instance;

import axios from 'axios';

const instance = () => {
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
  });

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

  console.log(JWTtoken);

  axiosInstance.interceptors.response.use(
    response => {
      const JWTtoken = response.headers.Authorization;
      localStorage.setItem('Authorization', JWTtoken);

      return response;
    },
    error => {
      const originalRequest = error.config;

      if (error.response && error.response.status === 401) {
        console.log('로그인을 해주세요.');
      } else if (error.response && error.response.status === 406) {
        // 토큰 만료 시 처리
        // localStorage.removeItem('Authorization');
        return Promise.reject(error);
      }
    }
  );

  // function getNewToken() {
  //   return axiosInstance
  //     .post(`/login-check`, { withCredentials: true })
  //     .then(response => {
  //       if (response.status === 200) {
  //         localStorage.setItem('Authorization', response.headers.authorization);
  //         return response.data;
  //       } else {
  //         console.log('엑세스 토큰 갱신에 실패했습니다.');
  //         localStorage.removeItem('Authorization');
  //         return Promise.reject('엑세스 토큰 갱신 실패');
  //       }
  //     })
  //     .catch(error => {
  //       alert('로그인을 다시 해주세요.');
  //       return Promise.reject(error);
  //     });
  // }
  return axiosInstance;
};

export default instance;

import React from 'react';
import styles from './Login.module.css';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../api/AuthContext';
import { useForm } from 'react-hook-form';

import instance from '../api/CustomAxios';

const Login = () => {
  const axiosInstance = instance();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /* 로그인 & 유저 정보 전역관리 */
  const { login } = useAuth();

  /* 로그인 성공 시 라우팅 내비게이터 */
  const navigate = useNavigate();

  /* 로그인 함수 */
  const onLogin = ({ email, password }) => {
    const Data = {
      email,
      password,
    };

    axiosInstance
      .post(`members/login`, Data, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.status === 200) {
          login(response.data.data);
          navigate('/question');
        } else if (response.data.status === 400) {
          alert('아이디 또는 비밀번호가 맞지 않습니다.');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={styles.Login}>
      <div className={styles.subtitle}>Step for Developer</div>
      <div className={styles.title}>Hongsam IDE</div>
      <form className={styles.form} onSubmit={handleSubmit(onLogin)}>
        <label>ID</label>
        <input
          name="email"
          type="email"
          autoComplete="off"
          placeholder="아이디를 입력하세요."
          {...register('email', {
            required: true,
          })}
        />
        {errors.email && errors.email.type === 'required' && (
          <p>이 칸을 입력해주세요.</p>
        )}
        <label>Password</label>
        <input
          name="password"
          type="password"
          autoComplete="off"
          placeholder="비밀번호를 입력하세요."
          {...register('password', {
            required: true,
          })}
        />
        {errors.password && errors.password.type === 'required' && (
          <p>이 칸을 입력해주세요.</p>
        )}
        <Link to={'/signup'}>Sign up</Link>
        <button className={styles.loginBtn} type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

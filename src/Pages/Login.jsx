import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /* 로그인 성공 시 라우팅 내비게이터 */
  const navigate = useNavigate();

  /* 로그인 함수 */
  const onLogin = ({ email, password }) => {
    const Data = {
      email,
      password,
    };

    axios
      .post('https://api.hong-sam.online/members/login', Data, {
        withCredentials: true,
      })
      .then((response) => {
        /* 로그인 완료 */
        if (response.data.status === 200) {
          //login(response.data.data);
          navigate('/question');
        } /* 로그인 실패 */ else if (response.data.status === 400) {
          alert('아이디 또는 비밀번호가 맞지 않습니다.');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <LoginContainer>
      <Subtitle>Step for Developer</Subtitle>
      <Title>Hongsam IDE</Title>
      <LoginForm onSubmit={handleSubmit(onLogin)}>
        <Label>ID</Label>
        <Input
          name="email"
          type="email"
          autoComplete="off"
          placeholder="아이디를 입력하세요."
          {...register('email', {
            required: true,
          })}
        />
        {errors.email && errors.email.type === 'required' && (
          <ErrorMessage>이 칸을 입력해주세요.</ErrorMessage>
        )}
        <Label>Password</Label>
        <Input
          name="password"
          type="password"
          autoComplete="off"
          placeholder="비밀번호를 입력하세요."
          {...register('password', {
            required: true,
          })}
        />
        {errors.password && errors.password.type === 'required' && (
          <ErrorMessage>이 칸을 입력해주세요.</ErrorMessage>
        )}
        <StyledLink to={'/signup'}>Sign up</StyledLink>
        <LoginButton type="submit">Login</LoginButton>
      </LoginForm>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  display: flex;
  margin: 10px;
  flex-direction: column;
  justify-content: center;
  height: 90vh;
  align-items: center;
`;

const Subtitle = styled.div`
  display: inline;
  margin: 0 auto;
  font-size: 20px;
  margin-bottom: 10px;
`;

const Title = styled.div`
  display: inline;
  margin: 0 auto;
  color: var(--main-color);
  font-size: 42px;
  letter-spacing: 0.2cm;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding-top: 30px;
`;

const Input = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  border-radius: 4px;
  border: none;
  background-color: var(--lightGray-color);
  padding: 15px 15px;
  margin-bottom: 5px;
  font-size: 14px;
  font-family: 'NeoDunggeunmoPro-Regular';
`;

const Label = styled.label`
  line-height: 2;
  text-align: left;
  display: block;
  margin-bottom: 5px;
  margin-top: 10px;
  color: var(--main-color);
  font-size: 16px;
  font-weight: 300;
`;

const LoginButton = styled.button`
  margin: 10px auto;
  width: 100%;
  border: none;
  border-radius: 5px;
  padding: 15px;
  color: white;
  background-color: var(--main-color);
  font-family: 'NeoDunggeunmoPro-Regular';
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: var(--hover-color);
  }
`;

const StyledLink = styled(Link)`
  display: block;
  width: 100%;
  text-align: right;
  text-decoration: none;
  color: var(--main-color);
  padding-top: 10px;
  font-size: 14px;
`;

const ErrorMessage = styled.p`
  font-size: 14px;
  padding: 10px 0px;
  color: var(--alert-color);

  &::before {
    content: '⚠️ ';
  }
`;

export default Login;

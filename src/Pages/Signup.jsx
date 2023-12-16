import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setFocus,
  } = useForm();

  /* 이메일 중복 검사 확인 */
  const [isEmailUnique, setIsEmailUnique] = useState(false);

  /* 회원가입 성공 시 라우팅 내비게이터 */
  const navigate = useNavigate();

  /* 이메일 중복 검사 함수 */
  const confirmID = async () => {
    const email = watch('email'); // 이메일 값을 가져옴

    if (email) {
      try {
        const response = await axios.post(
          'https://api.hong-sam.online/members/signup/email-check',
          { email }
        );

        if (response.data.status === 200) {
          alert('사용 가능한 이메일입니다.');
          setIsEmailUnique(true);
        } else if (response.data.status === 400) {
          alert('사용할 수 없는 이메일입니다.');
          setFocus('email');
          setIsEmailUnique(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  /* 회원가입 폼 제출 함수 */
  const onSignup = ({ email, password, username }) => {
    /* 이메일 중복 검사 완료 */
    if (isEmailUnique) {
      const Data = {
        email,
        password,
        username,
      };

      axios
        .post('https://api.hong-sam.online/members/signup', Data)
        .then((response) => {
          /* 회원가입 완료 */
          if (response.data.status === 200) {
            alert('회원가입이 완료되었습니다.');
            navigate('/login');
          }
        })
        .catch((error) => {
          console.error(error);
        });
      /* 이메일 중복 검사 미완료 */
    } else {
      alert('이메일 중복을 확인하세요.');
    }
  };

  /* 비밀번호 일치를 위한 useRef */
  const passwordInputRef = useRef(null);
  passwordInputRef.current = watch('password');
  return (
    <SignupContainer>
      <Subtitle>Step for Developer</Subtitle>
      <Title>Hongsam IDE</Title>
      <SignupForm onSubmit={handleSubmit(onSignup)}>
        <Label>ID</Label>
        <IdContainer>
          <Input
            name="email"
            type="text"
            autoComplete="off"
            placeholder="이메일 형식으로 입력해주세요."
            {...register('email', {
              required: true,
              pattern: /^\S+@\S+$/i,
            })}
          />
          <ConfirmButton onClick={confirmID} type="button">
            중복 확인
          </ConfirmButton>
        </IdContainer>
        {errors.email && errors.email.type === 'required' && (
          <ErrorMessage>이 칸을 입력해주세요.</ErrorMessage>
        )}
        {errors.email && errors.email.type === 'pattern' && (
          <ErrorMessage>아이디 형식이 올바르지 않습니다.</ErrorMessage>
        )}

        <Label>Password</Label>
        <Input
          name="password"
          type="password"
          autoComplete="off"
          placeholder="영문+숫자+특수문자 조합의 7~15자로 입력해주세요."
          {...register('password', {
            required: true,
            pattern:
              /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,15}$/i,
          })}
        />
        {errors.password && errors.password.type === 'required' && (
          <ErrorMessage>이 칸을 입력해주세요.</ErrorMessage>
        )}
        {errors.password && errors.password.type === 'pattern' && (
          <ErrorMessage>비밀번호 형식이 올바르지 않습니다.</ErrorMessage>
        )}

        <Label>Confirm Password</Label>
        <Input
          name="confirm"
          type="password"
          autoComplete="off"
          placeholder="비밀번호를 다시 입력해주세요."
          {...register('confirm', {
            required: true,
            validate: (value) => value === passwordInputRef.current,
          })}
        />
        {errors.confirm && errors.confirm.type === 'required' && (
          <ErrorMessage>이 칸을 입력해주세요.</ErrorMessage>
        )}
        {errors.confirm && errors.confirm.type === 'validate' && (
          <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
        )}

        <Label>Name</Label>
        <Input
          name="username"
          autoComplete="off"
          placeholder="이름을 10자 이내로 입력해주세요."
          {...register('username', {
            required: true,
            maxLength: 10,
          })}
        />
        {errors.username && errors.username.type === 'required' && (
          <ErrorMessage>이 칸을 입력해주세요.</ErrorMessage>
        )}
        {errors.username && errors.username.type === 'maxLength' && (
          <ErrorMessage>10자 이내로 입력해주세요.</ErrorMessage>
        )}

        <SignupButton type="submit">Sign up</SignupButton>
      </SignupForm>
    </SignupContainer>
  );
};

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  max-height: max-content;
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

const SignupForm = styled.form`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

const IdContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const ConfirmButton = styled.button`
  box-sizing: border-box;
  width: 90px;
  border: none;
  border-radius: 5px;
  margin-bottom: 5px;
  background-color: var(--main-color);
  color: white;
  cursor: pointer;

  &:hover {
    background-color: var(--hover-color);
  }
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

const SignupButton = styled.button`
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

const ErrorMessage = styled.p`
  font-size: 14px;
  padding: 10px 0px;
  color: var(--alert-color);

  &::before {
    content: '⚠️ ';
  }
`;

export default Signup;

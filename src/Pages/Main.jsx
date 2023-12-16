import React, { useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  useEffect(() => {
    createStars();
  }, []);

  const createStars = () => {
    const starContainer = document.getElementById('star-container');

    for (let i = 0; i < 30; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = `${Math.random() * 100}vw`;
      star.style.top = `${Math.random() * 100}vh`;
      star.style.animationDuration = `${Math.random() * 1 + 0.5}s`;
      starContainer.appendChild(star);
    }
  };

  const navigate = useNavigate('');
  const handleGoToQuestionList = () => {
    navigate('/question');
  };

  return (
    <>
      <GlobalStyle />
      <MainContainer>
        <StarContainer id="star-container" />
        <Title>
          <SubTitle>Step for Developer</SubTitle>
          <MainTitle>HongsamIDE</MainTitle>
          <Button onClick={handleGoToQuestionList}>시작!</Button>
        </Title>
      </MainContainer>
    </>
  );
};

export default Main;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    overflow: hidden;
  }

  .star {
    position: absolute;
    width: 2px;
    height: 2px;
    background-color: white;
    animation: twinkling infinite;
  }

  @keyframes twinkling {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
`;

const MainContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 100vh;
  margin: 0 auto;
`;

const StarContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-color: black;
`;

const Title = styled.div`
  text-align: center;
  line-height: 1.5;
  color: white;
  height: 30vh;
`;

const MainTitle = styled.div`
  color: var(--main-color);
  font-size: var(--font-5xl);
  text-align: center;
  letter-spacing: 0.2cm;
`;

const SubTitle = styled.div`
  font-size: var(--font-xl);
  color: white;
`;

const Button = styled.button`
  border: none;
  border-radius: 20px;
  background-color: var(--main-color);
  padding: 10px;
  color: white;
  width: 130px;
  cursor: pointer;

  &:hover {
    background-color: var(--hover-color);
  }
`;

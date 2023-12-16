import React from 'react';
import styled from 'styled-components';
import Header from '../Components/Header';

const Mypage = () => {
  return (
    <MypageContainer>
      <Header />
      <MypageWrapper>
        <UserInfoContainer>
          <Photo></Photo>
          <Info>
            <Title>Information</Title>
            <Email>Email</Email>
            <Nickname>Nickname</Nickname>
          </Info>
        </UserInfoContainer>
        <UserButtons>
          <EditButton>수정하기</EditButton>
          <QuitButton>탈퇴하기</QuitButton>
        </UserButtons>
      </MypageWrapper>
    </MypageContainer>
  );
};

export default Mypage;

const MypageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MypageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 90vh;
  border-radius: 5px;
  position: relative;
  gap: 40px;
`;

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  gap: 20px;
`;

const Photo = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: var(--main-color);
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  gap: 8px;
  text-align: center;
`;

const Title = styled.div`
  font-size: 18px;
  margin-bottom: 5px;
  color: var(--main-color);
`;

const Email = styled.div``;

const Nickname = styled.div``;

const UserButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: center;
  width: 50%;
`;

const BaseButtonStyles = `
  width: 100%;
  height: 30px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  padding: 5px;
  cursor: pointer;
`;

const EditButton = styled.button`
  ${BaseButtonStyles}
  background-color: var(--main-color);
  color: white;

  &:hover {
    background-color: var(--hover-color);
  }
`;

const QuitButton = styled.button`
  ${BaseButtonStyles}
  background-color: rgb(247, 50, 50);
  color: white;

  &:hover {
    background-color: rgb(225, 46, 46);
  }
`;

EditButton.defaultProps = {
  type: 'button',
};

QuitButton.defaultProps = {
  type: 'button',
};

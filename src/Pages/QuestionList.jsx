import React from 'react';
import styled from 'styled-components';
import Header from '../Components/Header';

const QuestionList = () => {
  return (
    <QuestionListContainer>
      <Header />
      <InputWrapper>
        <Input />
        <SearchButton>검색</SearchButton>
      </InputWrapper>
      <QuestionListWrapper>
        <table>
          <thead>
            <tr>
              <th>문제 번호</th>
              <th>난이도</th>
              <th>제목</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>쉬움</td>
              <td>문제 제목 1</td>
            </tr>
            <tr>
              <td>2</td>
              <td>보통</td>
              <td>문제 제목 2</td>
            </tr>
          </tbody>
        </table>
      </QuestionListWrapper>
      <QuestionButtons>
        <PreviousButton>{'<'}</PreviousButton>
        <NextButton>{'>'}</NextButton>
      </QuestionButtons>
    </QuestionListContainer>
  );
};

export default QuestionList;

const QuestionListContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputWrapper = styled.div`
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Input = styled.input`
  width: 270px;
  height: 20px;
  display: block;
  border-radius: 4px;
  border: none;
  background-color: var(--lightGray-color);
  padding: 5px 5px;
  font-size: 14px;
  font-family: 'NeoDunggeunmoPro-Regular';
`;

const SearchButton = styled.button`
  border: none;
  width: 50px;
  height: 30px;
  border-radius: 5px;
  background-color: var(--main-color);
  color: white;
  cursor: pointer;

  &:hover {
    background-color: var(--hover-color);
  }
`;

const QuestionListWrapper = styled.div`
  height: 60vh;
`;

const QuestionButtons = styled.div`
  text-align: center;
  display: flex;
  gap: 10px;
`;

const PreviousButton = styled.button`
  width: 30px;
  height: 30px;
  background-color: var(--main-color);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: var(--hover-color);
  }
`;

const NextButton = styled(PreviousButton)``;

import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen((prevIsDropdownOpen) => !prevIsDropdownOpen);
  };

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Logo onClick={() => navigate('/question')}>Hongsam IDE</Logo>
        <UserInfo>
          <Photo></Photo>
          <Nickname onClick={toggleDropdown}>유저 이름</Nickname>
          {isDropdownOpen && (
            <Dropdown>
              <DropdownList>
                <DropdownItem onClick={() => navigate('/mypage')}>
                  My Page
                </DropdownItem>
                <DropdownItem>로그아웃</DropdownItem>
              </DropdownList>
            </Dropdown>
          )}
        </UserInfo>
      </HeaderWrapper>
      <div>토글버튼</div>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid var(--main-color);
  display: flex;
  align-items: center;
  position: relative;
`;

const HeaderWrapper = styled.div`
  display: flex;
`;

const Logo = styled.button`
  align-items: center;
  font-size: 24px;
  color: var(--main-color);
  padding: 15px;
  border: none;
  box-sizing: border-box;
  background-color: transparent;
  cursor: pointer;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding-right: 10px;
`;

const Nickname = styled.button`
  padding: 10px;
  box-sizing: border-box;
  border: none;
  background-color: transparent;
  color: var(--main-color);
  cursor: pointer;
`;

const Photo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background-color: var(--main-color);
`;

const Dropdown = styled.div`
  position: absolute;
  background-color: white;
  width: 90px;
  top: 100%;
  text-align: center;
`;

const DropdownList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

const DropdownItem = styled.li`
  padding: 10px;
  font-size: 12px;
  border: 1px solid var(--lightGray-color);
  color: black;
  transition: background-color 0.3s;
  width: 90%;
  cursor: pointer;

  &:hover {
    background-color: var(--main-color);
  }
`;

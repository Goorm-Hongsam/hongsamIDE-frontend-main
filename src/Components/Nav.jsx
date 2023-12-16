import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Nav.module.css';
import { useAuth } from '../api/AuthContext';
import instance from '../api/CustomAxios';

const Nav = () => {
  const axiosInstance = instance();
  const navigate = useNavigate();

  const { isLoggedIn, userData, logout, login } = useAuth();

  useEffect(() => {
    // 세션 체크를 위한 GET 요청
    axiosInstance
      .get('', {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.status === 200) {
          login(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const userName = isLoggedIn ? `${userData.username} 님` : '로그인';

  const toggleDropdown = () => {
    setIsDropdownOpen((prevIsDropdownOpen) => !prevIsDropdownOpen);
  };

  const goToMypage = () => {
    navigate('/mypage');
  };

  const goToLogin = () => {
    navigate('/login');
  };

  const goToLogout = () => {
    axiosInstance
      .post(
        `members/logout`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.data.status === 200) {
          logout();
          alert('로그아웃 되었습니다.');
          navigate('/');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.Nav}>
      <header className={styles.header}>
        <button className={styles.title} onClick={() => navigate('/question')}>
          Hongsam IDE
        </button>
        <button
          className={styles.username}
          onClick={isLoggedIn ? toggleDropdown : goToLogin}
        >
          <div className={styles.userPhoto}>
            {userData && userData.profileUrl && (
              <img src={userData.profileUrl} alt="유저 이미지" />
            )}
            {userName}
          </div>
          {isLoggedIn && isDropdownOpen && (
            <div className={styles.dropdown} ref={dropdownRef}>
              <ul>
                <li onClick={goToMypage}>My Page</li>
                <li onClick={goToLogout}>로그아웃</li>
              </ul>
            </div>
          )}
        </button>
      </header>
    </div>
  );
};

export default Nav;

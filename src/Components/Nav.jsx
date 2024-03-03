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
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.post(`/api/members/login-check`);
        login(response.data);
      } catch (error) {
        console.error('유저 정보를 불러오는 중 에러 발생:', error);
      }
    };

    if (!userData) {
      fetchUserData();
    }
  }, [userData]);

  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const userName = isLoggedIn ? `${userData.username} 님` : '로그인';

  const toggleDropdown = () => {
    setIsDropdownOpen(prevIsDropdownOpen => !prevIsDropdownOpen);
  };

  const goToMypage = () => {
    navigate('/mypage');
  };

  const goToLogin = () => {
    navigate('/login');
  };

  const goToLogout = () => {
    axiosInstance
      .post(`/api/members/logout`, {})
      .then(response => {
        logout();
        alert('로그아웃 되었습니다.');
        navigate('/');
      })
      .catch(error => {
        console.log(error);
        if (error.response && error.response.status === 406) {
          alert('로그아웃 되었습니다.');
          // 토큰이 유효하지 않음을 서버에서 알려줄 때
          logout(); // 로그아웃 수행
          navigate('/');
          localStorage.removeItem('Authorization');
        } else {
          // 다른 에러 처리
          console.log(error);
        }
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

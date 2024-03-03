import React, { useState, useEffect } from 'react';
import Nav from '../Components/Nav';
import styles from './Mypage.module.css';
import { useAuth } from '../api/AuthContext';
import PasswordConfirm from '../Components/PasswordConfirm';
import UserInfoModifyModal from '../Components/UserInfoModifyModal';
import { useNavigate } from 'react-router-dom';
import instance from '../api/CustomAxios';

const Mypage = () => {
  const axiosInstance = instance();
  const navigate = useNavigate();

  /* 로그인 & 유저 정보 전역관리 */
  const { userData, login, logout } = useAuth();

  useEffect(() => {
    if (!userData) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.post(`/api/members/login-check`);
        login(response.data);
      } catch (error) {
        console.error('유저 정보를 불러오는 중 에러 발생:', error);
      }
    };

    fetchUserData();
  }, []);

  /* 유저 이메일 & 이름 */
  const userEmail = userData?.email || '사용자 이메일 없음';
  const userName = userData?.username || '사용자 이름 없음';
  const userPhoto = userData?.profileUrl || null;

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const passwordModalOpen = () => {
    setIsPasswordModalOpen(true);
  };

  const handlePasswordConfirmed = () => {
    setIsModifiedModalOpen(true);
  };

  const [isModifiedModalOpen, setIsModifiedModalOpen] = useState(false);

  const quitOpen = () => {
    if (window.confirm('정말 탈퇴하시겠어요? 🥺')) {
      axiosInstance
        .delete(`/api/mypage/members`)
        .then(response => {
          alert('탈퇴 되었습니다 😭');
          localStorage.removeItem('Authorization');
          window.location.reload();
        })
        .catch(error => {
          alert('비정상적인 접근입니다.');
          console.error(error);
        });
    } else {
      alert('잘 생각하셨어요 😊');
    }
  };

  return (
    <div>
      <Nav />
      <div className={styles.Mypage}>
        <div className={styles.userInfoContainer}>
          <div>
            {userPhoto && (
              <img
                className={styles.userPhotoContainer}
                src={userPhoto}
                alt="프로필 이미지"
              />
            )}
          </div>
          <div className={styles.userInfo}>
            <div className={styles.Title}>📌 Infomation</div>
            <div className={styles.userEmail}>{userEmail}</div>
            <div className={styles.userName}>{userName}</div>
          </div>

          <div className={styles.userBtns}>
            <button className={styles.modifyBtn} onClick={passwordModalOpen}>
              프로필 수정하기
            </button>
            {isPasswordModalOpen && (
              <PasswordConfirm
                setIsPasswordModalOpen={setIsPasswordModalOpen}
                onPasswordConfirmed={handlePasswordConfirmed}
              />
            )}
            {isModifiedModalOpen && (
              <UserInfoModifyModal
                setIsModifiedModalOpen={setIsModifiedModalOpen}
              />
            )}
            <button className={styles.quitBtn} onClick={quitOpen}>
              탈퇴하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mypage;

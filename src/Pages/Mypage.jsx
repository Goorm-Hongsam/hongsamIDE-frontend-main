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

  useEffect(() => {
    // 세션 체크를 위한 GET 요청
    axiosInstance
      .get('', {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.status === 403) {
          alert('로그인 후 이용해주세요.');
          navigate('/login');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  /* 로그인 & 유저 정보 전역관리 */
  const { userData, login, logout } = useAuth();

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

  const goToLogout = () => {
    axios
      .post(
        `members/logout`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log('Logout response:', response);
        if (response.data.status === 200) {
          logout();
          navigate('/');
        }
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  };

  const quitOpen = () => {
    if (window.confirm('정말 탈퇴하시겠어요? 🥺')) {
      axios
        .delete(`mypage/members`, {
          withCredentials: true,
        })
        .then((response) => {
          if (response.data.status === 200) {
            alert('탈퇴 되었습니다 😭');
            goToLogout();
          } else {
            console.log('Failed to quit');
          }
        })
        .catch((error) => {
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

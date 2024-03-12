import React, { useState, useRef } from 'react';
import styles from './UserInfoModifyModal.module.css';
import { useForm } from 'react-hook-form';
import { useAuth } from '../api/AuthContext';
import instance from '../api/CustomAxios';

const UserInfoModifyModal = ({ setIsModifiedModalOpen }) => {
  const axiosInstance = instance();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setFocus,
  } = useForm();

  /* 비밀번호 일치를 위한 useRef */
  const passwordInputRef = useRef(null);
  passwordInputRef.current = watch('password');

  const { userData, login } = useAuth();

  /* 유저 정보 업데이트 핸들러 */
  const handleUserInfoUpdate = () => {
    const username = watch('username');
    const password = watch('password');

    const usernameToSend = username || null;
    const passwordToSend = password || null;

    axiosInstance
      .put(`/mypage/info`, {
        username: usernameToSend,
        password: passwordToSend,
      })
      .then(response => {
        if (response.status === 200) {
          alert('변경사항이 저장되었습니다.');
          setIsModifiedModalOpen(false);
          login(response.data);
          localStorage.setItem('Authorization', response.headers.authorization);
        }
      })
      .catch(error => {
        if (error && error.response.status === 403) {
          alert('기존 이름과 동일합니다.');
          setFocus('username');
        } else if (error && error.response.status === 402) {
          alert('기존 비밀번호와 동일합니다.');
          setFocus('password');
        }
      });
  };

  const [userPhoto, setUserPhoto] = useState(userData?.profileUrl || null);

  const handleImageUpload = e => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const formData = new FormData();
      formData.append('profileImg', selectedFile);

      axiosInstance
        .post(`/mypage/profile-img`, formData)
        .then(response => {
          setUserPhoto(URL.createObjectURL(selectedFile));
          login(response.data);
          localStorage.setItem('Authorization', response.headers.authorization);
          alert('프로필 이미지가 업데이트되었습니다.');
        })
        .catch(error => {
          console.error(error);
          alert('이미지 업로드 중 오류가 발생했습니다.');
        });
    }
  };

  const modifieidModalClose = () => {
    setIsModifiedModalOpen(false);
  };

  return (
    <div className={styles.UserInfoModifyModal}>
      <div className={styles.container}>
        <div className={styles.userPhotoInfo}>
          <div className={styles.userPhoto}>
            {userPhoto && (
              <img
                className={styles.userPhotoContainer}
                src={userPhoto}
                alt="프로필 이미지"
              />
            )}
            <div className={styles.PhotoBtn}>
              <label className={styles.uploadImgBtn} htmlFor="inputFile">
                이미지 업로드
              </label>
              <input
                className={styles.photoUpload}
                type="file"
                id="inputFile"
                accept="image/"
                onChange={handleImageUpload}
              />
            </div>
          </div>
        </div>
        <form
          className={styles.userPersonalInfo}
          onSubmit={handleSubmit(handleUserInfoUpdate)}
        >
          <label>
            새 이름
            <input
              type="text"
              name="username"
              autoComplete="off"
              placeholder="10자 내외로 입력해주세요."
              {...register('username', {
                maxLength: 10,
              })}
            />
          </label>
          <label>
            새 비밀번호
            <input
              name="password"
              type="password"
              placeholder="영문+숫자+특수문자 조합의 7~15자"
              autoComplete="off"
              {...register('password', {
                pattern:
                  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,15}$/i,
              })}
            />
            {errors.password && errors.password.type === 'pattern' && (
              <p>영문+숫자+특수문자 조합의 7~15자</p>
            )}
          </label>

          <button className={styles.submitBtn} type="submit">
            변경사항 저장
          </button>
        </form>
      </div>
      <button className={styles.closeBtn} onClick={modifieidModalClose}>
        ❌
      </button>
    </div>
  );
};

export default UserInfoModifyModal;

import React from 'react';
import Styles from './Main.module.css';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  /* 입장 시 라우팅 내비게이터 */
  const navigate = useNavigate();
  const handleCheck = () => {
    navigate('/question');
  };

  return (
    <div className={Styles.Main}>
      <div className={Styles.subtitle}>Step for Developer</div>
      <div className={Styles.title}>Hongsam IDE</div>
      <button className={Styles.startingBtn} onClick={handleCheck}>
        문제 풀이 시작
      </button>
    </div>
  );
};

export default Main;

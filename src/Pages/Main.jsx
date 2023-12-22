import React from 'react';
import Styles from './Main.module.css';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();
  const handleStart = () => {
    navigate('/question');
  };

  return (
    <div className={Styles.Main}>
      <div className={Styles.mainText}>
        <div className={Styles.sub}>
          <div className={Styles.subtitle}>Step for Developer</div>
          <div className={Styles.desc}>개발자가 되기 위한 첫 걸음</div>
        </div>
        <div className={Styles.main}>
          <div className={Styles.title}>Hongsam IDE</div>
        </div>
        <div className={Styles.button}>
          <button className={Styles.startBtn} onClick={handleStart}>
            시작하기
          </button>
        </div>
        <div className={Styles.bottom}>
          <span>made by Hongsam</span>
          <br />
          [FE] summermong / ganggyunggyu
          <br />
          [BE] seoyeoning / dlehddn
        </div>
      </div>
      <div className={Styles.mainGif}>
        <img className={Styles.gif} src={'/video/main.gif'} />
      </div>
    </div>
  );
};

export default Main;

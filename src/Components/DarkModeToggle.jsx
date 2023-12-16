import React, { useState, useEffect } from 'react';
import styles from './DarkModeToggle.module.css';

const DarkModeToggle = ({ isDarkMode, setIsDarkMode }) => {
  const [isToggled, setIsToggled] = useState(isDarkMode);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode) {
      const darkMode = storedDarkMode === 'true';
      setIsDarkMode(darkMode);
      setIsToggled(darkMode);
    }
  }, [setIsDarkMode]);

  const toggleButton = () => {
    const newMode = !isToggled;
    setIsToggled(newMode);
    localStorage.setItem('darkMode', newMode.toString());
    setIsDarkMode(newMode);
  };

  return (
    <div className={styles.DarkModeToggle}>
      <button
        className={
          isToggled
            ? `${styles.toggleBtn} ${styles.toggleBtn_dark}`
            : styles.toggleBtn
        }
        onClick={toggleButton}
      >
        {isToggled ? '🌙' : '☀️'}
      </button>
    </div>
  );
};

export default DarkModeToggle;

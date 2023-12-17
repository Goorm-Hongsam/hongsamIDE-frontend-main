import React from 'react';
import styles from '../Pages/Question.module.css';

const QuestionPageBtn = ({
  handlePageChange,
  currentPage,
  canGoToNextPage,
}) => {
  return (
    <div className={styles.pageBtns}>
      <button
        onClick={() => {
          console.log('Prev Button Clicked');
          handlePageChange('prev');
        }}
        disabled={currentPage === 1}
      >
        ◀️
      </button>
      <button
        onClick={() => {
          console.log('Next Button Clicked');
          handlePageChange('next');
        }}
        disabled={!canGoToNextPage}
      >
        ▶️
      </button>
    </div>
  );
};

export default QuestionPageBtn;

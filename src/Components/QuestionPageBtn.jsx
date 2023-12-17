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
        onClick={() => handlePageChange('prev')}
        disabled={currentPage === 1}
      >
        ◀️
      </button>
      <button
        onClick={() => handlePageChange('next')}
        disabled={!canGoToNextPage}
      >
        ▶️
      </button>
    </div>
  );
};

export default QuestionPageBtn;

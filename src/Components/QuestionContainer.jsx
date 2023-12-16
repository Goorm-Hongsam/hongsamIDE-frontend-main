import React from 'react';
import styles from '../Pages/Question.module.css';

const QuestionContainer = ({ currentQuest, goToEditor }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>문제 번호</th>
            <th>난이도</th>
            <th>제목</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {currentQuest.length > 0 ? (
            currentQuest.map((question, index) => (
              <tr key={index}>
                <td>{question.id}</td>
                <td>{`Lv.${question.level}`}</td>
                <td
                  className={styles.selectingQuestion}
                  onClick={() => goToEditor(question.id)}
                >
                  {question.title}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">준비중</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionContainer;

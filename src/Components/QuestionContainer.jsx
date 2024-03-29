import React from 'react';
import styles from '../Pages/Question.module.css';

const QuestionContainer = ({ currentQuest, goToEditor }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>No.</th>
            <th>난이도</th>
            <th>제목</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {currentQuest.map((question, index) => (
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionContainer;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Question.module.css';
import Nav from '../Components/Nav';
import axios from 'axios';

import { useAuth } from '../api/AuthContext';
import QuestionContainer from '../Components/QuestionContainer';
import instance from '../api/CustomAxios';

const Question = () => {
  const axiosInstance = instance();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const [selectedLevel, setSelectedLevel] = useState('all');
  const [questionData, setQuestionData] = useState([]);
  const [idx, setIdx] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');
  const [pageButton, setPageButton] = useState('next');
  const [search, setSearch] = useState(false);

  const itemsPerPage = 5;

  const handleNextPage = () => {
    setIdx(prevIdx => prevIdx + itemsPerPage);
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (idx > 0) {
      setPageButton('prev');
      setIdx(prevIdx => prevIdx - itemsPerPage);
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let levelParam =
          selectedLevel === 'all' ? -1 : parseInt(selectedLevel.slice(3));
        const response = await axios.get(
          `http://localhost:8081/question?button=${pageButton}&level=${levelParam}&index=${idx}&size=${itemsPerPage}`,
          { withCredentials: true }
        );
        setQuestionData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [currentPage, idx, selectedLevel, pageButton]);

  const handleLevelChange = event => {
    setSelectedLevel(event.target.value);
    setIdx(0);
    setCurrentPage(1);
  };

  const handlequery = e => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    setSearch(true);
  };

  const goToEditor = questionId => {
    if (isLoggedIn) {
      axiosInstance
        .get(`/question/${questionId}`, { withCredentials: true })
        .then(response => {
          if (response.data.status === 200) {
            const uuid = response.data.data;
            window.location.href = `https://ide.hong-sam.online/${uuid}/q${questionId}`;
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      alert('로그인을 해주세요.');
      navigate('/login');
    }
  };

  const filterQuestions = () => {
    let filtered = questionData;

    if (selectedLevel !== 'all') {
      filtered = filtered.filter(
        question =>
          parseInt(question.level) === parseInt(selectedLevel.slice(3))
      );
    }

    if (query.trim() !== '' && search) {
      filtered = filtered.filter(question => question.title.includes(query));
    }

    return filtered;
  };

  const filteredQuests = filterQuestions();

  return (
    <div className={styles.QuestionWrapper}>
      <Nav />
      <div className={styles.Question}>
        <div className={styles.findingQuestion}>
          <select
            className={styles.selectingLevel}
            onChange={handleLevelChange}
            value={selectedLevel}
          >
            {['all', 'Lv.0', 'Lv.1', 'Lv.2'].map((option, index) => (
              <option key={index} value={option}>
                {option === 'all' ? '전체' : `${option}`}
              </option>
            ))}
          </select>
          <input
            className={styles.searchingTitle}
            placeholder="문제 제목을 검색하세요."
            onChange={handlequery}
            onKeyUp={e => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <button className={styles.searchingBtn} onClick={handleSearch}>
            검색
          </button>
        </div>
        <QuestionContainer
          currentQuest={filteredQuests}
          goToEditor={goToEditor}
        />
        <div className={styles.pageBtns}>
          <button onClick={handlePrevPage}>◀️</button>
          <button onClick={handleNextPage}>▶️</button>
        </div>
      </div>
    </div>
  );
};

export default Question;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Question.module.css';
import Nav from '../Components/Nav';

import { useAuth } from '../api/AuthContext';
import QuestionContainer from '../Components/QuestionContainer';
import QuestionPageBtn from '../Components/QuestionPageBtn';

import instance from '../api/CustomAxios';

const Question = () => {
  const axiosInstance = instance();
  const navigate = useNavigate();

  const { isLoggedIn, userData } = useAuth();

  /* IDE로 이동하는 함수 */
  const goToEditor = (questionId) => {
    /* 로그인 시 uuid와 questionId를 가지고 이동 */
    if (isLoggedIn) {
      axiosInstance
        .get(`/question/${questionId}`, {
          withCredentials: true,
        })
        .then((response) => {
          if (response.data.status === 200) {
            const uuid = response.data.data;
            window.location.href = `https://ide.hong-sam.online/${uuid}/q${questionId}`;
          }
        })
        .catch((error) => {
          console.log(error);
        });
      /* 미로그인 시 로그인 페이지로 이동 */
    } else {
      alert('로그인을 해주세요.');
      navigate('/login');
    }
  };

  /* 레벨 선택 상태 */
  const [selectedLevel, setSelectedLevel] = useState('all');

  /* 레벨 선택 이벤트 핸들러 */
  const handleLevelChange = (event) => {
    setSelectedLevel(event.target.value);
    setIdx(1); // 레벨이 변경될 때마다 idx 초기화
    setStart(0); // 레벨이 변경될 때마다 start 초기화
  };

  /* 레벨 선택 옵션 */
  const levelOptions = ['all', 'Lv.0', 'Lv.1', 'Lv.2'];
  const [questionData, setQuestionData] = useState([]);

  const [idx, setIdx] = useState(1);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [start, setStart] = useState(0);

  useEffect(() => {
    axiosInstance
      .get(`question?button=next&level=-1&index=${idx}&size=5`)
      .then((response) => {
        setQuestionData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [currentPage, idx]);

  const handleNextPage = () => {
    setStart((prevStart) => prevStart + itemsPerPage);
    setIdx((prevIdx) => prevIdx + itemsPerPage);
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (idx > 1) {
      setStart((prevStart) => prevStart - itemsPerPage);
      setIdx((prevIdx) => prevIdx - itemsPerPage);
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const [query, setQuery] = useState('');
  const handlequery = (e) => {
    setQuery(e.target.value);
  };

  const [search, setSearch] = useState(false);

  const handleSearch = () => {
    setSearch(true);
  };

  // 레벨 및 검색어를 고려한 필터링 함수
  const filterQuestions = () => {
    let filtered = questionData;

    // 레벨 필터링
    if (selectedLevel !== 'all') {
      filtered = filtered.filter(
        (question) =>
          parseInt(question.level) === parseInt(selectedLevel.slice(3))
      );
    }

    // 검색어 필터링
    if (query.trim() !== '' && search) {
      filtered = filtered.filter((question) => question.title.includes(query));
    }
    return filtered;
  };

  // 현재 필터된 문제 목록
  const filteredQuests = filterQuestions();

  return (
    <div>
      <Nav />
      <div className={styles.Question}>
        <div className={styles.findingQuestion}>
          <select
            className={styles.selectingLevel}
            onChange={handleLevelChange}
            value={selectedLevel}
          >
            {levelOptions.map((option, index) => (
              <option key={index} value={option}>
                {option === 'all' ? '전체' : `${option}`}
              </option>
            ))}
          </select>
          <input
            className={styles.searchingTitle}
            placeholder="풀고 싶은 문제 제목을 검색하세요."
            onChange={handlequery}
            onKeyUp={(e) => {
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

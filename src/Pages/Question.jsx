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
    fetchData('next', event.target.value, 1, 5);
  };

  /* 레벨 선택 옵션 */
  const levelOptions = ['all', 'Lv.0', 'Lv.1', 'Lv.2'];
  const [questionData, setQuestionData] = useState([]);

  const fetchData = async (button, level, index, size) => {
    try {
      const response = await axiosInstance.get('/question', {
        params: {
          button,
          level: level === 'all' ? -1 : parseInt(level.slice(3)),
          index,
          size,
        },
      });

      setQuestionData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData('next', 'all', 1, 5); // 초기 데이터 요청은 무조건 5개로 수정
  }, []);

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

  /* 페이지 당 문제 개수 */
  const questsPerPage = 10;

  /* 현재 페이지의 기본값 */
  const [currentPage, setCurrentPage] = useState(1);

  /* 페이지의 마지막 문제 인덱스 */
  const indexOfLastQuest = currentPage * questsPerPage;

  /* 페이지의 첫 번째 문제 인덱스 */
  const indexOfFirstQuest = indexOfLastQuest - questsPerPage;

  /* 한 페이지 당 들어갈 문제의 개수 */
  const currentQuest = filteredQuests.slice(
    indexOfFirstQuest,
    indexOfLastQuest
  );

  /* 현재 페이지 상태 변경 */
  const handlePageChange = (direction) => {
    const newPageNumber =
      direction === 'next' ? currentPage + 1 : currentPage - 1;
    setCurrentPage(newPageNumber);

    const offset =
      direction === 'next' ? indexOfLastQuest + 1 : indexOfFirstQuest - 5;
    fetchData(direction, selectedLevel, offset, 5);
  };

  /* 페이지의 마지막 문제 인덱스가 전체 문제 개수보다 작을 경우 다음 페이지로 이동 가능 */
  const totalQuests = questionData.length;
  // 페이지의 마지막 문제 인덱스가 전체 문제 개수와 같거나 작을 경우 다음 페이지로 이동 불가능
  const canGoToNextPage =
    indexOfLastQuest < totalQuests && indexOfLastQuest < filteredQuests.length;

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
          currentQuest={currentQuest}
          goToEditor={goToEditor}
        />
        <QuestionPageBtn
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          canGoToNextPage={canGoToNextPage}
        />
      </div>
    </div>
  );
};

export default Question;

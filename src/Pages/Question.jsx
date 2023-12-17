import React, { useState, useEffect } from 'react';
import styles from './Question.module.css';
import Nav from '../Components/Nav';
import { useAuth } from '../api/AuthContext';
import QuestionContainer from '../Components/QuestionContainer';
import instance from '../api/CustomAxios';

const Question = () => {
  const axiosInstance = instance();
  const { isLoggedIn } = useAuth();

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
      // 로그인 페이지로 이동하거나 다른 적절한 처리를 수행할 수 있습니다.
    }
  };

  /* 레벨 선택 상태 */
  const [selectedLevel, setSelectedLevel] = useState('all');

  /* 레벨 선택 이벤트 핸들러 */
  const handleLevelChange = (event) => {
    setSelectedLevel(event.target.value);
  };

  /* 레벨 선택 옵션 */
  const levelOptions = ['all', 'Lv.0', 'Lv.1', 'Lv.2'];
  const [questionData, setQuestionData] = useState([]);

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

  useEffect(() => {
    const firstData = async () => {
      const newLevel =
        selectedLevel === 'all' ? -1 : parseInt(selectedLevel.slice(3));

      try {
        const response = await axiosInstance.get(
          `/question?button=next&level=${newLevel}&index=${pageIdx}&size=${pageSize}`
        );

        if (response.data.status === 200) {
          setQuestionData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    firstData();
  }, []);

  const fetchData = async (direction) => {
    const newLevel =
      selectedLevel === 'all' ? -1 : parseInt(selectedLevel.slice(3));

    try {
      const response = await axiosInstance.get(
        `/question?button=${direction}&level=${newLevel}&index=${pageIdx}&size=${pageSize}`
      );

      if (response.data.status === 200) {
        setQuestionData(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [pageIdx, setPageIdx] = useState(1);
  const pageSize = 5;

  const handlePageChange = (direction) => {
    if (direction === 'previous' && pageIdx > 1) {
      setPageIdx(pageIdx - 5);
      fetchData(direction);
    } else if (direction === 'next') {
      setPageIdx(pageIdx + 5);
      fetchData(direction);
    }
  };

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
          <button
            onClick={() => {
              console.log('Prev Button Clicked');
              handlePageChange('previous');
            }}
          >
            ◀️
          </button>
          <button
            onClick={() => {
              console.log('Next Button Clicked');
              handlePageChange('next');
            }}
          >
            ▶️
          </button>
        </div>
      </div>
    </div>
  );
};

export default Question;

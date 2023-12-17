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

  const goToEditor = (questionId) => {
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
    } else {
      alert('로그인을 해주세요.');
      navigate('/login');
    }
  };

  const [selectedLevel, setSelectedLevel] = useState('all');
  const handleLevelChange = (event) => {
    setSelectedLevel(event.target.value);
    fetchData('next', event.target.value, 1, 5);
  };

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
    fetchData('next', 'all', 1, 5);
  }, []);

  const [query, setQuery] = useState('');
  const handleQuery = (e) => {
    setQuery(e.target.value);
  };

  const [search, setSearch] = useState(false);
  const handleSearch = () => {
    setSearch(true);
  };

  const filterQuestions = () => {
    let filtered = questionData;

    if (selectedLevel !== 'all') {
      filtered = filtered.filter(
        (question) =>
          parseInt(question.level) === parseInt(selectedLevel.slice(3))
      );
    }

    if (query.trim() !== '' && search) {
      filtered = filtered.filter((question) => question.title.includes(query));
    }
    return filtered;
  };

  const filteredQuests = filterQuestions();

  const questsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastQuest = currentPage * questsPerPage;
  const indexOfFirstQuest = indexOfLastQuest - questsPerPage;
  const currentQuest = filteredQuests.slice(
    indexOfFirstQuest,
    indexOfLastQuest
  );

  const totalQuests = questionData.length;
  const canGoToNextPage =
    indexOfLastQuest < totalQuests &&
    indexOfLastQuest < filteredQuests.length &&
    filteredQuests.length > questsPerPage;

  console.log(canGoToNextPage);

  // 디버깅용 로그 추가
  console.log('Direction:', direction);
  console.log('New Page Number:', newPageNumber);
  console.log('Offset:', offset);
  console.log('Can Go To Next Page:', canGoToNextPage);

  const handlePageChange = (direction) => {
    const newPageNumber =
      direction === 'next' ? currentPage + 1 : currentPage - 1;
    setCurrentPage(newPageNumber);

    const offset = direction === 'next' ? indexOfLastQuest : indexOfFirstQuest;
    fetchData(direction, selectedLevel, offset, 5);
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
            onChange={handleQuery}
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

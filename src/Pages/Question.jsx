import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Question.module.css';
import Nav from '../Components/Nav';

import { useAuth } from '../api/AuthContext';
import QuestionContainer from '../Components/QuestionContainer';
import instance from '../api/CustomAxios';
import { getCookie, setCookie } from '../api/Cookie';

const Question = () => {
  const axiosInstance = instance();
  const navigate = useNavigate();

  const { isLoggedIn } = useAuth();

  /* IDE로 이동하는 함수 */
  const goToEditor = questionId => {
    /* 로그인 시 uuid와 questionId를 가지고 이동 */
    if (isLoggedIn) {
      axiosInstance
        .get(`/question/${questionId}`, {
          withCredentials: true,
        })
        .then(response => {
          if (response.data.status === 200) {
            const uuid = response.data.data;
            setCookie('Authorization', localStorage.getItem('Authorization'), {
              path: '/',
            });
            console.log(getCookie('Authorization'));
            window.location.href = `https://ide.hong-sam.online/${uuid}/q${questionId}`;
          }
        })
        .catch(error => {
          console.log(error);
        });
      /* 미로그인 시 로그인 페이지로 이동 */
    } else {
      alert('로그인을 해주세요.');
      navigate('/login');
    }
  };

  const itemPerPage = 5;
  const [idx, setIdx] = useState(0);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [questionData, setQuestionData] = useState([]);
  const [pageButton, setPageButton] = useState('next');
  const [isPrevDisabled, setIsPrevDisabled] = useState(false);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState('');

  /* 레벨 선택 상태 */
  const [selectedLevel, setSelectedLevel] = useState('all');
  const levelOptions = ['all', 'Lv.0', 'Lv.1', 'Lv.2'];

  /* 레벨 변경 */
  const handleLevelChange = event => {
    setSelectedLevel(event.target.value);

    /* 레벨 변경 시 파라미터 및 페이지 번호 초기화 */
    setCurrentPage(1);
    setPageButton('next');
    setIdx(0);
    setQuery('');
  };

  /* 검색어 입력 */
  const handleQuery = e => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    setPageButton('next');
    setCurrentPage(1);
    setIdx(0);

    let levelParam = parseInt(selectedLevel.slice(3));

    if (selectedLevel === 'all') {
      levelParam = -1;
    }
    setSearch(true);
  };

  /* 다음 페이지 버튼 */
  const handleNextPage = () => {
    if (currentPage >= 1) {
      setPageButton('next');
      setCurrentPage(prevPage => prevPage + 1);

      const first = data[data.length - 1];
      setIdx(first.id);
    }
  };

  /* 이전 페이지 버튼 */
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
      setPageButton('previous');

      const last = data[0];

      if (last) {
        setIdx(last.id);
      }
    }
  };

  /* 레벨 변경 || 첫 렌더링 시 요청 */
  useEffect(() => {
    let levelParam = parseInt(selectedLevel.slice(3));

    if (selectedLevel === 'all') {
      levelParam = -1;
    }

    let url = `/question?button=${pageButton}&level=${levelParam}&index=${idx}&size=${itemPerPage}`;

    if (query.trim() !== '') {
      url = `/question?button=${pageButton}&level=${levelParam}&index=${idx}&size=${itemPerPage}&filter=${query}`;
    }

    axiosInstance
      .get(url)
      .then(response => {
        if (currentPage !== 1 && response.data.length === 0) {
          setIsPrevDisabled(false);
          setIsNextDisabled(true);
        } else if (
          pageButton === 'previous' &&
          currentPage === 1 &&
          response.data.length < 5
        ) {
          setIsPrevDisabled(true);
          setIsNextDisabled(false);
        } else if (response.data.length === 0) {
          setIsNextDisabled(true);
          setIsPrevDisabled(true);
        } else if (currentPage === 1 && response.data.length < 5) {
          setIsPrevDisabled(true);
          setIsNextDisabled(true);
        } else if (response.data.length < 5) {
          setIsPrevDisabled(false);
          setIsNextDisabled(true);
        } else if (currentPage === 1) {
          setIsPrevDisabled(true);
          setIsNextDisabled(false);
        } else {
          setIsPrevDisabled(false);
          setIsNextDisabled(false);
        }
        setData(response.data);
        setQuestionData(response.data);
        setSearch(false);
      })
      .catch(error => {
        console.error(error);
      });
  }, [selectedLevel, pageButton, currentPage, idx, search]);

  /* 초기화 */
  const searchReset = () => {
    setCurrentPage(1);
    setIdx(0);
    setSelectedLevel('all');
    setPageButton('next');
    setQuery('');
  };

  return (
    <div className={styles.QuestionWrapper}>
      <Nav />
      <div className={styles.Question}>
        <div className={styles.findingQuestion}>
          <select
            className={styles.selectingLevel}
            value={selectedLevel}
            onChange={handleLevelChange}
          >
            {levelOptions.map((option, index) => (
              <option key={index} value={option}>
                {option === 'all' ? '전체' : `${option}`}
              </option>
            ))}
          </select>
          <input
            className={styles.searchingTitle}
            placeholder="문제 제목을 검색하세요."
            onChange={handleQuery}
            value={query}
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
        {
          <QuestionContainer
            currentQuest={questionData}
            goToEditor={goToEditor}
          />
        }
        <button className={styles.resetBtn} onClick={searchReset}>
          검색 초기화
        </button>
        <div className={styles.pageBtns}>
          <button onClick={handlePrevPage} disabled={isPrevDisabled}>
            ◀️
          </button>
          <button onClick={handleNextPage} disabled={isNextDisabled}>
            ▶️
          </button>
        </div>
      </div>
    </div>
  );
};

export default Question;

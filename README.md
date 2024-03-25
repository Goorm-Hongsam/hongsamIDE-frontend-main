# [✅ Hongsam IDE main](https://main.hong-sam.online/)
> Hongsam IDE는 코딩테스트용 Web IDE입니다.

<a href="https://main.hong-sam.online/">
<img width="1069" alt="스크린샷 2024-03-25 오후 5 03 32" src="https://github.com/summermong/another-world-test/assets/124887974/8d6ca44e-d09f-401e-aaab-24d10c18ed50">
</a>

1. 회원가입 및 로그인을 해주세요.
2. 원하는 문제를 찾고 클릭해 IDE 페이지로 이동하세요.
3. 문제를 읽고 코드를 작성한 후 제출해 보세요.
4. 코드를 저장하거나 테스트 케이스를 확인할 수 있어요.
<hr />


<!-- TOC -->
### Contents
* [Hongsam IDE main 시연](#Hongsam-IDE-main-시연)
* [Hongsam IDE main 기술 스택](#Hongsam-IDE-main-기술-스택)
* [Hongsam IDE main 정보](#Hongsam-IDE-main-정보)
<br />
<!-- TOC -->




## Hongsam IDE main 시연
1. 회원가입 및 로그인
   
https://github.com/Goorm-Hongsam/hongsamIDE-frontend-main/assets/124887974/e058fbb2-dfe5-4175-ad40-889be563c3fc

2. 유저 정보 수정

https://github.com/Goorm-Hongsam/hongsamIDE-frontend-main/assets/124887974/52614177-72a5-4537-8b4b-7de2496147d8

3. 페이지네이션

https://github.com/Goorm-Hongsam/hongsamIDE-frontend-main/assets/124887974/b3b891db-5c50-4230-94d8-e0093a383011

4. 다크모드

https://github.com/Goorm-Hongsam/hongsamIDE-frontend-main/assets/124887974/072896d4-905f-4bd0-974e-d1dbdcb5ed14


<br />


## Hongsam IDE main 기술 스택
| Stack                                                                                                               | Desc                         |
| :------------------------------------------------------------------------------------------------------------------ | :--------------------------- |
| <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white"/>                        | React                        |
| <img src="https://img.shields.io/badge/CSS modules-000000?style=flat&logo=CSSModules&logoColor=white"/>             | CSS 스타일링                   |
| <img src="https://img.shields.io/badge/React hook form-EC5990?style=flat&logo=ReactHookForm&logoColor=white"/>      | form 관리                     |
| <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=Axios&logoColor=white"/>                        | http 통신 및 모듈화, 인터셉터 구현  |
| <img src="https://img.shields.io/badge/React Router-CA4245?style=flat&logo=ReactRouter&logoColor=white"/>           | 페이지 이동                     |
| <img src="https://img.shields.io/badge/react cookie-D4AA00?style=flat&logo=reactcookie&logoColor=white"/>          | 도메인 간 쿠키 공유               |

<br />


## Hongsam IDE main 정보
* [배포 링크](https://main.hong-sam.online/)
  * 현재 서버는 닫힌 상태입니다. 🥲
  
* 개발 기간

23.09 ~ 23.10 (2개월)

* 인프라 구조
![image](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FDliUZ%2FbtsyMc1otHV%2FTq7LccQDTvRqSUO1E4V7ok%2Fimg.png)
 
* 개발 인원

|<img src="https://avatars.githubusercontent.com/u/124887974?v=4" width="200" height="200" /> | <img src="https://avatars.githubusercontent.com/u/56907263?v=4" width="200" height="200" /> |
|:---:|:---:|
|summermong(황윤)|ganggyunggyu(강경규)|
|main 페이지 기능 담당 | Web IDE 기능 담당|


|<img src="https://avatars.githubusercontent.com/u/127951186?v=4" width="200" height="200" /> | <img src="https://avatars.githubusercontent.com/u/69641554?v=4" width="200" height="200" /> |
|:---:|:---:|
|dlehddn(이동우)| seoyeoning(박서연)|
|CICD, 문제 DB, Web IDE | 회원가입 및 로그인 |



* 코드 컨벤션
  | Type     | Desc                                                                          |
  | :------- | :---------------------------------------------------------------------------- |
  | FEAT     | 새로운 기능 추가                                                                  |
  | DESIGN   | CSS 기능 수정                                                                   |
  | FIX      | 버그 수정                                                                       |
  | DOCS     | 문서 수정                                                                       |
  | STYLE    | 스타일 관련 기능(코드 포맷팅, 세미콜론 누락, 코드 자체의 변경이 없는 경우)                     |
  | REFACTOR  | 코드 리팩토링                                                                    |
  | TEST     | 테스트 코드 추가                                                                  |
  | CHORE    | 빌드 업무 수정, 패키지 매니저 수정(ex .gitignore 수정 같은 경우)                         |
  
<details>
  <summary><b>폴더 구조</b></summary>
    
```📦src
 ┣ 📂Components
 ┃ ┣ 📜DarkModeToggle.jsx
 ┃ ┣ 📜DarkModeToggle.module.css
 ┃ ┣ 📜Nav.jsx
 ┃ ┣ 📜Nav.module.css
 ┃ ┣ 📜PasswordConfirm.jsx
 ┃ ┣ 📜PasswordConfirm.module.css
 ┃ ┣ 📜QuestionContainer.jsx
 ┃ ┣ 📜UserInfoModifyModal.jsx
 ┃ ┗ 📜UserInfoModifyModal.module.css
 ┣ 📂Pages
 ┃ ┣ 📜Chat.jsx
 ┃ ┣ 📜Chat.module.css
 ┃ ┣ 📜Login.jsx
 ┃ ┣ 📜Login.module.css
 ┃ ┣ 📜Main.jsx
 ┃ ┣ 📜Main.module.css
 ┃ ┣ 📜Mypage.jsx
 ┃ ┣ 📜Mypage.module.css
 ┃ ┣ 📜Question.jsx
 ┃ ┣ 📜Question.module.css
 ┃ ┣ 📜Signup.jsx
 ┃ ┗ 📜Signup.module.css
 ┣ 📂api
 ┃ ┣ 📜AuthContext.jsx
 ┃ ┣ 📜Cookie.jsx
 ┃ ┗ 📜CustomAxios.js
 ┣ 📂favicon
 ┃ ┗ 📜favicon-16x16.png
 ┣ 📜App.css
 ┣ 📜App.jsx
 ┣ 📜main.jsx
 ┗ 📜reset.css
```

</details>

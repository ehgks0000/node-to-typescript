# 몽고 express node 서버를 typescript로 전환!

기존 JS 서버 : https://github.com/ehgks0000/express_back

## Setting

1. npm i
2. root 폴더에 .env 파일 생성
3. MONGODB, JWT_SECRET_KEY, EXPRESS_SESSION 등록
4. SNS(구글, 네이버, 카카오) CLIENT_ID, CLIENT_SECRET, REDIRECT_URIS 등록

5. npm run dev
6. npm start(build 후 pm2 start)

## 기술 스택

- typescript node && express
- DB : mongoose
- Server : pm2

## 사용 한 라이브러리

- ts-node && ts-node-dev
- env
  - cross-env && dotenv
- passport
  - passport-google-oauth20
  - passport-kakao
  - passport-naver
- jsonwebtoken(jwt)
- express-session
- body-parser
- cookie-parser
- cors
- helmet

## Router

### users.ts

- get 유저들 목록 : {{url}}/users
- get 내 프로필 보기 : {{url}}/me
- 로그인
  - get 구글 로그인 : {{url}}/users/auth/google
  - get 네이버 로그인 : {{url}}/users/auth/naver
  - get 카카오 로그인 : {{url}}/users/auth/kakao
- 유저들 구하기 : {{url}}/users
- 유저들 구하기 : {{url}}/users

### momos.ts

- get getMemo : {{url}}/memos/
- get getMemobyId : {{rul}}/memos:memoId
- post writeMemo : {{url}}/memos

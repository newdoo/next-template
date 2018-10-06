## How to use

인스톨 및 실행:
```bash
yarn install
yarn dev:web
yarn dev:stop
yarn dev:chatting
yarn dev:deploy
```

클라이언트
src/client
```bash
src/client/components  컴포넌트(객체)
src/client/containers  컨테이너, Store 연결
src/client/lib         라이브러리
src/client/pages       페이지
src/client/store       스토어 관리
src/client/styles      전역 스타일 관리
src/client/static      이미지 파일 
```

서버
src/server
```bash
src/server/chatting     채팅 서버
src/server/game         게임 서버
src/server/mongoDB      mongoDB 관리
src/server/utils        유틸
src/server/web          Web 서버
```

사용된 라이브러리
```bash
next.js           서버사이드 react (v7.0.1)
material-ui       ui
crypto-promise    암호화 config.json 참조
isomorphic-fetch  back-end + eos 와 http 통신
express           back-end용 http web 서버 시작
```
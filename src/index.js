import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import { 
  registerUser, 
  getUserReviews 
} from "./controllers/user.controller.js";
import { 
  addStore, 
  addReview, 
  getStoreReviews 
} from "./controllers/store.controller.js";
import { 
  addMission, 
  addUserMission, 
  getStoreMissions, 
  getUserMissions,
  completeUserMission
} from "./controllers/mission.controller.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 회원가입
app.post("/api/v1/users/signup", registerUser);

// 가게 추가
app.post("/api/v1/stores/addStore", addStore);

// 리뷰 추가
app.post("/api/v1/stores/addReview", addReview);

// 미션 추가
app.post("/api/v1/missions/addMission", addMission);

// 미션 도전
app.post("/api/v1/missions/challenge", addUserMission);

// 가게 리뷰 조회
app.get("/api/v1/stores/:storeId/reviews", getStoreReviews);

// 내가 쓴 리뷰 조회
app.get("/api/v1/users/:userId/reviews", getUserReviews);

// 특정 가게의 미션 조회
app.get("/api/v1/missions/:storeId/getStoreMissions", getStoreMissions);

// 도전중인 미션 목록
app.get("/api/v1/missions/:userId/getUserMissions", getUserMissions);

// 미션 완료 처리
app.patch("/api/v1/missions/complete", completeUserMission);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
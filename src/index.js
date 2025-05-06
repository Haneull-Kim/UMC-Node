import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";

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

import { responseHandler } from "./middlewares/response.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(responseHandler);

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup({}, {
    swaggerOptions: {
      url: "/openapi.json",
    },
  })
);

app.get("/openapi.json", async (req, res, next) => {
  // #swagger.ignore = true
  const options = {
    openapi: "3.0.0",
    disableLogs: true,
    writeOutputFile: false,
  };
  const outputFile = "/dev/null"; 
  const routes = ["./src/index.js", "./src/controllers/*.js"];
  const doc = {
    info: {
      title: "UMC 8th",
      description: "UMC 8th Node.js 테스트 프로젝트입니다.",
    },
    host: "localhost:3000",
  };

  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result ? result.data : null);
});

app.get("/", (req, res) => {
  // #swagger.ignore = true
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
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
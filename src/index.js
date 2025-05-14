import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";

import { 
  registerUser, 
  getUserReviews,
  changeUserInfo
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

import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import session from "express-session";
import passport from "passport";
import { googleStrategy } from "./auth.config.js";
import { kakaoStrategy } from "./auth.config.js";
import { prisma } from "./db.config.js";

dotenv.config();

passport.use(googleStrategy);
passport.use(kakaoStrategy);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

const app = express();
const port = process.env.PORT;

app.use(responseHandler);

app.use(cors()); 
app.use(express.static("public")); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 

app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup({}, {
    swaggerOptions: {
      url: "/openapi.json",
    },
  })
);

app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, // ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

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
  console.log(req.user);
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

// 회원 정보 수정
app.patch("/api/v1/users/:userId/changeInfo", changeUserInfo);

// google 로그인
app.get("/oauth2/login/google", passport.authenticate("google"));

app.get(
  "/oauth2/callback/google",
  passport.authenticate("google", {
    failureRedirect: "/oauth2/login/google",
    failureMessage: true,
  }),
  (req, res) => res.redirect("/")
);

// kakao 로그인
app.get("/oauth2/login/kakao", passport.authenticate("kakao"));

app.get(
  "/oauth2/callback/kakao",
  passport.authenticate("kakao", {
    failureRedirect: "/oauth2/login/kakao",
    failureMessage: true,
  }),
  (req, res) => res.redirect("/")
);
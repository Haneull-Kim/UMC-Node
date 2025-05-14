import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as KakaoStrategy } from "passport-kakao";
import { prisma } from "./db.config.js";

dotenv.config();

export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/oauth2/callback/google",
    scope: ["email", "profile"],
    state: true,
  },
  (accessToken, refreshToken, profile, cb) => {
    return googleVerify(profile)
      .then((user) => cb(null, user))
      .catch((err) => cb(err));
  }
);

const googleVerify = async (profile) => {
  const email = profile.emails?.[0]?.value;
  if (!email) {
    throw new Error(`profile.email was not found: ${profile}`);
  }

  const user = await prisma.user.findFirst({ where: { email } });
  if (user !== null) {
    return { id: user.id, email: user.email, name: user.name };
  }

  const created = await prisma.user.create({
    data: {
      email,
      name: profile.displayName,
      gender: null,
      birth: null,
      address: null,
      status: 1,
      createdAt: new Date(),
      updatedAt: null,
      inactiveDate: null,
      phoneNumber: null,
      phoneAuth: 0,
      image: null
    },
  });

  return { id: created.id, email: created.email, name: created.name };
};

export const kakaoStrategy = new KakaoStrategy(
  {
    clientID: process.env.PASSPORT_KAKAO_CLIENT_ID,
    callbackURL: "http://localhost:3000/oauth2/callback/kakao",
    scope: ["profile_nickname", "profile_image", "account_email"],
    state: true,
  },
  (accessToken, refreshToken, profile, cb) => {
    return kakaoVerify(profile)
      .then((user) => cb(null, user))
      .catch((err) => cb(err));
  }
);

const kakaoVerify = async (profile) => {

    const email = profile._json.kakao_account?.email;
    const name = profile._json.properties?.nickname || "카카오 사용자";
    const image = profile._json.properties?.profile_image || null;

    if (!email) {
        throw new Error(`profile.email was not found: ${profile}`);
    }

    const user = await prisma.user.findFirst({ where: { email } });
    if (user !== null) {
        return { id: user.id, email: user.email, name: user.name };
    }

    const created = await prisma.user.create({
        data: {
            email,
            name: name,
            gender: null,
            birth: null,
            address: null,
            status: 1,
            createdAt: new Date(),
            updatedAt: null,
            inactiveDate: null,
            phoneNumber: null,
            phoneAuth: 0,
            image: image,
        },
    });

    return { id: created.id, email: created.email, name: created.name };
};

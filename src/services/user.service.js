import { responseFromUser } from "../dtos/user.dto.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
} from "../repositories/user.repository.js";

export const userSignUp = async (data) => {
  const joinUserId = await addUser({
    name: data.name,
    gender: data.gender,
    birth: data.birth,
    address: data.address,
    email: data.email,
    phoneNumber: data.phoneNumber
  });

  if (joinUserId === null) {
    throw new Error("이미 존재하는 이메일입니다.");
  }

  for (const preference of data.preferences) {
    try {
      await setPreference(joinUserId, preference);
    } catch (err) {
      console.error(`선호 카테고리 설정 실패: ${err.message}`);
    }
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};
import {
  bodyToUser,
  bodyToUserOptions,
  bodyToUserFoods,
  bodyToChangeUser
} from "../dtos/user.dto.js";

import {
  isEmailDuplicated,
  addUserRepository,
  addUserOptions,
  addUserFoods,
  getUserReviewsRepository,
  updateUserInfoRepository,
  checkUserExists
} from "../repositories/user.repository.js";

import { 
  DuplicateUserEmailError, 
  GetUserReviewsError,
  MissingUserIdError,
  UserNotFoundError
} from "../errors/user.error.js";

export const registerUserService = async (body) => {
  const duplicated = await isEmailDuplicated(body.email);
  
  if (duplicated) {
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", { email: body.email });
  }

  const userDTO = bodyToUser(body);
  const userId = await addUserRepository(userDTO);

  if (body.optionCategoryIds?.length > 0) {
    const userOptions = bodyToUserOptions(userId, body.optionCategoryIds);
    await addUserOptions(userOptions);
  }

  if (body.foodCategoryIds?.length > 0) {
    const userFoods = bodyToUserFoods(userId, body.foodCategoryIds);
    await addUserFoods(userFoods);
  }

  return userId;
};

export const getUserReviewsService = async (userId, cursor) => {

  if (!userId || isNaN(Number(userId))) {
    throw new MissingUserIdError("userId가 누락되었거나 유효하지 않습니다.", { userId, cursor });
  }

  try {
    const { reviews, nextCursor } = await getUserReviewsRepository(userId, cursor); 
    return { reviews, nextCursor };
  } catch (err) {
    throw new GetUserReviewsError("리뷰 목록 조회 중 오류가 발생했습니다.", {
      userId,
      cursor,
      originalError: err.message,
    });
  }
};

export const changeUserInfoService = async (userId, body) => {

  if (!userId || isNaN(Number(userId))) {
    throw new MissingUserIdError("userId가 누락되었거나 유효하지 않습니다.", { userId });
  }

  const userExists = await checkUserExists(userId);
  
  if (!userExists) {
    throw new UserNotFoundError("사용자가 존재하지 않습니다.", {
      userId: userId
    });
  }

  const changeUserDTO = bodyToChangeUser(body);
  const result = await updateUserInfoRepository(userId, changeUserDTO);

  return result;
};
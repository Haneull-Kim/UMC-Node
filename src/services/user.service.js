import {
  bodyToUser,
  bodyToUserOptions,
  bodyToUserFoods,
} from "../dtos/user.dto.js";

import {
  isEmailDuplicated,
  addUserRepository,
  addUserOptions,
  addUserFoods,
  getUserReviewsRepository
} from "../repositories/user.repository.js";

export const registerUserService = async (body) => {
  const duplicated = await isEmailDuplicated(body.email);
  
  if (duplicated) {
    throw new Error("이미 사용 중인 이메일입니다.");
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
  try {
    const { reviews, nextCursor } = await getUserReviewsRepository(userId, cursor); 
    return { reviews, nextCursor };
  } catch (err) {
    throw new Error(`리뷰 목록 조회 중 오류가 발생했습니다. (${err})`);
  }
};

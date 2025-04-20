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

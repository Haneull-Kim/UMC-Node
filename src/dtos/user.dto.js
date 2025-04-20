export const bodyToUser = (body) => ({
  name: body.name,
  gender: body.gender,
  birth: body.birth,
  address: body.address,
  status: body.status ?? 1,
  createdAt: new Date(),
  updatedAt: new Date() || null,
  inactiveDate: new Date() || null,
  email: body.email,
  phoneNumber: body.phoneNumber,
  phoneAuth: body.phoneAuth ?? 0,
  image: body.image || null
});

export const bodyToUserOptions = (userId, optionCategoryIds) =>
  optionCategoryIds.map((optionCategoryId) => ({
    userId,
    optionCategoryId
  }));

export const bodyToUserFoods = (userId, foodCategoryIds) =>
  foodCategoryIds.map((foodCategoryId) => ({
    userId,
    foodCategoryId
  }));

import { prisma } from "../db.config.js";
import { UserNotFoundError } from "../errors/user.error.js";

export const isEmailDuplicated = async (email) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true }
    });
    
    return !!user;
  } catch (err) {
    throw new Error(`이메일 중복 확인 중 오류가 발생했습니다. (${err})`);
  }
};

export const addUserRepository = async (userDTO) => {
  try {
    const createdUser = await prisma.user.create({
      data: {
        name: userDTO.name,
        gender: userDTO.gender,
        birth: userDTO.birth,
        address: userDTO.address,
        status: userDTO.status,
        createdAt: userDTO.createdAt,
        email: userDTO.email,
        phoneNumber: userDTO.phoneNumber,
        phoneAuth: userDTO.phoneAuth,
        image: userDTO.image,
      },
    });
  
    return createdUser.id.toString();
  } catch (err) {
    throw new Error(`회원 등록 중 오류가 발생했습니다. (${err})`);
  }
};

export const addUserOptions = async (userOptions) => {
  try {
    await prisma.userOption.createMany({
      data: userOptions.map((opt) => ({
        userId: opt.userId,
        optionCategoryId: opt.optionCategoryId,
      })),
    });
  } catch (err) {
    throw new Error(`사용자 옵션 저장 중 오류가 발생했습니다. (${err})`);
  }
};

export const addUserFoods = async (userFoods) => {
  try {
    await prisma.userFood.createMany({
      data: userFoods.map((food) => ({
        userId: food.userId,
        foodCategoryId: food.foodCategoryId,
      })),
    });
  } catch (err) {
    throw new Error(`사용자 음식 저장 중 오류가 발생했습니다. (${err})`);
  }
};

export const getUserReviewsRepository = async (userId, cursor) => {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        userId: BigInt(userId),
        ...(cursor && { id: { gt: cursor } }) // 커서가 존재하면 id > cursor 조건 추가
      },
      orderBy: { createdAt: "desc" }, 
      include: {
        store: { 
          select: { 
            name: true 
          }
        }
      },
      take: 10 
    });

    const nextCursor = reviews.length ? reviews[reviews.length - 1].id : null;

    return { reviews, nextCursor };
  } catch (err) {
    throw new Error(`리뷰 조회 중 오류가 발생했습니다. (${err})`);
  }
};

export const updateUserInfoRepository = async (userId, changeUserDTO) => {
  try {
    const updateUser = await prisma.user.update({
      where: { id: Number(userId) },
      data: {
        gender: changeUserDTO.gender,
        birth: changeUserDTO.birth,
        address: changeUserDTO.address,
        phoneNumber: changeUserDTO.phoneNumber,
        image: changeUserDTO.image,
        updatedAt: new Date(),
      },
    });
    return updateUser.id.toString(); 
  } catch (err) {
    throw new Error(`회원 정보 수정 중 오류가 발생했습니다. (${err.message})`);
  }
};

export const checkUserExists = async (userId) => {
  try {
    const result = await prisma.user.findUnique({
      where: { id: Number(userId) }, 
      select: { id: true }
    });
    return !!result;
  } catch (err) {
    throw new Error(`사용자 존재 여부 조회 중 오류가 발생했습니다. (${err})`);
  }
};
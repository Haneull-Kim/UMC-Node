import { 
  registerUserService,
  getUserReviewsService
 } from "../services/user.service.js";

import { serializeBigInt } from "../utils/jsonBigInt.js";

export const registerUser = async (req, res) => {
  try {
    const userId = await registerUserService(req.body);

    res.status(201).json({
      message: "회원가입이 완료되었습니다.",
      userId: userId,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getUserReviews = async (req, res) => {
  const { userId } = req.params; 
  const { cursor } = req.query;

  try {
    const { reviews, nextCursor } = await getUserReviewsService(userId, cursor); 

    return res.status(200).json({
      message: "리뷰 목록을 성공적으로 불러왔습니다.",
      reviews: serializeBigInt(reviews), 
      pagination: {
        cursor: serializeBigInt(nextCursor) 
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message
    });
  }
};

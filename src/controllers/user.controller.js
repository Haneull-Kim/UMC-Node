import { 
  registerUserService,
  getUserReviewsService
 } from "../services/user.service.js";

import { serializeBigInt } from "../utils/jsonBigInt.js";
import { StatusCodes } from 'http-status-codes';
import { DuplicateUserEmailError } from "../errors/user.error.js";

export const registerUser = async (req, res) => {
  try {
    const userId = await registerUserService(req.body);

    res.status(StatusCodes.CREATED).success({
      message: "회원가입이 완료되었습니다.",
      userId,
    });
  } catch (error) {
    if (error instanceof DuplicateUserEmailError) {
      return res.status(StatusCodes.BAD_REQUEST).fail(error.errorCode, error.reason, error.data);
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).fail("A000", "서버 오류가 발생했습니다.");
  }
};

export const getUserReviews = async (req, res) => {
  try {
    const { userId } = req.params; 
    const { cursor } = req.query;
    
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

import {
  addStoreService,
  addReviewService,
  getStoreReviewsService
} from "../services/store.service.js";

import {
  StoreNotFoundError,
  GetStoreReviewsError,
  StoreNameRequiredError
} from "../errors/store.error.js";

import { serializeBigInt } from "../utils/jsonBigInt.js";
import { StatusCodes } from "http-status-codes";

export const addStore = async (req, res) => {
  try {
    const storeId = await addStoreService(req.body);

    return res.status(StatusCodes.CREATED).success({
      message: "가게가 성공적으로 추가되었습니다.",
      storeId
    });
  } catch (error) {
    if (error instanceof StoreNameRequiredError) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).fail(error.errorCode, error.reason, error.data);
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).fail("A000", "서버 오류 발생");
  }
};

export const addReview = async (req, res) => {
  try {
    const reviewId = await addReviewService(req.body);
    
    return res.status(StatusCodes.CREATED).success({
      message: "리뷰가 성공적으로 추가되었습니다.",
      reviewId
    });
  } catch (error) {
    if (error instanceof StoreNotFoundError ) {
      return res.status(StatusCodes.BAD_REQUEST).fail(error.errorCode, error.reason, error.data);
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).fail("A000", "서버 오류 발생");
  }
};

export const getStoreReviews = async (req, res) => {
  try {
    const storeId = req.params.storeId;
    const cursor = req.query.cursor ? parseInt(req.query.cursor) : null;
  
    const { reviews, nextCursor } = await getStoreReviewsService(storeId, cursor);

    return res.status(StatusCodes.OK).success({
      message: "리뷰 목록을 성공적으로 불러왔습니다.",
      reviews: serializeBigInt(reviews),
      pagination: {
        cursor: serializeBigInt(nextCursor)
      },
    });
  } catch (error) {
    if (error instanceof StoreNotFoundError || error instanceof GetStoreReviewsError) {
      return res.status(StatusCodes.BAD_REQUEST).fail(error.errorCode, error.reason, error.data);
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).fail("A000", "서버 오류 발생");
  }
};
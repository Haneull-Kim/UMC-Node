import {
  addStoreService,
  addReviewService,
  getStoreReviewsService
} from "../services/store.service.js";

import { serializeBigInt } from "../utils/jsonBigInt.js";

export const addStore = async (req, res) => {
  try {
    const storeId = await addStoreService(req.body);

    res.status(201).json({
      message: "가게가 성공적으로 추가되었습니다.",
      storeId: storeId
    });
  } catch (error) {
    res.status(500).json({ 
      message: error.message 
    });
  }
};

export const addReview = async (req, res) => {
  try {
    const reviewId = await addReviewService(req.body);
    
    res.status(201).json({
      message: "리뷰가 성공적으로 추가되었습니다.",
      reviewId: reviewId
    });
  } catch (error) {
    res.status(400).json({ 
      message: error.message 
    });
  }
};

export const getStoreReviews = async (req, res) => {
  try {
    const storeId = req.params.storeId;
    const cursor = req.query.cursor ? parseInt(req.query.cursor) : null;
  
    const reviews = await getStoreReviewsService(storeId, cursor);

    const nextCursor = reviews.length ? reviews[reviews.length - 1].id : null;

    res.status(200).json({
      message: "리뷰 목록을 성공적으로 불러왔습니다.",
      reviews: serializeBigInt(reviews),
      pagination: {
        cursor: serializeBigInt(nextCursor)
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
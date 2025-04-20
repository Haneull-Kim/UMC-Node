import {
  addStoreService,
  addReviewService
} from "../services/store.service.js";

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

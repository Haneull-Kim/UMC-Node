import {
  addStoreRepository,
  checkStoreExists,
  addReviewRepository,
  getStoreReviewsRepository
} from "../repositories/store.repository.js";

import {
  bodyToStore,
  bodyToReview
} from "../dtos/store.dto.js";

export const addStoreService = async (body) => {
  const storeDTO = bodyToStore(body);

  const storeId = await addStoreRepository(storeDTO);
  return storeId;
};

export const addReviewService = async (body) => {
  const reviewDTO = bodyToReview(body);

  const storeExists = await checkStoreExists(reviewDTO.storeId);

  if (!storeExists) {
    throw new Error("존재하지 않는 가게입니다.");
  }

  const reviewId = await addReviewRepository(reviewDTO);
  return reviewId;
};

export const getStoreReviewsService = async (storeId, cursor) => {
  const storeExists = await checkStoreExists(storeId);
  
  if (!storeExists) {
    throw new Error("존재하지 않는 가게입니다.");
  }

  const { reviews, nextCursor } = await getStoreReviewsRepository(storeId, cursor); 
  return { reviews, nextCursor };
};

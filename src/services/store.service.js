import {
  addStoreRepository,
  checkStoreExists,
  addReviewRepository
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

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

import { 
  StoreNotFoundError,
  GetStoreReviewsError,
  StoreNameRequiredError
} from "../errors/store.error.js";


export const addStoreService = async (body) => {
  const storeDTO = bodyToStore(body);

  if (!storeDTO.name || storeDTO.name.trim() === "") {
    throw new StoreNameRequiredError("가게 이름은 필수입니다.", { body });
  }

  const storeId = await addStoreRepository(storeDTO);

  return storeId;
};

export const addReviewService = async (body) => {
  const reviewDTO = bodyToReview(body);

  const storeExists = await checkStoreExists(reviewDTO.storeId);

  if (!storeExists) {
    throw new StoreNotFoundError("가게가 존재하지 않습니다.", {
      storeId: reviewDTO.storeId
    });
  }

  const reviewId = await addReviewRepository(reviewDTO);
  return reviewId;
};

export const getStoreReviewsService = async (storeId, cursor) => {
  const storeExists = await checkStoreExists(storeId);
  
  if (!storeExists) {
    throw new StoreNotFoundError("가게가 존재하지 않습니다.", {
      storeId: storeId
    });
  }

  try{
    const { reviews, nextCursor } = await getStoreReviewsRepository(storeId, cursor); 
    return { reviews, nextCursor };
  }catch(err){
    throw new GetStoreReviewsError("리뷰 목록 조회 중 오류가 발생했습니다.", {
          userId,
          cursor,
          originalError: err.message,
    });
  }
};

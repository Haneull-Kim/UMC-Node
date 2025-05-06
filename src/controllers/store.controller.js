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

/*
  #swagger.summary = '가게 추가 API'
  #swagger.tags = ['Store']
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["name", "address", "store_category_id", "address_category_id"],
          properties: {
            name: { type: "string", example: "맛있는 가게" },
            address: { type: "string", example: "서울시 강남구" },
            store_category_id: { type: "integer", example: 1 },
            address_category_id: { type: "integer", example: 1 },
            image: { type: "string", example: "image_url.jpg" }
          }
        }
      }
    }
  }
  #swagger.responses[201] = {
    description: "가게 추가 성공",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "SUCCESS" },
            error: { type: "object", nullable: true, example: null },
            success: {
              type: "object",
              properties: {
                message: { type: "string", example: "가게가 성공적으로 추가되었습니다." },
                storeId: { type: "string", example: "101" }
              }
            }
          }
        }
      }
    }
  }
  #swagger.responses[400] = {
    description: "가게 이름이 없을 경우",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "S002" },
                reason: { type: "string", example: "가게 이름은 필수입니다." },
                data: { type: "object", example: { address: "서울시 강남구", store_category_id: 1, address_category_id: 1, image: "image_url.jpg" } }
              }
            },
            success: { type: "object", nullable: true, example: null }
          }
        }
      }
    }
  }
*/

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

/*
  #swagger.summary = '리뷰 추가 API'
  #swagger.tags = ['Store']
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["userId", "storeId", "rate", "content"],
          properties: {
            userId: { type: "integer", example: 1 },
            storeId: { type: "integer", example: 1 },
            rate: { type: "integer", example: 5 },
            content: { type: "string", example: "정말 맛있어요!" },
            image: { type: "string", example: "review_image.jpg" }
          }
        }
      }
    }
  }
  #swagger.responses[201] = {
    description: "리뷰 추가 성공",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "SUCCESS" },
            error: { type: "object", nullable: true, example: null },
            success: {
              type: "object",
              properties: {
                message: { type: "string", example: "리뷰가 성공적으로 추가되었습니다." },
                reviewId: { type: "string", example: "2001" }
              }
            }
          }
        }
      }
    }
  }
  #swagger.responses[400] = {
    description: "가게가 존재하지 않는 경우",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "S001" },
                reason: { type: "string", example: "가게가 존재하지 않습니다." },
                data: { type: "object", example: { storeId: 1 } }
              }
            },
            success: { type: "object", nullable: true, example: null }
          }
        }
      }
    }
  }
*/

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

/*
  #swagger.summary = '가게 리뷰 조회 API'
  #swagger.tags = ['Store']
  #swagger.parameters['storeId'] = {
    in: 'path',
    description: '가게 ID',
    required: true,
    type: 'string', 
    example: '1'
  }
  #swagger.parameters['cursor'] = {
    in: 'query',
    description: '페이지네이션을 위한 커서 (선택적)',
    required: false,
    type: 'string', 
    example: '10' 
  }
  #swagger.responses[200] = {
    description: "리뷰 목록 조회 성공",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "SUCCESS" },
            error: { type: "object", nullable: true, example: null },
            success: {
              type: "object",
              properties: {
                message: { type: "string", example: "리뷰 목록을 성공적으로 불러왔습니다." },
                reviews: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {type: "string", example: "1" },
                      userId: { type: "string", example: "2001" },
                      storeId: { type: "string", example: "2001" },
                      rate: { type: "integer", example: 5 },
                      content: { type: "string", example: "정말 맛있어요!" },
                      image: {type: "string", nullable: true, example: null },
                      answer: {type: "string", nullable: true, example: null },
                      createdAt: { type: "string", format: "date-time", example: "2025-05-01T10:00:00Z" },
                      user: {
                        type: "object",
                        properties: {
                          name: { type: "string", example: "홍길동" }
                        }
                      }
                    }
                  }
                },
                pagination: {
                  cursor: { type: "string", example: "10" }
                }
              }
            }
          }
        }
      }
    }
  }
  #swagger.responses[400] = {
    description: "가게가 존재하지 않을 경우",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "S001" },
                reason: { type: "string", example: "가게가 존재하지 않습니다." },
                data: { type: "object", example: { storeId: "101" } }
              }
            },
            success: { type: "object", nullable: true, example: null }
          }
        }
      }
    }
  }
*/

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
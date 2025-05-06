import { 
  registerUserService,
  getUserReviewsService
 } from "../services/user.service.js";

import { serializeBigInt } from "../utils/jsonBigInt.js";
import { StatusCodes } from 'http-status-codes';

import { 
  DuplicateUserEmailError, 
  GetUserReviewsError,
  MissingUserIdError
} from "../errors/user.error.js";


export const registerUser = async (req, res) => {

/*
  #swagger.summary = '회원 가입 API'
  #swagger.tags = ['User']
  #swagger.description = '신규 유저를 등록합니다.'
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["name", "gender", "birth", "address", "email", "phoneNumber"],
          properties: {
            name: { type: "string", example: "홍길동" },
            gender: { type: "integer", example: 1 },
            birth: { type: "string", format: "date", example: "2000-01-01" },
            address: { type: "string", example: "서울시 강남구" },
            email: { type: "string", example: "user@example.com" },
            phoneNumber: { type: "string", example: "010-1234-5678" },
            optionCategoryIds: {
              type: "array",
              items: { type: "integer" },
              example: [1, 2]
            },
            foodCategoryIds: {
              type: "array",
              items: { type: "integer" },
              example: [3, 4]
            }
          }
        }
      }
    }
  }
  #swagger.responses[201] = {
    description: '회원가입 성공',
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
                message: { type: "string", example: "회원가입이 완료되었습니다." },
                userId: { type: "string", example: "1" }
              }
            }
          }
        }
      }
    }
  }
  #swagger.responses[400] = {
    description: '이메일 중복으로 인한 실패',
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "U001" },
                reason: { type: "string", example: "이미 존재하는 이메일입니다." },
                data: {
                  type: "object",
                  properties: {
                    email: { type: "string", example: "user@example.com" }
                  }
                }
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

/*
  #swagger.summary = '사용자 리뷰 조회 API'
  #swagger.tags = ['User']
  #swagger.parameters['userId'] = {
    in: 'path',
    description: '리뷰를 조회할 사용자 ID',
    required: true,
    type: 'string',
    example: '1'
  }
  #swagger.parameters['cursor'] = {
    in: 'query',
    description: '페이지네이션을 위한 커서',
    required: false,
    type: 'string',
    example: '2001'
  }
  #swagger.responses[200] = {
    description: "사용자 리뷰 목록 조회 성공",
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
                      id: { type: "string", example: "2001" },
                      userId: { type: "string", example: "2001" },
                      storeId: { type: "string", example: "2001" },
                      rate: { type: "integer", example: 5 },
                      content: { type: "string", example: "좋은 경험이었습니다." },
                      createdAt: { type: "string", format: "date-time", example: "2025-05-01T10:00:00Z" },
                      store: {
                        type: "object",
                        properties: {
                          name: { type: "string", example: "맛있는 식당" }
                        }
                      }
                    }
                  }
                },
                pagination: {
                  cursor: { type: "string", example: "2001" }
                }
              }
            }
          }
        }
      }
    }
  }
  #swagger.responses[500] = {
    description: "userId 누락",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "U003" },
                reason: { type: "string", example: "userId가 누락되었거나 유효하지 않습니다. " },
                data: { 
                  type: "object", 
                  example: {
                    userId: ":userId"
                  }
                }
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
    const { userId } = req.params; 
    const { cursor } = req.query;
    
    const { reviews, nextCursor } = await getUserReviewsService(userId, cursor); 

    return res.status(StatusCodes.OK).success({
      message: "리뷰 목록을 성공적으로 불러왔습니다.",
      reviews: serializeBigInt(reviews),
      pagination: {
        cursor: serializeBigInt(nextCursor)
      },
    });
  } catch (error) {

    if (error instanceof GetUserReviewsError || error instanceof MissingUserIdError) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).fail(error.errorCode, error.reason, error.data);
    }
    
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).fail("A000", "리뷰 목록 조회 중 서버 오류가 발생했습니다.");
  }
};

import {
    addMissionService,
    addUserMissionService,
    getStoreMissionsService,
    getUserMissionsService,
    completeUserMissionService
} from "../services/mission.service.js";

import {
  StoreNotFoundError,
  AlreadyChallengingError,
  GetStoreMissionsError,
  GetUserMissionsError,
  CompleteUserMissionError,
  MissingUserIdError
} from "../errors/mission.error.js";

import { serializeBigInt } from '../utils/jsonBigInt.js';
import { StatusCodes } from 'http-status-codes';

export const addMission = async (req, res) => {

/*
  #swagger.summary = '미션 추가 API'
  #swagger.tags = ['Mission']
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["storeId", "description", "pointCalculate", "endDate"],
          properties: {
            storeId: { type: "integer", example: 1 },
            description: { type: "string", example: "3만원 이상 구매 시" },
            pointCalculate: { type: "string", example: "/ 100 + 10" },
            endDate: { type: "string", format: "date", example: "2025-06-01" }
          }
        }
      }
    }
  }
  #swagger.responses[201] = {
    description: "미션 추가 성공",
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
                message: { type: "string", example: "미션이 성공적으로 추가되었습니다." },
                missionId: { type: "string", example: "101" }
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
                errorCode: { type: "string", example: "M001" },
                reason: { type: "string", example: "해당 가게가 존재하지 않습니다." },
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
      const missionId = await addMissionService(req.body);
  
      return res.status(StatusCodes.CREATED).success({
        message: "미션이 성공적으로 추가되었습니다.",
        missionId,
      });
    } catch (error) {
      if (error instanceof StoreNotFoundError) {
        return res.status(StatusCodes.BAD_REQUEST).fail(error.errorCode, error.reason, error.data);
      }
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).fail("A000", "서버 오류 발생");
    }
};

export const addUserMission = async (req, res) => {

/*
  #swagger.summary = '진행 중인 등록 API'
  #swagger.tags = ['Mission']
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["userId", "missionId"],
          properties: {
            userId: { type: "integer", example: 1 },
            missionId: { type: "integer", example: 1 }
          }
        }
      }
    }
  }
  #swagger.responses[201] = {
    description: "유저 미션 등록 성공",
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
                message: { type: "string", example: "미션이 성공적으로 등록되었습니다." },
                userMissionId: { type: "string", example: "101" }
              }
            }
          }
        }
      }
    }
  }
  #swagger.responses[400] = {
    description: "이미 도전 중인 미션일 경우",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "M002" },
                reason: { type: "string", example: "이미 해당 미션에 도전 중입니다. " },
                data: { type: "object", example: { userId: 1, missionId: 1 } }
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
      const userMissionId = await addUserMissionService(req.body);
  
      return res.status(StatusCodes.CREATED).success({
        message: "미션 도전이 성공적으로 등록되었습니다.",
        userMissionId,
      });
    } catch (error) {
      if (error instanceof AlreadyChallengingError) {
        return res.status(StatusCodes.BAD_REQUEST).fail(error.errorCode, error.reason, error.data);
      }
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).fail("A000", "서버 오류 발생");
    }
};

export const getStoreMissions = async (req, res) => {

/*
  #swagger.summary = '가게별 미션 조회 API'
  #swagger.tags = ['Mission']
  #swagger.parameters['storeId'] = {
    in: 'path',
    description: '가게 ID',
    required: true,
    type: 'string', 
    example: '1'
  }
  #swagger.responses[200] = {
    description: "미션 목록 조회 성공",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "SUCCESS" },
            error: { type: "object", nullable: true, example: null },
            success: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string", example: "1" },
                  storeId: { type: "string", example: "1" },
                  description: { type: "string", example: "3만원 이상 구매 시" },
                  pointCalculate: { type: "string", example: "/100 + 10" },
                  endDate: { type: "string", format: "date", example: "2025-06-01" },
                  createdAt: { type: "string", format: "date-time", example: "2025-06-01T00:00:00Z" },
                  updatedAt: { type: "string", format: "date-time", example: "2025-06-01T00:00:00Z" }
                }
              }
            }
          }
        }
      }
    }
  }
  #swagger.responses[404] = {
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
                errorCode: { type: "string", example: "M001" },
                reason: { type: "string", example: "해당 가게가 존재하지 않습니다." },
                data: { type: "object", example: { storeId: "1" } }
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
    const { storeId } = req.params;
    const cursor = req.query.cursor ? parseInt(req.query.cursor) : null;

    const { missions, nextCursor } = await getStoreMissionsService(storeId, cursor);

    return res.status(StatusCodes.OK).success({
      message: "미션 목록을 성공적으로 불러왔습니다.",
      missions: serializeBigInt(missions),
      pagination: {
        cursor: serializeBigInt(nextCursor),
      },
    });
  } catch (error) {
    if (error instanceof GetStoreMissionsError ||  error instanceof StoreNotFoundError) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).fail(error.errorCode, error.reason, error.data);
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).fail("A000", "서버 오류 발생");
  }
};

export const getUserMissions = async (req, res) => {

/*
  #swagger.summary = '유저 미션 목록 조회 API'
  #swagger.tags = ['Mission']
  #swagger.parameters['userId'] = {
    in: 'path',
    description: '유저 ID',
    required: true,
    type: 'string', 
    example: '1'
  }
  #swagger.responses[200] = {
    description: "유저 미션 목록 조회 성공",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "SUCCESS" },
            error: { type: "object", nullable: true, example: null },
            success: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  message: { type: "string", example: "진행 중인 미션 목록을 성공적으로 불러왔습니다. " },
                  missions: {
                        type: "object",
                        properties: {
                          id: { type: "string", example: "101" },
                          userId: { type: "string", example: "101" },
                          missionId: { type: "string", example: "101" },
                          status: { type: "integer", example: 1 },
                          createdAt: { type: "string", format: "date-time", example: "2025-06-01T00:00:00Z" },
                          updatedAt: { type: "string", format: "date-time", example: "2025-06-01T00:00:00Z" },
                          mission: {
                            type: "object",
                            properties: {
                              description: { type: "string", example: "3만원 이상 구매 시" },
                              pointCalculate: { type: "string", example: "/ 100 + 10" },
                            }
                          },
                          store: {
                            type: "object",
                            properties: {
                              name: { type: "string", example: "맛있는 가게" }
                            }
                          }
                        }
                      }
                    }
                  }
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
                errorCode: { type: "string", example: "M006" },
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
    const status = req.query.status ?? "1";
    const cursor = req.query.cursor ? parseInt(req.query.cursor) : null;

    const { missions, nextCursor } = await getUserMissionsService(userId, status, cursor);

    return res.status(StatusCodes.OK).success({
      message: "진행 중인 미션 목록을 성공적으로 불러왔습니다.",
      missions: serializeBigInt(missions),
      pagination: {
        cursor: serializeBigInt(nextCursor),
      },
    });
  } catch (error) {
    if (error instanceof GetUserMissionsError || error instanceof MissingUserIdError) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).fail(error.errorCode, error.reason, error.data);
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).fail("A000", "서버 오류 발생");
  }
};

export const completeUserMission = async (req, res) => {

/*
  #swagger.summary = '유저 미션 완료 API'
  #swagger.tags = ['Mission']
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["userId", "missionId"],
          properties: {
            userId: { type: "integer", example: 1 },
            missionId: { type: "integer", example: 1 }
          }
        }
      }
    }
  }
  #swagger.responses[200] = {
    description: "미션 완료 처리 성공",
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
                message: { type: "string", example: "미션을 완료로 변경했습니다. " },
                userMissionId: { type: "string", example: "1" }
              }
            }
          }
        }
      }
    }
  }
  #swagger.responses[500] = {
    description: "미션 완료 처리 중 오류가 발생했을 경우",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "M005" },
                reason: { type: "string", example: "미션 완료 처리 중 오류가 발생했습니다. " },
                data: { type: "object", example: { userId: 1, missionId: 1, originalError: "DB 업데이트 중 오류 발생 : Cannot read properties of null (reading 'id')" } }
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
    const { userId, missionId } = req.body;

    if (!userId || !missionId) {
      return res.status(StatusCodes.BAD_REQUEST).fail("M006", "userId와 missionId는 필수입니다.");
    }

    const userMissionId = await completeUserMissionService(userId, missionId);

    return res.status(StatusCodes.OK).success({
      message: "미션을 완료로 변경했습니다.",
      userMissionId,
    });
  } catch (error) {
    if (error instanceof CompleteUserMissionError) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).fail(error.errorCode, error.reason, error.data);
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).fail("A000", "서버 오류 발생");
  }
};

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

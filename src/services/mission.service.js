import {
    bodyToMission,
    bodyToUserMission,
} from "../dtos/mission.dto.js";
  
import {
    findStoreById,
    addMissionRepository,
    isUserAlreadyChallengingMission,
    addUserMission,
    getStoreMissionsRepository,
    getUserMissionsRepository,
    completeUserMissionRepository
} from "../repositories/mission.repository.js";

import {
  StoreNotFoundError,
  AlreadyChallengingError,
  GetStoreMissionsError,
  GetUserMissionsError,
  CompleteUserMissionError,
  MissingUserIdError
} from "../errors/mission.error.js";
  
export const addMissionService = async (body) => {
    const missionDTO = bodyToMission(body);
  
    const store = await findStoreById(missionDTO.storeId);
    
    if (!store) {
      throw new StoreNotFoundError("해당 가게가 존재하지 않습니다.", {
        storeId: missionDTO.storeId
      });
    }
  
    const missionId = await addMissionRepository(missionDTO);
    return missionId;
};
  
export const addUserMissionService = async (body) => {
    const userMissionDTO = bodyToUserMission(body);
  
    const alreadyChallenging = await isUserAlreadyChallengingMission(
      userMissionDTO.userId,
      userMissionDTO.missionId
    );
  
    if (alreadyChallenging) {
      throw new AlreadyChallengingError("이미 해당 미션에 도전 중입니다.", {
        userId: userMissionDTO.userId,
        missionId: userMissionDTO.missionId,
      });
    }
  
    const userMissionId = await addUserMission(userMissionDTO);
    return userMissionId;
};

export const getStoreMissionsService = async (storeId, cursor) => {

  const store = await findStoreById(storeId);
    
  if (!store) {
    throw new StoreNotFoundError("해당 가게가 존재하지 않습니다.", {
      storeId,
    });
  }

  try {
    const { missions, nextCursor } = await getStoreMissionsRepository(storeId, cursor);
    return { missions, nextCursor };
  } catch (err) {
    throw new GetStoreMissionsError("미션 목록 조회 중 오류가 발생했습니다.", {
      storeId,
      cursor,
      originalError: err.message,
    });
  }
};

export const getUserMissionsService = async (userId, status, cursor) => {

  if (!userId || isNaN(Number(userId))) {
    throw new MissingUserIdError("userId가 누락되었거나 유효하지 않습니다.", { userId, cursor });
  }

  try {
    const { missions, nextCursor } = await getUserMissionsRepository(userId, status, cursor);
    return { missions, nextCursor };
  } catch (err) {
    throw new GetUserMissionsError("진행 중인 미션 목록 조회 중 오류가 발생했습니다.", {
      userId,
      status,
      cursor,
      originalError: err.message,
    });
  }
};

export const completeUserMissionService = async (userId, missionId) => {
  try {
    const userMissionId = await completeUserMissionRepository(userId, missionId);
    return userMissionId;
  } catch (err) {
    throw new CompleteUserMissionError("미션 완료 처리 중 오류가 발생했습니다.", {
      userId,
      missionId,
      originalError: err.message,
    });
  }
};
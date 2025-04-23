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
  
export const addMissionService = async (body) => {
    const missionDTO = bodyToMission(body);
  
    const store = await findStoreById(missionDTO.storeId);
    
    if (!store) {
      throw new Error("해당 가게가 존재하지 않습니다.");
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
      throw new Error("이미 해당 미션에 도전 중입니다.");
    }
  
    const userMissionId = await addUserMission(userMissionDTO);
    return userMissionId;
};

export const getStoreMissionsService = async (storeId, cursor) => {
  try {
    const { missions, nextCursor } = await getStoreMissionsRepository(storeId, cursor);
    return { missions, nextCursor };
  } catch (err) {
    throw new Error(`미션 목록 조회 중 오류가 발생했습니다. (${err})`);
  }
};

export const getUserMissionsService = async (userId, status, cursor) => {
  try {
    const { missions, nextCursor } = await getUserMissionsRepository(userId, status, cursor);
    return { missions, nextCursor };
  } catch (err) {
    throw new Error(`진행 중인 미션 서비스 처리 중 오류가 발생했습니다. (${err})`);
  }
};

export const completeUserMissionService = async (userId, missionId) => {
  try {
    const userMissionId = await completeUserMissionRepository(userId, missionId);
    return userMissionId;
  } catch (err) {
    throw new Error(`미션 완료 서비스 처리 중 오류 발생: ${err.message}`);
  }
};
import {
    bodyToMission,
    bodyToUserMission,
} from "../dtos/mission.dto.js";
  
import {
    findStoreById,
    addMissionRepository,
    isUserAlreadyChallengingMission,
    addUserMission,
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
  
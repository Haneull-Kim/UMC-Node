import {
    addMissionService,
    addUserMissionService,
} from "../services/mission.service.js";
  
export const addMission = async (req, res) => {
    try {
      const missionId = await addMissionService(req.body);
  
      res.status(201).json({
        message: "미션이 성공적으로 추가되었습니다.",
        missionId,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
};
  
export const addUserMission = async (req, res) => {
    try {
      const userMissionId = await addUserMissionService(req.body);
  
      res.status(201).json({
        message: "미션 도전이 성공적으로 등록되었습니다.",
        userMissionId,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
};
  
import {
    addMissionService,
    addUserMissionService,
    getStoreMissionsService,
    getUserMissionsService,
    completeUserMissionService
} from "../services/mission.service.js";

import { serializeBigInt } from '../utils/jsonBigInt.js';
  
export const addMission = async (req, res) => {
    try {
      const missionId = await addMissionService(req.body);
  
      res.status(201).json({
        message: "미션이 성공적으로 추가되었습니다.",
        missionId: missionId,
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
        userMissionId: userMissionId,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
};

export const getStoreMissions = async (req, res) => {
  try {
    const { storeId } = req.params;
    const cursor = req.query.cursor ? parseInt(req.query.cursor) : null;

    const { missions, nextCursor } = await getStoreMissionsService(storeId, cursor);

    res.status(200).json({
      message: "미션 목록을 성공적으로 불러왔습니다.",
      missions: serializeBigInt(missions),
      pagination: {
        cursor: serializeBigInt(nextCursor)
      }
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getUserMissions = async (req, res) => {
  try {
    const { userId } = req.params;
    const status = req.query.status ?? "1";
    const cursor = req.query.cursor ? parseInt(req.query.cursor) : null;

    const { missions, nextCursor } = await getUserMissionsService(userId, status, cursor);

    res.status(200).json({
      message: "진행 중인 미션 목록을 성공적으로 불러왔습니다.",
      missions: serializeBigInt(missions),
      pagination: {
        cursor: serializeBigInt(nextCursor)
      }
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const completeUserMission = async (req, res) => {
  try {
    const { userId, missionId } = req.body;

    if (!userId || !missionId) {
      return res.status(400).json({ message: "userId와 missionId가 필요합니다." });
    }

    const userMissionId = await completeUserMissionService(userId, missionId);

    res.status(200).json({
      message: "미션을 완료로 변경했습니다.",
      userMissionId: userMissionId
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

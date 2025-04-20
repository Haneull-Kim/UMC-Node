import { pool } from "../db.config.js";

export const findStoreById = async (storeId) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query("SELECT * FROM store WHERE id = ?", [storeId]);
    return rows[0];
  } catch (err) {
    throw new Error(`가게 조회 중 오류가 발생했습니다. (${err})`);
  } finally {
    conn.release();
  }
};

export const addMissionRepository = async (missionDTO) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      `INSERT INTO mission (store_id, description, point_calculate, end_date, created_at)
       VALUES (?, ?, ?, ?, ?)`,
      [
        missionDTO.storeId,
        missionDTO.description,
        missionDTO.pointCalculate,
        missionDTO.endDate,
        missionDTO.createdAt
      ]
    );

    return result.insertId;
  } catch (err) {
    throw new Error(`미션 추가 중 오류가 발생했습니다. (${err})`);
  } finally {
    conn.release();
  }
};

export const isUserAlreadyChallengingMission = async (userId, missionId) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(
      "SELECT * FROM user_mission WHERE user_id = ? AND mission_id = ?",
      [userId, missionId]
    );
    return rows.length > 0;
  } catch (err) {
    throw new Error(`미션 중복 확인 중 오류가 발생했습니다. (${err})`);
  } finally {
    conn.release();
  }
};

export const addUserMission = async (userMissionDTO) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      `INSERT INTO user_mission (user_id, mission_id, status, created_at)
       VALUES (?, ?, ?, ?)`,
      [
        userMissionDTO.userId,
        userMissionDTO.missionId,
        userMissionDTO.status,
        userMissionDTO.createdAt
      ]
    );

    return result.insertId;
  } catch (err) {
    throw new Error(`미션 도전 추가 중 오류가 발생했습니다. (${err})`);
  } finally {
    conn.release();
  }
};

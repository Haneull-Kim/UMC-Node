import { pool } from "../db.config.js";

// User 데이터 삽입
export const addUser = async (data) => {
  const conn = await pool.getConnection();
  const localDateTime = new Date();

  try {
    const [confirm] = await conn.query(
      `SELECT EXISTS(SELECT 1 FROM user WHERE email = ?) as isExistEmail;`,
      [data.email]
    );

    if (confirm[0].isExistEmail) {
      return null;
    }

    const [result] = await conn.query(
      `INSERT INTO user (name, gender, birth, address, status, created_at, email, phone_number, phone_auth)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        data.name,
        data.gender,
        data.birth,
        data.address,
        1,
        localDateTime,
        data.email,
        data.phoneNumber,
        0
      ]
    );

    return result.insertId;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};


// 사용자 정보 얻기
export const getUser = async (userId) => {
  const conn = await pool.getConnection();

  try {
    const [user] = await conn.query(
      `SELECT * FROM user WHERE id = ?;`,
      [userId]
    );

    if (user.length === 0) {
      return null;
    }

    return user[0]; 
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId, foodCategoryId) => {
  const conn = await pool.getConnection();

  try {
    await conn.query(
      `INSERT INTO user_food (user_id, food_category_id) VALUES (?, ?);`,
      [userId, foodCategoryId]
    );
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId) => {
  const conn = await pool.getConnection();

  try {
    const [preferences] = await conn.query(
      "SELECT uf.id, uf.food_category_id, uf.user_id, fc.name " +
        "FROM user_food uf JOIN food_category fc on uf.food_category_id = fc.id " +
        "WHERE uf.user_id = ? ORDER BY uf.food_category_id ASC;",
      [userId] 
    );

    return preferences;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

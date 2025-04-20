import { pool } from "../db.config.js";

export const isEmailDuplicated = async (email) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(
      "SELECT id FROM user WHERE email = ?",
      [email]
    );
    return rows.length > 0;
  } catch (err) {
    throw new Error(`이메일 중복 확인 중 오류가 발생했습니다. (${err})`);
  } finally {
    conn.release();
  }
};

export const addUserRepository = async (userDTO) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      `INSERT INTO user (name, gender, birth, address, status, created_at, email, phone_number, phone_auth, image)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userDTO.name,
        userDTO.gender,
        userDTO.birth,
        userDTO.address,
        userDTO.status,
        userDTO.createdAt,
        userDTO.email,
        userDTO.phoneNumber,
        userDTO.phoneAuth,
        userDTO.image,
      ]
    );    
    
    return result.insertId;
  } catch (err) {
    throw new Error(`회원 등록 중 오류가 발생했습니다. (${err})`);
  } finally {
    conn.release();
  }
};

export const addUserOptions = async (userOptions) => {
  const conn = await pool.getConnection();
  try {
    const values = userOptions.map((opt) => [
      opt.userId,
      opt.optionCategoryId
    ]);
    await conn.query(
      `INSERT INTO user_option (user_id, option_category_id) VALUES ?`,
      [values]
    );
  } catch (err) {
    throw new Error(`사용자 옵션 저장 중 오류가 발생했습니다. (${err})`);
  } finally {
    conn.release();
  }
};

export const addUserFoods = async (userFoods) => {
  const conn = await pool.getConnection();
  try {
    const values = userFoods.map((food) => [
      food.userId,
      food.foodCategoryId
    ]);
    await conn.query(
      `INSERT INTO user_food (user_id, food_category_id) VALUES ?`,
      [values]
    );
  } catch (err) {
    throw new Error(`사용자 음식 저장 중 오류가 발생했습니다. (${err})`);
  } finally {
    conn.release();
  }
};

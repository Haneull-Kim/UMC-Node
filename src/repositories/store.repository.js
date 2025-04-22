import { pool, prisma } from "../db.config.js";

// 스토어 추가
export const addStoreRepository = async (storeDTO) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      `INSERT INTO store (name, status, address, store_category_id, image, address_category_id, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        storeDTO.name,
        storeDTO.status,
        storeDTO.address,
        storeDTO.store_category_id,
        storeDTO.image,
        storeDTO.address_category_id,
        storeDTO.createdAt
      ]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(`가게 추가 중 오류가 발생했습니다. (${err})`);
  } finally {
    conn.release();
  }
};

// 스토어 존재 여부 확인
export const checkStoreExists = async (storeId) => {
  try {
    const result = await prisma.store.findUnique({
      where: { id: BigInt(storeId) }, 
      select: { id: true }
    });
    return !!result;
  } catch (err) {
    throw new Error(`가게 존재 여부 조회 중 오류가 발생했습니다. (${err})`);
  }
};

// 리뷰 추가
export const addReviewRepository = async (reviewDTO) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      `INSERT INTO review (user_id, store_id, content, rate, image, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        reviewDTO.userId,
        reviewDTO.storeId,
        reviewDTO.content,
        reviewDTO.rate,
        reviewDTO.image,
        reviewDTO.createdAt
      ]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(`리뷰 추가 중 오류가 발생했습니다. (${err})`);
  } finally {
    conn.release();
  }
};

export const getStoreReviewsRepository = async (storeId, cursor) => {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        storeId: BigInt(storeId),
        ...(cursor && { id: { gt: cursor } }) // cursor가 존재하면 id > cursor 조건 추가
      },
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            name: true 
          }
        }
      },
      take: 10 
    });

    return reviews;
  } catch (err) {
    throw new Error(`리뷰 조회 중 오류가 발생했습니다. (${err})`);
  }
};

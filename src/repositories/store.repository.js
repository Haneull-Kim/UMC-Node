import { prisma } from "../db.config.js";

export const addStoreRepository = async (storeDTO) => {
  try {
    const store = await prisma.store.create({
      data: {
        name: storeDTO.name,
        status: storeDTO.status,
        address: storeDTO.address,
        image: storeDTO.image,
        addressCategory: {
          connect: { id: storeDTO.address_category_id }
        },
        storeCategory: {
          connect: { id: storeDTO.store_category_id }
        },
        createdAt: storeDTO.createdAt
      }
    });    
    return store.id.toString();
  } catch (err) {
    throw new Error(`가게 추가 중 오류가 발생했습니다. (${err})`);
  }
};

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

export const addReviewRepository = async (reviewDTO) => {
  try {
    const review = await prisma.review.create({
      data: {
        content: reviewDTO.content,
        rate: reviewDTO.rate,
        image: reviewDTO.image,
        createdAt: reviewDTO.createdAt,
        user: {
          connect: { id: BigInt(reviewDTO.userId) }
        },
        store: {
          connect: { id: BigInt(reviewDTO.storeId) }
        }
      }
    });
    return review.id.toString();
  } catch (err) {
    throw new Error(`리뷰 추가 중 오류가 발생했습니다. (${err})`);
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

    const nextCursor = reviews.length ? reviews[reviews.length - 1].id : null;

    return { reviews, nextCursor };
  } catch (err) {
    throw new Error(`리뷰 조회 중 오류가 발생했습니다. (${err})`);
  }
};

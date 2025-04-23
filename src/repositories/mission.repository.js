import { prisma } from "../db.config.js";

export const findStoreById = async (storeId) => {
  try {
    const store = await prisma.store.findUnique({
      where: { id: BigInt(storeId) }
    });
    return store;
  } catch (err) {
    throw new Error(`가게 조회 중 오류가 발생했습니다. (${err})`);
  }
};

export const addMissionRepository = async (missionDTO) => {
  try {
    const mission = await prisma.mission.create({
      data: {
        store: { 
          connect: { id: BigInt(missionDTO.storeId) }  
        },
        description: missionDTO.description,
        pointCalculate: missionDTO.pointCalculate,
        endDate: missionDTO.endDate,
        createdAt: missionDTO.createdAt,
      }
    });

    return mission.id.toString();  
  } catch (err) {
    throw new Error(`미션 추가 중 오류가 발생했습니다. (${err})`);
  }
};


export const isUserAlreadyChallengingMission = async (userId, missionId) => {
  try {
    const existing = await prisma.userMission.findFirst({
      where: {
        userId: BigInt(userId),
        missionId: BigInt(missionId)
      }
    });

    return !!existing;
  } catch (err) {
    throw new Error(`미션 중복 확인 중 오류가 발생했습니다. (${err})`);
  }
};

export const addUserMission = async (userMissionDTO) => {
  try {
    const userMission = await prisma.userMission.create({
      data: {
        user: { 
          connect: { id: BigInt(userMissionDTO.userId) }  
        },
        mission: { 
          connect: { id: BigInt(userMissionDTO.missionId) } 
        },
        status: userMissionDTO.status,
        createdAt: userMissionDTO.createdAt,
      }
    });

    return userMission.id.toString();  
  } catch (err) {
    throw new Error(`미션 도전 추가 중 오류가 발생했습니다. (${err})`);
  }
};

export const getStoreMissionsRepository = async (storeId, cursor) => {
  try {
    const missions = await prisma.mission.findMany({
      where: {
        storeId: BigInt(storeId),
        ...(cursor && { id: { gt: cursor } }) // 커서가 존재하면 id > cursor 조건 추가
      },
      orderBy: { createdAt: 'desc' },
      take: 10
    });

    const nextCursor = missions.length ? missions[missions.length - 1].id : null;

    return { missions, nextCursor }; 
  } catch (err) {
    throw new Error(`미션 조회 중 오류가 발생했습니다. (${err})`);
  }
};

export const getUserMissionsRepository = async (userId, status, cursor) => {
  try {
    const missions = await prisma.userMission.findMany({
      where: {
        userId: BigInt(userId),
        status: parseInt(status),
        ...(cursor && { id: { gt: cursor } })
      },
      orderBy: { createdAt: "desc" },
      take: 10,
      include: {
        mission: {
          select: {
            description: true,
            pointCalculate: true,
            store: {
              select: {
                name: true
              }
            }
          }
        }
      }
    });

    const nextCursor = missions.length ? missions[missions.length - 1].id : null;

    return { missions, nextCursor };
  } catch (err) {
    throw new Error(`진행 중인 미션 조회 중 오류가 발생했습니다. (${err})`);
  }
};

export const completeUserMissionRepository = async (userId, missionId) => {
  try {
    const updated = await prisma.userMission.updateMany({
      where: {
        userId: BigInt(userId),
        missionId: BigInt(missionId)
      },
      data: {
        status: 0,
        updatedAt: new Date()
      }
    });

    const updatedMission = await prisma.userMission.findFirst({
      where: {
        userId: BigInt(userId),
        missionId: BigInt(missionId),
        status: 0
      },
      select: { id: true }
    });

    return updatedMission.id.toString();
  } catch (err) {
    throw new Error(`DB 업데이트 중 오류 발생: ${err.message}`);
  }
};

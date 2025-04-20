export const bodyToMission = (body) => ({
    storeId: body.storeId,
    description: body.description,
    pointCalculate: body.pointCalculate,
    endDate: body.endDate,
    createdAt: new Date(),
    updatedAt: new Date() || null,
});
  
  export const bodyToUserMission = (body) => ({
    userId: body.userId,
    missionId: body.missionId,
    status: body.status ?? 1,
    createdAt: new Date(),
    updatedAt: new Date() || null,
});
  
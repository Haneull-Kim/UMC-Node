export const bodyToStore = (body) => ({
    name: body.name,
    status: body.status ?? 1,
    address: body.address,
    store_category_id: body.store_category_id,
    image: body.image || null,
    address_category_id: body.address_category_id,
    createdAt: new Date(),
    updatedAt: new Date() || null
});

export const bodyToReview = (body) => ({
    userId: body.userId,
    storeId: body.storeId,
    rate: body.rate,
    content: body.content,
    image: body.image || null,  
    answer: body.answer || null,
    createdAt: new Date(),
    updatedAt: new Date() || null
});
export class StoreNotFoundError extends Error {
    errorCode = "S001";
  
    constructor(reason = "존재하지 않는 가게입니다.", data = {}) {
      super(reason);
      this.name = "StoreNotFoundError";
      this.reason = reason;
      this.data = data;
    }
}
  
export class StoreNameRequiredError extends Error {
    errorCode = "S002";

    constructor(reason, data) {
      super(reason);
      this.name = "StoreNameRequiredError";
      this.reason = reason || "가게 이름은 필수입니다.";
      this.data = data;
    }
}

  
export class AddReviewError extends Error {
    errorCode = "S003";
  
    constructor(reason = "리뷰 등록 중 오류가 발생했습니다.", data = {}) {
      super(reason);
      this.name = "AddReviewError";
      this.reason = reason;
      this.data = data;
    }
}

export class GetStoreReviewsError extends Error {
    errorCode = "S004";
  
    constructor(reason = "리뷰 조회 중 오류가 발생했습니다.", data = {}) {
      super(reason);
      this.name = "GetReviewsError";
      this.reason = reason;
      this.data = data;
    }
}
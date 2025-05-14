export class DuplicateUserEmailError extends Error {
    errorCode = "U001";
  
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
}

export class GetUserReviewsError extends Error {
  errorCode = "U002";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class MissingUserIdError extends Error {
  errorCode = "U003";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class UserNotFoundError extends Error {
  errorCode = "U004";

 constructor(reason = "존재하지 않는 사용자 입니다.", data = {}) {
      super(reason);
      this.name = "UserNotFoundError";
      this.reason = reason;
      this.data = data;
    }
}
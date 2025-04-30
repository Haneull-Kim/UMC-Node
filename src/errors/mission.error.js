export class StoreNotFoundError extends Error {
    errorCode = "M001";
  
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
}
  
export class AlreadyChallengingError extends Error {
    errorCode = "M002";
  
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
}
  
export class GetStoreMissionsError extends Error {
    errorCode = "M003";
  
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
}
  
export class GetUserMissionsError extends Error {
    errorCode = "M004";
  
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
}
  
export class CompleteUserMissionError extends Error {
    errorCode = "M005";
  
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
}

export class MissingUserIdError extends Error {
  errorCode = "M006";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}
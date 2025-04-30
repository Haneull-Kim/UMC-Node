export const responseHandler = (req, res, next) => {
    res.success = (data) => {
      res.json({
        resultType: "SUCCESS",
        error: null,
        success: data,
      });
    };
  
    res.fail = (errorCode, reason, data = null) => {
      res.json({
        resultType: "FAIL",
        error: {
          errorCode,
          reason,
          data,
        },
        success: null,
      });
    };
  
    next();
};
  
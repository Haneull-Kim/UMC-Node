import { registerUserService } from "../services/user.service.js";

export const registerUser = async (req, res) => {
  try {
    const userId = await registerUserService(req.body);

    res.status(201).json({
      message: "회원가입이 완료되었습니다.",
      userId: userId,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

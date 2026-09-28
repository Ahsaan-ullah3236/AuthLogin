import * as authService from "../services/authService.js";
import {
  validateLogin,
  validateRefreshToken,
  validateRegistration,
} from "../validators/authValidators.js";

export const registerUser = async (req, res) => {
  const input = validateRegistration(req.body);
  const user = await authService.register(input);

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    user,
  });
};

export const loginUser = async (req, res) => {
  const input = validateLogin(req.body);
  const { accessToken, refreshToken, user } = await authService.login(input);

  return res.json({
    success: true,
    message: "Login successful",
    accessToken,
    refreshToken,
    users_new: user,
  });
};

export const getProfile = async (req, res) => {
  const profile = await authService.getProfile(req.user.userId);
  return res.status(200).json({
    success: true,
    data: profile,
  });
};

export const refreshAccessToken = async (req, res) => {
  const refreshToken = validateRefreshToken(req.body);
  const accessToken = authService.refreshAccessToken(refreshToken);

  return res.json({
    success: true,
    accessToken,
  });
};

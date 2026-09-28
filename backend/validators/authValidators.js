import HttpError from "../utils/HttpError.js";

const normalizeEmail = (email) =>
  typeof email === "string" ? email.trim().toLowerCase() : "";

const isValidEmail = (email) =>
  email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const validateRegistration = (body = {}) => {
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = normalizeEmail(body.email);
  const password = body.password;

  if (!name || name.length > 100 || !isValidEmail(email)) {
    throw new HttpError(400, "Enter a valid name and email address");
  }
  if (
    typeof password !== "string" ||
    password.length < 8 ||
    Buffer.byteLength(password, "utf8") > 72
  ) {
    throw new HttpError(
      400,
      "Password must be at least 8 characters and at most 72 bytes",
    );
  }

  return { name, email, password };
};

export const validateLogin = (body = {}) => {
  const email = normalizeEmail(body.email);
  const { password } = body;

  if (!isValidEmail(email) || typeof password !== "string" || !password) {
    throw new HttpError(400, "Enter a valid email address and password");
  }

  return { email, password };
};

export const validateRefreshToken = (body = {}) => {
  if (typeof body.refreshToken !== "string" || !body.refreshToken) {
    throw new HttpError(401, "Refresh token is required");
  }

  return body.refreshToken;
};
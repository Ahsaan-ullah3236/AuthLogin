import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";
import HttpError from "../utils/HttpError.js";

const SALT_ROUNDS = 10;
const ACCESS_TOKEN_EXPIRES_IN = "5minutes";
const REFRESH_TOKEN_EXPIRES_IN = "7d";

const getRefreshSecret = () =>
  process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;

export const register = async ({ name, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  try {
    const result = await pool.query(
      `INSERT INTO users_new (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, name, email`,
      [name, email, hashedPassword],
    );
    return result.rows[0];
  } catch (error) {
    if (error.code === "23505") {
      throw new HttpError(409, "An account with this email already exists");
    }
    throw error;
  }
};

export const login = async ({ email, password }) => {
  const result = await pool.query(
    `SELECT id, name, email, password FROM users_new WHERE email = $1`,
    [email],
  );
  const user = result.rows[0];

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new HttpError(401, "Invalid email or password");
  }

  const publicUser = { id: user.id, name: user.name, email: user.email };
  return {
    accessToken: jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRES_IN },
    ),
    refreshToken: jwt.sign(
      { userId: user.id },
      getRefreshSecret(),
      { expiresIn: REFRESH_TOKEN_EXPIRES_IN },
    ),
    user: publicUser,
  };
};

export const getProfile = async (userId) => {
  const result = await pool.query(
    `SELECT id, name, email FROM users_new WHERE id = $1`,
    [userId],
  );
  if (result.rows.length === 0) {
    throw new HttpError(404, "User profile not found");
  }
  return result.rows[0];
};

export const refreshAccessToken = (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, getRefreshSecret());
    return jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRES_IN },
    );
  } catch {
    throw new HttpError(401, "Invalid or expired refresh token");
  }
};
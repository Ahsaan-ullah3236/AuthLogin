import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 10;
const ACCESS_TOKEN_EXPIRES_IN = "15m";
const REFRESH_TOKEN_EXPIRES_IN = "7d";

const getRefreshSecret = () =>
  process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("Received registration data:", {
      name,
      email
    });
    
    // password hash 
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const result = await pool.query(
      `INSERT INTO users_new (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING  name, email`,
      [name, email, hashedPassword]
    );


    res.status(200).json({
      success: true,
      message: "User registered successfully",
      user: result.rows[0]
    });

  } catch (error) {
    console.error("❌ Registration error:", error);

    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      `SELECT id, name, email, password FROM users_new
       WHERE email = $1`,
      [email]
    );

    if (
      result.rows.length === 0 ||
      !(await bcrypt.compare(password, result.rows[0].password))
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const user = result.rows[0];

    const { password: storedPassword, ...users_new } = user;

    const accessToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRES_IN },
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      getRefreshSecret(),
      { expiresIn: REFRESH_TOKEN_EXPIRES_IN },
    );

    res.json({
      success: true,
      message: "Login successful",
      accessToken,
      refreshToken,
      users_new
    });

    console.log("Login successful for user:", users_new);

  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, email FROM users_new WHERE id = $1`,
      [req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load profile",
    });
  }
};

export const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token is required",
      });
    }

    const decoded = jwt.verify(refreshToken, getRefreshSecret());
    const accessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRES_IN },
    );

    return res.json({
      success: true,
      accessToken,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired refresh token",
    });
  }
};
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization token is required",
      });
    }

    const [scheme, token, ...extraParts] = authHeader.trim().split(/\s+/);
    if (scheme !== "Bearer" || !token || extraParts.length > 0) {
      return res.status(401).json({
        success: false,
        message: "Authorization header must use Bearer token format",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!Number.isInteger(decoded.userId) || decoded.userId < 1) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
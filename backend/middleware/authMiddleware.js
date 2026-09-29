import jwt from "jsonwebtoken";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

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
    if (typeof decoded.userId !== "string" || !UUID_PATTERN.test(decoded.userId)) {
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
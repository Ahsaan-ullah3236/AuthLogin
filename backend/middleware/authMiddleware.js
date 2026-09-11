import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    // 1. Authorization header lo
    const authHeader = req.headers.authorization;

    // 2. Check karo token aya hai ya nahi
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization token is required",
      });
    }

    // 3. "Bearer TOKEN" se actual token nikalo
    const token = authHeader.split(" ")[1];

    // 4. Token verify karo
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. User information request mein attach karo
    req.user = decoded;

    // 6. Next middleware/controller par jao
    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
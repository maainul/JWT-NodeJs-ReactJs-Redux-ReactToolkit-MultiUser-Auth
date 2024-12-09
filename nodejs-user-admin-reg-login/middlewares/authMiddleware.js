import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken || !bearerToken.startsWith("Bearer")) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized No token provied",
    });
  }

  const token = bearerToken.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "665c0c24a840bf62e76354cd");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export const authorizeRoles = (roles) => (req, res, next) => {
  const { role } = req.user;
  if (!roles.includes(role)) {
    return res.status(403).json({
      success: false,
      message: "Forbidden Insufficient permissions",
    });
  }
  next();
};

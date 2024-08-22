import jwt from "jsonwebtoken";

export const verifyJwt = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.json({
        message: "you are not authentication . Please log in.",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        message:
          "Invalid or expired authentication token. Please log in again.",
      });
    }
    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.log(error);
  }
};

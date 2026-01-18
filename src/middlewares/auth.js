import { verifyToken } from "../utils/jwt.js";

export const tokenBlacklist = new Set();

export function requireAuth(req, res, next) {
  const auth = req.headers.authorization;

  if (!auth?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing token" });
  }

  const token = auth.slice("Bearer ".length);

  if (tokenBlacklist.has(token)) {
    return res.status(401).json({ message: "Token invalidated" });
  }

  try {
    const payload = verifyToken(token);
    req.user = payload; // { userId, username, iat, exp }
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

import jwt from "jsonwebtoken";

export function signToken(payload: { userId: string; email: string }) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("Missing JWT_SECRET in environment variables.");
  }
  return jwt.sign(payload, secret, { expiresIn: "7d" });
}

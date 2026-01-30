import jwt from "jsonwebtoken";

type AuthPayload = {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
};

export function getAuthPayload(request: Request): AuthPayload | null {
  const header = request.headers.get("authorization") ?? "";
  const [, token] = header.split(" ");
  if (!token) {
    return null;
  }
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("Missing JWT_SECRET in environment variables.");
  }
  return jwt.verify(token, secret) as AuthPayload;
}

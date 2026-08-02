import { NextRequest } from "next/server";
import { verifyToken } from "./jwt";
import { UnauthorizedError } from "./errors";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  companyId: string;
  role: string;
}

export function authenticate(req: NextRequest): AuthUser {
  const authHeader = req.headers.get("authorization");
  const tokenFromHeader = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : undefined;
  const tokenFromCookie = req.cookies.get("token")?.value;
  const token = tokenFromHeader ?? tokenFromCookie;

  if (!token) {
    throw new UnauthorizedError("Authentication required.");
  }

  return verifyToken(token) as AuthUser;
}
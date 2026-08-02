import { AuthUser } from "./auth";
import { ForbiddenError } from "./errors";

export function requireRole(
  user: AuthUser,
  allowedRoles: string[]
) {
  if (!allowedRoles.includes(user.role)) {
    throw new ForbiddenError();
  }
}
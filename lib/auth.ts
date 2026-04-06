import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "jain_admin_token";

type AdminTokenPayload = {
  email: string;
};

export function signAdminToken(payload: AdminTokenPayload) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("Please define the JWT_SECRET environment variable.");
  }
  return jwt.sign(payload, secret, { expiresIn: "7d" });
}

export function verifyAdminToken(token: string): AdminTokenPayload | null {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return null;
    }
    return jwt.verify(token, secret) as AdminTokenPayload;
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  return verifyAdminToken(token);
}

import "server-only";
import { db } from "@/db";
import { jwtVerify, SignJWT, type JWTPayload } from "jose";
import { cookies } from "next/headers";
import { cache } from "react";
import { v4 as uuidv4 } from "uuid";
import { sessions } from "@/db/schema";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);
const EXPIRES_IN = process.env.SESSION_EXPIRES_IN;
const JWT_NAME = process.env.JWT_NAME;

export interface AuthPayload extends JWTPayload {
  jti?: string;
  userId: string;
  email: string;
  username: string;
  isSuperAdmin: boolean;
}

interface SessionResult {
  user: AuthPayload | null;
  shouldDeleteCookie?: boolean; // Bendera baru
}

/**
 * Create new authToken
 * @param payload Data autentication to insert in token
 * @returns JWT (string)
 */
export async function createToken(payload: AuthPayload): Promise<string> {
  const jti = uuidv4();
  payload.jti = jti;
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(EXPIRES_IN!)
    .setJti(jti)
    .sign(encodedKey);
}

/**
 * Verify authToken
 * @param payload token JWT
 * @returns AuthPayload (data user)
 */
export async function verifyToken(token: string): Promise<AuthPayload> {
  const { payload } = await jwtVerify(token, encodedKey, {
    algorithms: ["HS256"],
  });
  return payload as AuthPayload;
}

export const createSession = async (userData: AuthPayload) => {
  const sessionToken = await createToken(userData);
  const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000);

  await db.insert(sessions).values({
    userId: userData.userId,
    jti: userData.jti!, // JTI yang baru dicipta
    expiresAt: expiresAt,
  });
  const cookieStore = await cookies();
  cookieStore.set(JWT_NAME!, sessionToken, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
};

export const getSession = cache(async (): Promise<SessionResult> => {
  const token = (await cookies()).get(JWT_NAME!)?.value ?? null;
  if (!token) return { user: null };
  try {
    const payload = await verifyToken(token);
    // Check JTI
    const activeSession = await db.query.sessions.findFirst({
      where: (s, { eq }) => eq(s.jti, payload.jti as string),
    });
    if (!activeSession) {
      // JTI not found in DB
      console.warn(
        `[Auth] Session JTI ${payload.jti} not found in DB. Forcing logout.`
      );
      // 🚨 IMPORTANT!: Delete cookie in the browser.
      return { user: null, shouldDeleteCookie: true };
      // (await cookies()).delete(JWT_NAME!);
      // return { user: null };
    }

    // Check user in database only if user is superadmin
    const user = await db.query.users.findFirst({
      where: (u, { eq }) => eq(u.id, payload.userId),
      columns: { isSuperAdmin: true, email: true },
    });

    if (!user) {
      // Token valid, but user is deleted from DB
      return { user: null };
    }

    return {
      user: {
        userId: payload.userId,
        email: payload.email,
        username: payload.username,
        isSuperAdmin: payload.isSuperAdmin,
      },
    };
  } catch (error) {
    console.error("JWT verification failed:", error);
    return { user: null, shouldDeleteCookie: true };
  }
});

export const auth = getSession;

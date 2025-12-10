import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { SessionPayload } from "@/lib/definitions";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(
  session: string | undefined = ""
): Promise<SessionPayload | undefined> {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });

    // Validate
    if (
      typeof payload.userId === "string" &&
      typeof payload.username === "string" &&
      typeof payload.role === "string" &&
      (typeof payload.positionId === "string" || payload.positionId === null) &&
      (typeof payload.departmentId === "string" ||
        payload.departmentId === null) &&
      typeof payload.expiresAt === "string"
    ) {
      return {
        userId: payload.userId,
        username: payload.username,
        role: payload.role,
        positionId: payload.positionId,
        departmentId: payload.departmentId,
        expiresAt: new Date(payload.expiresAt),
      };
    }

    return undefined;
  } catch (error) {
    console.log("Failed to verify session");
    return undefined;
  }
}

export async function createSession(
  userId: string,
  username: string,
  role: string,
  positionId: string | null,
  departmentId: string | null
) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({
    userId,
    username,
    role,
    positionId,
    departmentId,
    expiresAt,
  });
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

// Helper untuk ambil session dari request
export async function getSession(): Promise<SessionPayload | undefined> {
  const cookieStore = await cookies();
  console.log("cookies:", cookieStore.getAll());
  const session = cookieStore.get("session")?.value;
  if (!session) return undefined;
  return decrypt(session);
}

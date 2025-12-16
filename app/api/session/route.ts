import { getSession } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const sessionResult = await getSession();

  if (sessionResult.shouldDeleteCookie) {
    console.warn("Session is invalid or revoked. Deleting cookie.");
    (await cookies()).delete(process.env.JWT_NAME!);
  }

  const { user } = sessionResult;

  if (!user) {
    return NextResponse.json({ message: "You are not login" }, { status: 401 });
  }

  return NextResponse.json(user, { status: 200 });
}

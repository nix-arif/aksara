import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcrypt-ts";
import { AuthPayload, createSession } from "@/lib/auth";
import { sessions, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password)
    return NextResponse.json(
      { message: "Invalid credential" },
      { status: 400 }
    );

  try {
    const userData = await db.query.users.findFirst({
      where: eq(users.email, email.toLowerCase()),
    });

    if (!userData)
      return NextResponse.json(
        { message: "Invalid credential" },
        { status: 401 }
      );

    const isPasswordMatched = await compare(password, userData.hashedPassword);

    if (!isPasswordMatched)
      return NextResponse.json(
        { message: "Invalid Credential" },
        { status: 401 }
      );

    const { hashedPassword: _pw, ...safeUser } = userData;

    const sessionPayload: AuthPayload = {
      userId: userData.id,
      email: userData.email,
      username: userData.username,
      isSuperAdmin: userData.isSuperAdmin || false,
    };

    await createSession(sessionPayload);

    return NextResponse.json(sessionPayload, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

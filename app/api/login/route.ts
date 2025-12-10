import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcrypt-ts";
import { createSession } from "@/lib/session";
import { user, userCompany } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    // 1. Query user + relation
    const result = await db
      .select({
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        positionId: userCompany.position_id,
        departmentId: userCompany.department_id,
        password_hash: user.password_hash,
      })
      .from(user)
      .leftJoin(userCompany, eq(user.id, userCompany.user_id))
      .where(eq(user.email, email))
      .execute();

    const userData = result[0];

    if (!userData)
      return NextResponse.json(
        { message: "Invalid credential" },
        { status: 401 }
      );

    const isPasswordMatched = await compare(password, userData.password_hash);

    if (!isPasswordMatched)
      return NextResponse.json(
        { message: "Invalid Credential" },
        { status: 401 }
      );

    const { password_hash: _pw, ...safeUser } = userData;

    await createSession(
      safeUser.id,
      safeUser.username,
      safeUser.role,
      safeUser.positionId,
      safeUser.departmentId
    );

    return NextResponse.json(safeUser, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

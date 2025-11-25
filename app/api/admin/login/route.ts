import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcrypt-ts";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const result = await db.query.admin.findFirst({
    where: (fields, { eq }) => eq(fields.email, email),
  });

  if (!result)
    return NextResponse.json(
      { message: "Invalid credential" },
      { status: 401 }
    );

  const isPasswordMatched = await compare(password, result.hashedPassword);

  if (!isPasswordMatched)
    return NextResponse.json(
      { message: "Invalid Credential" },
      { status: 401 }
    );

  const { hashedPassword: _pw, ...safeAdmin } = result;

  return NextResponse.json(safeAdmin, { status: 200 });
}

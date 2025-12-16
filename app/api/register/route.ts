import { db } from "@/db";
import { users } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { genSalt, hash } from "bcrypt-ts";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { username, email, password } = body;

  const existing = await db.query.users.findFirst({
    where: (fields, { eq }) => eq(fields.email, email),
  });

  if (existing)
    return NextResponse.json(
      { message: "Email already registered" },
      { status: 400 }
    );

  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);

  const newUser = await db
    .insert(users)
    .values({
      email,
      username,
      hashedPassword,
    })
    .returning();

  const { hashedPassword: _pw, ...safeUser } = newUser[0];

  return NextResponse.json(safeUser, { status: 200 });
}

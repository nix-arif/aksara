import { db } from "@/db";
import { user } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { genSalt, hash } from "bcrypt-ts";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { username, email, password } = body;

  console.log(body);

  const existing = await db.query.user.findFirst({
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
    .insert(user)
    .values({
      email,
      username,
      password_hash: hashedPassword,
    })
    .returning();

  const { password_hash: _pw, ...safeUser } = newUser[0];

  return NextResponse.json(safeUser, { status: 200 });
}

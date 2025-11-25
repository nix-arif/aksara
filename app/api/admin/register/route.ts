import { db } from "@/db";
import { admin } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { genSalt, hash } from "bcrypt-ts";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const existing = await db.query.admin.findFirst({
    where: (fields, { eq }) => eq(fields.email, email),
  });

  if (existing)
    return NextResponse.json(
      { message: "Email already registered" },
      { status: 400 }
    );

  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);

  const newAdmin = await db
    .insert(admin)
    .values({
      email,
      hashedPassword,
    })
    .returning();

  const { hashedPassword: _pw, ...safeAdmin } = newAdmin[0];

  return NextResponse.json(safeAdmin, { status: 200 });
}

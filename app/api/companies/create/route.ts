import { db } from "@/db";
import { companies, users } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import * as z from "zod";

export async function POST(request: NextRequest) {
  const session = await getSession();
  const body = await request.json();
  const {
    name,
    addressLine1,
    addressLine2,
    postcode,
    city,
    province,
    country,
    oldSsmNo,
    newSsmNo,
    tinNo,
  } = body;

  try {
    const existing = await db.query.companies.findFirst({
      where: (fields, { eq }) => eq(fields.newSsmNo, newSsmNo),
    });

    if (existing) {
      return NextResponse.json(
        { message: "Company already exists" },
        { status: 400 }
      );
    }

    if (!session.user)
      return NextResponse.json(
        { message: "Unauthorised transaction" },
        { status: 403 }
      );

    const newCompany = await db
      .insert(companies)
      .values({
        name,
        addressLine1,
        addressLine2,
        postcode,
        city,
        province,
        country,
        oldSsmNo,
        newSsmNo,
        tinNo,
        superAdminId: session.user.userId,
      })
      .returning();

    return NextResponse.json(newCompany, { status: 200 });
  } catch (error) {
    console.warn(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

import { db } from "@/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const companies = await db.query.companies.findMany({});
    return NextResponse.json(companies, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch companies" },
      { status: 500 }
    );
  }
}

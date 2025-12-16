import { getSession } from "@/lib/session";
import { NextRequest } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { companyId: string } }
) {
  const session = await getSession();
  console.log(session);
}

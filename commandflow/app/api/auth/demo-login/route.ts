import { NextRequest, NextResponse } from "next/server";
import { loginDemoBackend } from "@/services/demo-auth.service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await loginDemoBackend(body);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Login failed",
      },
      { status: 401 }
    );
  }
}

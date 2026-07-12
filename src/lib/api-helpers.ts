import { NextResponse } from "next/server";

export function getErrorMessage(err: unknown): string {
  return err instanceof Error ? err.message : "Unknown error";
}

export function errorResponse(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function successResponse(data: Record<string, unknown>, status = 200) {
  return NextResponse.json(data, { status });
}

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = () =>
  NextResponse.json(
    {
      status: "ok",
      timestamp: new Date().toISOString(),
    },
    {
      status: 200,
      headers: {
        "cache-control": "no-store",
      },
    },
  );

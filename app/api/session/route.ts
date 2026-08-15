import { NextResponse } from "next/server";

import { fetchAuthMutation, fetchAuthQuery } from "@/lib/convex/auth-server";
import { isConvexLive } from "@/lib/convex/env";
import { api } from "@/convex/_generated/api";
import type { Role } from "@/packages/contracts";

export async function GET() {
  if (!isConvexLive()) {
    return NextResponse.json(null);
  }
  try {
    const session = await fetchAuthQuery(api.profiles.me);
    return NextResponse.json(session ?? null);
  } catch {
    return NextResponse.json(null);
  }
}

export async function POST(request: Request) {
  if (!isConvexLive()) {
    return NextResponse.json({ error: "Convex is not live." }, { status: 501 });
  }
  const body = (await request.json().catch(() => ({}))) as { roles?: Role[] };
  const session = await fetchAuthMutation(api.profiles.ensureMine, {
    roles: body.roles,
  });
  return NextResponse.json(session);
}

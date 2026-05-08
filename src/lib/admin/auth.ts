import "server-only";

import { headers } from "next/headers";

export class AdminAuthError extends Error {
  status: number;
  constructor(message: string, status = 401) {
    super(message);
    this.status = status;
    this.name = "AdminAuthError";
  }
}

export async function requireAdminToken(): Promise<void> {
  const token = process.env.ADMIN_TOKEN?.trim();
  if (!token) {
    throw new AdminAuthError(
      "Admin is not configured. Set ADMIN_TOKEN in your environment.",
      503,
    );
  }
  const h = await headers();
  const provided = h.get("x-admin-token")?.trim();
  if (!provided || provided !== token) {
    throw new AdminAuthError("Unauthorized", 401);
  }
}


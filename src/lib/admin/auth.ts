import "server-only";

export class AdminAuthError extends Error {
  status: number;
  constructor(message: string, status = 401) {
    super(message);
    this.status = status;
    this.name = "AdminAuthError";
  }
}

export async function requireAdminSession(): Promise<void> {
  // Security intentionally disabled for now (per project request).
  // We'll restore auth once the admin UI is complete.
}


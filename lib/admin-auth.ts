
import {
  createHmac,
  timingSafeEqual,
} from "node:crypto";

const SESSION_DURATION_SECONDS = 8 * 60 * 60;

function safeCompare(value: string, expected: string): boolean {
  const valueBuffer = Buffer.from(value);
  const expectedBuffer = Buffer.from(expected);

  return (
    valueBuffer.length === expectedBuffer.length &&
    timingSafeEqual(valueBuffer, expectedBuffer)
  );
}

export function verifyAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected || !password) {
    return false;
  }

  return safeCompare(password, expected);
}

function signTimestamp(timestamp: string): string {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error("ADMIN_SESSION_SECRET is missing or too short.");
  }

  return createHmac("sha256", secret)
    .update(`miras-admin-session:${timestamp}`)
    .digest("hex");
}

export function createAdminSession() {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const signature = signTimestamp(timestamp);

  return {
    value: `${timestamp}.${signature}`,
    maxAge: SESSION_DURATION_SECONDS,
  };
}

export function verifyAdminSession(
  token: string | undefined
): boolean {
  if (!token) {
    return false;
  }

  const parts = token.split(".");

  if (parts.length !== 2) {
    return false;
  }

  const [timestamp, signature] = parts;

  if (
    !timestamp ||
    !signature ||
    !/^[a-f0-9]{64}$/.test(signature)
  ) {
    return false;
  }

  const issuedAt = Number(timestamp);
  const now = Math.floor(Date.now() / 1000);

  if (
    !Number.isSafeInteger(issuedAt) ||
    issuedAt > now ||
    now - issuedAt > SESSION_DURATION_SECONDS
  ) {
    return false;
  }

  try {
    const expectedSignature = signTimestamp(timestamp);

    return safeCompare(signature, expectedSignature);
  } catch {
    return false;
  }
}
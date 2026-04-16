import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE_NAME = "mm_admin_session";
const DEFAULT_SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 14;

function signValue(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

function isSecureRequest(requestUrl: string) {
  return requestUrl.startsWith("https://");
}

export function createAdminSessionToken(
  secret: string,
  maxAgeSeconds = DEFAULT_SESSION_MAX_AGE_SECONDS
) {
  const payload = {
    exp: Date.now() + maxAgeSeconds * 1000,
  };

  const encodedPayload = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  const signature = signValue(encodedPayload, secret);

  return `${encodedPayload}.${signature}`;
}

export function verifyAdminSessionToken(token: string | null | undefined, secret: string) {
  if (!token) return false;

  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) return false;

  const expectedSignature = signValue(encodedPayload, secret);
  const signatureBuffer = Buffer.from(signature, "utf8");
  const expectedBuffer = Buffer.from(expectedSignature, "utf8");

  if (signatureBuffer.length !== expectedBuffer.length) return false;
  if (!timingSafeEqual(signatureBuffer, expectedBuffer)) return false;

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8")) as {
      exp?: number;
    };

    return typeof payload.exp === "number" && payload.exp > Date.now();
  } catch {
    return false;
  }
}

export function readAdminSessionCookie(req: Request) {
  const cookieHeader = req.headers.get("cookie");
  if (!cookieHeader) return null;

  const parts = cookieHeader.split(";");
  for (const part of parts) {
    const [rawName, ...rawValueParts] = part.trim().split("=");
    if (rawName === ADMIN_COOKIE_NAME) {
      return decodeURIComponent(rawValueParts.join("="));
    }
  }

  return null;
}

export function buildAdminSessionCookie(
  token: string,
  requestUrl: string,
  maxAgeSeconds = DEFAULT_SESSION_MAX_AGE_SECONDS
) {
  const secure = isSecureRequest(requestUrl) ? "; Secure" : "";
  return `${ADMIN_COOKIE_NAME}=${encodeURIComponent(token)}; HttpOnly; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Strict${secure}`;
}

export function buildClearedAdminSessionCookie(requestUrl: string) {
  const secure = isSecureRequest(requestUrl) ? "; Secure" : "";
  return `${ADMIN_COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict${secure}`;
}

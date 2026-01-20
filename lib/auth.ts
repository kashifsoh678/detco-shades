import { SignJWT, jwtVerify } from "jose";

const secretKey =
  process.env.JWT_SECRET_KEY || "your-secret-key-change-this-in-env";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h") // Session checks out after 24 hours
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function getSession() {
  // Helper to be used in Server Components if needed
  // In strict "frontend" context, we might not use this immediately,
  // but it's good practice for the "Next.js Security" stack.
}

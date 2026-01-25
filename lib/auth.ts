import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function comparePassword(
  plain: string,
  hashed: string,
): Promise<boolean> {
  return await bcrypt.compare(plain, hashed);
}

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

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function verifyAdmin() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) {
    return {
      authenticated: false,
      response: NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
    };
  }

  try {
    const payload = await decrypt(session);
    if (payload.user.role !== "admin") {
      return {
        authenticated: false,
        response: NextResponse.json({ message: "Forbidden" }, { status: 403 }),
      };
    }
    return { authenticated: true, user: payload.user };
  } catch (error) {
    return {
      authenticated: false,
      response: NextResponse.json(
        { message: "Invalid Session" },
        { status: 401 },
      ),
    };
  }
}

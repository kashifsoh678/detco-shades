import "dotenv/config";
import { db } from "./index";
import { users } from "./schema/users";
import { eq } from "drizzle-orm";
import { hashPassword } from "../lib/auth";

async function seed() {
  console.log("Seeding database...");

  // Check if admin exists
  const existingAdmin = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, "admin@detco.sa"),
  });

  if (!existingAdmin) {
    console.log("Creating admin user...");
    const hashedPassword = await hashPassword("admin123");

    await db.insert(users).values({
      name: "Admin User",
      email: "admin@detco.sa",
      password: hashedPassword,
      role: "admin",
    });
    console.log("Admin user created");
  } else {
    console.log("Admin user already exists");
  }

  console.log("Seeding complete");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed", err);
  process.exit(1);
});

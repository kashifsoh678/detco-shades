import { pgTable, text, timestamp, uuid, pgEnum } from "drizzle-orm/pg-core";

export const mediaStatusEnum = pgEnum("media_status", ["pending", "attached"]);
export const resourceTypeEnum = pgEnum("resource_type", ["image", "video"]);

export const media = pgTable("media", {
  id: uuid("id").defaultRandom().primaryKey(),
  url: text("url").notNull(),
  publicId: text("public_id").notNull(),
  resourceType: resourceTypeEnum("resource_type").default("image").notNull(),
  status: mediaStatusEnum("status").default("pending").notNull(),
  folder: text("folder").notNull(),
  fileName: text("file_name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Media = typeof media.$inferSelect;
export type NewMedia = typeof media.$inferInsert;

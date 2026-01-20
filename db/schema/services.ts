import {
  pgTable,
  text,
  timestamp,
  uuid,
  boolean,
  integer,
  index,
  jsonb,
} from "drizzle-orm/pg-core";
import { media } from "./media";

export const services = pgTable(
  "services",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull().unique(),
    slug: text("slug").notNull().unique(),
    shortDescription: text("short_description").notNull(),
    details: text("details").notNull(), // HTML from Quill
    iconName: text("icon_name").notNull(), // Lucide icon name
    coverImageId: uuid("cover_image_id").references(() => media.id, {
      onDelete: "set null",
    }),
    features: jsonb("features").$type<string[]>().default([]).notNull(),
    processSteps: jsonb("process_steps")
      .$type<{ title: string; description: string }[]>()
      .default([])
      .notNull(),
    order: integer("order").notNull().unique(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => {
    return {
      titleIdx: index("service_title_idx").on(table.title),
      slugIdx: index("service_slug_idx").on(table.slug),
      isActiveIdx: index("service_is_active_idx").on(table.isActive),
    };
  },
);

export type Service = typeof services.$inferSelect;
export type NewService = typeof services.$inferInsert;

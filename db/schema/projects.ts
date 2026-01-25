import {
  pgTable,
  text,
  timestamp,
  uuid,
  boolean,
  integer,
  index,
} from "drizzle-orm/pg-core";
import { media } from "./media";
import { services } from "./services";

export const projects = pgTable(
  "projects",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    location: text("location").notNull(),
    serviceId: uuid("service_id").references(() => services.id, {
      onDelete: "set null",
    }),
    thumbnailId: uuid("thumbnail_id").references(() => media.id, {
      onDelete: "set null",
    }),
    description: text("description").notNull(), // HTML from Quill
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => {
    return {
      titleIdx: index("project_title_idx").on(table.title),
      slugIdx: index("project_slug_idx").on(table.slug),
      locationIdx: index("project_location_idx").on(table.location),
      isActiveIdx: index("project_is_active_idx").on(table.isActive),
    };
  },
);

export const projectImages = pgTable("project_images", {
  id: uuid("id").defaultRandom().primaryKey(),
  projectId: uuid("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  imageId: uuid("image_id")
    .notNull()
    .references(() => media.id, { onDelete: "cascade" }),
  order: integer("order").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type ProjectImage = typeof projectImages.$inferSelect;
export type NewProjectImage = typeof projectImages.$inferInsert;

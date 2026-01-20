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

export const clients = pgTable(
  "clients",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    imageId: uuid("image_id")
      .references(() => media.id, { onDelete: "cascade" })
      .notNull(),
    order: integer("order").default(0).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => {
    return {
      nameIdx: index("name_idx").on(table.name),
      isActiveIdx: index("is_active_idx").on(table.isActive),
      orderIdx: index("order_idx").on(table.order),
    };
  },
);

export type Client = typeof clients.$inferSelect;
export type NewClient = typeof clients.$inferInsert;

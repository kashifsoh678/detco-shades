import { pgTable, text, timestamp, uuid, pgEnum } from "drizzle-orm/pg-core";
import { services } from "./services";

export const quoteTypeEnum = pgEnum("quote_type", ["quick-cta", "contact-cta"]);
export const quoteStatusEnum = pgEnum("quote_status", [
  "new",
  "contacted",
  "closed",
]);

export const quotes = pgTable("quotes", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  serviceId: uuid("service_id")
    .references(() => services.id)
    .notNull(),
  type: quoteTypeEnum("type").notNull(),
  companyName: text("company_name"), // Enforced at API level for contact-cta
  projectDetails: text("project_details"), // Enforced at API level for contact-cta
  status: quoteStatusEnum("status").default("new").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Quote = typeof quotes.$inferSelect;
export type NewQuote = typeof quotes.$inferInsert;

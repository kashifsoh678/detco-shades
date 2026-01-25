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

export const products = pgTable(
  "products",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull().unique(),
    slug: text("slug").notNull().unique(),
    shortDescription: text("short_description").notNull(),
    description: text("description").notNull(), // HTML from Quill
    applications: jsonb("applications").$type<string[]>().default([]).notNull(),
    isFeatured: boolean("is_featured").default(false).notNull(),

    thumbnailId: uuid("thumbnail_id").references(() => media.id, {
      onDelete: "set null",
    }),
    coverImageId: uuid("cover_image_id").references(() => media.id, {
      onDelete: "set null",
    }),
    videoId: uuid("video_id").references(() => media.id, {
      onDelete: "set null",
    }),

    isActive: boolean("is_active").default(true).notNull(),
    order: integer("order").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => {
    return {
      titleIdx: index("product_title_idx").on(table.title),
      slugIdx: index("product_slug_idx").on(table.slug),
      isFeaturedIdx: index("product_is_featured_idx").on(table.isFeatured),
      isActiveIdx: index("product_is_active_idx").on(table.isActive),
    };
  },
);

export const productImages = pgTable("product_images", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  imageId: uuid("image_id")
    .notNull()
    .references(() => media.id, { onDelete: "cascade" }),
  order: integer("order").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const productSpecs = pgTable("product_specs", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  order: integer("order").notNull(),
});

export const productBenefits = pgTable("product_benefits", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  order: integer("order").notNull(),
});

export const productFaqs = pgTable("product_faqs", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  order: integer("order").notNull(),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type ProductImage = typeof productImages.$inferSelect;
export type NewProductImage = typeof productImages.$inferInsert;
export type ProductSpec = typeof productSpecs.$inferSelect;
export type NewProductSpec = typeof productSpecs.$inferInsert;
export type ProductBenefit = typeof productBenefits.$inferSelect;
export type NewProductBenefit = typeof productBenefits.$inferInsert;
export type ProductFaq = typeof productFaqs.$inferSelect;
export type NewProductFaq = typeof productFaqs.$inferInsert;

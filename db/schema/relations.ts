import { relations } from "drizzle-orm";
import { clients } from "./clients";
import { services } from "./services";
import { media } from "./media";
import { projects, projectImages } from "./projects";
import {
  products,
  productImages,
  productSpecs,
  productBenefits,
  productFaqs,
} from "./products";
import { quotes } from "./quotes";

export const clientsRelations = relations(clients, ({ one }) => ({
  image: one(media, {
    fields: [clients.imageId],
    references: [media.id],
  }),
}));

export const servicesRelations = relations(services, ({ one, many }) => ({
  coverImage: one(media, {
    fields: [services.coverImageId],
    references: [media.id],
  }),
  projects: many(projects),
  quotes: many(quotes),
}));

export const quotesRelations = relations(quotes, ({ one }) => ({
  service: one(services, {
    fields: [quotes.serviceId],
    references: [services.id],
  }),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
  service: one(services, {
    fields: [projects.serviceId],
    references: [services.id],
  }),
  thumbnail: one(media, {
    fields: [projects.thumbnailId],
    references: [media.id],
  }),
  images: many(projectImages),
}));

export const projectImagesRelations = relations(projectImages, ({ one }) => ({
  project: one(projects, {
    fields: [projectImages.projectId],
    references: [projects.id],
  }),
  image: one(media, {
    fields: [projectImages.imageId],
    references: [media.id],
  }),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  thumbnail: one(media, {
    fields: [products.thumbnailId],
    references: [media.id],
  }),
  coverImage: one(media, {
    fields: [products.coverImageId],
    references: [media.id],
  }),
  video: one(media, {
    fields: [products.videoId],
    references: [media.id],
  }),
  images: many(productImages),
  specs: many(productSpecs),
  benefits: many(productBenefits),
  faqs: many(productFaqs),
}));

export const productImagesLinksRelations = relations(
  productImages,
  ({ one }) => ({
    product: one(products, {
      fields: [productImages.productId],
      references: [products.id],
    }),
    image: one(media, {
      fields: [productImages.imageId],
      references: [media.id],
    }),
  }),
);

export const productSpecsRelations = relations(productSpecs, ({ one }) => ({
  product: one(products, {
    fields: [productSpecs.productId],
    references: [products.id],
  }),
}));

export const productBenefitsRelations = relations(
  productBenefits,
  ({ one }) => ({
    product: one(products, {
      fields: [productBenefits.productId],
      references: [products.id],
    }),
  }),
);

export const productFaqsRelations = relations(productFaqs, ({ one }) => ({
  product: one(products, {
    fields: [productFaqs.productId],
    references: [products.id],
  }),
}));

export const mediaRelations = relations(media, ({ many }) => ({
  clients: many(clients),
  services: many(services),
  projects: many(projects),
  projectImages: many(projectImages),
  productsThumbnails: many(products),
  productsCovers: many(products),
  productsVideos: many(products),
  productGalleryImages: many(productImages),
}));

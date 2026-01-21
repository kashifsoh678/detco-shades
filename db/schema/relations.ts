import { relations } from "drizzle-orm";
import { clients } from "./clients";
import { services } from "./services";
import { media } from "./media";
import { projects, projectImages } from "./projects";

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

export const mediaRelations = relations(media, ({ many }) => ({
  clients: many(clients),
  services: many(services),
  projects: many(projects),
  projectImages: many(projectImages),
}));

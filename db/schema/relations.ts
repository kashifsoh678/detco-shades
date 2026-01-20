import { relations } from "drizzle-orm";
import { clients } from "./clients";
import { services } from "./services";
import { media } from "./media";

export const clientsRelations = relations(clients, ({ one }) => ({
  image: one(media, {
    fields: [clients.imageId],
    references: [media.id],
  }),
}));

export const servicesRelations = relations(services, ({ one }) => ({
  coverImage: one(media, {
    fields: [services.coverImageId],
    references: [media.id],
  }),
}));

export const mediaRelations = relations(media, ({ many }) => ({
  clients: many(clients),
  services: many(services),
}));

import { relations } from "drizzle-orm";
import { clients } from "./clients";
import { media } from "./media";

export const clientsRelations = relations(clients, ({ one }) => ({
  image: one(media, {
    fields: [clients.imageId],
    references: [media.id],
  }),
}));

export const mediaRelations = relations(media, ({ many }) => ({
  clients: many(clients),
}));

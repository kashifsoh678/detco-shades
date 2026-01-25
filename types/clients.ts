export interface Media {
  id: string;
  url: string;
  publicId: string;
  resourceType: "image" | "video";
  status: "pending" | "attached";
  folder: string;
  fileName: string;
  createdAt: string;
  updatedAt: string;
}

export interface Client {
  id: string;
  name: string;
  imageId: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  image?: Media;
}

export interface NewClient {
  name: string;
  imageId: string;
  order?: number;
  isActive?: boolean;
}

export interface ClientUpdate extends Partial<NewClient> {
  id: string;
}

export interface ClientsResponse {
  data: Client[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

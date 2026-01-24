import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";

export interface Product {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  applications: string[];
  isFeatured: boolean;
  thumbnailId: string | null;
  coverImageId: string | null;
  videoId: string | null;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
  thumbnail?: {
    url: string;
    publicId: string;
  };
  coverImage?: {
    url: string;
    publicId: string;
  };
  video?: {
    url: string;
    resourceType: "video";
    publicId: string;
  };
  images?: {
    id: string;
    productId: string;
    imageId: string;
    order: number;
    image: {
      url: string;
      publicId: string;
    };
  }[];
  specs?: {
    id: string;
    title: string;
    description: string;
    order: number;
  }[];
  benefits?: {
    id: string;
    title: string;
    order: number;
  }[];
  faqs?: {
    id: string;
    question: string;
    answer: string;
    order: number;
  }[];
}

export type ProductCreate = Omit<
  Product,
  | "id"
  | "createdAt"
  | "updatedAt"
  | "thumbnail"
  | "coverImage"
  | "video"
  | "images"
  | "specs"
  | "benefits"
  | "faqs"
> & {
  imageIds: string[];
  specs: { title: string; description: string }[];
  benefits: { title: string }[];
  faqs: { question: string; answer: string }[];
};

export type ProductUpdate = Partial<ProductCreate> & { id: string };

export const useProducts = (
  options: { all?: boolean; isFeatured?: boolean } = {},
) => {
  const queryClient = useQueryClient();
  const { all = false, isFeatured } = options;

  const productsQuery = useQuery({
    queryKey: ["products", { all, isFeatured }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (all) params.append("all", "true");
      if (isFeatured !== undefined)
        params.append("isFeatured", String(isFeatured));

      const response = await axiosInstance.get(
        `/products?${params.toString()}`,
      );
      return response.data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (product: ProductCreate) => {
      const response = await axiosInstance.post("/products", product);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product created successfully");
    },
    onError: (error: any) => {
      const msg = error.response?.data?.error || "Failed to create product";
      toast.error(msg);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (update: ProductUpdate) => {
      const { id, ...rest } = update;
      const response = await axiosInstance.patch(`/products/${id}`, rest);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      // Also invalidate specific product query
      queryClient.invalidateQueries({ queryKey: ["product"] });
      toast.success("Product updated successfully");
    },
    onError: (error: any) => {
      const msg = error.response?.data?.error || "Failed to update product";
      toast.error(msg);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete(`/products/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted successfully");
    },
    onError: (error: any) => {
      const msg = error.response?.data?.error || "Failed to delete product";
      toast.error(msg);
    },
  });

  return {
    productsQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  };
};

export const useProduct = (idOrSlug: string) => {
  return useQuery({
    queryKey: ["product", idOrSlug],
    queryFn: async () => {
      const response = await axiosInstance.get(`/products/${idOrSlug}`);
      return response.data as Product;
    },
    enabled: !!idOrSlug,
  });
};

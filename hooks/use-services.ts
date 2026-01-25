import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";

export interface Service {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  details: string;
  iconName: string;
  coverImageId: string | null;
  features: string[];
  processSteps: { title: string; description: string }[];
  order: number;
  isActive: boolean;
  coverImage?: {
    url: string;
    publicId: string;
  };
}

export type ServiceCreate = Omit<Service, "id" | "order" | "coverImage">;
export type ServiceUpdate = Partial<Service> & { id: string };

export const useServices = (all: boolean = false) => {
  const queryClient = useQueryClient();

  const servicesQuery = useQuery({
    queryKey: ["services", { all }],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/services${all ? "?all=true" : ""}`,
      );
      return response.data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (service: ServiceCreate) => {
      const response = await axiosInstance.post("/services", service);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success("Service created successfully");
    },
    onError: (error: any) => {
      const msg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to create service";
      toast.error(msg);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (update: ServiceUpdate) => {
      const { id, ...rest } = update;
      const response = await axiosInstance.patch(`/services/${id}`, rest);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success("Service updated successfully");
    },
    onError: (error: any) => {
      const msg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to update service";
      toast.error(msg);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete(`/services/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success("Service deleted successfully");
    },
    onError: (error: any) => {
      const msg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to delete service";
      toast.error(msg);
    },
  });

  return {
    servicesQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  };
};

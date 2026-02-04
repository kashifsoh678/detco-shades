import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";

export interface Project {
  id: string;
  title: string;
  slug: string;
  location: string;
  serviceId: string | null;
  thumbnailId: string | null;
  description: string;
  isActive: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
  thumbnail?: {
    url: string;
    publicId: string;
  } | null;
  service?: {
    id: string;
    title: string;
    slug: string;
  } | null;
  images?: {
    id: string;
    projectId: string;
    imageId: string;
    order: number;
    image: {
      url: string;
      publicId: string;
    };
  }[];
}

export type ProjectCreate = Omit<
  Project,
  "id" | "createdAt" | "updatedAt" | "thumbnail" | "service" | "images"
> & {
  imageIds: string[];
};

export type ProjectUpdate = Partial<ProjectCreate> & { id: string };

export const useProjects = (
  options: { all?: boolean; serviceId?: string } = {},
) => {
  const queryClient = useQueryClient();
  const { all = false, serviceId } = options;

  const projectsQuery = useQuery({
    queryKey: ["projects", { all, serviceId }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (all) params.append("all", "true");
      if (serviceId) params.append("serviceId", serviceId);

      const response = await axiosInstance.get(
        `/projects?${params.toString()}`,
      );
      return response.data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (project: ProjectCreate) => {
      const response = await axiosInstance.post("/projects", project);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project created successfully");
    },
    onError: (error: any) => {
      const msg = error.response?.data?.error || "Failed to create project";
      toast.error(msg);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (update: ProjectUpdate) => {
      const { id, ...rest } = update;
      const response = await axiosInstance.patch(`/projects/${id}`, rest);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project updated successfully");
    },
    onError: (error: any) => {
      const msg = error.response?.data?.error || "Failed to update project";
      toast.error(msg);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete(`/projects/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project deleted successfully");
    },
    onError: (error: any) => {
      const msg = error.response?.data?.error || "Failed to delete project";
      toast.error(msg);
    },
  });

  return {
    projectsQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  };
};

export const useProject = (idOrSlug: string) => {
  return useQuery({
    queryKey: ["project", idOrSlug],
    queryFn: async () => {
      const response = await axiosInstance.get(`/projects/${idOrSlug}`);
      return response.data as Project;
    },
    enabled: !!idOrSlug,
  });
};

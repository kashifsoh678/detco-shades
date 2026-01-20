"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import {
  ClientsResponse,
  Client,
  NewClient,
  ClientUpdate,
} from "@/types/clients";
import { toast } from "sonner";

export const useClients = (page = 1, limit = 10, all = false) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery<ClientsResponse>({
    queryKey: ["clients", page, limit, all],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/clients?page=${page}&limit=${limit}${all ? "&all=true" : ""}`,
      );
      return response.data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (newClient: NewClient) => {
      const response = await axiosInstance.post("/clients", newClient);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast.success("Client created successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Failed to create client");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (update: ClientUpdate) => {
      const { id, ...rest } = update;
      const response = await axiosInstance.patch(`/clients/${id}`, rest);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast.success("Client updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Failed to update client");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete(`/clients/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast.success("Client deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Failed to delete client");
    },
  });

  return {
    clients: data?.data || [],
    meta: data?.meta,
    isLoading,
    isError,
    error,
    createClient: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    updateClient: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    deleteClient: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
};

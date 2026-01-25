import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";

export interface Quote {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceId: string;
  service?: { id: string; title: string };
  type: "quick-cta" | "contact-cta";
  companyName?: string;
  projectDetails?: string;
  status: "new" | "contacted" | "closed";
  createdAt: string;
}

export type QuoteCreate = Omit<
  Quote,
  "id" | "status" | "createdAt" | "service"
>;

export const useQuotes = () => {
  const queryClient = useQueryClient();

  const submitQuoteMutation = useMutation({
    mutationFn: async (quote: QuoteCreate) => {
      const response = await axiosInstance.post("/quotes", quote);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quotes"] });
      toast.success("Quote request submitted successfully!");
    },
    onError: (error: any) => {
      const msg =
        error.response?.data?.error || "Failed to submit quote request";
      toast.error(msg);
    },
  });

  return {
    submitQuoteMutation,
  };
};

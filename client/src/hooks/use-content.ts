import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { type Language, type ContentType, type InsertContactSubmission } from "@shared/schema";

// Helper to coerce types since API returns `any` for flexible content
import { z } from "zod";

// === CONTENT HOOKS ===

export function useContentList(lang: Language, type: ContentType) {
  return useQuery({
    queryKey: [api.content.list.path, lang, type],
    queryFn: async () => {
      const url = buildUrl(api.content.list.path, { lang, type });
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch content list");
      return await res.json() as { items: any[] };
    },
  });
}

export function useContentDetail(lang: Language, type: ContentType, slug: string) {
  return useQuery({
    queryKey: [api.content.get.path, lang, type, slug],
    queryFn: async () => {
      const url = buildUrl(api.content.get.path, { lang, type, slug });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch content detail");
      return await res.json() as any;
    },
    enabled: !!slug,
  });
}

// === CONTACT FORM HOOK ===

export function useSubmitContact() {
  return useMutation({
    mutationFn: async (data: InsertContactSubmission) => {
      const validated = api.contact.submit.input.parse(data);
      const res = await fetch(api.contact.submit.path, {
        method: api.contact.submit.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = await res.json();
          throw new Error(error.message || "Validation failed");
        }
        throw new Error("Failed to submit contact form");
      }
      return await res.json();
    },
  });
}

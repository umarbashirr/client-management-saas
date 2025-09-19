"use client";

import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form/form-input";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  CreateWorkspaceSchema,
  createWorkspaceSchema,
} from "../validations/create-workspace.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { createWorkspace } from "../actions";

export const CreateWorkspaceForm = () => {
  const router = useRouter();
  const form = useForm<CreateWorkspaceSchema>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  const onSubmit = async (data: CreateWorkspaceSchema) => {
    try {
      const { success, error } = await createWorkspace(data);

      if (!success) {
        throw new Error(error);
      }

      toast.success("Workspace created successfully");
      router.refresh();
      form.reset();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  useEffect(() => {
    if (form.watch("name")) {
      form.setValue(
        "slug",
        form.watch("name").toLowerCase().replace(/ /g, "-")
      );
    }
  }, [form.watch("name")]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormInput
          label="Name"
          name="name"
          type="text"
          placeholder="Name"
          required={true}
          control={form.control}
        />
        <FormInput
          label="Slug"
          name="slug"
          type="text"
          placeholder="Slug"
          required={true}
          control={form.control}
        />
        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting && (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          )}
          {form.formState.isSubmitting ? "Creating..." : "Create Workspace"}
        </Button>
      </form>
    </Form>
  );
};

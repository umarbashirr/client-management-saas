"use client";

import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { createAuditLog } from "@/features/audit/actions";
import { authClient } from "@/lib/authentication/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  ForgotPasswordFormSchema,
  forgotPasswordFormSchema,
} from "../validations/forgot-password-form.schema";

export const ForgotPasswordForm = () => {
  const form = useForm<ForgotPasswordFormSchema>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormSchema) => {
    try {
      const { error } = await authClient.requestPasswordReset({
        email: data.email,
        redirectTo: process.env.NEXT_PUBLIC_APP_URL + "/reset-password",
      });

      if (error) {
        throw new Error(error.message);
      }

      await createAuditLog({
        action: "user.password_reset",
        resource: "user",
        resourceId: data.email,
        status: "success",
        message: "Reset email sent",
      });

      form.reset();
      toast.success("Reset email sent");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormInput
          label="Email"
          name="email"
          type="email"
          placeholder="Email"
          required={true}
          control={form.control}
        />

        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting && <Loader2 className="w-4 h-4 mr-2" />}
          {form.formState.isSubmitting
            ? "Sending reset email..."
            : "Send reset email"}
        </Button>
      </form>
    </Form>
  );
};

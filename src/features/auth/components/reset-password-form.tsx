"use client";

import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { createAuditLog } from "@/features/audit/actions";
import { authClient } from "@/lib/authentication/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  ResetPasswordFormSchema,
  resetPasswordFormSchema,
} from "../validations/reset-password-form.schema";

export const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const form = useForm<ResetPasswordFormSchema>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const token = searchParams.get("token");

  if (!token) {
    router.push("/sign-in");
    return;
  }

  const onSubmit = async (data: ResetPasswordFormSchema) => {
    try {
      const { error } = await authClient.resetPassword({
        newPassword: data.password,
        token: token,
      });

      if (error) {
        throw new Error(error.message);
      }
      await createAuditLog({
        action: "user.password_reset",
        resource: "user",
        resourceId: "",
        status: "success",
        message: "Password updated successfully",
      });
      form.reset();
      toast.success("Password updated successfully!");
      router.push("/sign-in");
    } catch (error: unknown) {
      console.error(error);
      const err =
        error instanceof Error ? error.message : "Failed to update password";
      toast.error(err);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormInput
          label="Password"
          name="password"
          type="password"
          placeholder="Password"
          required={true}
          control={form.control}
        />
        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
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
          {form.formState.isSubmitting
            ? "Resetting password..."
            : "Reset Password"}
        </Button>
      </form>
    </Form>
  );
};

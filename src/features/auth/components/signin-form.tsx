"use client";

import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { signIn } from "@/lib/authentication/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  SigninFormSchema,
  signinFormSchema,
} from "../validations/signin-form.schema";
import { Loader2 } from "lucide-react";
import { createAuditLog } from "@/features/audit/actions";

export const SigninForm = () => {
  const form = useForm<SigninFormSchema>({
    resolver: zodResolver(signinFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SigninFormSchema) => {
    try {
      await signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: "/workspaces",
        fetchOptions: {
          onSuccess: async () => {
            await createAuditLog({
              action: "user.signin",
              resource: "user",
              resourceId: data.email,
              metadata: {
                email: data.email,
              },
              status: "success",
              organizationId: "",
              message: "Sign in successful",
            });
            toast.success("Sign in successful");
            form.reset();
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  const handleSocialAuth = async (provider: string) => {
    try {
      await signIn.social({
        provider,
        callbackURL: "/workspaces",
        fetchOptions: {
          onSuccess: async () => {
            await createAuditLog({
              action: "user.signin",
              resource: "user",
              resourceId: "",
              status: "success",
              organizationId: "",
            });
            toast.success("Sign in successful");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  return (
    <div className="space-y-4 w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <FormInput
            label="Email"
            name="email"
            type="email"
            placeholder="Email"
            required={true}
            control={form.control}
            disabled={form.formState.isSubmitting}
          />

          <div className="flex flex-col w-full gap-2">
            <FormInput
              label="Password"
              name="password"
              type="password"
              placeholder="Password"
              required={true}
              control={form.control}
              disabled={form.formState.isSubmitting}
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Don&apos;t remember your password?
            </p>
            <Button variant="link" asChild className="p-0">
              <Link href="/forgot-password">Reset password</Link>
            </Button>
          </div>
          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            )}
            {form.formState.isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </Form>
      <div className="flex items-center justify-center gap-2 max-w-full">
        <Separator className="flex-1" />
        <p className="text-center text-sm text-muted-foreground">
          Or continue with
        </p>
        <Separator className="flex-1" />
      </div>
      <div className="flex flex-col gap-2">
        <Button
          variant="outline"
          className="w-full cursor-pointer"
          onClick={() => handleSocialAuth("google")}
          disabled={form.formState.isSubmitting}
        >
          <Image src="/icons/google.svg" alt="Google" width={20} height={20} />
          <span className="sr-only">Google</span>
          Sign in with Google
        </Button>
        <Button
          variant="outline"
          className="w-full cursor-pointer"
          onClick={() => handleSocialAuth("github")}
          disabled={form.formState.isSubmitting}
        >
          <Image src="/icons/github.svg" alt="GitHub" width={20} height={20} />
          <span className="sr-only">GitHub</span>
          Sign in with GitHub
        </Button>
      </div>
    </div>
  );
};

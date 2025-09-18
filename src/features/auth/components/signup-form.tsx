"use client";

import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  SignupFormSchema,
  signupFormSchema,
} from "../validations/signup-form.schema";
import { toast } from "sonner";
import { signIn, signUp } from "@/lib/authentication/auth-client";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { createAuditLog } from "@/features/audit/actions";
import { useRouter } from "next/navigation";

export const SignupForm = () => {
  const router = useRouter();
  const form = useForm<SignupFormSchema>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignupFormSchema) => {
    try {
      await signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
        callbackURL: "/workspaces",
        fetchOptions: {
          onSuccess: async () => {
            await createAuditLog({
              action: "user.signup",
              resource: "user",
              resourceId: data.email,
              metadata: {
                name: data.name,
                email: data.email,
              },
              status: "success",
              message: "Sign up successful",
            });
            router.push("/workspaces");
            toast.success("Sign up successful");
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
              action: "user.signup",
              resource: "user",
              resourceId: "",
              status: "success",
              message: "Sign up successful",
            });
            router.push("/workspaces");
            toast.success("Sign up successful");
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

  return (
    <div className="space-y-4 w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <FormInput
            label="Name"
            name="name"
            type="text"
            placeholder="Name"
            required={true}
            control={form.control}
            disabled={form.formState.isSubmitting}
          />
          <FormInput
            label="Email"
            name="email"
            type="email"
            placeholder="Email"
            required={true}
            control={form.control}
            disabled={form.formState.isSubmitting}
          />
          <FormInput
            label="Password"
            name="password"
            type="password"
            placeholder="Password"
            required={true}
            control={form.control}
            disabled={form.formState.isSubmitting}
          />

          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && (
              <Loader2 className="w-4 h-4 mr-2" />
            )}
            {form.formState.isSubmitting ? "Signing up..." : "Sign up"}
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
          Sign up with Google
        </Button>
        <Button
          variant="outline"
          className="w-full cursor-pointer"
          onClick={() => handleSocialAuth("github")}
          disabled={form.formState.isSubmitting}
        >
          <Image src="/icons/github.svg" alt="GitHub" width={20} height={20} />
          <span className="sr-only">GitHub</span>
          Sign up with GitHub
        </Button>
      </div>
    </div>
  );
};

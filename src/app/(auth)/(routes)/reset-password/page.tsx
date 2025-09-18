import {
  Card,
  CardTitle,
  CardContent,
  CardHeader,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";
import { isAuthenticated } from "@/lib/authentication/middleware";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const ResetPassword = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const authenticated = await isAuthenticated();
  const { token } = await searchParams;

  if (authenticated) {
    redirect("/workspaces");
  }

  if (!token) {
    redirect("/sign-in");
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Reset your password</CardTitle>
        <CardDescription>
          No worries! Please enter your new password to reset your password.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center w-full">
        <ResetPasswordForm />
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-center gap-2 w-full">
          <p className="text-center text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link href="/sign-in" className="text-primary underline">
              Sign in
            </Link>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ResetPassword;

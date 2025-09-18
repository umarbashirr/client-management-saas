import {
  Card,
  CardTitle,
  CardContent,
  CardHeader,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";
import { isAuthenticated } from "@/lib/authentication/middleware";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const ForgotPassword = async () => {
  const authenticated = await isAuthenticated();

  if (authenticated) {
    redirect("/workspaces");
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Forgot your password?</CardTitle>
        <CardDescription>
          No worries! Please enter your email to reset your password.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center w-full">
        <ForgotPasswordForm />
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

export default ForgotPassword;

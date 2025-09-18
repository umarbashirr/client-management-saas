import {
  Card,
  CardTitle,
  CardContent,
  CardHeader,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { SigninForm } from "@/features/auth/components/signin-form";
import { isAuthenticated } from "@/lib/authentication/middleware";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const SignIn = async () => {
  const authenticated = await isAuthenticated();

  if (authenticated) {
    redirect("/workspaces");
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign in to your account</CardTitle>
        <CardDescription>
          Welcome back to Cliently. Please enter your details to sign in to your
          account.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center w-full">
        <SigninForm />
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-center gap-2 w-full">
          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-primary underline">
              Sign up
            </Link>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SignIn;

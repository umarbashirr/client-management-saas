import {
  Card,
  CardTitle,
  CardContent,
  CardHeader,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { SignupForm } from "@/features/auth/components/signup-form";
import { isAuthenticated } from "@/lib/authentication/middleware";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const SignUp = async () => {
  const authenticated = await isAuthenticated();

  if (authenticated) {
    redirect("/workspaces");
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Welcome to Cliently. Please enter your details and start your journey
          with us.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center w-full">
        <SignupForm />
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-center gap-2 w-full">
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-primary underline">
              Sign in
            </Link>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SignUp;

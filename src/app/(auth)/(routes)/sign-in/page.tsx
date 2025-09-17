import { isAuthenticated } from "@/lib/authentication/middleware";
import { redirect } from "next/navigation";
import React from "react";

const SignIn = async () => {
  const authenticated = await isAuthenticated();

  if (authenticated) {
    redirect("/dashboard");
  }

  return <div>SignIn</div>;
};

export default SignIn;

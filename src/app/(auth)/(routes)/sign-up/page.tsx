import { isAuthenticated } from "@/lib/authentication/middleware";
import { redirect } from "next/navigation";
import React from "react";

const SignUp = async () => {
  const authenticated = await isAuthenticated();

  if (authenticated) {
    redirect("/dashboard");
  }

  return <div>SignUp</div>;
};

export default SignUp;

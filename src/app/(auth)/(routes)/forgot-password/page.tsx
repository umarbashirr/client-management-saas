import { isAuthenticated } from "@/lib/authentication/middleware";
import { redirect } from "next/navigation";
import React from "react";

const ForgotPassword = async () => {
  const authenticated = await isAuthenticated();

  if (authenticated) {
    redirect("/dashboard");
  }

  return <div>ForgotPassword</div>;
};

export default ForgotPassword;

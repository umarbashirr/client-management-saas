import { isAuthenticated } from "@/lib/authentication/middleware";
import { redirect } from "next/navigation";
import React from "react";

const ResetPassword = async () => {
  const authenticated = await isAuthenticated();

  if (authenticated) {
    redirect("/dashboard");
  }

  return <div>ResetPassword</div>;
};

export default ResetPassword;

import "server-only";

import { auth } from "@/lib/authentication/auth";
import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const getServerSession = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
});

export const requireSession = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect("/sign-in");
  }
  return session;
};

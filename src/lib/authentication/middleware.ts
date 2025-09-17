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

export const requireAdmin = async () => {
  const session = await getServerSession();

  if (!session || session.user.role !== "admin") {
    redirect("/sign-in");
  }

  return session;
};

export const isAuthenticated = async () => {
  const session = await getServerSession();
  return !!session;
};

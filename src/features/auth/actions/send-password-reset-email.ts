"use server";

import { resend } from "@/lib/email/resend";
import { PasswordResetEmail } from "../mail-templates/password-reset";

export const sendPasswordResetEmail = async (
  name: string,
  email: string,
  resetPasswordLink: string
) => {
  const { data, error } = await resend.emails.send({
    from: "Cliently <onboarding@resend.dev>",
    to: email,
    subject: "Reset your password",
    react: PasswordResetEmail({
      userFirstname: name,
      resetPasswordLink,
      companyName: "Cliently",
    }),
  });

  if (error) {
    console.error(error);
    return { error: "Failed to send password reset email" };
  }

  return { success: true };
};

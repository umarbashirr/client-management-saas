import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface PasswordResetEmailProps {
  userFirstname?: string;
  resetPasswordLink?: string;
  companyName?: string;
}

export const PasswordResetEmail = ({
  userFirstname = "User",
  resetPasswordLink = "https://example.com/reset-password?token=abc123",
  companyName = "Client Management SaaS",
}: PasswordResetEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Reset your password for {companyName}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={logo}>{companyName}</Heading>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading style={h1}>Reset Your Password</Heading>

            <Text style={text}>Hi {userFirstname},</Text>

            <Text style={text}>
              We received a request to reset your password for your{" "}
              {companyName} account. If you didn't make this request, you can
              safely ignore this email.
            </Text>

            <Text style={text}>
              To reset your password, click the button below:
            </Text>

            <Section style={buttonContainer}>
              <Button style={button} href={resetPasswordLink}>
                Reset Password
              </Button>
            </Section>

            <Text style={text}>
              Or copy and paste this link into your browser:
            </Text>

            <Text style={linkText}>{resetPasswordLink}</Text>

            <Text style={text}>
              This link will expire in 24 hours for security reasons.
            </Text>

            <Text style={text}>
              If you're having trouble with the button above, copy and paste the
              URL below into your web browser.
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              This email was sent from {companyName}. If you didn't request this
              password reset, please contact our support team.
            </Text>

            <Text style={footerText}>
              © 2024 {companyName}. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default PasswordResetEmail;

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "600px",
};

const header = {
  padding: "32px 24px 0",
  textAlign: "center" as const,
};

const logo = {
  color: "#1f2937",
  fontSize: "24px",
  fontWeight: "600",
  margin: "0",
  textAlign: "center" as const,
};

const content = {
  padding: "24px",
};

const h1 = {
  color: "#1f2937",
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "32px",
  margin: "0 0 24px",
  textAlign: "center" as const,
};

const text = {
  color: "#374151",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 16px",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#3b82f6",
  borderRadius: "8px",
  color: "#ffffff",
  display: "inline-block",
  fontSize: "16px",
  fontWeight: "600",
  lineHeight: "24px",
  padding: "12px 24px",
  textDecoration: "none",
  textAlign: "center" as const,
};

const linkText = {
  color: "#3b82f6",
  fontSize: "14px",
  lineHeight: "20px",
  margin: "0 0 16px",
  wordBreak: "break-all" as const,
};

const footer = {
  borderTop: "1px solid #e5e7eb",
  padding: "24px",
  textAlign: "center" as const,
};

const footerText = {
  color: "#6b7280",
  fontSize: "14px",
  lineHeight: "20px",
  margin: "0 0 8px",
};

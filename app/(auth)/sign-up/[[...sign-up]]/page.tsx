import { SignUp as ClerkSignUp } from "@clerk/nextjs";

export default function SignUp() {
  return (
    <main className="auth-page">
      <ClerkSignUp />
    </main>
  );
}

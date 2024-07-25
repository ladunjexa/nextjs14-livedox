import { SignIn as ClerkSignIn } from "@clerk/nextjs";

export default function SignIn() {
  return (
    <main className="auth-page">
      <ClerkSignIn />
    </main>
  );
}

import { AuthShell } from "@/components/auth/auth-shell";
import { SocialJoinForm } from "@/components/auth/social-join-form";

export default function JoinAdvertiserPage() {
  return (
    <AuthShell panel="advertiser">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1.5 text-center">
          <h1 className="font-heading text-3xl font-bold tracking-tight">Join as an advertiser</h1>
          <p className="text-sm text-muted-foreground">
            Social login, then grant access to brand platforms. Orders and briefs live in the workspace.
          </p>
        </div>
        <SocialJoinForm role="advertiser" />
      </div>
    </AuthShell>
  );
}

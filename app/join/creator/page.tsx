import { AuthShell } from "@/components/auth/auth-shell";
import { SocialJoinForm } from "@/components/auth/social-join-form";
import { getCreator } from "@/lib/mocks/creators";
import { primarySocial } from "@/packages/contracts";

export default async function JoinCreatorPage({
  searchParams,
}: {
  searchParams: Promise<{ claim?: string }>;
}) {
  const { claim } = await searchParams;
  const listed = claim ? getCreator(claim) : undefined;
  const handle = listed ? primarySocial(listed)?.handle : undefined;

  return (
    <AuthShell panel="creator">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1.5 text-center">
          <h1 className="font-heading text-3xl font-bold tracking-tight">
            {listed ? `Claim @${handle ?? listed.displayName}` : "Join as a creator"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {listed
              ? "Sign in with a social account, grant page access, then claim this handle. Packages are in the studio."
              : "Social login, then grant access to your platforms. Packages are created in the studio."}
          </p>
        </div>
        <SocialJoinForm role="creator" claimId={listed?.id} listedName={listed?.displayName} />
      </div>
    </AuthShell>
  );
}

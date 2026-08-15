import { RequireSession } from "@/components/auth/require-session";
import { AppShell } from "@/components/dashboard/app-shell";

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireSession portal="creator">
      <AppShell portal="creator">{children}</AppShell>
    </RequireSession>
  );
}

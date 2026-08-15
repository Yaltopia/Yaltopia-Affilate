import { RequireSession } from "@/components/auth/require-session";
import { AppShell } from "@/components/dashboard/app-shell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireSession portal="advertiser">
      <AppShell portal="advertiser">{children}</AppShell>
    </RequireSession>
  );
}

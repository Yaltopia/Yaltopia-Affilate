import { RequireSession } from "@/components/auth/require-session";
import { AppShell } from "@/components/dashboard/app-shell";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireSession portal="admin">
      <AppShell portal="admin">{children}</AppShell>
    </RequireSession>
  );
}

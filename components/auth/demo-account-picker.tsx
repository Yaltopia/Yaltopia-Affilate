"use client";

import { ChevronDown, FlaskConical, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { t } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-store";
import {
  DEMO_PASSWORD,
  accountLabel,
  demoAccounts,
  demoRoleHint,
  type MockAccount,
} from "@/lib/mocks/accounts";
import { type Role } from "@/packages/contracts";

const ROLE_ORDER: Role[] = ["creator", "advertiser", "admin", "payout_agent"];

export function DemoAccountPicker({
  busy,
  signingEmail,
  onPick,
}: {
  busy: boolean;
  signingEmail: string | null;
  onPick: (account: MockAccount) => void;
}) {
  const locale = useLocale();
  const groups = ROLE_ORDER.map((role) => ({
    role,
    label: accountLabel([role]),
    accounts: demoAccounts.filter((account) => {
      if (role === "advertiser") {
        return account.session.roles.includes("advertiser") && !account.session.roles.includes("admin");
      }
      if (role === "creator") {
        return account.session.roles.includes("creator") && !account.session.roles.includes("admin");
      }
      return account.session.roles.includes(role) && account.session.roles.length === 1;
    }),
  })).filter((group) => group.accounts.length > 0);

  return (
    <section className="rounded-md border border-dashed border-primary/40 bg-primary/8 p-4">
      <div className="flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/25">
          <FlaskConical className="size-4" aria-hidden />
        </span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-sm font-semibold">{t(locale, "demoAccounts")}</h2>
            <span className="rounded-md bg-accent/15 px-1.5 py-0.5 text-[11px] font-medium text-accent">
              Demo only
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {t(locale, "demoPickHint")} Mock password {DEMO_PASSWORD}.
          </p>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger
          disabled={busy}
          render={
            <Button type="button" variant="outline" className="mt-4 h-11 w-full justify-between bg-card" />
          }
        >
          <span className="flex min-w-0 items-center gap-2">
            {signingEmail ? <Loader2 className="size-4 shrink-0 animate-spin" aria-hidden /> : null}
            <span className="truncate">
              {signingEmail ? t(locale, "signingInAs", { email: signingEmail }) : t(locale, "chooseTestUser")}
            </span>
          </span>
          <ChevronDown className="size-4 shrink-0 text-muted-foreground" aria-hidden />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="max-h-80">
          {groups.map((group) => (
            <DropdownMenuGroup key={group.role}>
              <DropdownMenuLabel className="uppercase">{group.label}</DropdownMenuLabel>
              {group.accounts.map((account) => (
                <DropdownMenuItem
                  key={account.email}
                  className="items-start py-2"
                  onClick={() => onPick(account)}
                >
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium">{account.session.displayName}</span>
                    <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                      {demoRoleHint[account.email]}
                    </span>
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
}

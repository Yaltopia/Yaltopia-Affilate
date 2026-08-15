-- RBAC helpers. Same login; roles live on profile_roles. Admin assigns admin / payout_agent.

create or replace function public.has_role(r public.app_role)
returns boolean
language sql
stable
as $$
  select exists (
    select 1 from public.profile_roles
    where profile_id = auth.uid() and role = r
  );
$$;

comment on function public.has_role(public.app_role) is
  'True when the signed-in profile has this app_role. Portals: advertiser=/app, creator=/studio, admin|payout_agent=/admin.';

-- Payout Agent is not Admin. Keep is_admin() free of payout_agent so they cannot
-- approve creators, activate advertisers, review KYC, or assign roles.

# Security policy

## Supported versions

The `main` branch is the only supported line while the product is pre-1.0.

## Reporting a vulnerability

**Do not** open a public issue for a security problem.

1. Use [GitHub Security Advisories](https://github.com/Yaltopia/Yaltopia-Affilate/security/advisories) if you can.
2. Or email **kirubel-kibru@yaltopia.com** with a subject starting `SECURITY`.

Include impact, affected paths, and steps to reproduce in private. We aim to acknowledge within 5 business days and to resolve or publish a fix within 90 days.

## Out of scope for public discussion

Do not post click-fraud recipes, payout-bypass writeups, or working exploit code in issues or pull requests.

## Secrets

Never commit Firebase Admin keys, Supabase service role keys, Convex admin keys, or payout account details. Rotate anything that lands in git history and tell the maintainers.

## KYC and identity files

National IDs, TIN certificates, business licenses, selfies, and analytics screenshots are PII. Do not attach them to issues or pull requests. Do not log storage URLs. Access is owner + Admin only (`kyc/{uid}/`).
